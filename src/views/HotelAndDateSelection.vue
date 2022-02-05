<template>
  <Main>
    <a-card class="reservation-detail-card">
      <a-select
        placeholder="Rezervasyon yapmak istediğiniz oteli seçiniz."
        class="hotel-selection"
        v-model:value="data.selectedHotel.hotel_name"
      >
        <a-select-option
          v-for="(hotel, index) in hotelsDetail.hotels"
          :key="index"
          @click="data.selectedHotel = hotel"
          >{{ hotel.hotel_name }}</a-select-option
        >
      </a-select>
      <a-row type="flex">
        <a-col :span="6">
          <a-card :span="6">
            <p>Giriş Tarihi</p>
            <a-row type="flex">
              <a-col :span="20">
                <a-date-picker
                  v-model:value="data.entryDate"
                  format="DD.MM.YYYY"
                  style="width: 100%"
                />
              </a-col>
              <a-col :span="4">
                <CalendarOutlined style="font-size: 30px" />
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :span="6">
            <p>Çıkış Tarihi</p>
            <a-row type="flex">
              <a-col :span="20">
                <a-date-picker
                  v-model:value="data.outDate"
                  format="DD.MM.YYYY"
                  style="width: 100%"
                />
              </a-col>
              <a-col :span="4">
                <CalendarOutlined style="font-size: 30px" />
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :span="6">
            <p>Yetişkin Sayısı</p>
            <a-input-number
              v-model:value="data.adultCount"
              :min="0"
              :max="maxAdultSize"
              style="width: 100%"
            />
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :span="6">
            <p>Çocuk Sayısı</p>
            <a-input-number
              v-model:value="data.childrenCount"
              :min="0"
              :max="5"
              style="width: 100%"
              :disabled="!childStatus"
            />
            <div v-if="!childStatus">Çocuk ziyaretçi kabul edilmiyor!</div>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <Footer @save="save" />
  </Main>
</template>

<script>
import { CalendarOutlined } from "@ant-design/icons-vue";
import { mapActions, mapGetters } from "vuex";
import Main from "@/views/Main";
import Footer from "@/components/Footer";

export default {
  name: "HotelAndDateSelection",
  components: {
    CalendarOutlined,
    Main,
    Footer,
  },
  data() {
    return {
      data: {
        selectedHotel: null,
        entryDate: null,
        outDate: null,
        adultCount: null,
        childrenCount: null,
      },
    };
  },
  computed: {
    ...mapGetters(["hotelsDetail", "getSelectedHotelAndDateData"]),
    maxAdultSize: {
      get() {
        if (!this.data.selectedHotel?.id) {
          return 5;
        }
        const selectedHotelDetail = this.getSelectedHotelDetail();
        return selectedHotelDetail?.max_adult_size;
      },
    },
    childStatus: {
      get() {
        if (!this.data.selectedHotel?.id) {
          return true;
        }
        const selectedHotelDetail = this.getSelectedHotelDetail();
        return selectedHotelDetail.child_status;
      },
    },
  },
  methods: {
    ...mapActions(["fetchHotels", "saveHotelAndDateSelection"]),
    getSelectedHotelDetail() {
      return (
        this.hotelsDetail.details.find(
          (hotel) => hotel.id === this.data.selectedHotel.id
        ) || {}
      );
    },
    save() {
      const isValid =
        typeof this.data.selectedHotel &&
        this.data.entryDate &&
        this.data.outDate &&
        this.data.adultCount !== null;

      if (isValid) {
        return this.saveHotelAndDateSelection(this.data).then(() => {
          this.$router.push({ name: "RoomTypeAndLandscapeSelection" });
        });
      }

      return this.$message.error("Lütfen tüm zorunlu alanları doldurunuz.");
    },
  },
  created() {
    this.fetchHotels();
    Object.assign(this.data, this.getSelectedHotelAndDateData);
  },
};
</script>
