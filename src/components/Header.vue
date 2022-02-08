<template>
  <a-page-header
    class="page-header"
    title="Otel"
    sub-title="Rezervasyon Sistemi"
  >
    <template #extra>
      <a-button key="1" @click="newReservation">Yeni Rezervasyon Yap</a-button>
    </template>
  </a-page-header>
</template>

<script>
import { mapMutations } from "vuex";
import newReservationMixin from "@/mixins/newReservation";

export default {
  name: "Header",
  mixins: [newReservationMixin],
  methods: {
    ...mapMutations(["setCurrentStep"]),
  },
};
</script>
