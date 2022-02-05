<template>
  <h2 style="margin-top: 10px">Oda Tipi Seçimi</h2>
  <a-divider />
  <a-row :gutter="16">
    <a-col
      :span="24 / roomTypes.length"
      v-for="(room, index) in roomTypes"
      :key="index"
    >
      <a-card
        :span="6"
        style="border-radius: 10px"
        @click="selectRoom(room)"
        :class="{ active: room.isActive }"
      >
        <h3>{{ room.title }}</h3>
        <img class="room-type-photo" :src="room.photo" alt="" />
        <a-row>
          <a-col :span="18">
            <div>{{ dayCount }} Gün</div>
            <div>{{ getSelectedHotelAndDateData.adultCount }} Yetişkin</div>
          </a-col>
          <a-col :span="6">
            <h3 style="text-align: right">
              {{ calculatePrice(room.price) }} TL
            </h3>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "RoomTypeSelection",
  data() {
    return {
      roomTypes: [],
    };
  },
  computed: {
    ...mapGetters([
      "getSelectedHotelDetails",
      "getSelectedHotelAndDateData",
      "getSelectedRoomData",
    ]),
    dayCount: {
      get() {
        const entryDate = moment(
          this.getSelectedHotelAndDateData.entryDate
        ).format("YYYY-MM-DD");
        const outDate = this.getSelectedHotelAndDateData.outDate;

        return moment(outDate).diff(entryDate, "days");
      },
    },
  },
  methods: {
    calculatePrice(price) {
      return (
        (this.getSelectedHotelAndDateData.adultCount +
          this.getSelectedHotelAndDateData.childrenCount) *
        price *
        this.dayCount
      ).toLocaleString();
    },
    selectRoom(room) {
      this.roomTypes.forEach((data) => {
        if (data.id === room.id) {
          this.$emit("selected", data);
          data.isActive = true;
          return;
        }
        data.isActive = false;
      });
    },
  },
  mounted() {
    this.roomTypes = this.getSelectedHotelDetails.room_type.map((data) => {
      return {
        ...data,
        isActive: false,
      };
    });
    this.roomTypes.find(
      (room) => room.id === this.getSelectedRoomData.id
    ).isActive = this.getSelectedRoomData.isActive;
  },
};
</script>
