<template>
  <a-card class="footer-card">
    <a-button
      v-if="isShowBackButton"
      type="primary"
      class="page-header"
      @click="$router.go(-1)"
    >
      <ArrowLeftOutlined />
      <a-label> Geri </a-label>
    </a-button>
    <a-button
      type="primary"
      class="footer-button page-header"
      @click="$emit('save')"
      >{{ title }}</a-button
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
    title: {
      default: "Kaydet ve Devam Et",
      required: false,
      type: String,
    },
  },
};
</script>
