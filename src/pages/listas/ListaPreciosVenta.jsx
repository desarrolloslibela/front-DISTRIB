import { useEffect, useState } from "react";
import {
  getListasPrecioVentaFiltrado,
  createListaPrecioVenta,
  updateListaPrecioVenta,
  deleteListaPrecioVenta
} from "../../utils/api/listaPrecioVentaApi";

import ListaPrecioVentaForm from "../../components/listas/ListaPrecioVentaForm";
import ListaPrecioVentaTable from "../../components/listas/ListaPrecioVentaTable";
import FiltroPanel from "../../components/shared/FiltroPanel";
import { useNavigate } from "react-router-dom";

const ListaPreciosVenta = () => {
  const [listas, setListas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [filters, setFilters] = useState({
    desde: null,
    hasta: null,
  });

  const navigate = useNavigate();

  const cargarListas = async () => {
    if (!filters.desde || !filters.hasta) return;

    const params = {
      desde: filters.desde.toISOString().split("T")[0],
      hasta: filters.hasta.toISOString().split("T")[0],
    };

    const data = await getListasPrecioVentaFiltrado(params);
    setListas(data);
  };

  useEffect(() => {
    cargarListas();
  }, [filters]);

  const handleGuardar = async (data) => {
    try {
      if (editItem) {
        await updateListaPrecioVenta(editItem.id, data);
      } else {
        await createListaPrecioVenta(data);
      }
      setShowForm(false);
      setEditItem(null);
      cargarListas();
    } catch (e) {
      alert(e?.response?.data?.message || "Error al guardar");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta lista?")) return;
    try {
      await deleteListaPrecioVenta(id);
      cargarListas();
    } catch (e) {
      alert("Error al eliminar");
    }
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>Listas de Precios de Venta</h4>
        <button className="btn btn-primary" onClick={() => { setEditItem(null); setShowForm(true); }}>
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

      <ListaPrecioVentaTable
        listas={listas}
        onVerDetalle={(id) => navigate(`/prices/sale/${id}/detalle`)}
        onEdit={(lista) => {
          setEditItem(lista);
          setShowForm(true);
        }}
        onDelete={handleEliminar}
      />

      {showForm && (
        <ListaPrecioVentaForm
          lista={editItem}
          onSave={handleGuardar}
          onClose={() => {
            setEditItem(null);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};

export default ListaPreciosVenta;