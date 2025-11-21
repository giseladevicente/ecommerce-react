import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Administracion() {
  const { user } = useAuth();
  return (
    <>
      <Container className="mt-4 d-flex flex-column align-items-center">
        <Card className="m-4 shadow-lg p-4 w-100" style={{ maxWidth: "600px" }}>
          <Card.Header className="text-center">
            Acceso exclusivo para Administradores.
          </Card.Header>
          <Card.Body className="text-center">
            <Card.Title className="mb-3 fs-2">
              Panel de Administración
            </Card.Title>

            <Card.Text className="mb-3 fs-3 text-muted">
              ¡¡¡Bienvenido/a, {user}!!!
            </Card.Text>
            <Row className="mb-3 g-3">
              <Col>
                <Button
                  variant="success"
                  className="w-100"
                  as={Link}
                  to="/crud"
                >
                  Gestionar Productos
                </Button>
              </Col>
            </Row>

            <Row className="mb-3 g-3">
              <Col>
                <Button variant="danger" className="w-100">
                  Configuración
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
