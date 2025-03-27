import { useState, useEffect } from "react";
import {
  createTipoProducto,
  updateTipoProducto,
} from "../../utils/api/tipoProductoApi";

const TipoProductoForm = ({ tipo, onClose, onSuccess }) => {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (tipo) setNombre(tipo.nombre);
  }, [tipo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    try {
      if (tipo) {
        await updateTipoProducto(tipo.id, { nombre });
      } else {
        await createTipoProducto({ nombre });
      }
      onSuccess();
    } catch (err) {
      alert("Error al guardar el tipo de producto.");
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {tipo ? "Editar Tipo de Producto" : "Nuevo Tipo de Producto"}
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

export default TipoProductoForm;