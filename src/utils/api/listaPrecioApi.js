import api from "../axiosConfig";

export const getListasPrecio = async (params) => {
  const res = await api.get("/listas-precio", { params });
  return res.data;
};

export const createListaPrecio = async (data) => {
  const res = await api.post("/listas-precio", data);
  return res.data;
};