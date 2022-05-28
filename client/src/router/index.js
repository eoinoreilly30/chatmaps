import VueRouter from "vue-router";

const routes = [
  {
    path: "",
    name: "home",
    component: () => import(/* webpackChunkName: "chat" */ "@/app/views/Home")
  }
];

export default new VueRouter({
  routes,
  linkActiveClass: "active",
  mode: "history"
});
