import { createRouter, createWebHistory } from "vue-router";

import HotelAndDateSelection from "@/views/HotelAndDateSelection";
import RoomTypeAndLandscapeSelection from "@/views/RoomTypeAndLandscapeSelection";

const routes = [
  {
    path: "/",
    name: "HotelAndDateSelection",
    component: HotelAndDateSelection,
  },
  {
    path: "/room-landscape-selection",
    name: "RoomTypeAndLandscapeSelection",
    component: RoomTypeAndLandscapeSelection,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
