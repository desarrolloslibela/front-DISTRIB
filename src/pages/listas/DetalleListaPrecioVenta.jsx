import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListaPrecioVentaPorId } from "../../utils/api/listaPrecioVentaApi";
import { getProductosActivos } from "../../utils/api/productoApi";
import { getItemsPorListaVenta, crearItemListaVenta } from "../../utils/api/precioVentaApi";

const alicuotas = [
  { value: "IVA_0", label: "0%", porcentaje: 0 },
  { value: "IVA_10_5", label: "10,5%", porcentaje: 10.5 },
  { value: "IVA_21", label: "21%", porcentaje: 21 }
];

const DetalleListaPrecioVenta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lista, setLista] = useState(null);
  const [productos, setProductos] = useState([]);
  const [items, setItems] = useState({});
  const [error, setError] = useState("");

  const cargarDatos = async () => {
    const [listaResp, productosResp, itemsResp] = await Promise.all([
      getListaPrecioVentaPorId(id),
      getProductosActivos(),
      getItemsPorListaVenta(id)
    ]);

    setLista(listaResp);
    setProductos(productosResp);

    const map = {};
    itemsResp.forEach(item => {
      map[item.productoId] = item;
    });
    setItems(map);
  };

  useEffect(() => {
    cargarDatos();
  }, [id]);

  const handleChange = (productoId, field, value) => {
    const updated = { ...items[productoId], productoId, listaId: parseInt(id), [field]: value };

    if (updated.precioFinal && updated.alicuotaIVA) {
      const porcentaje = alicuotas.find(a => a.value === updated.alicuotaIVA)?.porcentaje || 0;
      const divisor = 1 + porcentaje / 100;
      const neto = updated.precioFinal / divisor;
      updated.precioNeto = (Math.round(neto * 100) / 100).toFixed(2);
      updated.iva = (Math.round((updated.precioFinal - neto) * 100) / 100).toFixed(2);
    }

    setItems(prev => ({ ...prev, [productoId]: updated }));
  };

  const handleGuardar = async (productoId) => {
    const item = items[productoId];
    try {
      await crearItemListaVenta(item);
      alert("Guardado correctamente.");
    } catch (e) {
      setError(e?.response?.data?.message || "Error al guardar");
    }
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>Detalle Lista de Precio (Venta)</h4>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Volver</button>
      </div>

      {lista && (
        <div className="mb-3">
          <strong>Vigencia:</strong> {lista.fechaDesde} a {lista.fechaHasta}<br />
          <strong>Observaciones:</strong> {lista.observaciones || "-"}
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Producto</th>
            <th>Precio Final</th>
            <th>Alicuota IVA</th>
            <th>Precio Neto</th>
            <th>IVA</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => {
            const item = items[p.id] || {};
            return (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.precioFinal || ""}
                    onChange={(e) => handleChange(p.id, "precioFinal", parseFloat(e.target.value))}
                  />
                </td>
                <td>
                  <select
                    className="form-select"
                    value={item.alicuotaIVA || ""}
                    onChange={(e) => handleChange(p.id, "alicuotaIVA", e.target.value)}
                  >
                    <option value="">Seleccione</option>
                    {alicuotas.map((a) => (
                      <option key={a.value} value={a.value}>{a.label}</option>
                    ))}
                  </select>
                </td>
                <td>{item.precioNeto || "-"}</td>
                <td>{item.iva || "-"}</td>
                <td>
                  <button className="btn btn-success btn-sm" onClick={() => handleGuardar(p.id)}>Guardar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DetalleListaPrecioVenta;