import api from "../axiosConfig";

// Obtener todas las listas (sin filtros)
export const getListasPrecio = async () => {
  const res = await api.get("/listas-precio");
  return res.data;
};

export const getListasPrecioPorTipo = async (tipo) => {
  const res = await api.get(`/listas-precio/tipo/${tipo}`);
  return res.data;
};


// Obtener una lista por ID
export const getListaPrecioById = async (id) => {
  const res = await api.get(`/listas-precio/${id}`);
  return res.data;
};

// Crear nueva lista
export const createListaPrecio = async (data) => {
  const res = await api.post("/listas-precio", data);
  return res.data;
};

// Editar una lista existente
export const updateListaPrecio = async (id, data) => {
  const res = await api.put(`/listas-precio/${id}`, data);
  return res.data;
};

// Eliminar una lista
export const deleteListaPrecio = async (id) => {
  await api.delete(`/listas-precio/${id}`);
};

// Obtener listas filtradas (COMPRA o VENTA, fechas, proveedor)
export const getListasPrecioFiltrado = async (params) => {
  const res = await api.get("/listas-precio/filtrar", { params });
  return res.data;
};
