import Vue from "vue";
import App from "@/app/App.vue";
import vuetify from "@/plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "@/store";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import VueRouter from "vue-router";
import router from "@/router";

Vue.config.productionTip = true;

Vue.use(VueAxios, axios);

Vue.use(VueRouter);

const firebaseConfig = {
  apiKey: "AIzaSyAVQ8Jo7qJxMM2IMz1kOwFvuDIYHQL4Cow",
  authDomain: "chatmaps-75d1d.firebaseapp.com",
  projectId: "chatmaps-75d1d",
  storageBucket: "chatmaps-75d1d.appspot.com",
  messagingSenderId: "564044826136",
  appId: "1:564044826136:web:625295191ac0d27368a56d",
  measurementId: "G-8DWQGDH5H8"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount("#app");
