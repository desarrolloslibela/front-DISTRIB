const navbarItems = {
  admin: [
    {
      label: "Usuarios",
      icon: "bi-people",
      subItems: [
        { label: "Nuevo Usuario", path: "/admin/users/new" },
        { label: "Ver Usuarios", path: "/admin/users" },
      ]
    },
    {
      label: "Productos",
      icon: "bi-people",
      subItems: [
        { label: "Nuevo Producto", path: "/admin/products/new" },
        { label: "Ver Productos", path: "/admin/products" },
        { label: "Nuevo Tipo de Productos", path: "/admin/producttypes/new" },
        { label: "Ver Tipo de Productos", path: "/admin/producttypes" },
      ]
    },
    {
      label: "Configuración",
      icon: "bi-gear",
      path: "/admin/settings"
    }
  ],

  
    driver: [
      { label: "Mis Rutas", icon: "bi-map", path: "/driver/routes" },
      { label: "Entregas", icon: "bi-truck", path: "/driver/deliveries" },
    ],
    owner: [
      { label: "Resumen", icon: "bi-graph-up", path: "/owner/overview" },
      { label: "Finanzas", icon: "bi-cash", path: "/owner/finances" },
      { label: "Productos", icon: "bi-gear", path: "/admin/products" },

    ],
  };
  
  export default navbarItems;
  