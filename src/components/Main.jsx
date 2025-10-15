import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <section
      className="text-center py-5"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      <Container>
        <h1 className="fw-bold mb-3">Bienvenido a eCommerce</h1>
        <p
          className="lead fw-bold text-light"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
        >
          Los mejores productos, las mejores marcas y las ofertas más
          exclusivas.
        </p>

        <Link
          to="/productos"
          className="btn btn-light btn-lg shadow-sm"
          style={{ borderRadius: "30px" }}
        >
          Ver productos
        </Link>
      </Container>
    </section>
  );
};

export default Main;
