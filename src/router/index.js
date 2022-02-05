import { createRouter, createWebHistory } from "vue-router";

import HotelAndDateChoose from "@/views/HotelAndDateChoose";
const routes = [
  {
    path: "/",
    name: "HotelAndDateChoose",
    component: HotelAndDateChoose,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
