<template>
  <a-card class="hotel-detail-card" v-if="hotelData">
    <h2>{{ hotelData.selectedHotel.hotel_name || "-" }}</h2>
    <b>Giriş Tarihi:</b>
    {{ moment(hotelData.entryDate).format("DD.MM.YYYY") }} -
    <b>Çıkış Tarihi:</b>
    {{ moment(hotelData.outDate).format("DD.MM.YYYY") }} -
    <b>Yetişkin:</b>
    {{ hotelData.adultCount }} -
    <b>Çocuk:</b>
    {{ hotelData.childrenCount || 0 }}
  </a-card>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "SelectedHotelDetails",
  data() {
    return {
      data: null,
    };
  },
  computed: {
    ...mapGetters({
      hotelData: "getSelectedHotelAndDateData",
    }),
  },
  methods: {
    moment,
  },
};
</script>

<style></style>
