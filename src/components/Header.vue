<template>
  <a-page-header
    class="demo-page-header"
    style="border: 1px solid rgb(235, 237, 240)"
    title="Otel"
    sub-title="Rezervasyon Sistemi"
    @back="() => $router.go(-1)"
  >
    <template #extra>
      <a-button key="1" type="primary">Primary</a-button>
    </template>
  </a-page-header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style></style>
