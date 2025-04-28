import api from "../axiosConfig";

export const getMovimientosCliente = async (clienteId) => {
  const response = await api.get(`/clientes/${clienteId}/movimientos`);
  return response.data;
};

export const createMovimientoCliente = async (clienteId, data) => {
  const response = await api.post(`/clientes/${clienteId}/movimientos`, data);
  return response.data;
};