import { useRef } from "react";

const ProductoTable = ({ data, onEdit, onDelete }) => {
  const tableRef = useRef();

  const exportToCSV = () => {
    const header = ["ID", "Nombre", "Capacidad", "Tipo", "Activo"];
    const rows = data.map((p) => [
      p.id,
      p.nombre,
      p.capacidad,
      p.tipoProductoNombre,
      p.activo ? "Sí" : "No"
    ]);

    const csvContent = [header, ...rows]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "productos.csv");
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

      <table ref={tableRef} className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Capacidad</th>
            <th>Tipo</th>
            <th>Activo</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.capacidad}</td>
              <td>{producto.tipoProductoNombre}</td>
              <td>
                {producto.activo ? (
                  <span className="badge bg-success">Sí</span>
                ) : (
                  <span className="badge bg-secondary">No</span>
                )}
              </td>
              <td className="text-center">
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(producto)}>
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(producto.id)}>
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

export default ProductoTable;