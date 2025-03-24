const navbarItems = {
    admin: [
      { label: "Usuarios", icon: "bi-people", path: "/admin/users" },
      { label: "Configuración", icon: "bi-gear", path: "/admin/settings" },
    ],
    driver: [
      { label: "Mis Rutas", icon: "bi-map", path: "/driver/routes" },
      { label: "Entregas", icon: "bi-truck", path: "/driver/deliveries" },
    ],
    owner: [
      { label: "Resumen", icon: "bi-graph-up", path: "/owner/overview" },
      { label: "Finanzas", icon: "bi-cash", path: "/owner/finances" },
    ],
  };
  
  export default navbarItems;
  