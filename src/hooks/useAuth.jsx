import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, token, role, login, logout, register } = useContext(AuthContext);
  const isAuth = !!token;
  const isAdmin = role === "admin";

  return { isAuth, user, token, role, isAdmin, login, logout, register };
};
