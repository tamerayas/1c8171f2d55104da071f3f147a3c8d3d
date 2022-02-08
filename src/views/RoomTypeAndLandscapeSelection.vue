<template>
  <Main>
    <SelectedHotelDetails />
    <RoomTypeSelection
      @selected="setSelectedRoom"
      v-if="getSelectedHotelAndDateData"
    />
    <LandscapeSelection
      @selected="setSelectedLandscape"
      v-if="getSelectedHotelDetails"
    />
    <Warning v-if="!getSelectedHotelDetails && !getSelectedHotelAndDateData" />
    <Footer @save="save" is-show-back-button />
  </Main>
</template>

<script>
import { message } from "ant-design-vue";
import { mapActions, mapGetters } from "vuex";
import SelectedHotelDetails from "@/views/SelectedHotelDetails";
import RoomTypeSelection from "@/views/RoomTypeSelection";
import LandscapeSelection from "@/views/LandscapeSelection";
import Main from "@/views/Main";
import Footer from "@/components/Footer";
import Warning from "@/pages/Warning";
export default {
  name: "RoomTypeAndLandscapeSelection",
  components: {
    Main,
    SelectedHotelDetails,
    Footer,
    RoomTypeSelection,
    LandscapeSelection,
    Warning,
  },
  data() {
    return {
      selectedRoom: null,
      selectedLandscape: null,
    };
  },
  computed: {
    ...mapGetters([
      "getSelectedRoomData",
      "getSelectedLandscapeData",
      "getSelectedHotelAndDateData",
      "getSelectedHotelDetails",
    ]),
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
      }).then(() => {
        this.$router.push({ name: "PreviewAndPayment" });
      });
    },
  },
  mounted() {
    this.selectedRoom = this.getSelectedRoomData;
    this.selectedLandscape = this.getSelectedLandscapeData;

    if (!this.getSelectedHotelAndDateData) {
      message.error("Lütfen önceki sayfaya dönüp seçim yapınız!");
    }
  },
};
</script>

<style></style>
