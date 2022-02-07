import { createRouter, createWebHistory } from "vue-router";

import HotelAndDateSelection from "@/views/HotelAndDateSelection";
import RoomTypeAndLandscapeSelection from "@/views/RoomTypeAndLandscapeSelection";
import PreviewAndPayment from "@/views/PreviewAndPayment";
import BookingRegistration from "@/views/BookingRegistration";

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
  {
    path: "/preview-and-payment",
    name: "PreviewAndPayment",
    component: PreviewAndPayment,
  },
  {
    path: "/booking-registration",
    name: "BookingRegistration",
    component: BookingRegistration,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
