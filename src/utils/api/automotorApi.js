import api from "../axiosConfig";

export const getAutomotores = async (params) => {
  const res = await api.get("/automotores", { params });
  return res.data;
};

export const createAutomotor = async (data) => {
  const res = await api.post("/automotores", data);
  return res.data;
};

export const updateAutomotor = async (id, data) => {
  const res = await api.put(`/automotores/${id}`, data);
  return res.data;
};

export const deleteAutomotor = async (id) => {
  await api.delete(`/automotores/${id}`);
};