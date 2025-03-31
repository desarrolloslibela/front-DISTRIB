const AutomotorTable = ({ data, onEdit, onDelete }) => {
  const exportToCSV = () => {
    const header = ["Patente", "Marca", "Modelo", "Activo", "Fecha Alta", "Observaciones"];
    const rows = data.map((a) => [
      a.patente,
      a.marca,
      a.modelo,
      a.activo ? "Sí" : "No",
      a.fechaAlta,
      a.observaciones || ""
    ]);

    const csv = [header, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "automotores.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-outline-secondary btn-sm" onClick={exportToCSV}>
          <i className="bi bi-download"></i> Exportar CSV
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Patente</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Activo</th>
            <th>Fecha Alta</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => (
            <tr key={a.id}>
              <td>{a.patente}</td>
              <td>{a.marca}</td>
              <td>{a.modelo}</td>
              <td>
                {a.activo ? (
                  <span className="badge bg-success">Sí</span>
                ) : (
                  <span className="badge bg-secondary">No</span>
                )}
              </td>
              <td>{a.fechaAlta}</td>
              <td className="text-center">
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(a)}>
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(a.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AutomotorTable;