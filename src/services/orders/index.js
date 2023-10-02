import axios from "axios";
const api = axios.create({
  baseURL: "https://api.eplataforma.com.br",
});

api.interceptors.request.use(async (config) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNjk1MzE3MzQ0LCJleHAiOjE2OTc5MDkzNDR9.Q0JRL5ZsueQ3tz0wW66ml78p1GQcwaKaX2GGYgsjMyU";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const getAllOrders = async () => {
  try {
    const response = await api.get("/order");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
