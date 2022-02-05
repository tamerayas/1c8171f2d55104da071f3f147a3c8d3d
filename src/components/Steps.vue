<template>
  <a-steps :current="getCurrentStep">
    <a-step title="Otel ve Tarih Seçimi">
      <template #description v-if="getCurrentStep === 1">
        <span>İşlemde...</span>
      </template>
      <template #icon>
        <CalendarOutlined />
      </template>
    </a-step>
    <a-step title="Oda Tipi ve Manzara Seçimi">
      <template #description v-if="getCurrentStep === 2">
        <span>İşlemde...</span>
      </template>
      <template #icon>
        <BankOutlined />
      </template>
    </a-step>
    <a-step>
      <template #title>Önizleme ve Ödeme İşlemleri</template>
      <template #description v-if="getCurrentStep === 3">
        <span>İşlemde...</span>
      </template>
      <template #icon>
        <CreditCardOutlined />
      </template>
    </a-step>
  </a-steps>
</template>

<script>
import {
  CalendarOutlined,
  BankOutlined,
  CreditCardOutlined,
} from "@ant-design/icons-vue";
import { mapGetters } from 'vuex';
export default {
  name: "Steps",
  components: {
    CalendarOutlined,
    BankOutlined,
    CreditCardOutlined,
  },
  computed: {
    ...mapGetters(['getCurrentStep'])
  },
  mounted() {
    console.log('getCurrentStep',this.getCurrentStep);
  }
};
</script>

<style></style>
