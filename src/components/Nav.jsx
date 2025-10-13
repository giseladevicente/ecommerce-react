import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/Nav.css';


function Navigation() {
    return (
        <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
            <Container fluid className="d-flex justify-content-between align-items-center">
             
                {/* Izquierda */}
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0 nav" navbarScroll>
                        <Nav.Link as={Link} to="/">Home</Nav.Link> 
                        <Nav.Link as={Link} to="/ofertas">Ofertas</Nav.Link>
                        <NavDropdown title="Categorías" id="navbarScrollingDropdown">
                            <NavDropdown.Item as={Link} to="/mujeres"> Mujeres</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/hombres"> Hombres </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/ninos"> Niños </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>

                    {/* Centro */}
                    <Form className="d-flex navbar-search justify-content-center">
                        <Form.Control type="search" placeholder="Buscar productos..." className="me-2" aria-label="Search" />
                        <Button variant="outline-light">Search</Button>
                    </Form>

                    {/* Derecha */}
                    <div className="d-flex align-items-center ms-3">
                        <Button as={Link} to="/login" variant="outline-light" className="me-2">
                            <FontAwesomeIcon icon={faUser} className="me-1" /> Login
                        </Button>
                        <Button as={Link} to="/carrito" variant="outline-light">
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </Button>
                    </div>
            </Container>
        </Navbar>
  );
}

export default Navigation;