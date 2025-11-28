import { Card, Badge, Button, Container, Spinner } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { ArrowLeft } from "react-bootstrap-icons";


const ProductoDetalle = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const params = useParams();
  const initialProducto = location.state?.producto;

  const [producto, setProducto] = useState(initialProducto || null);
  const [loading, setLoading] = useState(!initialProducto);

  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    if (initialProducto) return;
    const { source, id } = params;
    if (!id) return;

    const fetchBySource = async () => {
      setLoading(true);
      try {
        if (source === "fakestore") {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          const data = await res.json();
          const mapped = {
            id: Number(data.id),
            title: data.title,
            price: Number(data.price),
            image: data.image,
            description: data.description,
            category: data.category,
            discount: data.id >= 1 && data.id <= 8 ? 30 : 0,
            source: "fakestore",
          };
          mapped.discountedPrice = mapped.discount
            ? (mapped.price * (100 - mapped.discount)) / 100
            : mapped.price;
          setProducto(mapped);
        } else if (source === "mockapi" || source === "mock") {
          const res = await fetch(
            `https://6910a5907686c0e9c20b3dc3.mockapi.io/products/${id}`
          );
          const data = await res.json();
          const mapped = {
            id: Number(data.id),
            title: data.title,
            price: Number(data.price),
            image: data.image,
            description: data.description,
            category: data.category,
            discount: Number(data.discount) || 0,
            stock: Number(data.stock) || 0,
            source: "mockapi",
          };
          mapped.discountedPrice = mapped.discount
            ? (mapped.price * (100 - mapped.discount)) / 100
            : mapped.price;
          setProducto(mapped);
        } else {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          if (res.ok) {
            const data = await res.json();
            const mapped = {
              id: Number(data.id),
              title: data.title,
              price: Number(data.price),
              image: data.image,
              description: data.description,
              category: data.category,
              discount: data.id >= 1 && data.id <= 8 ? 30 : 0,
              source: "fakestore",
            };
            mapped.discountedPrice = mapped.discount
              ? (mapped.price * (100 - mapped.discount)) / 100
              : mapped.price;
            setProducto(mapped);
          } else {
            const res2 = await fetch(
              `https://6910a5907686c0e9c20b3dc3.mockapi.io/products/${id}`
            );
            if (res2.ok) {
              const data = await res2.json();
              const mapped = {
                id: Number(data.id),
                title: data.title,
                price: Number(data.price),
                image: data.image,
                description: data.description,
                category: data.category,
                discount: Number(data.discount) || 0,
                source: "mockapi",
              };
              mapped.discountedPrice = mapped.discount
                ? (mapped.price * (100 - mapped.discount)) / 100
                : mapped.price;
              setProducto(mapped);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBySource();
  }, [initialProducto, params]);

  const discount = producto?.discount || 0;
  const precioFinal = producto ? producto.discountedPrice || producto.price : 0;

  const handleAgregarAlCarrito = () => {
    if (!producto) return;
    agregarAlCarrito(producto);
    Swal.fire({
      title: "¡Producto agregado!",
      text: `Producto "${producto.title}" agregado al carrito.`,
      icon: "success",
      confirmButtonColor: "#0d6efd",
    });
  };

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <Container className="my-5 d-flex flex-column align-items-center">
      <Button variant="secondary" className="m-3 btn-volver" onClick={() => navigate(-1)}>
         <ArrowLeft className="me-2"/>Volver
      </Button>

      <Card
        className="shadow p-4 text-center"
        style={{ maxWidth: "600px", width: "100%" }}
      >
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

          <Card.Text className="text-muted mb-3">
            <small>Stock: {producto.stock}</small>
          </Card.Text>

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
