import Vue from "vue";
import Vuex from "vuex";
import Chat from "@/store/main/Chat";
import Map from "@/store/main/Map";
import Dialog from "@/store/main/Dialog";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: { Chat, Map, Dialog }
});
