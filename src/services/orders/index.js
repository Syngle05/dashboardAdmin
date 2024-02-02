import axios from "axios";
const api = axios.create({
  baseURL: "https://api.eplataforma.com.br",
});
// tes
api.interceptors.request.use(async (config) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNzA2ODgwMzUwLCJleHAiOjE3MDk0NzIzNTB9.Ia5pE41d3jGwoI8_-S_AnqPooUSFqO8mKtiwPxDPEl4";
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

export const editStatus = async (status, id) => {
  try {
    const response = await api.patch(`/order/${id}`, {
      status,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
