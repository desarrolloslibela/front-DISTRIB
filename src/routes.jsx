import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Layout from "./components/Layout";

import OwnerInicio from "./pages/owner/Inicio";
import AdminInicio from "./pages/admin/Inicio";
import DriverInicio from "./pages/driver/Inicio";

import Usuarios from "./pages/admin/Usuarios";
import Productos from "./pages/products/Productos";
import TiposProducto from "./pages/products/TiposProducto";
import Clientes from "./pages/clientes/Clientes";
import Proveedores from "./pages/proveedores/Proveedores";
import Automotores from "./pages/automotores/Automotores";
import Compras from "./pages/compras/Compras";

import ControlStock from "./pages/stock/ControlStock";
import RemitoCompra from "./pages/remitos/RemitoCompra";
import RemitoVenta from "./pages/remitos/RemitoVenta";

import CostosFijos from "./pages/finanzas/CostosFijos";
import ListaPreciosCompra from "./pages/listas/ListaPreciosCompra";
import ListaPreciosVenta from "./pages/listas/ListaPreciosVenta";
import DetalleListaPrecioVenta from "./pages/listas/DetalleListaPrecioVenta";
import Ventas from "./pages/ventas/Ventas";
import Finanzas from "./pages/finanzas/Finanzas";

const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <p>Cargando...</p>;

  const role = user?.role?.toLowerCase();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {user && (
        <Route path="/" element={<Layout />}>
          {role === "owner" && (
            <>
              <Route path="owner" element={<OwnerInicio />} />
              <Route path="admin/users" element={<Usuarios />} />
              <Route path="products" element={<Productos />} />
              <Route path="products/types" element={<TiposProducto />} />
              <Route path="clients" element={<Clientes />} />
              <Route path="suppliers" element={<Proveedores />} />
              <Route path="vehicles" element={<Automotores />} />
              <Route path="purchases" element={<Compras />} />
              <Route path="stock/control" element={<ControlStock />} />
              <Route path="remitos/compra" element={<RemitoCompra />} />
              <Route path="remitos/venta" element={<RemitoVenta />} />
              <Route path="fixed-costs" element={<CostosFijos />} />
              <Route path="prices/purchase" element={<ListaPreciosCompra />} />
              <Route path="prices/sale" element={<ListaPreciosVenta />} />
              <Route path="prices/sale/:id/detalle" element={<DetalleListaPrecioVenta />} />
              <Route path="sales" element={<Ventas />} />
              <Route path="finanzas" element={<Finanzas />} />
            </>
          )}

          {role === "admin" && (
            <>
              <Route path="admin" element={<AdminInicio />} />
              <Route path="admin/users" element={<Usuarios />} />
              <Route path="products" element={<Productos />} />
              <Route path="products/types" element={<TiposProducto />} />
              <Route path="clients" element={<Clientes />} />
              <Route path="suppliers" element={<Proveedores />} />
              <Route path="vehicles" element={<Automotores />} />
              <Route path="purchases" element={<Compras />} />
              <Route path="stock/control" element={<ControlStock />} />
              <Route path="fixed-costs" element={<CostosFijos />} />
              <Route path="prices/purchase" element={<ListaPreciosCompra />} />
              <Route path="prices/sale" element={<ListaPreciosVenta />} />
              <Route path="prices/sale/:id/detalle" element={<DetalleListaPrecioVenta />} />
            </>
          )}

          {role === "driver" && (
            <>
              <Route path="driver" element={<DriverInicio />} />
              <Route path="remitos/compra" element={<RemitoCompra />} />
              <Route path="remitos/venta" element={<RemitoVenta />} />
              <Route path="sales" element={<Ventas />} />
            </>
          )}
        </Route>
      )}

      {!user && <Route path="*" element={<Navigate to="/login" />} />}
      {user && role === "owner" && <Route path="*" element={<Navigate to="/owner" />} />}
      {user && role === "admin" && <Route path="*" element={<Navigate to="/admin" />} />}
      {user && role === "driver" && <Route path="*" element={<Navigate to="/driver" />} />}
    </Routes>
  );
};

export default AppRoutes;