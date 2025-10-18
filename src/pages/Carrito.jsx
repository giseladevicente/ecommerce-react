import { Container, Card, Button, ListGroup, Image } from "react-bootstrap";

const Carrito = () => {
  const carrito = [
    {
      id: 1,
      title: "Remera básica",
      price: 25.99,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    {
      id: 2,
      title: "Zapatillas deportivas",
      price: 59.99,
      image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SL1500_.jpg",
    },
  ];

  const total = carrito.reduce((acc, prod) => acc + prod.price, 0).toFixed(2);

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card className="shadow p-4" style={{ maxWidth: "700px", width: "100%" }}>
        <h2 className="text-center mb-4">🛒 Tu Carrito</h2>

        {carrito.length === 0 ? (
          <p className="text-center text-muted">Tu carrito está vacío.</p>
        ) : (
          <>
            <ListGroup variant="flush">
              {carrito.map((prod) => (
                <ListGroup.Item
                  key={prod.id}
                  className="d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      rounded
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "contain",
                        marginRight: "15px",
                      }}
                    />
                    <div>
                      <h6 className="mb-1">{prod.title}</h6>
                      <small className="text-muted">
                        ${prod.price.toFixed(2)}
                      </small>
                    </div>
                  </div>
                  <Button variant="outline-danger" size="sm">
                    Eliminar
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <Card.Footer className="mt-4 text-center">
              <h5 className="mb-3">Total: ${total}</h5>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="outline-secondary">Vaciar carrito</Button>
                <Button variant="success">Pagar</Button>
              </div>
            </Card.Footer>
          </>
        )}
      </Card>
    </Container>
  );
};

export default Carrito;
