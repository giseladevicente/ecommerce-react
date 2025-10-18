import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "../styles/Nav.css";

const Navigation = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("auth") === "true";
  const usuario = localStorage.getItem("usuario");

  const cerrarSesion = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
      <Container fluid>
        <Row className="w-100 align-items-center">
          {/* Menu */}
          <Col xs={3} lg={4}>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto" navbarScroll>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/nosotros">
                  Nosotros
                </Nav.Link>
                <NavDropdown title="Categorías" id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/productos">
                    Todos los productos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/categoria/women's clothing">
                    Mujer
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/categoria/men's clothing">
                    Hombre
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/categoria/electronics">
                    Electrónica
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/categoria/jewelery">
                    Joyería
                  </NavDropdown.Item>
                </NavDropdown>

                {isAuth && usuario && (
                  <>
                    <Nav.Link as={Link} to={`/perfil/${usuario}`}>
                      Perfil
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin">
                      Admin
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Col>

          {/* Buscador */}
          <Col xs={6} lg={4}>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar productos..."
                className="me-2"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
          </Col>

          {/* Botones */}
          <Col xs={3} lg={4} className="d-flex justify-content-end">
            {!isAuth ? (
              <Button
                as={Link}
                to="/login"
                variant="outline-light"
                className="me-2"
              >
                <FontAwesomeIcon icon={faUser} />
              </Button>
            ) : (
              <Button
                variant="outline-light"
                className="me-2"
                onClick={cerrarSesion}
              >
                Cerrar sesión
              </Button>
            )}

            <Button
              as={Link}
              to={isAuth ? "/carrito" : "#"}
              variant="outline-light"
              onClick={() => {
                if (!isAuth)
                  Swal.fire({
                    icon: "info",
                    title: "Debes iniciar sesión",
                    text: "Para ver el carrito primero debes iniciar sesión",
                    confirmButtonColor: "#0d6efd",
                  });
              }}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Navigation;
