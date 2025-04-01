import { useState } from "react";
import { createListaPrecio } from "../../utils/api/listaPrecioApi";

const ListaPrecioForm = ({ tipo, proveedores = [], onClose, onSuccess }) => {
  const [form, setForm] = useState({
    tipo,
    proveedorId: "",
    fechaDesde: "",
    fechaHasta: "",
    observaciones: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fechaDesde) {
      return setError("La fecha desde es obligatoria.");
    }

    if (tipo === "COMPRA" && !form.proveedorId) {
      return setError("Debe seleccionar un proveedor.");
    }

    const payload = {
      ...form,
      proveedorId: tipo === "COMPRA" ? form.proveedorId : null
    };

    try {
      await createListaPrecio(payload);
      onSuccess();
    } catch (err) {
      setError("Error al guardar la lista.");
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-scrollable">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nueva Lista de Precio ({tipo})</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {tipo === "COMPRA" && (
              <div className="mb-3">
                <label className="form-label">Proveedor</label>
                <select className="form-select" name="proveedorId" onChange={handleChange} required>
                  <option value="">Seleccione</option>
                  {proveedores.map((p) => (
                    <option key={p.id} value={p.id}>{p.razonSocial}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Fecha Desde</label>
              <input type="date" name="fechaDesde" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha Hasta</label>
              <input type="date" name="fechaHasta" className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Observaciones</label>
              <textarea name="observaciones" className="form-control" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" type="submit">Guardar</button>
            <button className="btn btn-secondary" type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListaPrecioForm;