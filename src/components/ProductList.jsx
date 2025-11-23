import { useEffect, useState, useContext } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import ProductCard from "./ProductCard";
import { CartContext } from "../context/CartContext";

const ProductList = ({
  category = null,
  limit = null,
  apiSource = "fakestore",
  filterBy = null,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    const fetchFakeStore = () => {
      const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : "https://fakestoreapi.com/products";

      return fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("Error al obtener productos FAKESTORE");
          return res.json();
        })
        .then((data) =>
          data.map((item) => ({
            id: Number(item.id),
            title: item.title,
            price: Number(item.price),
            image: item.image,
            description: item.description,
            category: item.category,
            discount: item.id >= 1 && item.id <= 8 ? 30 : 0,
            source: "fakestore",
          }))
        );
    };

    const fetchMockApi = () => {
      const url = "https://6910a5907686c0e9c20b3dc3.mockapi.io/products";

      return fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("Error al obtener productos MOCKAPI");
          return res.json();
        })
        .then((data) =>
          data.map((item) => ({
            id: Number(item.id),
            title: item.title,
            price: Number(item.price),
            image: item.image,
            description: item.description,
            category: item.category,
            discount: Number(item.discount),
            stock: Number(item.stock),
            source: "mockapi",
          }))
        );
    };

    const loadProducts = async () => {
      try {
        let finalData = [];

        // FakeStore y MockApi
        if (apiSource === "both") {
          const [fake, mock] = await Promise.all([
            fetchFakeStore(),
            fetchMockApi(),
          ]);
          finalData = [...fake, ...mock];
        }

        // Solo FakeStore
        if (apiSource === "fakestore") {
          finalData = await fetchFakeStore();
        }

        // Solo MockAPI
        if (apiSource === "mock") {
          finalData = await fetchMockApi();
        }

        setProducts(finalData);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un problema al cargar los productos.",
          confirmButtonColor: "#0d6efd",
          confirmButtonText: "Ok",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, apiSource]);

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  const filteredProducts = filterBy ? products.filter(filterBy) : products;

  const productsToShow = limit
    ? filteredProducts.slice(0, limit)
    : filteredProducts;

  return (
    <Row>
      {productsToShow.map((product) => {
        const discount = product.discount || 0;
        const discountedPrice = discount
          ? (product.price * (100 - discount)) / 100
          : product.price;

        return (
          <Col
            key={`${product.source}-${product.id}`}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4"
          >
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
