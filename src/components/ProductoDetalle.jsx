import { Card, Badge, Button, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";

const ProductoDetalle = () => {
  const location = useLocation();
  const producto = location.state?.producto;
  const discount = producto.discount || 0;
  const precioFinal = producto.discountedPrice || producto.price;

  const { agregarAlCarrito } = useContext(CartContext);

  if (!producto) return <p>Producto no encontrado</p>;

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(producto);
    Swal.fire({
      title: "¡Producto agregado!",
      text: `Producto "${producto.title}" agregado al carrito.`,
      icon: "success",
      confirmButtonColor: "#0d6efd",
    });
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card className="shadow p-4 text-center" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Img
          variant="top"
          src={producto.image}
          alt={producto.title}
          style={{ height: "300px", objectFit: "contain" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{producto.title}</Card.Title>
          <Card.Text>{producto.description}</Card.Text>

          {discount > 0 ? (
            <div>
              <Card.Text className="text-muted mb-1">
                <small>
                  Precio anterior: <del>${producto.price.toFixed(2)}</del>
                </small>
              </Card.Text>
              <Card.Text className="text-danger fw-bold mb-2">
                ${precioFinal.toFixed(2)}{" "}
                <Badge bg="success">{discount}% OFF</Badge>
              </Card.Text>
            </div>
          ) : (
            <Card.Text className="fw-bold mb-2">
              ${producto.price.toFixed(2)}
            </Card.Text>
          )}

          <Button
            variant="primary"
            className="mt-2"
            onClick={handleAgregarAlCarrito}
          >
            Agregar al carrito
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductoDetalle;
