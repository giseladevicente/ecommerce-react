import Main from "../components/Main";
import ProductList from "../components/ProductList";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <>
      <Container className="my-4">
        <Main />
        <div className="text-center m-4">
          <h2>Productos Destacados</h2>
          <p className="fs-4 m-4">
            ¡Aprovechá un 30% OFF en productos seleccionados!
          </p>
        </div>
        <ProductList limit={8} />
      </Container>
    </>
  );
}

export default Home;
