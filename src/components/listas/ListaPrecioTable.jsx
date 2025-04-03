const ListaPrecioTable = ({ data }) => {
  return (
    <table className="table table-bordered table-striped">
      <thead className="table-light">
        <tr>
          <th>Tipo</th>
          <th>Fecha Desde</th>
          <th>Fecha Hasta</th>
          <th>Proveedor</th>
          <th>Observaciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((l) => (
          <tr key={l.id}>
            <td>{l.tipo}</td>
            <td>{l.fechaDesde}</td>
            <td>{l.fechaHasta || "-"}</td>
            <td>{l.proveedorNombre || "-"}</td>
            <td>{l.observaciones}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListaPrecioTable;
