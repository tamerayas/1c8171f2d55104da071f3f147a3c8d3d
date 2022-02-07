import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["resetAll"]),
    newReservation() {
      this.resetAll();
      this.$router.push({ name: "HotelAndDateSelection" });
    },
  },
};
