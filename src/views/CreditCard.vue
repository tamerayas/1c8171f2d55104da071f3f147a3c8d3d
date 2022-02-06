<template>
  <div style="text-align: center">
    <img src="" alt="" />
    <div class="card__front card__part">
      <p class="card_number">{{ data.number || "**** **** **** 2323" }}</p>
      <div class="card__space-75">
        <span class="card__label">Kart Sahibi</span>
        <p class="card__info">{{ data.name || "TAMER AYAS" }}</p>
      </div>
      <div class="card__space-25">
        <span class="card__label">Tarih</span>
        <p class="card__info">{{ expiryDate }}</p>
      </div>
    </div>
  </div>
  <a-divider orientation="left">Kredi Kartı Bilgileri </a-divider>
  <a-row>
    <label>Kartın Üzerindeki İsim</label>
    <a-input v-model:value="data.name"></a-input>
  </a-row>
  <a-row class="mt-20">
    <label>Kartın Numarası</label>
    <a-input v-model:value="data.number" :maxlength="16"></a-input>
  </a-row>
  <a-row class="mt-20">
    <a-col :span="18">
      <label>Kart Son Kullanma Tarihi</label>
    </a-col>
    <a-col :span="6">
      <label>CVV</label>
    </a-col>
    <a-col :span="18">
      <a-select v-model:value="data.month" style="width: 200px">
        <a-select-option value="" defaultActiveFirstOption>Ay</a-select-option>
        <a-select-option v-for="item in monthOptions" :key="item.value">{{
          item.label
        }}</a-select-option>
      </a-select>
      <a-select v-model:value="data.year" style="width: 200px">
        <a-select-option value="" defaultActiveFirstOption>Yıl</a-select-option>
        <a-select-option v-for="item in yearOptions" :key="item.value">{{
          item.label
        }}</a-select-option>
      </a-select>
    </a-col>
    <a-col :span="6">
      <a-input placeholder="Cvv" v-model:value="data.cvv"></a-input>
    </a-col>
  </a-row>
  <Footer />
</template>

<script>
import { months, years } from "@/data/data";
export default {
  name: "CreditCard",
  emits: ["change"],
  data() {
    return {
      data: {
        month: "",
        year: "",
        name: "",
        number: "",
        cvv: "",
      },
      monthOptions: months,
      yearOptions: years,
    };
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.$emit("change", val);
      },
    },
  },
  computed: {
    expiryDate: {
      get() {
        // eslint-disable-next-line no-useless-escape
        return (
          `${this.data.month || 10}/${this.data.year.slice(-2) || 24}` ||
          "10/24"
        );
      },
    },
  },
};
</script>
<style scoped>
.card__part {
  box-shadow: 1px 1px #aaa3a3;
  top: 0;
  /* position: absolute; */
  z-index: 1000;
  left: 0;
  display: inline-block;
  width: 320px;
  height: 190px;
  background-image: url("https://image.ibb.co/bVnMrc/g3095.png"),
    linear-gradient(
      to right bottom,
      #fd696b,
      #fa616e,
      #f65871,
      #f15075,
      #ec4879
    ); /*linear-gradient(to right bottom, #fd8369, #fc7870, #f96e78, #f56581, #ee5d8a)*/
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 8px;

  -webkit-transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  -moz-transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  -ms-transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  -o-transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
}

.card__front {
  padding: 18px;
  -webkit-transform: rotateY(0);
  -moz-transform: rotateY(0);
}
.card_number {
  display: block;
  width: 100%;
  word-spacing: 4px;
  font-size: 20px;
  letter-spacing: 2px;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.card__space-75 {
  width: 75%;
  float: left;
}

.card__space-25 {
  width: 25%;
  float: left;
}

.card__label {
  font-size: 10px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
}

.card__info {
  margin-bottom: 0;
  margin-top: 5px;
  font-size: 16px;
  line-height: 18px;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* .card:hover .card__front {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
}

.card:hover .card__back {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
} */
</style>
