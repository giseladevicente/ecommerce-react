import { useEffect, useState, useContext } from "react";
import {
  Row,
  Col,
  Spinner,
  Form,
  Button,
  Card,
  InputGroup,
} from "react-bootstrap";
import Swal from "sweetalert2";
import ProductCard from "./ProductCard";
import { CartContext } from "../context/CartContext";
import { Search } from "react-bootstrap-icons";
import "../styles/ProductList.css";

const ProductList = ({
  category = null,
  limit = null,
  apiSource = "fakestore",
  filterBy = null,
}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { agregarAlCarrito } = useContext(CartContext);
  const [busquedaLocal, setBusquedaLocal] = useState("");

  useEffect(() => {
    // FAKESTORE
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
            stock: Math.floor(Math.random() * 100) + 1,
          }))
        );
    };

    // MOCKAPI
    const fetchMockApi = () => {
      const url = category
        ? `https://6910a5907686c0e9c20b3dc3.mockapi.io/products?category=${encodeURIComponent(
            category
          )}`
        : "https://6910a5907686c0e9c20b3dc3.mockapi.io/products";

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

        if (category) {
          finalData = finalData.filter(
            (item) => item.category.toLowerCase() === category.toLowerCase()
          );
        }

        setProducts(finalData);
        setFilteredProducts(finalData);
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

  // Filtro por búsqueda
  useEffect(() => {
    let result = [...products];

    if (busquedaLocal.trim() !== "") {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(busquedaLocal.toLowerCase()) ||
          p.description.toLowerCase().includes(busquedaLocal.toLowerCase())
      );
    }

    // Filtro por precio
    if (minPrice !== "") {
      result = result.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice !== "") {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    if (filterBy) {
      result = result.filter(filterBy);
    }

    setFilteredProducts(result);
  }, [products, busquedaLocal, minPrice, maxPrice, filterBy]);

  const handleFilter = () => {
    setMinPrice((prev) => prev);
    setMaxPrice((prev) => prev);
  };

  const handleClear = () => {
    setMinPrice("");
    setMaxPrice("");
    setFilteredProducts(products);
    setBusquedaLocal("");
  };

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  const productsToShow = limit
    ? filteredProducts.slice(0, limit)
    : filteredProducts;

  return (
    <>
      {/* Buscador */}
      <div className="mx-auto mb-4" style={{ maxWidth: "500px" }}>
        <Form className="mb-4" onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>

            <Form.Control
              type="search"
              placeholder="Buscar productos..."
              value={busquedaLocal}
              onChange={(e) => setBusquedaLocal(e.target.value)}
            />

            {busquedaLocal !== "" && (
              <Button
                variant="outline-secondary"
                onClick={() => setBusquedaLocal("")}
              >
                Limpiar
              </Button>
            )}
          </InputGroup>
        </Form>
      </div>

      {/* Filtro por precio */}
      <div className="mx-auto mb-4">
        <Card className="filter-card mb-4 shadow-sm border-1">
          <Card.Body>
            <h5 className="mb-3 fw-semibold text-primary">
              Filtrar por precio
            </h5>

            <Row className="gy-3">
              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="fw-medium">Precio mínimo</Form.Label>
                  <Form.Control
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Ej: 10"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="fw-medium">Precio máximo</Form.Label>
                  <Form.Control
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Ej: 100"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={4} className="d-flex gap-2 align-items-end">
                <Button
                  variant="primary"
                  className="w-50"
                  onClick={handleFilter}
                >
                  Filtrar
                </Button>

                <Button
                  variant="outline-secondary"
                  className="w-50"
                  onClick={handleClear}
                >
                  Limpiar
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      {/* Productos */}
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
    </>
  );
};

export default ProductList;
