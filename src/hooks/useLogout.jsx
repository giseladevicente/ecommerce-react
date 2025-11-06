import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const cerrarSesion = () => {
    logout(); // limpia user y token
    navigate("/login");
  };

  return cerrarSesion;
}
