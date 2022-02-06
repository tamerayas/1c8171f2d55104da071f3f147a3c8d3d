<template>
  <div class="header">
    <a-card class="text-align: center">
      <CarryOutOutlined style="font-size: 50px; color: #009e0f" />
    </a-card>
    <a-card class="main-bg">
      <HotelDetailsPreview />
      <PricePreview />
    </a-card>
  </div>
</template>

<script>
import HotelDetailsPreview from "@/views/HotelDetailsPreview";
import PricePreview from "@/views/PricePreview";
import { CarryOutOutlined } from "@ant-design/icons-vue";

export default {
  name: "BookingRegistration",
  components: {
    HotelDetailsPreview,
    PricePreview,
    CarryOutOutlined,
  },
};
</script>
