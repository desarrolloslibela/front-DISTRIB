// src/components/Layout.jsx
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <Navbar />

      {/* Breadcrumbs dinámicos */}
      <div className="bg-light px-4 py-2 border-bottom">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <i className="bi bi-house-door"></i>
            </li>
            {segments.map((segment, index) => (
              <li
                key={index}
                className={`breadcrumb-item ${
                  index === segments.length - 1 ? "active" : ""
                }`}
                aria-current={index === segments.length - 1 ? "page" : undefined}
              >
                {segment}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <main className="container mt-4 flex-grow-1">{children}</main>
      <Footer logout={logout} />
    </div>
  );
};

export default Layout;
