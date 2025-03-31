import { useEffect, useState } from "react";
import { getAutomotores, deleteAutomotor } from "../../utils/api/automotorApi";
import AutomotorForm from "../../components/automotores/AutomotorForm";
import AutomotorTable from "../../components/automotores/AutomotorTable";
import FiltroPanel from "../../components/shared/FiltroPanel";

const Automotores = () => {
  const [automotores, setAutomotores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({
    patente: "",
    marca: "",
    modelo: "",
    activo: "",
    fechaDesde: null,
    fechaHasta: null
  });

  const cargarAutomotores = async () => {
    try {
      const params = { ...filters };

      if (params.activo === "true") params.activo = true;
      if (params.activo === "false") params.activo = false;

      if (params.fechaDesde)
        params.fechaDesde = params.fechaDesde.toISOString().split("T")[0];
      if (params.fechaHasta)
        params.fechaHasta = params.fechaHasta.toISOString().split("T")[0];

      Object.keys(params).forEach((key) => {
        if (params[key] === "" || params[key] === null) {
          delete params[key];
        }
      });

      params.page = 0;
      params.size = 50;

      const data = await getAutomotores(params);
      setAutomotores(data.content || data);
    } catch (error) {
      console.error("Error al cargar automotores:", error);
      setAutomotores([]);
    }
  };

  useEffect(() => {
    cargarAutomotores();
  }, [filters]);

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelected(null);
    cargarAutomotores();
  };

  const handleEdit = (auto) => {
    setSelected(auto);
    setShowForm(true);
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Automotores</h4>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <i className="bi bi-plus-circle"></i> Nuevo Automotor
        </button>
      </div>

      <FiltroPanel
        fields={{
          patente: "Por Patente",
          marca: "Por Marca",
          modelo: "Por Modelo",
          activo: { label: "Estado", type: "select", options: ["", "true", "false"] },
          fechaDesde: { label: "Fecha Desde", type: "date" },
          fechaHasta: { label: "Fecha Hasta", type: "date" }
        }}
        values={filters}
        onChange={setFilters}
      />

      <AutomotorTable
        data={automotores}
        onEdit={handleEdit}
        onDelete={async (id) => {
          if (window.confirm("¿Eliminar automotor?")) {
            await deleteAutomotor(id);
            cargarAutomotores();
          }
        }}
      />

      {showForm && (
        <AutomotorForm
          automotor={selected}
          onClose={() => {
            setShowForm(false);
            setSelected(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default Automotores;