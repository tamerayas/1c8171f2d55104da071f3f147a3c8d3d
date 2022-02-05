<template>
  <div class="header">
    <Header />
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="20">
        <a-card class="steps-card">
          <Steps />
        </a-card>
        <slot></slot>
      </a-col>
    </a-row>
  </div>
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
