import { useState, useEffect } from "react";
import { createProducto, updateProducto } from "../../utils/api/productoApi";

const ProductoForm = ({ producto, tiposProducto, onClose, onSuccess }) => {
  const [nombre, setNombre] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [tipoProductoId, setTipoProductoId] = useState("");
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setCapacidad(producto.capacidad);
      setTipoProductoId(producto.tipoProductoId);
      setActivo(producto.activo ?? true);
    }
  }, [producto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nombre,
      capacidad: parseFloat(capacidad),
      tipoProductoId: parseInt(tipoProductoId),
      activo: !!activo,
    };
    if (producto) {
      await updateProducto(producto.id, data);
    } else {
      await createProducto(data);
    }
    onSuccess();
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {producto ? "Editar Producto" : "Nuevo Producto"}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Capacidad</label>
                <input
                  type="number"
                  className="form-control"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tipo de Producto</label>
                <select
                  className="form-select"
                  value={tipoProductoId}
                  onChange={(e) => setTipoProductoId(e.target.value)}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  {tiposProducto.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                  id="activoSwitch"
                />
                <label className="form-check-label" htmlFor="activoSwitch">
                  Activo
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">Guardar</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductoForm;