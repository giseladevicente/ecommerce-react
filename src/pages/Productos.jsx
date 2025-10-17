import { Container } from "react-bootstrap";
import ProductList from "../components/ProductList";

function Productos() {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Todos los Productos</h2>
      <ProductList />
    </Container>
  );
}

export default Productos;
