import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navigation from "./components/Nav";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Nosotros from "./pages/Nosotros";
import Categorias from "./pages/Categorias";
import Login from "./pages/Login";
import Carrito from "./pages/Carrito";
import RutaProtegida from "./components/RutaProtegida";
import Perfil from "./pages/Perfil";
import Administracion from "./pages/Administracion";
import { Spinner as LoadingSpinner } from "react-bootstrap";
import { CartProvider } from "./context/CartProvider";
import ProductoDetalle from "./components/ProductoDetalle";

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
          <Route
            path="/perfil/:usuario"
            element={
              <RutaProtegida>
                <Perfil />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin"
            element={
              <RutaProtegida>
                <Administracion />
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
        </Routes>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
