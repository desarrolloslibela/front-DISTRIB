import api from "../axiosConfig";

// Obtener todos los ítems de una lista de precios de venta
export const getItemsPorListaVenta = async (listaId) => {
  const res = await api.get(`/precios-venta/lista/${listaId}`);
  return res.data;
};

// Crear un nuevo ítem en la lista (con precioFinal y alicuotaIVA)
export const crearItemListaVenta = async (data) => {
  const res = await api.post("/precios-venta", data);
  return res.data;
};

// (Opcional) Actualizar ítem existente (si implementás edición individual en el backend)
export const actualizarItemListaVenta = async (id, data) => {
  const res = await api.put(`/precios-venta/${id}`, data);
  return res.data;
};

// Eliminar ítem de lista de precios de venta
export const eliminarItemListaVenta = async (id) => {
  await api.delete(`/precios-venta/${id}`);
};
