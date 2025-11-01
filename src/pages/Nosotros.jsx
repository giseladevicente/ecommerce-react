import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import Swal from "sweetalert2";

const Nosotros = () => {
  const [equipo, setEquipo] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  // API de randomuser
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=3&nat=es")
      .then((response) => response.json())
      .then((data) => {
        const personas = data.results.map((user) => ({
          nombre: `${user.name.first} ${user.name.last}`,
          foto: user.picture.large,
          rol: "Miembro del equipo",
          email: user.email,
        }));
        setEquipo(personas);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del equipo:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudieron cargar los miembros del equipo.",
        });
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Mensaje enviado",
      text: `Gracias ${nombre}, te responderemos pronto.`,
    });

    setNombre("");
    setEmail("");
    setMensaje("");
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Sobre Nosotros</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="mb-5">
          {equipo.map((persona, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="h-100 shadow-sm text-center p-3">
                <Card.Img
                  variant="top"
                  src={persona.foto}
                  alt={persona.nombre}
                  style={{
                    borderRadius: "50%",
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    margin: "0 auto 10px",
                  }}
                />
                <Card.Body>
                  <Card.Title>{persona.nombre}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {persona.rol}
                  </Card.Subtitle>
                  <Card.Text>
                    Contacto: <br />
                    <small>{persona.email}</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <h3 className="text-center mb-4">Contáctanos</h3>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMensaje">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Escribinos tu consulta..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">
                Enviar
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Nosotros;
