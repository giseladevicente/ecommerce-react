import { useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import Main from "../components/Main";

export default function Perfil() {
  const { usuario } = useParams();

  return (
    <>
    <Main />
    <Container className="mt-4 d-flex flex-column align-items-center">
 <Card className="m-4 shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>
        <Card.Body className="text-center d-flex flex-column align-items-center gap-3">
          <Card.Title className="mb-3 fs-2">
            Perfil del Usuario
          </Card.Title>
          
          <Card.Text className="mb-2 fs-5">
            Bienvenido, <strong>{usuario}</strong>!
          </Card.Text>
          
          <Card.Text className="mb-3 text-muted fs-6">
            Sos un perfil registrado y tienes acceso completo a tu cuenta.
          </Card.Text>

          <Button variant="primary" className="w-50">
            Editar mi perfil
          </Button>
                    <Button variant="primary" className="w-50 ">
            Mis compras
          </Button>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}


