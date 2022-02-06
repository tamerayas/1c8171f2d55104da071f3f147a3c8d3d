import { message } from "ant-design-vue";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://5f6d939160cf97001641b049.mockapi.io/tkn",
  timeout: 20000,
});
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    message.error(
      error ? error.response.data : "Bilinmeyen Bir Hata İle Karşılaşıldı!"
    );
    return Promise.reject(error);
  }
);

export default instance;
