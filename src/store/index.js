import { createStore } from "vuex";
import axios from "@/services/http";
import moment from "moment";
import { message } from "ant-design-vue";

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
        return data;
      });
    },
    saveHotelAndDateSelection({ commit }, payload) {
      commit("setHotelAndDateSelection", payload);
      commit("setCurrentStep", 2);
    },
    setSelectedRoomAndLandscape({ commit }, payload) {
      commit("setSelectedRoomAndLandscapeData", payload);
      commit("setCurrentStep", 3);
    },
    setCouponCode(_, payload) {
      return axios.get(`/coupons?code=${payload}`).then(({ data }) => {
        if (data.length > 1) {
          message.error("Hatalı kod girdiniz!");
          return;
        }

        const expirationAt = moment(data[0].expiration_at).format("YYYY-MM-DD");
        const dateDiff = moment().diff(expirationAt, "days");
        if (dateDiff < 0) {
          localStorage.setItem("couponCode", JSON.stringify(data));
          return data[0].discount_ammount;
        } else {
          message.error(
            "Girmiş olduğunuz kupon kodunun kullanım süresi geçmiş!"
          );
        }
      });
    },
    createNewReservation({ rootGetters, commit }, payload) {
      const hotelData = rootGetters["getSelectedHotelAndDateData"];
      const selectedRoom = rootGetters["getSelectedRoomData"];
      const selectedLandscape = rootGetters["getSelectedLandscapeData"];
      const pricePreview = rootGetters["getPricePreview"];
      const couponCode = rootGetters["getAppliedCouponCode"];
      return axios
        .post("/hotel-bookings", {
          hotel_id: Number(hotelData.selectedHotelId),
          start_date: moment(hotelData.entryDate).format("YYYY-MM-DD"),
          end_date: moment(hotelData.outDate).format("YYYY-MM-DD"),
          adult: hotelData.adultCount,
          child: hotelData.childrenCount || 0,
          room_type: selectedRoom.id,
          room_scenic: selectedLandscape.id,
          price: pricePreview.totalPrice,
          coupon_code: couponCode[0].code,
          card_name: payload.name,
          card_number: payload.number,
          card_date_month: payload.month,
          card_date_year: payload.year,
          card_cvv: payload.cvv,
        })
        .then(({ data }) => {
          commit("setCurrentStep", 4);
          return data;
        });
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
    },
    setPricePreview(_, payload) {
      localStorage.setItem("pricePreview", JSON.stringify(payload));
    },
    resetAll() {
      localStorage.clear();
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
      return JSON.parse(localStorage.getItem("hotelAndDateSelection")) || null;
    },
    getSelectedHotelDetails() {
      const selectedHotelId = JSON.parse(
        localStorage.getItem("hotelAndDateSelection")
      )?.selectedHotelId;
      if (!selectedHotelId) {
        return null;
      }
      const hotelsDetail = JSON.parse(localStorage.getItem("hotelsDetail"));
      return hotelsDetail.find((detail) => detail.id === selectedHotelId) || null
    },
    getSelectedRoomData() {
      return JSON.parse(localStorage.getItem("selectedRoom"));
    },
    getSelectedLandscapeData() {
      return JSON.parse(localStorage.getItem("selectedLandscape"));
    },
    getAppliedCouponCode() {
      return JSON.parse(localStorage.getItem("couponCode"));
    },
    getPricePreview() {
      return JSON.parse(localStorage.getItem("pricePreview"));
    },
  },
});
