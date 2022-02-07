<template>
  <div class="header">
    <div style="text-align: center">
      <a-card>
        <CarryOutOutlined
          style="font-size: 50px; color: #009e0f; display: block"
        />
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
    <a-card class="main-bg">
      <HotelDetailsPreview />
      <PricePreview />
    </a-card>
  </div>
</template>

<script>
import HotelDetailsPreview from "@/views/HotelDetailsPreview";
import PricePreview from "@/views/PricePreview";
import { CarryOutOutlined } from "@ant-design/icons-vue";
import newReservationMixin from "@/mixins/newReservation";
import { mapActions, mapMutations } from "vuex";
import { message, Modal } from "ant-design-vue";

export default {
  name: "BookingRegistration",
  mixins: [newReservationMixin],
  components: {
    HotelDetailsPreview,
    PricePreview,
    CarryOutOutlined,
  },
  methods: {
    ...mapActions(["removeReservation"]),
    ...mapMutations(["updateReservation"]),
    editReservation() {
      // It will be edit
      this.updateReservation(true);
      this.$router.push({ name: "HotelAndDateSelection" });
    },
    showDeleteConfirm() {
      Modal.confirm({
        title: () =>
          "Rezervasyon kaydınızı iptal etmek istediğinize emin misiniz?",
        okText: () => "Evet",
        okType: "danger",
        cancelText: () => "Hayır",
        onOk: () =>
          this.removeReservation().then(() => {
            message.success("Silme işlemi başarıyla gerçekleşti!");
          }),
      });
    },
  },
};
</script>
