<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script>
import locale from "ant-design-vue/lib/locale-provider/tr_TR";

export default {
  name: "App",
  created() {
    this.locale = locale;
  },
};
</script>
