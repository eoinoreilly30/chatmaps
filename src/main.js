import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

Vue.config.productionTip = true;

Vue.use(VueAxios, axios);

const firebaseConfig = {
  apiKey: "AIzaSyCSq-PtGMnD4TAiSyPwcSPzBTK8ZomIs_k",
  authDomain: "chat-maps-b5abd.firebaseapp.com",
  projectId: "chat-maps-b5abd",
  storageBucket: "chat-maps-b5abd.appspot.com",
  messagingSenderId: "841386432156",
  appId: "1:841386432156:web:19a0a9cd56c2b7af837f59",
  measurementId: "G-MGDBER07EM"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
