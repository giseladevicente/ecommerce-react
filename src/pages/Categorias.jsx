import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProductList from "../components/ProductList";

function Categorias() {
  const { categoria } = useParams();

  const categoriasTraducidas = {
    "jewelery": "Joyería",
    "electronics": "Electrónica",
    "men's clothing": "Hombre",
    "women's clothing": "Mujer",
  };

  return (
    <Container className="my-4">
      <div className="text-center mb-4">
        <h2>Categoría: {categoriasTraducidas[categoria] || categoria}</h2>
      </div>

      <ProductList category={categoria} apiSource="both" />
    </Container>
  );
}

export default Categorias;
