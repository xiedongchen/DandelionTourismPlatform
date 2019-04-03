import Vue from "vue";

import Cookies from "js-cookie";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "./icons"; // icon
import "./errorLog"; // error log
import "./permission"; // permission control

import * as filters from "./filters"; // global filters

import * as ElementData from "./api/elementData";

Vue.use(Element, {
  size: Cookies.get("size") || "medium" // set element-ui default size
});

Vue.use(ElementData);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});