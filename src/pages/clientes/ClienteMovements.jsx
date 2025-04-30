import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovimientosCliente, createMovimientoCliente, updateMovimientoCliente, deleteMovimientoCliente } from "../../utils/api/clientMovementApi";
import { getClientePorId } from "../../utils/api/clientApi";
import ClienteMovementForm from "../../components/clientes/ClienteMovementForm";

const ClienteMovements = () => {
  const { id } = useParams();
  const [movimientos, setMovimientos] = useState([]);
  const [cliente, setCliente] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMovimiento, setEditMovimiento] = useState(null);
  const [filtros, setFiltros] = useState({
    tipoMovimiento: "",
    fechaDesde: "",
    fechaHasta: ""
  });

  useEffect(() => {
    cargarCliente();
    cargarMovimientos();
  }, []);

  const cargarCliente = async () => {
    const data = await getClientePorId(id);
    setCliente(data);
  };

  const cargarMovimientos = async () => {
    const data = await getMovimientosCliente(id);
    setMovimientos(data);
  };

  const handleSave = async (formData) => {
    if (editMovimiento) {
      await updateMovimientoCliente(id, editMovimiento.id, formData);
    } else {
      await createMovimientoCliente(id, formData);
    }
    setEditMovimiento(null);
    setShowForm(false);
    cargarMovimientos();
  };

  const handleDelete = async (movimientoId) => {
    if (window.confirm("¿Eliminar este movimiento?")) {
      await deleteMovimientoCliente(id, movimientoId);
      cargarMovimientos();
    }
  };

  const limpiarFiltros = () => {
    setFiltros({ tipoMovimiento: "", fechaDesde: "", fechaHasta: "" });
  };

  const exportarCSV = () => {
    const encabezado = ["Fecha", "Producto", "Tipo Movimiento", "Cantidad", "Observaciones"];
    const filas = movimientosFiltrados.map((m) => [
      m.fechaMovimiento?.split("T")[0] || "",
      m.productoNombre || "",
      m.tipoMovimiento || "",
      m.cantidad || "",
      m.observacion || ""
    ]);

    const contenido = [encabezado, ...filas].map(row => row.join(",")).join("\n");
    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "movimientos_cliente.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const movimientosFiltrados = movimientos.filter((m) => {
    const tipoOk = !filtros.tipoMovimiento || m.tipoMovimiento === filtros.tipoMovimiento;
    const fechaDesdeOk = !filtros.fechaDesde || new Date(m.fechaMovimiento) >= new Date(filtros.fechaDesde);
    const fechaHastaOk = !filtros.fechaHasta || new Date(m.fechaMovimiento) <= new Date(filtros.fechaHasta);
    return tipoOk && fechaDesdeOk && fechaHastaOk;
  });

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4>Movimientos del Cliente</h4>
          {cliente && (
            <p className="mb-0">
              <strong>{cliente.razonSocial}</strong> – CUIT: {cliente.cuit}
            </p>
          )}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={exportarCSV}>
            <i className="bi bi-download"></i> Exportar CSV
          </button>
          <button className="btn btn-primary" onClick={() => { setEditMovimiento(null); setShowForm(true); }}>
            <i className="bi bi-plus-circle"></i> Nuevo Movimiento
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label className="form-label">Tipo de Movimiento</label>
          <select className="form-select" value={filtros.tipoMovimiento} onChange={(e) => setFiltros({ ...filtros, tipoMovimiento: e.target.value })}>
            <option value="">Todos</option>
            <option value="ENTREGA">ENTREGA</option>
            <option value="DEVOLUCION">DEVOLUCION</option>
            <option value="VENTA">VENTA</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Fecha Desde</label>
          <input type="date" className="form-control" value={filtros.fechaDesde} onChange={(e) => setFiltros({ ...filtros, fechaDesde: e.target.value })} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Fecha Hasta</label>
          <input type="date" className="form-control" value={filtros.fechaHasta} onChange={(e) => setFiltros({ ...filtros, fechaHasta: e.target.value })} />
        </div>
        <div className="col-md-3 d-flex align-items-end">
          <button className="btn btn-outline-secondary w-100" onClick={limpiarFiltros}>
            Limpiar Filtros
          </button>
        </div>
      </div>

      <table className="table table-bordered table-striped mt-3">
        <thead className="table-light">
          <tr>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Tipo Movimiento</th>
            <th>Cantidad</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movimientosFiltrados.map((m) => (
            <tr key={m.id}>
              <td>{m.fechaMovimiento?.split("T")[0]}</td>
              <td>{m.productoNombre}</td>
              <td>{m.tipoMovimiento}</td>
              <td>{m.cantidad}</td>
              <td>{m.observacion}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => { setEditMovimiento(m); setShowForm(true); }}>
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(m.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <ClienteMovementForm
          cliente={cliente}
          movimiento={editMovimiento}
          onClose={() => { setShowForm(false); setEditMovimiento(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ClienteMovements;