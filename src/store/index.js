import { createStore } from "vuex";
import axios from "@/services/http";

export default createStore({
  state: {
    hotels: [],
    hotelsDetail: [],
  },
  actions: {
    fetchHotels({ commit, dispatch }) {
      axios.get("/hotels").then(({ data }) => {
        commit("setHotels", data);
        commit("setCurrentStep", 1);
        dispatch("fetchHotelDetails");
      });
    },
    fetchHotelDetails({ commit }) {
      return axios.get("/hotel-details").then(({ data }) => {
        commit("setHotelDetails", data);
        console.log(data);
        return data;
      });
    },
    saveHotelAndDateSelection({ commit }, payload) {
      commit("setHotelAndDateSelection", payload);
      commit("setCurrentStep", 2);
    },
    setSelectedRoomAndLandscape({ commit }, payload) {
      commit("setSelectedRoomAndLandscapeData", payload)
      commit("setCurrentStep", 3)
    },
  },
  mutations: {
    setHotels(state, payload) {
      state.hotels = payload;
    },
    setHotelDetails(state, payload) {
      state.hotelsDetail = payload;
      localStorage.setItem("hotelsDetail", JSON.stringify(payload));
    },
    setHotelAndDateSelection(_, payload) {
      localStorage.setItem("hotelAndDateSelection", JSON.stringify(payload));
    },
    setCurrentStep(_, payload) {
      localStorage.setItem("currentStep", payload);
    },
    setSelectedRoomAndLandscapeData(_, payload) {
      localStorage.setItem("selectedRoom", JSON.stringify(payload.room));
      localStorage.setItem(
        "selectedLandscape",
        JSON.stringify(payload.landscape)
      );
    }

  },
  getters: {
    hotelsDetail(state) {
      return {
        hotels: state.hotels,
        details: state.hotelsDetail,
      };
    },
    getCurrentStep() {
      return localStorage.getItem("currentStep");
    },
    getSelectedHotelAndDateData() {
      return JSON.parse(localStorage.getItem("hotelAndDateSelection"));
    },
    getSelectedHotelDetails() {
      const selectedHotelId = JSON.parse(
        localStorage.getItem("hotelAndDateSelection")
      ).selectedHotelId;
      const hotelsDetail = JSON.parse(localStorage.getItem("hotelsDetail"));
      return hotelsDetail.find((detail) => detail.id === selectedHotelId);
    },
    getSelectedRoomData() {
      return JSON.parse(localStorage.getItem("selectedRoom"));
    },
    getSelectedLandscapeData() {
      return JSON.parse(localStorage.getItem("selectedLandscape"));
    },
  },
});
