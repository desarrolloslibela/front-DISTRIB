import { useEffect, useState } from "react";
import { getProductos, deleteProducto } from "../../utils/api/productoApi";
import { getAllTiposProducto } from "../../utils/api/tipoProductoApi";
import ProductoForm from "../../components/productos/ProductoForm";
import ProductoTable from "../../components/productos/ProductoTable";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [tiposProducto, setTiposProducto] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [tipoProductoId, setTipoProductoId] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [activo, setActivo] = useState("");

  const cargarProductos = async () => {
    const params = {};
    if (nombre.trim()) params.nombre = nombre;
    if (tipoProductoId) params.tipoProductoId = parseInt(tipoProductoId);
    if (capacidad && !isNaN(capacidad)) params.capacidad = parseFloat(capacidad);
    if (activo !== "") params.activo = activo === "true";

    const data = await getProductos(params);
    setProductos(data.content);
  };

  const cargarTipos = async () => {
    const data = await getAllTiposProducto();
    setTiposProducto(data);
  };

  useEffect(() => {
    cargarTipos();
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [nombre, tipoProductoId, capacidad, activo]);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este producto?")) {
      await deleteProducto(id);
      cargarProductos();
    }
  };

  const handleEdit = (prod) => {
    setSelected(prod);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelected(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    cargarProductos();
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Productos</h4>
        <button className="btn btn-primary" onClick={handleCreate}>
          <i className="bi bi-plus-circle"></i> Nuevo Producto
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-md-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Filtrar por capacidad..."
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={tipoProductoId}
            onChange={(e) => setTipoProductoId(e.target.value)}
          >
            <option value="">Todos los tipos</option>
            {tiposProducto.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={activo}
            onChange={(e) => setActivo(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </div>
      </div>

      <ProductoTable data={productos} onEdit={handleEdit} onDelete={handleDelete} />
      {showForm && (
        <ProductoForm
          producto={selected}
          tiposProducto={tiposProducto}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default Productos;