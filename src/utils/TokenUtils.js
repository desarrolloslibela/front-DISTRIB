export const getTokenExpiration = (token) => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000;
    } catch (error) {
      return null;
    }
  };