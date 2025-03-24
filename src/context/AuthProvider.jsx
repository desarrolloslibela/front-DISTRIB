import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./AuthInterceptor";
import { getTokenExpiration } from "../utils/TokenUtils";
import { AuthContext } from "./AuthContext";
import SessionExpirationModal from "../components/SessionExpirationModal";
import Loading from "../components/Loading";
import API_ROUTES from "../utils/apiRoutes";




export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showExpirationModal, setShowExpirationModal] = useState(false);
  const [authError, setAuthError] = useState(null);


  const login = async (email, password, rememberMe) => {
    try {
      setLoading(true);
      const { data } = await api.post(API_ROUTES.AUTH.LOGIN, { email, password });
  
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", data.token);
      storage.setItem("user", JSON.stringify(data));
  
      setUser(data);
      setAuthError(null); 
      setLoading(false);
      if (data?.token) {
        navigate("/dashboard");
      }      
    } catch (error) {
      setLoading(false);
  
      if (error.response && error.response.data && error.response.data.error) {
        setAuthError(error.response.data.error); 
        throw new Error(error.response.data.error);
      } else {
        setAuthError("⚠️ Error en el inicio de sesión. Intenta nuevamente.");
        throw new Error("⚠️ Error en el inicio de sesión. Intenta nuevamente.");
      }
    }
  };
  
  
  

  const logout = async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      try {
        await api.post(API_ROUTES.AUTH.LOGOUT, {}, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        console.error("Error en logout:", error.response?.data || error.message);
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(undefined);
    setLoading(false);
    setTimeout(() => navigate("/login"), 0); 
};

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const userData = localStorage.getItem("user") || sessionStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false); 
  }, []);

  useEffect(() => {
  }, [user]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;
      const expirationTime = getTokenExpiration(token);
      if (!expirationTime) return;
      const currentTime = Date.now();
      const timeRemaining = expirationTime - currentTime;

      if (timeRemaining <= 6 * 60 * 1000 && timeRemaining > 5 * 60 * 1000) {
        setShowExpirationModal(true);
      }

      if (timeRemaining <= 0) {
        setShowExpirationModal(false);
        logout();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, authError }}>
      {loading ? <Loading /> : children} {}
      <SessionExpirationModal
        show={showExpirationModal}
        onClose={() => setShowExpirationModal(false)}
        onLogout={logout}
      />
    </AuthContext.Provider>
  );
};
