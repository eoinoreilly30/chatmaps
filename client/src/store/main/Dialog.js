const state = {
  popupDialog: {
    status: null,
    title: null,
    text: null
  }
};

const getters = {
  popupDialog: state => state.popupDialog
};

const actions = {
  popupDialog({ commit }, popupDialog) {
    commit("popupDialog", popupDialog);
  }
};

const mutations = {
  popupDialog(state, popupDialog) {
    state.popupDialog.status = true;
    state.popupDialog = Object.assign(state.popupDialog, popupDialog);
  },
  popupDialogStatus(state) {
    state.popupDialog.status = null;
    state.popupDialog.title = null;
    state.popupDialog.text = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
