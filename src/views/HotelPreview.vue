<template>
  <HotelDetailsPreview />
  <a-row type="flex" class="mt-20">
    <a-col :span="24">
      <a-card>
        <a-row type="flex">
          <a-col :span="18">
            <a-input
              placeholder="Kupon Kodu"
              style="width: 100%"
              v-model:value="couponCode"
            >
            </a-input>
          </a-col>
          <a-col :span="6">
            <a-button style="float: right" type="primary" @click="applyCoupon">
              Kodu Kullan
            </a-button>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
  <PricePreview
    :coupon-code="couponCode"
    :applied-coupon-price="appliedCouponCodePrice"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PricePreview from "@/views/PricePreview";
import HotelDetailsPreview from "@/views/HotelDetailsPreview";
export default {
  name: "HotelPreview",
  components: {
    PricePreview,
    HotelDetailsPreview,
  },
  data() {
    return {
      couponCode: "",
      appliedCouponCodePrice: "",
    };
  },
  computed: {
    ...mapGetters({
      appliedCouponCode: "getAppliedCouponCode",
    }),
  },
  methods: {
    ...mapActions(["setCouponCode"]),
    applyCoupon() {
      this.setCouponCode(this.couponCode).then((response) => {
        this.appliedCouponCodePrice = response;
      });
    },
  },
  mounted() {
    this.couponCode =
      this.appliedCouponCode?.length > 0 ? this.appliedCouponCode[0].code : "";
    this.appliedCouponCodePrice =
      this.appliedCouponCode?.length > 0
        ? this.appliedCouponCode[0].discount_ammount
        : 0;
  },
};
</script>

<style>
.preview {
  border-radius: 10px;
}
</style>
