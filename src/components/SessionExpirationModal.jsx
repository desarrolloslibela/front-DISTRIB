import { useEffect } from "react";

const SessionExpirationModal = ({ show, onClose, onLogout }) => {
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        onClose();
        onLogout();
      }, 5 * 60 * 1000);

      return () => clearTimeout(timeout);
    }
  }, [show, onClose, onLogout]);

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bg-warning text-dark">
            <h5 className="modal-title">
              <i className="bi bi-exclamation-triangle-fill"></i> Sesión a punto de expirar
            </h5>
          </div>
          <div className="modal-body">
            <p>La sesión expirará pronto.</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Entendido</button>
            <button className="btn btn-danger" onClick={() => { 
              onClose(); 
              onLogout();
            }}>
              Cerrar Sesión Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionExpirationModal;
