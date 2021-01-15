import Peer from "peerjs";
import axios from "axios";

let peer = null;
let outgoingMessageConnection = null;

const state = {
  id: "",
  peers: [],
  messages: []
};

const getters = {
  id: state => state.id,
  peers: state => state.peers,
  messages: state => state.messages
};

const actions = {
  async init({ commit, getters, dispatch }) {
    peer = new Peer(getters.id, {
      host: process.env.VUE_APP_PEER_SERVER,
      port: 9000,
      secure: true
    });

    peer.on("open", id => {
      commit("id", id);
    });

    peer.on("connection", incomingConnection => {
      if (!outgoingMessageConnection) {
        dispatch("connect", incomingConnection.peer);
      }
      incomingConnection.on("data", data => {
        commit("messages", data);
      });
    });

    peer.on("call", incomingCallConnection => {
      console.log("received call");
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(mediaStream => {
          console.log("answering call");
          incomingCallConnection.answer(mediaStream);
        })
        .catch(() => {
          // TODO: handle DOM exception by asking user to go to their settings
        });

      incomingCallConnection.on("stream", stream => {
        dispatch("receiveCallStream", stream);
      });
    });
  },
  async connectMessage(context, id) {
    outgoingMessageConnection = peer.connect(id);
  },
  async sendMessage(context, data) {
    outgoingMessageConnection.send(data);
  },
  async connectCall({ dispatch }, id) {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(mediaStream => {
        peer.call(id, mediaStream).on("stream", stream => {
          console.log("connecting");
          dispatch("receiveCallStream", stream);
        });
      })
      .catch(() => {
        // TODO: handle DOM exception by asking user to go to their settings
      });
  },
  async receiveCallStream(context, stream) {
    let audio = document.querySelector("audio");
    audio.srcObject = stream;
    audio.onloadedmetadata = () => {
      console.log("call received");
      audio.play();
    };
  },
  async destroy() {
    peer.destroy();
  },
  async getPeers({ commit, getters }) {
    let { data } = await axios.get(
      `https://${process.env.VUE_APP_PEER_SERVER}:9000/peerjs/peers`
    );
    commit(
      "peers",
      data.filter(id => id !== getters.id)
    );
  }
};

const mutations = {
  id(state, id) {
    state.id = id;
  },
  peers(state, peers) {
    state.peers = peers;
  },
  messages(state, newMessage) {
    state.messages.push(newMessage);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
