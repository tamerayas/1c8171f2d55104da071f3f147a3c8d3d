<template>
  <a-page-header
    class="page-header"
    style="border: 1px solid rgb(235, 237, 240)"
    title="Otel"
    sub-title="Rezervasyon Sistemi"
    @back="handleGoBack"
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
    handleGoBack() {
      this.$router.go(-1);
      if (this.$route.path !== "/") {
        this.setCurrentStep(localStorage.getItem("currentStep") - 1);
      }
    },
  },
};
</script>
