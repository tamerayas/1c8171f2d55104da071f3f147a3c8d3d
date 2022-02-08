<template>
  <h2 class="mt-10">Manzara Seçimi</h2>
  <a-divider />
  <a-row :gutter="[16, 16]">
    <a-col
      :xs="{ span: 24 }"
      :md="{ span: 8 }"
      :lg="{ span: 8 }"
      v-for="(room, index) in roomScenic"
      :key="index"
    >
      <a-card
        :span="6"
        class="radius"
        :class="{ active: room.isActive }"
        @click="selectLandscape(room)"
      >
        <h3>{{ room.title }}</h3>
        <img class="room-type-photo" :src="room.photo" alt="" />
        <a-row>
          <a-col :span="17"> Fiyata Etki Oranı </a-col>
          <a-col :span="7">
            <h3 class="right">+ {{ room.price_rate }} %</h3>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "LandscapeSelection",
  emits: ["selected"],
  data() {
    return {
      roomScenic: [],
    };
  },
  computed: {
    ...mapGetters(["getSelectedHotelDetails", "getSelectedLandscapeData"]),
  },
  methods: {
    selectLandscape(room) {
      this.roomScenic.forEach((data) => {
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
    this.roomScenic = this.getSelectedHotelDetails?.room_scenic.map((data) => {
      return {
        ...data,
        isActive: false,
      };
    });
    if (this.getSelectedLandscapeData) {
      this.roomScenic.find(
        (room) => room.id === this.getSelectedLandscapeData.id
      ).isActive = true;
    }
  },
};
</script>

<style></style>
