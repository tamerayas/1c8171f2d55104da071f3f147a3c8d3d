<template>
  <h2 class="mt-10">Oda Tipi Seçimi</h2>
  <a-divider />
  <a-row :gutter="[16, 16]">
    <a-col
      :xs="{ span: 24 }"
      :md="{ span: 8 }"
      :lg="{ span: 8 }"
      v-for="(room, index) in roomTypes"
      :key="index"
    >
      <a-card
        :span="6"
        class="radius"
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
            <h3 class="right">
              {{ calculatePrice(room.price).toLocaleString() }} TL
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
      );
    },
    selectRoom(room) {
      this.roomTypes.forEach((data) => {
        if (data.id === room.id) {
          this.$emit("selected", {
            ...data,
            calculatedPrice: this.calculatePrice(data.price),
            dayCount: this.dayCount,
          });
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
    if (this.getSelectedRoomData) {
      this.roomTypes.find(
        (room) => room.id === this.getSelectedRoomData.id
      ).isActive = true;
    }
  },
};
</script>
