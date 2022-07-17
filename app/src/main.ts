import { createSSRApp } from "vue";
import ElementPlus, { ID_INJECTION_KEY } from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import { createRouter } from './router'

import './index.scss'

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter()
  app.use(router)
  app.use(ElementPlus).provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0,
  });
  return { app, router };
}
