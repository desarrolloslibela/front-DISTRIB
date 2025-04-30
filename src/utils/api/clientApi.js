import api from "../axiosConfig";
import API_ROUTES from "../apiRoutes";

export const getClientes = async (params) => {
  const response = await api.get(API_ROUTES.CLIENTS.GET_ALL, { params });
  return response.data;
};

export const createCliente = async (data) => {
  const response = await api.post(API_ROUTES.CLIENTS.CREATE, data);
  return response.data;
};

export const updateCliente = async (id, data) => {
  const response = await api.put(API_ROUTES.CLIENTS.UPDATE(id), data);
  return response.data;
};

export const deleteCliente = async (id) => {
  const response = await api.delete(API_ROUTES.CLIENTS.DELETE(id));
  return response.data;
};

export const getClientePorId = async (id) => {
  const response = await api.get(API_ROUTES.CLIENTS.GET_BY_ID(id));
  return response.data;
};