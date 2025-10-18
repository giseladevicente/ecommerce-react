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

function App() {
  return (
    <>
      <Navigation />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
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
    </>
  );
}

export default App;
