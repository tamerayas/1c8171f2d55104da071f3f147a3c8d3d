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
        commit("setCurrentStep", 1)
        dispatch("fetchHotelDetails");
      });
    },
    fetchHotelDetails({ commit }) {
      axios.get("/hotel-details").then(({ data }) => {
        commit("setHotelDetails", data);
      });
    },
    saveHotelAndDateSelection({ commit }, payload) {
      commit("setHotelAndDateSelection", payload)
      commit("setCurrentStep", 2)
    }
  },
  mutations: {
    setHotels(state, payload) {
      state.hotels = payload;
    },
    setHotelDetails(state, payload) {
      state.hotelsDetail = payload;
    },
    setHotelAndDateSelection(_, payload) {
      localStorage.setItem("hotelAndDateSelection", JSON.stringify(payload))
    },
    setCurrentStep(_, payload) {
      localStorage.setItem("currentStep", payload)
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
      return localStorage.getItem("currentStep")
    },
    getSelectedHotelAndDateData() {
      return JSON.parse(localStorage.getItem("hotelAndDateSelection"))
    }
  },
});
