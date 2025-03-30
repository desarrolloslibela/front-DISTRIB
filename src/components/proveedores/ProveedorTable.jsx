const ProveedorTable = ({ data, onEdit, onDelete }) => {
  const exportToCSV = () => {
    const header = ["Razón Social", "CUIT", "Email", "Teléfono", "Dirección", "Activo", "Fecha Alta"];
    const rows = data.map((p) => [
      p.razonSocial,
      p.cuit,
      p.email,
      p.telefono,
      p.direccion,
      p.activo ? "Sí" : "No",
      p.fechaAlta?.split("T")[0] || ""
    ]);

    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "proveedores.csv");
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
          {data.map((p) => (
            <tr key={p.id}>
              <td>{p.razonSocial}</td>
              <td>{p.cuit}</td>
              <td>{p.email}</td>
              <td>{p.telefono}</td>
              <td>{p.direccion}</td>
              <td>
                {p.activo ? (
                  <span className="badge bg-success">Sí</span>
                ) : (
                  <span className="badge bg-secondary">No</span>
                )}
              </td>
              <td>{p.fechaAlta?.split("T")[0]}</td>
              <td className="text-center">
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(p)}>
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(p.id)}>
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

export default ProveedorTable;