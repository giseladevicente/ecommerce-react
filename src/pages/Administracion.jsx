import { Container, Card, Row, Col, Button } from "react-bootstrap";
import Main from "../components/Main";

export default function Administracion() {
  return (
    <>
      <Main />
      <Container className="mt-4 d-flex flex-column align-items-center">
        <Card className="m-4 shadow-lg p-4 w-100" style={{ maxWidth: "600px" }}>
          <Card.Body className="text-center">
            <Card.Title className="mb-3 fs-2">
              Panel de Administración
            </Card.Title>

            <Card.Text className="mb-3 fs-5">
              Acceso exclusivo para usuarios autenticados.
            </Card.Text>

            <Row className="mb-3 g-3">
              <Col>
                <Button variant="success" className="w-100">
                  Ver Pedidos
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

            <Button variant="secondary" className="w-50">
              Cerrar Sesión
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
