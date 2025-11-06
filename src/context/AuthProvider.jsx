import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Mantener sesión al recargar
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const savedUser = localStorage.getItem("authUser");
      if (savedUser) {
        setUser(savedUser);
      }
    }
  }, []);

  // Simulación de base de datos local (localStorage)
  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existe = users.find((u) => u.username === username);
    if (existe) return false;
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  // Validación y generación de Token
  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userFound = users.find(
      (u) => u.username === username && u.password === password
    );

    if (userFound) {
      const fakeToken = `fake-token-${username}`;
      localStorage.setItem("authToken", fakeToken);
      localStorage.setItem("authUser", username);
      setUser(username);
      setToken(fakeToken);
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};



