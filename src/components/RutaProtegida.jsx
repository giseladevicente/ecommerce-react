import { Children } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RutaProtegida({
  children,
  adminOnly = false, // Solo permiso para usuarios registrados. Si es true: solo los administradores pueden entrar.
  allowAdmin = false, // Sin permiso de admin -> redirigir a admin. Si es true: permite que el admin entre en rutas de usuario.
}) {
  const { isAuth, isAdmin } = useAuth();
  if (!isAuth) return <Navigate to="/login" />; // Si user no está registrado -> ir a login.
  if (adminOnly && !isAdmin) return <Navigate to="/perfil/usuario" />; // Si la ruta es solo admin (adminOnly = true) y el usuario no es admin -> enviarlo a su perfil.
  if (isAdmin && !adminOnly && !allowAdmin) return <Navigate to="/admin" />; // Si el usuario es admin, pero la ruta no es solo admin y no está permitido que el admin entre (allowAdmin = false) -> redirigir al panel admin.

  return children;
}
