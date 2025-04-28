const ClienteTable = ({ data, onEdit, onDelete }) => {
  const exportToCSV = () => {
    const header = ["Razón Social", "CUIT", "Email", "Teléfono", "Dirección", "Activo", "Fecha Alta"];
    const rows = data.map((c) => [
      c.razonSocial,
      c.cuit,
      c.email,
      c.telefono,
      c.direccion,
      c.activo ? "Sí" : "No",
      c.fechaAlta?.split("T")[0] || ""
    ]);

    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "clientes.csv");
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
            <th>Razón Social</th>
            <th>CUIT</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Activo</th>
            <th>Fecha Alta</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c) => (
            <tr key={c.id}>
              <td>{c.razonSocial}</td>
              <td>{c.cuit}</td>
              <td>{c.email}</td>
              <td>{c.telefono}</td>
              <td>{c.direccion}</td>
              <td>
                {c.activo ? (
                  <span className="badge bg-success">Sí</span>
                ) : (
                  <span className="badge bg-secondary">No</span>
                )}
              </td>
              <td>{c.fechaAlta?.split("T")[0]}</td>
              <td className="text-center">
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(c)}>
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(c.id)}>
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

export default ClienteTable;