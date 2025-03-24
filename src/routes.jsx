import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/auth/Login";
import Layout from "./components/Layout";
import OwnerDashboard from "./pages/dashboard/OwnerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import DriverDashboard from "./pages/dashboard/DriverDashboard";

/**
 * Protege rutas privadas, redirigiendo al login si el usuario no está autenticado.
 */
const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
  
    if (loading) return <p>Cargando...</p>;    
    if (!loading && !user) {
      return <Login />; // Evita que Login.js se desmonte
    }
    
  
    return children;
  };

/**
 * Renderiza el Dashboard correspondiente según el rol del usuario.
 */
const DashboardWrapper = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  switch (user.role.toLowerCase()) {
    case "owner":
      return <OwnerDashboard />;
    case "admin":
      return <AdminDashboard />;
    case "driver":
      return <DriverDashboard />;
    default:
      return <Navigate to="/login" />;
  }
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta pública de login */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas con Layout */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <DashboardWrapper />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Cualquier otra ruta redirige al login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
