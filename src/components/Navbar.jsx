import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const getNavbarTitle = () => {
    switch (user?.role) {
      case "ADMIN":
        return "NAVBAR Administrador";
      case "DRIVER":
        return "NAVBAR Chofer";
      case "OWNER":
        return "NAVBAR CEO";
      default:
        return "Dashboard";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="d-flex align-items-center">
        <span className="text-light ms-2 fs-5">{getNavbarTitle()}</span> 
      </div>
    </nav>
  );
};

export default Navbar;
