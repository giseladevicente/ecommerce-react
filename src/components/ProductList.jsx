import { useEffect, useState, useContext } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import ProductCard from "./ProductCard";
import { CartContext } from "../context/CartContext";

const ProductList = ({ category = null, limit = null }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    let url = "https://fakestoreapi.com/products";
    if (category) {
      url = `https://fakestoreapi.com/products/category/${category}`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un problema al cargar los productos.",
          confirmButtonColor: "#0d6efd",
          confirmButtonText: "Ok",
        });
      })
      .finally(() => setLoading(false));
  }, [category]);

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  const productsToShow = limit ? products.slice(0, limit) : products;

  return (
    <Row>
      {productsToShow.map((product) => {
        const discount = product.id >= 1 && product.id <= 8 ? 30 : 0;
        const discountedPrice = discount
          ? (product.price * (100 - discount)) / 100
          : product.price;

        return (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <ProductCard
              product={{ ...product, discountedPrice }}
              discount={discount}
              agregarAlCarrito={() => {
                agregarAlCarrito({ ...product, discount, discountedPrice });
                Swal.fire({
                  title: "¡Producto agregado!",
                  text: `Producto "${product.title}" agregado al carrito.`,
                  icon: "success",
                  confirmButtonColor: "#0d6efd",
                });
              }}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default ProductList;
