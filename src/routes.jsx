import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Layout from "./components/Layout";

// Admin
import UserList from "./pages/admin/UserList";
import NewUser from "./pages/admin/NewUser";

// Driver & Owner (pueden ser placeholders por ahora)
import DriverDashboard from "./pages/dashboard/DriverDashboard";
import OwnerDashboard from "./pages/dashboard/OwnerDashboard";

const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Cargando...</p>;

  const role = user?.role?.toLowerCase();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {user && (
        <>
          {/* Rutas para ADMIN */}
          {role === "admin" && (
            <Route path="/admin" element={<Layout />}>
              <Route path="users" element={<UserList />} />
              <Route path="users/new" element={<NewUser />} />
            </Route>
          )}

          {/* Rutas para DRIVER */}
          {role === "driver" && (
            <Route path="/driver" element={<Layout />}>
              <Route index element={<DriverDashboard />} />
            </Route>
          )}

          {/* Rutas para OWNER */}
          {role === "owner" && (
            <Route path="/owner" element={<Layout />}>
              <Route index element={<OwnerDashboard />} />
            </Route>
          )}
        </>
      )}

      {/* Redirección según rol */}
      {!user && <Route path="*" element={<Navigate to="/login" />} />}
      {user && role === "admin" && <Route path="*" element={<Navigate to="/admin" />} />}
      {user && role === "driver" && <Route path="*" element={<Navigate to="/driver" />} />}
      {user && role === "owner" && <Route path="*" element={<Navigate to="/owner" />} />}
    </Routes>
  );
};

export default AppRoutes;
