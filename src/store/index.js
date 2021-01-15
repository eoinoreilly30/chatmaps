import Vue from "vue";
import Vuex from "vuex";
import Main from "./Main/main";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: { Main }
});
