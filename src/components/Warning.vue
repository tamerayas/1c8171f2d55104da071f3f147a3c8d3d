<template>
  <a-result title="Aradığınız sayfaya ulaşılamadı!">
    <template #extra>
      <a-button key="console" type="primary" @click="$router.go(-1)"
        >Önceki Sayfaya Dön</a-button
      >
    </template>
  </a-result>
</template>

<script>
export default {
  name: "Warning",
};
</script>

<style></style>
