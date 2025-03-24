export const getRoleTitle = (role) => {
  switch (role?.toLowerCase()) {
    case "admin":
      return "Administrador";
    case "driver":
      return "Chofer";
    case "owner":
      return "CEO";
    default:
      return "Usuario";
  }
};