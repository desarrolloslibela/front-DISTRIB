import { useEffect, useState } from "react";
import { getProductos } from "../../utils/api/productoApi";

const ClienteMovementForm = ({ cliente, movimiento, onClose, onSave }) => {
  const [form, setForm] = useState({
    productoId: "",
    tipoMovimiento: "ENTREGA",
    cantidad: 1,
    observacion: ""
  });
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
    if (movimiento) {
      setForm({ ...movimiento, productoId: movimiento.productoId || movimiento.producto?.id });
    }
  }, [movimiento]);

  const cargarProductos = async () => {
    const data = await getProductos();
    setProductos(data.content || []); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {movimiento ? "Editar Movimiento" : "Nuevo Movimiento"}
              {cliente && (
                <div className="mt-1">
                  <small className="text-muted">
                    {cliente.razonSocial} – CUIT {cliente.cuit}
                  </small>
                </div>
              )}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Producto</label>
              <select name="productoId" className="form-select" value={form.productoId} onChange={handleChange} required disabled={!!movimiento}>
                <option value="">Seleccionar producto</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} - {p.capacidad}kg
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Tipo de Movimiento</label>
              <select name="tipoMovimiento" className="form-select" value={form.tipoMovimiento} onChange={handleChange} required>
                <option value="ENTREGA">ENTREGA</option>
                <option value="DEVOLUCION">DEVOLUCION</option>
                <option value="VENTA">VENTA</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Cantidad</label>
              <input type="number" name="cantidad" className="form-control" value={form.cantidad} onChange={handleChange} min="1" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Observaciones</label>
              <textarea name="observacion" className="form-control" value={form.observacion} onChange={handleChange} />
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

export default ClienteMovementForm;