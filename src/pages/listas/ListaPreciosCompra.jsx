import { useEffect, useState } from "react";
import { getListasPrecioFiltrado, getListasPrecioPorTipo } from "../../utils/api/listaPrecioApi";
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
    desde: null,
    hasta: null
  });
  const [appliedFilters, setAppliedFilters] = useState(null);

  const cargarListas = async () => {
    let data;

    if (appliedFilters) {
      const params = { tipo: "COMPRA", ...appliedFilters };

      if (params.desde) params.desde = params.desde.toISOString().split("T")[0];
      if (params.hasta) params.hasta = params.hasta.toISOString().split("T")[0];
      if (!params.proveedorId) delete params.proveedorId;

      data = await getListasPrecioFiltrado(params);
    } else {
      data = await getListasPrecioPorTipo("COMPRA");
    }

    setListas(data);
  };

  const cargarProveedores = async () => {
    const data = await getProveedores();
    setProveedores(data);
  };

  useEffect(() => {
    cargarProveedores();
    cargarListas();
  }, []);

  useEffect(() => {
    if (appliedFilters) cargarListas();
  }, [appliedFilters]);

  const aplicarFiltro = () => {
    if (!filters.desde || !filters.hasta || !filters.proveedorId) {
      alert("Debes completar los tres campos para aplicar el filtro.");
      return;
    }
    setAppliedFilters(filters);
  };

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
          desde: { label: "Desde", type: "date" },
          hasta: { label: "Hasta", type: "date" }
        }}
        values={filters}
        onChange={setFilters}
      />

      <div className="text-end">
        <button className="btn btn-outline-primary" onClick={aplicarFiltro}>
          <i className="bi bi-funnel"></i> Aplicar Filtro
        </button>
      </div>

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
