import { Card, Button, Badge } from "react-bootstrap";

const ProductCard = ({ product, discount = 0, agregarAlCarrito }) => {
  return (
    <Card className="h-100 d-flex flex-column shadow-sm">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        className="card-img-top img-fluid"
        style={{ height: "200px", objectFit: "contain" }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{product.title}</Card.Title>
        <Card.Text>{product.description.slice(0, 100)}...</Card.Text>
        {discount > 0 ? (
          <div>
            <Card.Text className="text-muted mb-1">
              <small>
                Precio anterior: <del>${product.price.toFixed(2)}</del>
              </small>
            </Card.Text>
            <Card.Text className="text-danger fw-bold mb-2">
              ${product.discountedPrice.toFixed(2)}{" "}
              <Badge bg="success">{discount}% OFF</Badge>
            </Card.Text>
          </div>
        ) : (
          <Card.Text className="fw-bold mb-2">
            ${product.price.toFixed(2)}
          </Card.Text>
        )}

        <Button
          variant="primary"
          className="mt-2"
          onClick={() => agregarAlCarrito(product)}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
