import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // Mantener sesión al recargar
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");
    const savedRole = localStorage.getItem("authRole");

    if (token && savedUser && savedRole) {
      setToken(token);
      setUser(savedUser);
      setRole(savedRole);
    } else {
      setToken(null);
      setUser(null);
      setRole(null);
    }
  }, []);

  // Simulación de base de datos local (localStorage)
  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existe = users.find((u) => u.username === username);
    if (existe) return false;

    users.push({ username, password, role: "user" });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  // Validación y generación de Token
  const login = (username, password) => {
    // Admin
    if (username === "admin" && password === "123") {
      const fakeToken = "admin-token";
      localStorage.setItem("authToken", fakeToken);
      localStorage.setItem("authUser", "admin");
      localStorage.setItem("authRole", "admin");
      setUser("admin");
      setRole("admin");
      setToken(fakeToken);
      return true;
    }

    // user que se registra
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userFound = users.find(
      (u) => u.username === username && u.password === password
    );

    if (userFound) {
      const fakeToken = `fake-token-${username}`;
      localStorage.setItem("authToken", fakeToken);
      localStorage.setItem("authUser", username);
      localStorage.setItem("authRole", userFound.role || "user"); // ver "user"
      setUser(username);
      setRole(userFound.role || "user");
      setToken(fakeToken);
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("authRole");
    setUser(null);
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, role, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
