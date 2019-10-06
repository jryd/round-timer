import Vue from "vue";
import App from "./App.vue";

import "./app.scss";

import VueTimers from "vue-timers";
Vue.use(VueTimers);
import VueCountdown from "@chenfengyuan/vue-countdown";

Vue.component(VueCountdown.name, VueCountdown);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
