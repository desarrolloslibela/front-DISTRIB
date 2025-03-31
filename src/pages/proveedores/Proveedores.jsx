import { useEffect, useState } from "react";
import { getProveedores, deleteProveedor } from "../../utils/api/proveedorApi";
import ProveedorForm from "../../components/proveedores/ProveedorForm";
import ProveedorTable from "../../components/proveedores/ProveedorTable";
import FiltroPanel from "../../components/shared/FiltroPanel";

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    razonSocial: "",
    cuit: "",
    direccion: "",
    email: "",
    telefono: "",
    activo: "",
    fechaDesde: null,
    fechaHasta: null,
  });

  const cargarProveedores = async () => {
    const params = { ...filters };
    if (filters.fechaDesde) {
      params.fechaDesde = filters.fechaDesde.toISOString().split("T")[0];
    }
    if (filters.fechaHasta) {
      params.fechaHasta = filters.fechaHasta.toISOString().split("T")[0];
    }
    const data = await getProveedores(params);
    setProveedores(data);
  };

  useEffect(() => {
    cargarProveedores();
  }, [filters]);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este proveedor?")) {
      await deleteProveedor(id);
      cargarProveedores();
    }
  };

  const handleEdit = (proveedor) => {
    setSelected(proveedor);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelected(null);
    cargarProveedores();
  };

  const fieldConfig = {
    razonSocial: "Por Razón Social",
    cuit: "Por CUIT",
    direccion: "Por Dirección",
    email: "Por Email",
    telefono: "Por Teléfono",
    activo: { label: "Estado", type: "select", options: ["", "true", "false"] },
    fechaDesde: { label: "Fecha desde", type: "date" },
    fechaHasta: { label: "Fecha hasta", type: "date" },
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Proveedores</h4>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <i className="bi bi-plus-circle"></i> Nuevo Proveedor
        </button>
      </div>

      <FiltroPanel fields={fieldConfig} values={filters} onChange={setFilters} />

      <ProveedorTable
        data={proveedores}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <ProveedorForm
          proveedor={selected}
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

export default Proveedores;
