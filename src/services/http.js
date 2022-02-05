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
    // helpers.showError({
    //   message: error.response
    //     ? error.response.data?.message
    //     : "Error: ERR_CONNECTION_REFUSED	",
    //   responseStatus: error.response?.status,
    // });
    return Promise.reject(error);
  }
);

export default instance;
