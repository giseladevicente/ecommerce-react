import { useContext } from "react";
import {
  Container,
  Card,
  Button,
  ListGroup,
  Image,
  ButtonGroup,
} from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";

const Carrito = () => {
  const { carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito } =
    useContext(CartContext);

  const total = carrito
    .reduce(
      (acc, prod) =>
        acc + Number(prod.discountedPrice || prod.price) * prod.cantidad,
      0
    )
    .toFixed(2);

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
                  key={`${prod.source}-${prod.id}`}
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
                      <div className="d-flex align-items-center justify-content-between gap-3">
                        <small className="text-muted">
                          {prod.discount > 0 ? (
                            <>
                              <del>${prod.price.toFixed(2)}</del>{" "}
                              <strong className="text-danger">
                                ${prod.discountedPrice.toFixed(2)}
                              </strong>{" "}
                              <span className="text-success">
                                {prod.discount}% OFF
                              </span>
                            </>
                          ) : (
                            <>{`$${prod.price.toFixed(2)}`}</>
                          )}
                        </small>

                        <div className="d-flex align-items-center">
                          <ButtonGroup
                            size="sm"
                            aria-label={`Controles de cantidad ${prod.title}`}
                          >
                            <Button
                              variant="outline-secondary"
                              onClick={() => agregarAlCarrito(prod)}
                              aria-label={`Aumentar cantidad de ${prod.title}`}
                            >
                              +
                            </Button>

                            <Button
                              variant="outline-secondary"
                              disabled
                              className="px-3"
                            >
                              {prod.cantidad}
                            </Button>

                            <Button
                              variant="outline-secondary"
                              onClick={() => {
                                if (prod.cantidad === 1) {
                                  Swal.fire({
                                    title: "¿Eliminar última unidad?",
                                    text: `Se eliminará la última unidad de "${prod.title}" del carrito.`,
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#d33",
                                    cancelButtonColor: "#6c757d",
                                    confirmButtonText: "Sí, eliminar",
                                    cancelButtonText: "Cancelar",
                                  }).then((result) => {
                                    if (result.isConfirmed)
                                      eliminarDelCarrito(
                                        prod.id,
                                        false,
                                        prod.source
                                      );
                                  });
                                } else {
                                  eliminarDelCarrito(
                                    prod.id,
                                    false,
                                    prod.source
                                  );
                                }
                              }}
                              aria-label={`Disminuir cantidad de ${prod.title}`}
                            >
                              -
                            </Button>
                          </ButtonGroup>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        Swal.fire({
                          title: "¿Estás seguro?",
                          text: `Se eliminarán todas las unidades de "${prod.title}" del carrito`,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#6c757d",
                          confirmButtonText: "Sí, eliminar todo",
                          cancelButtonText: "Cancelar",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            eliminarDelCarrito(prod.id, true, prod.source);
                            Swal.fire({
                              icon: "success",
                              title: "Eliminado",
                              text: `Todas las unidades de "${prod.title}" fueron removidas del carrito`,
                              showConfirmButton: false,
                              timer: 1400,
                            });
                          }
                        });
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <Card.Footer className="mt-4 text-center">
              <h5 className="mb-3">Total: ${total}</h5>
              <div className="d-flex justify-content-center gap-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    Swal.fire({
                      title: "¿Estás seguro?",
                      text: "Se eliminarán todos los productos del carrito.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#0d6efd",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Sí, vaciar",
                      cancelButtonText: "Cancelar",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        vaciarCarrito();
                        Swal.fire({
                          icon: "success",
                          title: "Carrito vacío",
                          showConfirmButton: false,
                          timer: 1200,
                        });
                      }
                    });
                  }}
                >
                  Vaciar carrito
                </Button>
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
