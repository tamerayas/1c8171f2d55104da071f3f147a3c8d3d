<template>
  <a-row type="flex" class="mt-20" v-if="selectedRoom">
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
        <a-row v-if="appliedCouponPrice">
          <a-col :span="12"> <b>İndirim</b> ({{ couponCode }}) </a-col>
          <a-col :span="12">
            <b class="fl-r"> -{{ appliedCouponPrice }} TL</b>
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
  <Warning v-else />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Warning from "@/components/Warning";
export default {
  name: "PricePreview",
  components: {
    Warning,
  },
  props: {
    couponCode: {
      type: String,
      default: "",
    },
    appliedCouponPrice: {
      default: 0,
    },
  },
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
          (this.appliedCouponPrice || 0)
        );
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
      appliedCouponCodePrice: this.appliedCouponPrice,
      totalPrice: this.totalPrice,
    });
  },
};
</script>

<style></style>
