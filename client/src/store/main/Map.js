const state = {
  position: {}
};

const getters = {
  position: state => state.position
};

const actions = {};

const mutations = {
  position(state, position) {
    state.position = position;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
