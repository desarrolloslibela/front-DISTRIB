import { useContext, lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";

const AdminDashboard = lazy(() => import("../pages/dashboard/AdminDashboard"));
const OwnerDashboard = lazy(() => import("../pages/dashboard/OwnerDashboard"));
const DriverDashboard = lazy(() => import("../pages/dashboard/DriverDashboard"));

const roleComponentMap = {
  admin: AdminDashboard,
  owner: OwnerDashboard,
  driver: DriverDashboard,
};

const RoleBasedDashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  const Component = roleComponentMap[user.role?.toLowerCase()];

  return Component ? (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
};

export default RoleBasedDashboard;