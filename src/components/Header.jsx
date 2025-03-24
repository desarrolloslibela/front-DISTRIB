import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BUSINESS_DATA from "../utils/businessData";

const Header = () => {
  const { logout, user } = useContext(AuthContext);

  const getDashboardTitle = () => {
    switch (user?.role) {
      case "ADMIN":
        return "Administrador";
      case "DRIVER":
        return "Chofer";
      case "OWNER":
        return "CEO";
      default:
        return "Dashboard";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="d-flex align-items-center">
        <i className="bi bi-fire text-warning fs-3 me-2"></i> 
        <span className="navbar-brand fw-bold fs-4 text-light">{BUSINESS_DATA.BUSINESS.NAME}</span>
        <span className="text-light ms-2 fs-5">{getDashboardTitle()}</span> 
      </div>
      <div className="ms-auto">
        <button className="btn btn-danger" onClick={logout}>
          <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Header;
