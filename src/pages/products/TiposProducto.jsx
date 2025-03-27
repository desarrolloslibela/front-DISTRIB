import { useEffect, useState } from "react";
import { getAllTiposProducto, deleteTipoProducto } from "../../utils/api/tipoProductoApi";
import TipoProductoForm from "../../components/productos/TipoProductoForm";
import TipoProductoTable from "../../components/productos/TipoProductoTable";

const TiposProducto = () => {
  const [tipos, setTipos] = useState([]);
  const [filteredTipos, setFilteredTipos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const cargarTipos = async () => {
    try {
      const data = await getAllTiposProducto();
      setTipos(data);
      setFilteredTipos(data);
    } catch (error) {
      alert("Error al cargar los tipos de producto");
    }
  };

  useEffect(() => {
    cargarTipos();
  }, []);

  useEffect(() => {
    const filtrados = tipos.filter((t) =>
      t.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTipos(filtrados);
  }, [searchTerm, tipos]);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar este tipo de producto?")) {
      await deleteTipoProducto(id);
      cargarTipos();
    }
  };

  const handleEdit = (tipo) => {
    setSelected(tipo);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelected(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    cargarTipos();
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Tipos de Producto</h4>
        <button className="btn btn-primary" onClick={handleCreate}>
          <i className="bi bi-plus-circle"></i> Nuevo Tipo
        </button>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <TipoProductoTable data={filteredTipos} onEdit={handleEdit} onDelete={handleDelete} />
      {showForm && (
        <TipoProductoForm
          tipo={selected}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default TiposProducto;