let authInstance = null;

export const setAuth = (auth) => {
  authInstance = auth;
};

export const getAuth = () => {
  if (!authInstance) return {};
  

  const storedToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!storedToken && authInstance.token) {
    authInstance.token = null; 
  }

  return authInstance;
};
