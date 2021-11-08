import axios from "axios";

const baseURL = "https://postgress-app-test.herokuapp.com";

export const mainApi = axios.create({
  baseURL,
});
