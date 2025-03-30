import { useEffect, useState } from "react";
import { createProveedor, updateProveedor } from "../../utils/api/proveedorApi";

const ProveedorForm = ({ proveedor, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    razonSocial: "",
    cuit: "",
    email: "",
    telefono: "",
    direccion: "",
    observaciones: "",
    activo: true,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (proveedor) {
      setForm({ ...proveedor });
    }
  }, [proveedor]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (proveedor) {
        await updateProveedor(proveedor.id, form);
      } else {
        await createProveedor(form);
      }
      onSuccess();
    } catch (err) {
      if (err.response?.data?.message?.includes("CUIT")) {
        setError("Ya existe un proveedor con ese CUIT.");
      } else {
        setError("Error al guardar el proveedor.");
      }
    }
  };

  const fieldLabels = {
    razonSocial: "Razón Social",
    cuit: "CUIT",
    email: "Email",
    telefono: "Teléfono",
    direccion: "Dirección",
    observaciones: "Observaciones"
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{proveedor ? "Editar" : "Nuevo"} Proveedor</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {Object.entries(fieldLabels).map(([field, label]) => (
              <div className="mb-3" key={field}>
                <label className="form-label">{label}</label>
                <input
                  type="text"
                  className="form-control"
                  name={field}
                  value={form[field] || ""}
                  onChange={handleChange}
                  required={field === "razonSocial" || field === "cuit"}
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

export default ProveedorForm;