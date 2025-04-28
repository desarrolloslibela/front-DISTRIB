import { useEffect, useState } from "react";
import { getClientes, deleteCliente } from "../../utils/api/clientApi";
import ClienteForm from "../../components/clientes/ClienteForm";
import ClienteTable from "../../components/clientes/ClienteTable";
import FiltroPanel from "../../components/shared/FiltroPanel";
import { useNavigate } from "react-router-dom"; 

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
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

  const cargarClientes = async () => {
    const params = { ...filters };
    if (filters.fechaDesde) {
      params.fechaDesde = filters.fechaDesde.toISOString().split("T")[0];
    }
    if (filters.fechaHasta) {
      params.fechaHasta = filters.fechaHasta.toISOString().split("T")[0];
    }
    const data = await getClientes(params);
    setClientes(data);  
    };

  useEffect(() => {
    cargarClientes();
  }, [filters]);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este cliente?")) {
      await deleteCliente(id);
      cargarClientes();
    }
  };

  const handleEdit = (cliente) => {
    setSelected(cliente);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelected(null);
    cargarClientes();
  };

  const navigate = useNavigate();

  const handleViewMovements = (cliente) => {
    navigate(`/clients/${cliente.id}/movements`);
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
        <h4>Clientes</h4>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <i className="bi bi-plus-circle"></i> Nuevo Cliente
        </button>
      </div>

      <FiltroPanel fields={fieldConfig} values={filters} onChange={setFilters} />

      <ClienteTable
        data={clientes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewMovements={handleViewMovements}
      />

      {showForm && (
        <ClienteForm
          cliente={selected}
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

export default Clientes;