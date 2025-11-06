import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, token, login, logout, register } = useContext(AuthContext);
  const isAuth = !!token;

  return { isAuth, user, token, login, logout, register };
};
