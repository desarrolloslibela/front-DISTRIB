const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
  },
  USERS: {
    GET_ALL: "/users",
    GET_BY_ID: (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}/update`,
    DELETE: (id) => `/users/${id}/delete`,
  },
  VEHICLES: {
    GET_ALL: "/vehicles",
    GET_BY_ID: (id) => `/vehicles/${id}`,
    UPDATE: (id) => `/vehicles/${id}/update`,
  },
};

export default API_ROUTES;