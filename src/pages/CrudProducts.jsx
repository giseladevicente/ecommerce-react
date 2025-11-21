import { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { PlusCircle, PencilSquare, Trash3 } from "react-bootstrap-icons";

const API_URL = "https://6910a5907686c0e9c20b3dc3.mockapi.io/products";

const CrudProductos = () => {
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category: "",
    discount: "",
  });

  const [editId, setEditId] = useState(null);

  // Obtener Productos
  const getProductos = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los productos.",
        })
      )
      .finally(() => setLoading(false));
  };

  //cargar los productos
  useEffect(() => {
    getProductos();
  }, []);

  //Cerrar modal y limpiar form
  const handleClose = () => {
    setShow(false);
    setForm({
      title: "",
      description: "",
      price: "",
      stock: "",
      image: "",
      category: "",
      discount: "",
    });
    setEditId(null);
    setErrors({});
  };

  //Abrir modal (editar o crear)
  const handleShow = (producto) => {
    setShow(true);
    if (producto) {
      setForm({
        ...producto,
        price: Number(producto.price),
        stock: Number(producto.stock),
        discount: Number(producto.discount),
      });
      setEditId(producto.id);
    }
  };

  // Validaciones
  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!form.title.trim()) nuevosErrores.title = "El título es obligatorio.";
    if (!form.price || form.price <= 0)
      nuevosErrores.price = "El precio debe ser mayor a 0.";
    if (!form.description.trim() || form.description.length < 10)
      nuevosErrores.description =
        "La descripción debe tener al menos 10 caracteres.";
    if (!form.stock || form.stock < 0)
      nuevosErrores.stock = "El stock debe ser mayor o igual a 0.";
    if (!form.image.trim())
      nuevosErrores.image = "La URL de imagen es obligatoria.";
    if (!form.category.trim())
      nuevosErrores.category = "La categoría es obligatoria.";
    if (form.discount < 0)
      nuevosErrores.discount = "El descuento no puede ser negativo.";

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Crear o editar producto
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      Swal.fire({
        icon: "warning",
        title: "Formulario inválido",
        text: "Por favor corrige los errores antes de continuar.",
      });
      return;
    }

    setSubmitting(true);

    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      discount: Number(form.discount),
    };

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar el producto");
        return res.json();
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: editId ? "Producto actualizado" : "Producto agregado",
          text: "Los cambios se guardaron correctamente.",
          timer: 2000,
          showConfirmButton: false,
        });
        handleClose();
        getProductos();
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al guardar el producto.",
        })
      )
      .finally(() => setSubmitting(false));
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
          .then((res) => {
            if (!res.ok) throw new Error("Error al eliminar el producto");
            getProductos();
            Swal.fire({
              icon: "success",
              title: "Eliminado",
              text: "El producto fue eliminado correctamente.",
              timer: 2000,
              showConfirmButton: false,
            });
          })
          .catch(() =>
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo eliminar el producto.",
            })
          );
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>CRUD de Productos</h2>
        <Button variant="success" onClick={() => handleShow()}>
          <PlusCircle className="me-2" />
          Agregar Producto
        </Button>
      </div>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Category</th>
              <th>Discount</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.title}</td>
                <td>{prod.description}</td>
                <td>${Number(prod.price).toFixed(2)}</td>
                <td>{prod.stock}</td>
                <td>
                  {prod.image?.startsWith("http") ? (
                    <img
                      src={prod.image}
                      alt={prod.title}
                      width={50}
                      height={50}
                      style={{ objectFit: "cover", borderRadius: "5px" }}
                    />
                  ) : (
                    <span>{prod.image}</span>
                  )}
                </td>
                <td>{prod.category}</td>
                <td>{prod.discount ? `${prod.discount}%` : "-"}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleShow(prod)}
                  >
                    <PencilSquare /> Editar
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => eliminarProducto(prod.id)}
                  >
                    <Trash3 /> Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal de agregar / editar */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Editar" : "Agregar"} Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Título</Form.Label>
              <Form.Control
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                isInvalid={!!errors.price}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: Number(e.target.value) })
                }
                required
                isInvalid={!!errors.stock}
              />
              <Form.Control.Feedback type="invalid">
                {errors.stock}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                isInvalid={!!errors.category}
              />
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Descuento</Form.Label>
              <Form.Control
                type="number"
                value={form.discount}
                onChange={(e) =>
                  setForm({ ...form, discount: Number(e.target.value) })
                }
                required
                isInvalid={!!errors.discount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.discount}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end mt-3">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
                disabled={submitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                //   className="mt-3"
                disabled={submitting}
                variant={submitting ? "secondary" : "primary"}
              >
                {submitting && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    className="me-2"
                  />
                )}
                {submitting
                  ? editId
                    ? "Guardando cambios..."
                    : "Creando producto..."
                  : editId
                  ? "Guardar Cambios"
                  : "Crear Producto"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CrudProductos;
