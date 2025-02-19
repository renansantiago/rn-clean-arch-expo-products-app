import axios from "axios";

const API_URL = "https://dummyjson.com/products";

export const api = axios.create({
  baseURL: API_URL,
});
