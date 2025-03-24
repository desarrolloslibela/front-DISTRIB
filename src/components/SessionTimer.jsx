import { useState, useEffect } from "react";
import { getTokenExpiration } from "../utils/TokenUtils";

const SessionTimer = ({ logout }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    if (!logout || typeof logout !== "function") {
      return;
    }

    const updateTimer = () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        logout();
        return;
      }

      const expirationTime = getTokenExpiration(token);
      if (!expirationTime) {
        setTimeRemaining(0);
        return;
      }

      const currentTime = Date.now();
      const remaining = Math.max(0, Math.floor((expirationTime - currentTime) / 1000));

      setTimeRemaining(remaining);

      if (remaining <= 0) {
        logout();
      }
    };

    updateTimer(); 
    const interval = setInterval(updateTimer, 1000); 

    return () => clearInterval(interval);
  }, [logout]);

  const formatTime = (seconds) => {
    if (seconds === null) return "Calculando...";
    if (seconds <= 0) return "Expirado";
    
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <span>Tiempo de sesión: {formatTime(timeRemaining)}</span>
  );
};

export default SessionTimer;