<template>
  <div class="header">
    <div class="center">
      <a-card>
        <CarryOutOutlined class="icon" />
        <div class="mt-20">
          <p>Rezervasyon kaydınız alınmıştır.</p>
          <p>
            Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda
            değişiklik veya yeni rezervasyon yapmak için aşağıdaki linkleri
            kullanabilirsiniz.
          </p>
          <div>
            <a-button type="primary" class="mr-20" @click="newReservation"
              >Yeni Rezervasyon Yap</a-button
            >
            <a-button type="primary" class="mr-20" @click="editReservation"
              >Rezervasyonu Güncelle</a-button
            >
            <a-button type="primary" @click="showDeleteConfirm"
              >Rezervasyonu İptal Et</a-button
            >
          </div>
        </div>
      </a-card>
    </div>
    <a-card class="main-bg" v-if="!deleted">
      <HotelDetailsPreview />
      <PricePreview />
    </a-card>
    <NotFound v-else />
  </div>
</template>

<script>
import HotelDetailsPreview from "@/views/HotelDetailsPreview";
import PricePreview from "@/views/PricePreview";
import { CarryOutOutlined } from "@ant-design/icons-vue";
import newReservationMixin from "@/mixins/newReservation";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { message, Modal } from "ant-design-vue";
import NotFound from "@/pages/NotFound";

export default {
  name: "BookingRegistration",
  mixins: [newReservationMixin],
  components: {
    HotelDetailsPreview,
    PricePreview,
    CarryOutOutlined,
    NotFound,
  },
  data() {
    return {
      deleted: false,
    };
  },
  computed: {
    ...mapGetters(["getReservationId"]),
  },
  methods: {
    ...mapActions(["removeReservation"]),
    ...mapMutations(["updateReservation"]),
    editReservation() {
      // It will be edit
      if (!this.getReservationId) {
        message.error("Düzenlenecek rezervasyon bulunamadı!");
        return;
      }
      this.updateReservation(true);
      this.$router.push({ name: "HotelAndDateSelection" });
    },
    showDeleteConfirm() {
      if (!this.getReservationId) {
        message.error("İptal edilecek rezervasyon bulunamadı!");
        return;
      }
      Modal.confirm({
        title: () =>
          "Rezervasyon kaydınızı iptal etmek istediğinize emin misiniz?",
        okText: () => "Evet",
        okType: "danger",
        cancelText: () => "Hayır",
        onOk: () =>
          this.removeReservation().then(() => {
            this.deleted = true;
            message.success("Silme işlemi başarıyla gerçekleşti!");
          }),
      });
    },
  },
};
</script>
