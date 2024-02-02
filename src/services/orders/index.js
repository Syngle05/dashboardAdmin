import axios from "axios";
const api = axios.create({
  baseURL: "https://api.eplataforma.com.br",
});

api.interceptors.request.use(async (config) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYnJ1bm9tcGVAZ21haWwuY29tIiwibmFtZSI6IkJydW5vIE1pcmFuZGEgUGVyZWlyYSIsImlhdCI6MTcwNjg5MzczMSwiZXhwIjoxNzA5NDg1NzMxfQ.zjN1h-KtrkoiuaJd2bGwHtYl1M9QQFugjBmJ51BZseI";
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
