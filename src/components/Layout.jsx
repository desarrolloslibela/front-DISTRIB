import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <Navbar />
      <div className="bg-light text-muted px-4 py-2 border-bottom small">
        <i className="bi bi-geo-alt"></i> {location.pathname}
      </div>
      <main className="container mt-4 flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
