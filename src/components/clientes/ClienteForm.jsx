import { useEffect, useState } from "react";
import { createCliente, updateCliente } from "../../utils/api/clientApi";
import MapaSelector from "./MapaSelector";

const ClienteForm = ({ cliente, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    razonSocial: "",
    cuit: "",
    email: "",
    telefono: "",
    direccion: "",
    activo: true,
    latitud: -24.782932,
    longitud: -65.423197,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (cliente) {
      setForm({ ...cliente });
    }
  }, [cliente]);

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
      if (cliente) {
        await updateCliente(cliente.id, form);
      } else {
        await createCliente(form);
      }
      onSuccess();
    } catch (err) {
      if (err.response?.data?.message?.includes("CUIT")) {
        setError("Ya existe un cliente con ese CUIT.");
      } else {
        setError("Error al guardar el cliente.");
      }
    }
  };

  const fieldLabels = {
    razonSocial: "Razón Social",
    cuit: "CUIT",
    email: "Email",
    telefono: "Teléfono",
    direccion: "Dirección",
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{cliente ? "Editar" : "Nuevo"} Cliente</h5>
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

            <div className="mb-3">
              <label className="form-label">Ubicación en el mapa</label>
              <MapaSelector
                latitud={form.latitud}
                longitud={form.longitud}
                onSelectUbicacion={(ubicacion) => {
                  setForm({
                    ...form,
                    latitud: ubicacion.lat,
                    longitud: ubicacion.lng,
                  });
                }}
              />
            </div>

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

export default ClienteForm;