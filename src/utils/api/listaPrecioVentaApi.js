import api from "../axiosConfig";

// Obtener listas de precios de venta con filtro de fechas y paginación
export const getListasPrecioVentaFiltrado = async (params) => {
  const res = await api.get("/listas-precio-venta", { params });
  return res.data.content || [];
};

// Obtener una lista de precio de venta por ID
export const getListaPrecioVentaPorId = async (id) => {
  const res = await api.get(`/listas-precio/${id}`);
  return res.data;
};

// Crear una lista nueva de precios de venta
export const createListaPrecioVenta = async (data) => {
  const res = await api.post("/listas-precio-venta", data);
  return res.data;
};

// Actualizar una lista de precios de venta existente
export const updateListaPrecioVenta = async (id, data) => {
  const res = await api.put(`/listas-precio-venta/${id}`, data);
  return res.data;
};

// Eliminar una lista de precios de venta
export const deleteListaPrecioVenta = async (id) => {
  await api.delete(`/listas-precio-venta/${id}`);
};