<template>
  <Main>
    <SelectedHotelDetails />
    <RoomTypeSelection @selected="setSelectedRoom" />
    <LandscapeSelection @selected="setSelectedLandscape" />
    <Footer @save="save" />
  </Main>
</template>

<script>
import SelectedHotelDetails from "@/views/SelectedHotelDetails";
import RoomTypeSelection from "@/views/RoomTypeSelection";
import LandscapeSelection from "@/views/LandscapeSelection";
import Main from "@/views/Main";
import Footer from "@/components/Footer";
import { message } from "ant-design-vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RoomTypeAndLandscapeSelection",
  components: {
    Main,
    SelectedHotelDetails,
    Footer,
    RoomTypeSelection,
    LandscapeSelection,
  },
  data() {
    return {
      selectedRoom: null,
      selectedLandscape: null,
    };
  },
  computed: {
    ...mapGetters(["getSelectedRoomData", "getSelectedLandscapeData"]),
  },
  methods: {
    ...mapActions(["setSelectedRoomAndLandscape"]),
    setSelectedRoom(data) {
      this.selectedRoom = data;
    },
    setSelectedLandscape(data) {
      this.selectedLandscape = data;
    },
    save() {
      if (!this.selectedRoom || !this.selectedLandscape) {
        message.error("Lütfen gerekli tüm seçimleri yapınız!");
        return;
      }
      this.setSelectedRoomAndLandscape({
        room: this.selectedRoom,
        landscape: this.selectedLandscape,
      });
    },
  },
  mounted() {
    this.selectedRoom = this.getSelectedRoomData;
    this.selectedLandscape = this.getSelectedLandscapeData;
  },
};
</script>

<style></style>
