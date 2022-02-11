import Peer from "peerjs";
import axios from "axios";
import store from "@/store";

let myPeer = null;
let mediaConnection = null;
let mediaStream = null;

function playAudio(stream) {
  let audio = document.createElement("audio");
  audio.srcObject = stream;
  audio.onloadedmetadata = () => {
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
  }
}

const state = {
  myId: "",
  apiError: false,
  peers: [],
  callDialog: false,
  callLoading: false,
  receiveDialog: false,
  receiveLoading: false
};

const getters = {
  myId: state => state.myId,
  apiError: state => state.apiError,
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

    myPeer.on("error", () => {
      commit("apiError", true);
    });

    myPeer.on("open", id => {
      commit("myId", id);
      setInterval(() => {
        dispatch("getPeers");
      }, 2000);
    });

    myPeer.on("call", connection => {
      commit("receiveDialog", true);
      commit("receiveLoading", true);
      mediaConnection = connection;
    });
  },
  async answerCall({ commit }) {
    getMediaStream().then(stream => {
      mediaStream = stream;
      mediaConnection.answer(stream);
    });
    mediaConnection.on("stream", stream => {
      playAudio(stream);
      commit("receiveLoading", false);
    });
  },
  async connectCall({ commit }, id) {
    commit("callDialog", true);
    commit("callLoading", true);
    getMediaStream().then(stream => {
      mediaStream = stream;
      mediaConnection = myPeer.call(id, stream);
      mediaConnection.on("stream", connectionStream => {
        playAudio(connectionStream);
        commit("callLoading", false);
      });
    });
  },
  async hangup({ commit }) {
    mediaConnection.close();
    mediaStream.getTracks().forEach(track => {
      track.stop();
    });
    commit("callDialog", false);
    commit("receiveDialog", false);
  },
  async destroy() {
    myPeer.destroy();
    mediaConnection.close();
  },
  async getPeers({ commit }) {
    try {
      let { data } = await axios.get(
        `https://${process.env.VUE_APP_PEER_SERVER}:9000/peerjs/peers`
      );
      commit("peers", data);
      commit("apiError", false);
    } catch {
      commit("apiError", true);
    }
  }
};

const mutations = {
  myId(state, myId) {
    state.myId = myId;
  },
  apiError(state, apiError) {
    state.apiError = apiError;
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
  },
  receiveLoading(state, receiveLoading) {
    state.receiveLoading = receiveLoading;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
