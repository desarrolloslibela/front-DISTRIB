import { useEffect, useState } from "react";
import { createAutomotor, updateAutomotor } from "../../utils/api/automotorApi";

const AutomotorForm = ({ automotor, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    patente: "",
    marca: "",
    modelo: "",
    activo: true,
    observaciones: ""
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (automotor) setForm({ ...automotor });
  }, [automotor]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (automotor) {
        await updateAutomotor(automotor.id, form);
      } else {
        await createAutomotor(form);
      }
      onSuccess();
    } catch (err) {
      setError("Error al guardar automotor.");
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-scrollable">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{automotor ? "Editar" : "Nuevo"} Automotor</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {["patente", "marca", "modelo", "observaciones"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  className="form-control"
                  name={field}
                  value={form[field] || ""}
                  onChange={handleChange}
                  required={field === "patente"}
                />
              </div>
            ))}
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                name="activo"
                checked={form.activo}
                onChange={handleChange}
                id="activoSwitch"
              />
              <label className="form-check-label" htmlFor="activoSwitch">Activo</label>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-success">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AutomotorForm;