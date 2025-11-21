import { Children } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RutaProtegida({ children, adminOnly = false }) {
  const { isAuth, isAdmin } = useAuth();
  if (!isAuth) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/perfil/usuario" />;
  if (isAdmin && !adminOnly) return <Navigate to="/admin" />;

  return children;
}
