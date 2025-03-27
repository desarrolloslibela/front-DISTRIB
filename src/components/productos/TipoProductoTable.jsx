const TipoProductoTable = ({ data, onEdit, onDelete }) => {
  return (
    <table className="table table-bordered table-striped">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((tipo) => (
          <tr key={tipo.id}>
            <td>{tipo.id}</td>
            <td>{tipo.nombre}</td>
            <td className="text-center">
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(tipo)}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(tipo.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TipoProductoTable;