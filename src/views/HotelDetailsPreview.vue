<template>
  <div v-if="hotelData">
    <b>{{ hotelData.selectedHotel.hotel_name }}</b>
    <div style="text-align: center">
      <a-row :gutter="[16, 24]">
        <a-col :span="12">
          <a-card class="preview">
            <b>Giriş Tarihi</b>
            <div>{{ moment(hotelData.entryDate).format("DD.MM.YYYY") }}</div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card class="preview">
            <b>Çıkış Tarihi</b>
            <div>{{ moment(hotelData.outDate).format("DD.MM.YYYY") }}</div>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 24]">
        <a-col :span="12">
          <a-card class="preview">
            <b>Yetişkin</b>
            <div>{{ hotelData.adultCount }}</div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card class="preview">
            <b>Çocuk</b>
            <div>{{ hotelData.childrenCount || 0 }}</div>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 24]">
        <a-col :span="12">
          <a-card class="preview">
            <b>Oda Tipi</b>
            <div>{{ selectedRoom.title }}</div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card class="preview">
            <b>Manzara</b>
            <div>{{ landscape.title }}</div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "HotelDetailsPreview",
  computed: {
    ...mapGetters({
      hotelData: "getSelectedHotelAndDateData",
      selectedRoom: "getSelectedRoomData",
      landscape: "getSelectedLandscapeData",
    }),
  },
  methods: {
    moment,
  },
};
</script>

<style></style>
