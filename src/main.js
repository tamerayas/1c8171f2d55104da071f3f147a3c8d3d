import { createApp } from "vue";
import { ConfigProvider } from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import moment from "moment";
import { message } from "ant-design-vue";

import "ant-design-vue/dist/antd.css";
import "@/assets/style.css";

createApp(App)
  .use(Antd)
  .use(ConfigProvider)
  .use(store)
  .use(router)
  .use(moment)
  .use(message)
  .mount("#app");
