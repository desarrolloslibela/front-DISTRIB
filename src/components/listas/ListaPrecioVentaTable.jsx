const ListaPrecioVentaTable = ({ listas, onVerDetalle, onEdit, onDelete }) => {
  return (
    <table className="table table-bordered table-striped">
      <thead className="table-light">
        <tr>
          <th>Fecha Desde</th>
          <th>Fecha Hasta</th>
          <th>Observaciones</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {listas.map((l) => (
          <tr key={l.id}>
            <td>{l.fechaDesde}</td>
            <td>{l.fechaHasta || "-"}</td>
            <td>{l.observaciones || "-"}</td>
            <td>
              <button className="btn btn-sm btn-info me-2" onClick={() => onVerDetalle(l.id)}>
                Ver Detalle
              </button>
              <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(l)}>
                Editar
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(l.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListaPrecioVentaTable;