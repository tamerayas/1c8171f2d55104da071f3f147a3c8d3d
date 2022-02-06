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
          <a-col :span="24" :gutter="[12, 12]">
            <a-button type="primary">Yeni Rezervasyon Yap</a-button>
            <a-button type="primary">Rezervasyonu Güncelle</a-button>
            <a-button type="primary">Rezervasyonu İptal Et</a-button>
          </a-col>
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

export default {
  name: "BookingRegistration",
  components: {
    HotelDetailsPreview,
    PricePreview,
    CarryOutOutlined,
  },
};
</script>
