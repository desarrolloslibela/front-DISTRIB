import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import navbarItems from "../utils/navbarItems";
import { getRoleTitle } from "../utils/roles";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role?.toLowerCase();
  const items = navbarItems[role] || [];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto">
          {items.map((item, index) =>
            item.subItems ? (
              <li key={index} className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className={`bi ${item.icon}`}></i> {item.label}
                </span>
                <ul className="dropdown-menu">
                  {item.subItems.map((sub, subIndex) => (
                    <li key={subIndex}>
                      <Link to={sub.path} className="dropdown-item">
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={index} className="nav-item">
                <Link to={item.path} className="nav-link">
                  <i className={`bi ${item.icon}`}></i> {item.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;