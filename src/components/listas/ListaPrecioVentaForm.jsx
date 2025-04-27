import { useState, useEffect } from "react";

const ListaPrecioVentaForm = ({ lista, onSave, onClose }) => {
  const [form, setForm] = useState({
    fechaDesde: "",
    fechaHasta: "",
    observaciones: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (lista) {
      setForm({
        fechaDesde: lista.fechaDesde || "",
        fechaHasta: lista.fechaHasta || "",
        observaciones: lista.observaciones || ""
      });
    }
  }, [lista]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fechaDesde) return setError("La fecha desde es obligatoria.");
    if (!form.fechaHasta) return setError("La fecha hasta es obligatoria.");
    await onSave(form);
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {lista ? "Editar Lista de Precio (Venta)" : "Nueva Lista de Precio (Venta)"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label className="form-label">Fecha Desde</label>
              <input
                type="date"
                name="fechaDesde"
                className="form-control"
                value={form.fechaDesde}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha Hasta</label>
              <input
                type="date"
                name="fechaHasta"
                className="form-control"
                value={form.fechaHasta}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Observaciones</label>
              <textarea
                name="observaciones"
                className="form-control"
                value={form.observaciones}
                onChange={handleChange}
              ></textarea>
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

export default ListaPrecioVentaForm;