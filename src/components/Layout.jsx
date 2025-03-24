import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {

  const authContext = useContext(AuthContext); 

  if (!authContext) {
    return <p>Error al cargar la aplicación.</p>;
  }

  const { logout } = authContext; 

  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <Navbar />
      <main className="container mt-4 flex-grow-1">{children}</main>
      <Footer logout={logout} /> {}
    </div>
  );
};

export default Layout;
