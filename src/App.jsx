import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navigation from "./components/Nav";
import Home from "./pages/Home";
import Categorias from "./pages/Categorias";
import Login from "./pages/Login";
import Productos from "./pages/Productos";

function App() {
  return (
    <>
      <Navigation />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/categoria/:categoria" element={<Categorias />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
