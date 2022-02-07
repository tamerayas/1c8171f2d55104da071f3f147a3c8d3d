<template>
  <a-page-header
    class="page-header"
    style="border: 1px solid rgb(235, 237, 240)"
    title="Otel"
    sub-title="Rezervasyon Sistemi"
  >
    <template #extra>
      <a-button key="1">Yeni Rezervasyon Yap</a-button>
    </template>
  </a-page-header>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Header",
  methods: {
    ...mapMutations(["setCurrentStep"]),
  },
};
</script>
