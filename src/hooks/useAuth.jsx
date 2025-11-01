export const useAuth = () => {
  const isAuth = localStorage.getItem("auth") === "true";
  const usuario = localStorage.getItem("usuario");

  return { isAuth, usuario };
};
