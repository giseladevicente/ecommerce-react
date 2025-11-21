import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Spinner as LoadingSpinner } from "react-bootstrap";
import { CartProvider } from "./context/CartProvider";
import { AuthProvider } from "./context/AuthProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navigation from "./components/Nav";
import RutaProtegida from "./components/RutaProtegida";
import ProductoDetalle from "./components/ProductoDetalle";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Nosotros from "./pages/Nosotros";
import Categorias from "./pages/Categorias";
import Login from "./pages/Login";
import Carrito from "./pages/Carrito";
import Perfil from "./pages/Perfil";
import Administracion from "./pages/Administracion";
import Registro from "./pages/Registro";
import CrudProductos from "./pages/CrudProducts";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <LoadingSpinner animation="border" variant="primary" role="status" />
        <p className="mt-3 text-muted">Cargando la tienda...</p>
      </div>
    );
  }

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Navigation />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/categoria/:categoria" element={<Categorias />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route
              path="/perfil/:usuario"
              element={
                <RutaProtegida>
                  <Perfil />
                </RutaProtegida>
              }
            />
            <Route
              path="/carrito"
              element={
                <RutaProtegida>
                  <Carrito />
                </RutaProtegida>
              }
            />
            <Route
              path="/admin"
              element={
                <RutaProtegida adminOnly={true}>
                  <Administracion />
                </RutaProtegida>
              }
            />
            <Route
              path="/crud"
              element={
                <RutaProtegida adminOnly={true}>
                  <CrudProductos />
                </RutaProtegida>
              }
            />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
