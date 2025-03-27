import api from "../axiosConfig";

export const getAllTiposProducto = async () => {
  const res = await api.get("/tipos-producto");
  return res.data;
};

export const createTipoProducto = async (data) => {
  const res = await api.post("/tipos-producto", data);
  return res.data;
};

export const updateTipoProducto = async (id, data) => {
  const res = await api.put(`/tipos-producto/${id}`, data);
  return res.data;
};

export const deleteTipoProducto = async (id) => {
  await api.delete(`/tipos-producto/${id}`);
};