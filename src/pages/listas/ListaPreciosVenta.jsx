import { useEffect, useState } from "react";
import { getListasPrecio } from "../../utils/api/listaPrecioApi";
import ListaPrecioForm from "../../components/listas/ListaPrecioForm";
import ListaPrecioTable from "../../components/listas/ListaPrecioTable";
import FiltroPanel from "../../components/shared/FiltroPanel";

const ListaPreciosVenta = () => {
  const [listas, setListas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    fechaDesde: null,
    fechaHasta: null
  });

  const cargarListas = async () => {
    const params = { tipo: "VENTA" };
    if (filters.fechaDesde) params.fechaDesde = filters.fechaDesde.toISOString().split("T")[0];
    if (filters.fechaHasta) params.fechaHasta = filters.fechaHasta.toISOString().split("T")[0];
    const data = await getListasPrecio(params);
    setListas(data);
  };

  useEffect(() => {
    cargarListas();
  }, [filters]);

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>Listas de Precios de Venta</h4>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <i className="bi bi-plus-circle"></i> Nueva Lista
        </button>
      </div>

      <FiltroPanel
        fields={{
          fechaDesde: { label: "Fecha Desde", type: "date" },
          fechaHasta: { label: "Fecha Hasta", type: "date" }
        }}
        values={filters}
        onChange={setFilters}
      />

      <ListaPrecioTable data={listas} />

      {showForm && (
        <ListaPrecioForm
          tipo="VENTA"
          onClose={() => setShowForm(false)}
          onSuccess={cargarListas}
        />
      )}
    </div>
  );
};

export default ListaPreciosVenta;