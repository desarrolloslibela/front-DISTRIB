import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import navbarItems from "../utils/navbarItems";
import { getRoleTitle } from "../utils/roles";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const role = user?.role?.toLowerCase();
  const items = navbarItems[role] || [];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="d-flex align-items-center">
        <span className="navbar-brand text-light me-3">{getRoleTitle(user?.role)}</span>
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="btn btn-outline-light btn-sm me-2"
          >
            <i className={`bi ${item.icon}`}></i> {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
