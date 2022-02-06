<template>
  <a-card class="footer-card">
    <a-button type="primary" v-if="isShowBackButton" @click="$router.go(-1)">
      <ArrowLeftOutlined />
      <a-label> Geri </a-label>
    </a-button>
    <a-button type="primary" class="footer-button" @click="$emit('save')"
      >Kaydet ve Devam Et</a-button
    >
  </a-card>
</template>

<script>
import { ArrowLeftOutlined } from "@ant-design/icons-vue";

export default {
  name: "Footer",
  components: {
    ArrowLeftOutlined,
  },
  emits: ["save"],
  props: {
    isShowBackButton: {
      default: false,
      required: false,
      type: Boolean,
    },
  },
};
</script>
