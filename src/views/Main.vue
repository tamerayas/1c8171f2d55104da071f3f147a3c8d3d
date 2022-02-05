<template>
  <Header />
  <Steps />
  <slot></slot>
</template>

<script>
import Header from "@/components/Header.vue";
import Steps from "@/components/Steps.vue";

export default {
  name: "HotelReservationSystem",
  components: {
    Header,
    Steps,
  },
};
</script>

<style></style>
