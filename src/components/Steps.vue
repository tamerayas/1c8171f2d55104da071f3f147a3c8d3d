<template>
  <a-steps :current="Number(getCurrentStep)">
    <a-step title="Otel ve Tarih Seçimi">
      <template #description v-if="Number(getCurrentStep) === 1">
        <span>İşlemde...</span>
      </template>
      <template #icon>
        <div class="circle">
          <CalendarOutlined />
        </div>
      </template>
    </a-step>
    <a-step title="Oda Tipi ve Manzara Seçimi">
      <template #description v-if="Number(getCurrentStep) === 2">
        <span>İşlemde...</span>
      </template>
      <template #icon>
        <div class="circle">
          <BankOutlined />
        </div>
      </template>
      Otel ve Tarih Seçimi
    </a-step>
    <a-step>
      <template #title>Önizleme ve Ödeme İşlemleri</template>
      <template #description v-if="Number(getCurrentStep) === 3">
        <span>İşlemde...</span>
      </template>
      <template #icon>
        <div class="circle">
          <CreditCardOutlined />
        </div>
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
import { mapGetters } from "vuex";
export default {
  name: "Steps",
  components: {
    CalendarOutlined,
    BankOutlined,
    CreditCardOutlined,
  },
  computed: {
    ...mapGetters(["getCurrentStep"]),
  },
};
</script>
