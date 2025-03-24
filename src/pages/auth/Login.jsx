import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import BUSINESS_DATA from "../../utils/businessData";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, authError } = useContext(AuthContext);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  
  useEffect(() => {
  }, [error]);
  
   const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
  
    if (!email || !password) {
      setError("⚠️ Por favor, completa todos los campos.");
      return;
    }
  
    try {
      await login(email, password, rememberMe);
    } catch (err) {
    }
  };
  

  return (

    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg text-center" style={{ width: "400px", borderRadius: "12px" }}>
        <div className="mb-3">
          <i className="bi bi-fire text-warning fs-1"></i>
          <h1 className="fw-bold text-dark">{BUSINESS_DATA.BUSINESS.NAME}</h1>
          
        </div>

        <h2 className="fw-bold mb-4 text-secondary">
          <i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión
        </h2>

        {}
        {error && (
  <div className="alert alert-danger">
    <i className="bi bi-exclamation-triangle"></i> {error}
  </div>
)}


        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person"></i></span>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Correo electrónico" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Recordar sesión
            </label>
          </div>

          <button type="submit" className="btn btn-success w-100">
            <i className="bi bi-box-arrow-in-right"></i> Ingresar
          </button>
        </form>
      </div>
    </div>
    
  

  );
};

export default Login;
