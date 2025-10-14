import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="bg-dark text-white py-3 shadow-sm">
      <Container className="d-flex justify-content-center align-items-center">
        <FontAwesomeIcon icon={faBagShopping} size="2x" className="me-2 fs-3 text-light" />
        <h1 className="fs-3 mb-0">eCommerce</h1>
      </Container>
    </header>
  );
};

export default Header;

