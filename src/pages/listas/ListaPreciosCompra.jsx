import { useEffect, useState } from "react";
import { getListasPrecio } from "../../utils/api/listaPrecioApi";
import { getProveedores } from "../../utils/api/proveedorApi";
import ListaPrecioForm from "../../components/listas/ListaPrecioForm";
import ListaPrecioTable from "../../components/listas/ListaPrecioTable";
import FiltroPanel from "../../components/shared/FiltroPanel";

const ListaPreciosCompra = () => {
  const [listas, setListas] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    proveedorId: "",
    fechaDesde: null,
    fechaHasta: null
  });

  const cargarListas = async () => {
    const params = { tipo: "COMPRA" };
    if (filters.fechaDesde) params.fechaDesde = filters.fechaDesde.toISOString().split("T")[0];
    if (filters.fechaHasta) params.fechaHasta = filters.fechaHasta.toISOString().split("T")[0];
    if (filters.proveedorId) params.proveedorId = filters.proveedorId;
    const data = await getListasPrecio(params);
    setListas(data);
  };

  const cargarProveedores = async () => {
    const data = await getProveedores();
    setProveedores(data);
  };

  useEffect(() => {
    cargarListas();
  }, [filters]);

  useEffect(() => {
    cargarProveedores();
  }, []);

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>Listas de Precios de Compra</h4>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <i className="bi bi-plus-circle"></i> Nueva Lista
        </button>
      </div>

      <FiltroPanel
        fields={{
          proveedorId: {
            label: "Proveedor",
            type: "select",
            options: [{ value: "", label: "Todos" }, ...proveedores.map(p => ({ value: p.id, label: p.razonSocial }))]
          },
          fechaDesde: { label: "Fecha Desde", type: "date" },
          fechaHasta: { label: "Fecha Hasta", type: "date" }
        }}
        values={filters}
        onChange={setFilters}
      />

      <ListaPrecioTable data={listas} />

      {showForm && (
        <ListaPrecioForm
          tipo="COMPRA"
          proveedores={proveedores}
          onClose={() => setShowForm(false)}
          onSuccess={cargarListas}
        />
      )}
    </div>
  );
};

export default ListaPreciosCompra;