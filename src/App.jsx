import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import AppRoutes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;