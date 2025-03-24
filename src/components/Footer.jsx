import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SessionTimer from "./SessionTimer";

const Footer = () => { 
  const { user, logout } = useContext(AuthContext); 

  return (
    <footer className="bg-dark text-light text-center py-3">
      <span><i className="bi bi-person-circle"></i> Usuario: {user?.email} | </span>
      
      <SessionTimer logout={logout} /> {}
    </footer>
  );
};

export default Footer;
