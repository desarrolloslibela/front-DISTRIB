import api from "../axiosConfig";

export const getMovimientosCliente = async (clienteId) => {
  const response = await api.get(`/clientes/${clienteId}/movimientos`);
  return response.data;
};

export const createMovimientoCliente = async (clienteId, data) => {
  const response = await api.post(`/clientes/${clienteId}/movimientos`, data);
  return response.data;
};

export const updateMovimientoCliente = async (clienteId, movimientoId, data) => {
  const response = await api.put(`/clientes/${clienteId}/movimientos/${movimientoId}`, data);
  return response.data;
};

export const deleteMovimientoCliente = async (clienteId, movimientoId) => {
  const response = await api.delete(`/clientes/${clienteId}/movimientos/${movimientoId}`);
  return response.data;
};