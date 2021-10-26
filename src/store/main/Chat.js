import Peer from "peerjs";
import axios from "axios";
import store from "@/store";

let myPeer = null;

async function receiveCallStream(stream) {
  let audio = document.createElement("audio");
  audio.srcObject = stream;
  audio.onloadedmetadata = () => {
    console.log("call received");
    audio.play();
  };
}

async function getMediaStream() {
  try {
    return await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
  } catch {
    await store.dispatch("popupDialog", {
      title: "Mic Permission",
      text:
        "Please enable microphone access. You might have to go into your settings"
    });
    console.log("error");
  }
}

const state = {
  myId: "",
  peers: [],
  callDialog: false,
  callLoading: false,
  receiveDialog: false,
  receiveLoading: false
};

const getters = {
  myId: state => state.myId,
  peers: state => state.peers,
  callDialog: state => state.callDialog,
  callLoading: state => state.callLoading,
  receiveDialog: state => state.receiveDialog,
  receiveLoading: state => state.receiveLoading
};

const actions = {
  async connectPeerServer({ commit, dispatch }, [lat, long]) {
    let myId = `x${lat}x${long}x`.replaceAll(".", "p");

    myPeer = new Peer(myId, {
      host: process.env.VUE_APP_PEER_SERVER,
      port: 9000,
      secure: true
    });

    myPeer.on("open", id => {
      commit("myId", id);
      setInterval(() => {
        dispatch("getPeers");
      }, 2000);
    });

    myPeer.on("call", incomingCallConnection => {
      commit("receiveDialog", true);
      console.log("received call");
      getMediaStream().then(mediaStream => {
        incomingCallConnection.answer(mediaStream);
      });

      incomingCallConnection.on("stream", stream => {
        receiveCallStream(stream);
      });
    });
  },
  async connectCall({ commit }, id) {
    commit("callDialog", true);
    commit("callLoading", true);
    getMediaStream().then(mediaStream => {
      console.log("connect", mediaStream);
      myPeer.call(id, mediaStream).on("stream", stream => {
        console.log("connecting");
        receiveCallStream(stream);
        commit("callLoading", false);
      });
    });
  },
  async destroy() {
    myPeer.destroy();
  },
  async getPeers({ commit }) {
    let { data } = await axios.get(
      `https://${process.env.VUE_APP_PEER_SERVER}:9000/peerjs/peers`
    );
    commit("peers", data);
  }
};

const mutations = {
  myId(state, myId) {
    state.myId = myId;
  },
  peers(state, peers) {
    state.peers = peers.filter(id => id !== state.myId);
  },
  callDialog(state, callDialog) {
    state.callDialog = callDialog;
  },
  callLoading(state, callLoading) {
    state.callLoading = callLoading;
  },
  receiveDialog(state, receiveDialog) {
    state.receiveDialog = receiveDialog;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
