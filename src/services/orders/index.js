import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(async (config) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNjk2ODc4MTQ3LCJleHAiOjE2OTk0NzAxNDd9.evbc5ooAv_yItjzDsgLKm0tc9U7rh_OUUQnGc_LnNYk";
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
