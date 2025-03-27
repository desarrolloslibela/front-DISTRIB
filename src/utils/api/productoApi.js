import api from "../axiosConfig";

export const getProductos = async (params) => {
  const res = await api.get("/productos", { params });
  return res.data;
};

export const createProducto = async (data) => {
  const res = await api.post("/productos", data);
  return res.data;
};

export const updateProducto = async (id, data) => {
  const res = await api.put(`/productos/${id}`, data);
  return res.data;
};

export const deleteProducto = async (id) => {
  await api.delete(`/productos/${id}`);
};