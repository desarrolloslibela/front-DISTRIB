const navbarItems = {
  owner: [
    { label: "Inicio", icon: "bi-house", path: "/owner" },
    { label: "Usuarios", icon: "bi-person", path: "/admin/users" },
    {
      label: "Productos",
      icon: "bi-box",
      subItems: [
        { label: "Productos", path: "/products" },
        { label: "Tipos de Producto", path: "/products/types" },
      ],
    },
    { label: "Clientes", icon: "bi-people", path: "/clients" },
    { label: "Proveedores", icon: "bi-truck", path: "/suppliers" },
    { label: "Automotores", icon: "bi-truck-front", path: "/vehicles" },
    { label: "Compras", icon: "bi-cart-check", path: "/purchases" },
    {
      label: "Stock",
      icon: "bi-clipboard-data",
      subItems: [
        { label: "Control de Stock", path: "/stock/control" },
        { label: "Remito de Compra", path: "/remitos/compra" },
        { label: "Remito de Venta", path: "/remitos/venta" },
      ],
    },
    { label: "Costos Fijos", icon: "bi-currency-dollar", path: "/fixed-costs" },
    {
      label: "Listas de Precios",
      icon: "bi-tags",
      subItems: [
        { label: "Compra", path: "/prices/purchase" },
        { label: "Venta", path: "/prices/sale" },
      ],
    },
    { label: "Ventas", icon: "bi-cart", path: "/sales" },
    { label: "Finanzas", icon: "bi-bank", path: "/finanzas" },
  ],

  admin: [
    { label: "Inicio", icon: "bi-house", path: "/admin" },
    { label: "Usuarios", icon: "bi-person", path: "/admin/users" },
    {
      label: "Productos",
      icon: "bi-box",
      subItems: [
        { label: "Productos", path: "/products" },
        { label: "Tipos de Producto", path: "/products/types" },
      ],
    },
    { label: "Clientes", icon: "bi-people", path: "/clients" },
    { label: "Proveedores", icon: "bi-truck", path: "/suppliers" },
    { label: "Automotores", icon: "bi-truck-front", path: "/vehicles" },
    { label: "Compras", icon: "bi-cart-check", path: "/purchases" },
    { label: "Stock", icon: "bi-clipboard-data", path: "/stock/control" },
    { label: "Costos Fijos", icon: "bi-currency-dollar", path: "/fixed-costs" },
    {
      label: "Listas de Precios",
      icon: "bi-tags",
      subItems: [
        { label: "Compra", path: "/prices/purchase" },
        { label: "Venta", path: "/prices/sale" },
      ],
    },
  ],

  driver: [
    { label: "Inicio", icon: "bi-house", path: "/driver" },
    {
      label: "Remitos",
      icon: "bi-file-earmark-text",
      subItems: [
        { label: "Remito de Compra", path: "/remitos/compra" },
        { label: "Remito de Venta", path: "/remitos/venta" },
      ],
    },
    { label: "Ventas", icon: "bi-cart", path: "/sales" },
  ],
};

export default navbarItems;