<template>
  <a-row type="flex" class="mt-20">
    <a-col :span="24">
      <a-card class="preview">
        <a-row>
          <a-col :span="12">
            <b>Oda Fiyatı</b>
          </a-col>
          <a-col :span="12">
            <b class="fl-r">{{ selectedRoom.price.toLocaleString() }} TL</b>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <b>Fiyat Etki Oranı</b>
          </a-col>
          <a-col :span="12">
            <b class="fl-r"> %{{ landscape.price_rate }}</b>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <b>Konaklama</b> ({{ selectedRoom.dayCount }} Gün)
          </a-col>
          <a-col :span="12">
            <b class="fl-r"> {{ selectedRoom.calculatedPrice }} TL</b>
          </a-col>
        </a-row>
        <a-row v-if="couponCodeData?.length">
          <a-col :span="12">
            <b>İndirim</b> ({{ couponCodeData[0].code }})
          </a-col>
          <a-col :span="12">
            <b class="fl-r"> -{{ couponCodeData[0].discount_ammount }} TL</b>
          </a-col>
        </a-row>
        <a-divider></a-divider>
        <div style="text-align: center">
          <b>Toplam Tutar</b>
          <h1>{{ totalPrice }} TL</h1>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "PricePreview",
  computed: {
    ...mapGetters({
      selectedRoom: "getSelectedRoomData",
      landscape: "getSelectedLandscapeData",
      couponCode: "getAppliedCouponCode",
    }),
    priceRate: {
      get() {
        const calculatedPrice = this.selectedRoom.calculatedPrice;
        const priceRate = this.landscape.price_rate;
        return (
          Number(calculatedPrice) + (Number(calculatedPrice) * priceRate) / 100
        );
      },
    },
    totalPrice: {
      get() {
        const calculatedPrice = Number(this.selectedRoom.calculatedPrice);
        const priceRate = this.landscape.price_rate;
        return (
          calculatedPrice +
          (calculatedPrice * priceRate) / 100 -
          (this.appliedCouponCodePrice || 0)
        );
      },
    },
    couponCodeData: {
      get() {
        return this.couponCode;
      },
    },
  },
  methods: {
    ...mapMutations(["setPricePreview"]),
  },
  beforeUnmount() {
    this.setPricePreview({
      price: this.selectedRoom.price.toLocaleString(),
      priceRate: this.landscape.price_rate,
      dayCount: this.selectedRoom.dayCount,
      calculatedPrice: this.calculatedPrice,
      couponCode: this.couponCode,
      appliedCouponCodePrice: this.appliedCouponCodePrice,
      totalPrice: this.totalPrice,
    });
  },
};
</script>

<style></style>
