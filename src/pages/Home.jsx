import Main from '../components/Main';
import ProductList from '../components/ProductList';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="my-4">
      <Main />
      <h3 className="text-center mt-5 mb-4">Productos destacados</h3>
      <ProductList />
    </Container>
  );
};

export default Home;

