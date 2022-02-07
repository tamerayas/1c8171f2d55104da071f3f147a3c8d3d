<template>
  <Main>
    <a-row type="flex" class="mt-20" :gutter="[16, 16]">
      <a-col
        :flex="1"
        :span="12"
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 12 }"
      >
        <a-card>
          <CreditCard @change="setCreditCard" />
        </a-card>
      </a-col>
      <a-col
        :flex="2"
        :span="12"
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 12 }"
      >
        <a-card class="main-bg">
          <HotelPreview />
        </a-card>
      </a-col>
    </a-row>
    <Footer
      @save="save"
      :is-show-back-button="true"
      title="Ödeme Yap ve Bitir"
    />
  </Main>
</template>

<script>
import Main from "@/views/Main";
import CreditCard from "@/views/CreditCard";
import HotelPreview from "@/views/HotelPreview";
import Footer from "@/components/Footer.vue";
import { mapActions } from "vuex";
import { message } from "ant-design-vue";
export default {
  name: "PreviewAndPayment",
  components: {
    Main,
    CreditCard,
    HotelPreview,
    Footer,
  },
  data() {
    return {
      creditCardData: {},
    };
  },
  methods: {
    ...mapActions(["createNewReservation"]),
    setCreditCard(data) {
      Object.assign(this.creditCardData, data);
    },
    save() {
      const isAvailableForSaving =
        Object.keys(this.creditCardData).length > 0 &&
        Object.values(this.creditCardData).every((value) => {
          if (!value) {
            return false;
          }

          return true;
        });

      if (isAvailableForSaving)
        this.createNewReservation(this.creditCardData).then(() => {
          this.$router.push({ name: "BookingRegistration" });
        });
      else message.warn("Lütfen tüm zorunlu alanları doldurunuz!");
    },
  },
};
</script>
