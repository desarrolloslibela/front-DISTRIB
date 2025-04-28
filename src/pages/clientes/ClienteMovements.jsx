import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovimientosCliente, createMovimientoCliente } from "../../utils/api/clientMovementApi";
import ClienteMovementForm from "../../components/clientes/ClienteMovementForm";

const ClienteMovements = () => {
  const { id } = useParams();
  const [movimientos, setMovimientos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    cargarMovimientos();
  }, []);

  const cargarMovimientos = async () => {
    const data = await getMovimientosCliente(id);
    setMovimientos(data);
  };

  const handleSave = async (formData) => {
    await createMovimientoCliente(id, formData);
    setShowForm(false);
    cargarMovimientos();
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Movimientos del Cliente</h4>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <i className="bi bi-plus-circle"></i> Nuevo Movimiento
        </button>
      </div>

      <table className="table table-bordered table-striped mt-3">
        <thead className="table-light">
          <tr>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Tipo Movimiento</th>
            <th>Cantidad</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((m) => (
            <tr key={m.id}>
              <td>{m.fechaMovimiento?.split("T")[0]}</td>
              <td>{m.productoNombre}</td>
              <td>{m.tipoMovimiento}</td>
              <td>{m.cantidad}</td>
              <td>{m.observacion}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <ClienteMovementForm
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ClienteMovements;