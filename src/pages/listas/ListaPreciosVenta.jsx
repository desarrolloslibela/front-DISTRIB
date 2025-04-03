import { useEffect, useState } from "react";
import { getListasPrecioFiltrado } from "../../utils/api/listaPrecioApi";
import ListaPrecioForm from "../../components/listas/ListaPrecioForm";
import ListaPrecioTable from "../../components/listas/ListaPrecioTable";
import FiltroPanel from "../../components/shared/FiltroPanel";

const ListaPreciosVenta = () => {
  const [listas, setListas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    desde: null,
    hasta: null
  });

  const cargarListas = async () => {
    if (!filters.desde || !filters.hasta) return;

    const params = {
      tipo: "VENTA",
      desde: filters.desde.toISOString().split("T")[0],
      hasta: filters.hasta.toISOString().split("T")[0]
    };

    const data = await getListasPrecioFiltrado(params);
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
          desde: { label: "Desde", type: "date" },
          hasta: { label: "Hasta", type: "date" }
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
