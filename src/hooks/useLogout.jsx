import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return cerrarSesion;
}
