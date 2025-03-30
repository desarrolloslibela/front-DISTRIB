import api from "../axiosConfig";

export const getProveedores = async (params) => {
  const res = await api.get("/proveedores", { params });
  return res.data;
};

export const createProveedor = async (data) => {
  const res = await api.post("/proveedores", data);
  return res.data;
};

export const updateProveedor = async (id, data) => {
  const res = await api.put(`/proveedores/${id}`, data);
  return res.data;
};

export const deleteProveedor = async (id) => {
  await api.delete(`/proveedores/${id}`);
};