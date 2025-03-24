import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  return (
    <div>

<Navbar>
  <p>Texto</p>
</Navbar>
    
    
    <div className="container">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center">Dashboard - Admin</h2>
        <p className="text-center">Administración de usuarios y configuración del sistema.</p>
      </div>
    </div>
    </div> 
  );
};

export default AdminDashboard;
