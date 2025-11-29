# E-commerce React.js - Proyecto Final (Curso Talento Tech)

## Descripción

E-commerce desarrollado con React + Vite, utilizando React-Bootstrap para el diseño y SweetAlert2 para las alertas, incorporando sistema de autenticación, roles, carrito funcional, rutas protegidas, filtrado por categorías, CRUD de productos, consumo e integración de FakeStore API, MockAPI en la app y consumo de RandomUser API para la sección Nosotros.

## Índice

- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Ejecución del proyecto](#ejecución-del-proyecto)
- [Rama de entrega](#rama-de-entrega)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
  - [Autenticación y roles](#autenticación-y-roles)
  - [Rutas protegidas](#rutas-protegidas)
  - [Navbar](#navbar)
  - [Home](#home)
  - [Nosotros](#nosotros)
  - [Productos](#productos)
  - [Detalle de Producto](#detalle-de-producto)
  - [Categorías](#categorías)
  - [Carrito](#carrito)
  - [Administración y CRUD MockAPI](#administración-y-crud-mockapi)
  - [Perfil](#perfil)
  - [Autor](#autor)
  - [Demo del proyecto](#demo-del-proyecto)
  

## Tecnologías utilizadas

- ⚛️ **React + Vite**
- 🎨 **React-Bootstrap**
- 🧭 **React Router DOM**
- 💬 **SweetAlert2**
- 🌟 **Font Awesome Icons**
- 🛍️ **FakeStore API** (productos)
- 🛍️ **MockAPI** (productos y CRUD de gestión)
- 👥 **RandomUser API** (sección "Nosotros")

🔝 [Volver al índice](#índice)

## Ejecución del proyecto

1. Clonar el repositorio

```bash
   git clone https://github.com/giseladevicente/proyectofinal-25235-gdv.git
```

2. Acceder al directorio del proyecto

```bash
cd proyectofinal-25235-gdv
```

3. Instalar dependencias

```bash
npm install
```

4. Ejecutar el proyecto

```bash
npm run dev
```

🔝 [Volver al índice](#índice)

## Rama de entrega

El proyecto final se encuentra en la rama `main`, donde se integró el contenido de la rama **final**. 

Durante el desarrollo se utilizaron las ramas **pre-entrega**, **etapa-intermedia** y **final** como parte del proceso de construcción del proyecto.


🔝 [Volver al índice](#índice)

## Estructura del proyecto

```bash
src/
├── components/
│ ├── Footer.jsx
│ ├── Header.jsx
│ ├── Main.jsx
│ ├── Nav.jsx
│ ├── ProductCard.jsx
│ ├── ProductList.jsx
│ ├── ProductoDetalle.jsx
│ └── RutaProtegida.jsx
│
├── context/
│ ├── AuthContext.jsx
│ ├── AuthProvider.jsx
│ ├── CartContext.jsx
│ └── CartProvider.jsx
│
├── hooks/
│ ├── useAuth.jsx
│ └── useLogout.jsx
│
├── pages/
│ ├── Administracion.jsx
│ ├── Carrito.jsx
│ ├── Categorias.jsx
│ ├── CrudProducts.jsx
│ ├── Home.jsx
│ ├── Login.jsx
│ ├── Nosotros.jsx
│ ├── Perfil.jsx
│ ├── Registro.jsx
│ └── Productos.jsx
│
├── styles/
│ ├── Footer.css
│ ├── Main.css
│ └── Nav.css
│
├── App.jsx
└── main.jsx
```

🔝 [Volver al índice](#índice)

## Funcionalidades

### Autenticación y roles

- Implementada con Context API + localStorage.
- Registro de usuarios (guardados en localStorage).
- Generación de token falso.
- Estado persistente al recargar la página.

- **Roles disponibles:**

  - user
  - admin

- **Credenciales del administrador:**
  - Usuario: admin
  - Contraseña: 123

🔝 [Volver al índice](#índice)

### Rutas protegidas

**Visitantes no autenticados:** Home, Nosotros, Categorías, Login.
**Usuarios registrados:** Home, Nosotros, Categorías, Perfil y Carrito.
**Administrador:** Home, Nosotros, Categorías, Carrito y Admin (CRUD de productos).

🔝 [Volver al índice](#índice)

### Navbar

- Navegación entre todas las secciones del sitio.
- Buscador en tiempo real.
- Botón dinámico "Registrate" visible solo si el usuario no está autenticado.
- Botón dinámico Login/Cerrar Sesión.
- Botón Carrito con alerta si el usuario no autenticado intenta acceder.

🔝 [Volver al índice](#índice)

### Home

- Banner principal.
- Botón con redirección a _Todos los productos_.
- Sección de productos destacados con descuentos.

🔝 [Volver al índice](#índice)

### Nosotros

- Consumo de **API RandomUser** para mostrar información de integrantes ficticios del equipo.
- Formulario de contacto.

🔝 [Volver al índice](#índice)

### Productos

- Listado desde MockAPI y FakeStore API.
- Cards con imagen, precio y botón de "Agregar al carrito".
- Link al detalle del producto.

🔝 [Volver al índice](#índice)

### Detalle de Producto

- Información completa del producto.
- Botón "Agregar al carrito".
- Manejo de productos según origen: MockAPI o FakeStore
- Botón "Volver" que regresa a la página anterior.

🔝 [Volver al índice](#índice)

### Categorías

- Filtrado por:

  - 🛒 Todos los productos
  - 👩 Mujer
  - 👨 Hombre
  - 💻 Electrónica
  - 💍 Joyería

- Card con imagen, descripción y precio.
- Descuentos visibles respetados en todas las categorías.
- Botón "Agregar al carrito".

🔝 [Volver al índice](#índice)

### Carrito

- Agregar productos.
- Aumentar cantidades.
- Eliminar uno o todos.
- Vaciar carrito.
- Cálculo dinámico del total.
- Botón "Pagar" (pendiente de implementación).

**Solo accesible si estás autenticado.**

🔝 [Volver al índice](#índice)

### Administración y CRUD MockAPI

- Botón "Gestionar Productos" (solo administrador).
  - CRUD completo:
    - Listado de productos.
    - Crear nuevo producto.
    - Editar producto existente.
    - Eliminar producto.
- Botón "Configuración" sin funcionalidad.

🔝 [Volver al índice](#índice)

### Perfil

- Ruta protegida que muestra:
  - Nombre del usuario.
  - Botón "Editar mi perfil" (pendiente de implementación).
  - Botón "Mis compras" (pendiente de implementación).

🔝 [Volver al índice](#índice)

## Autor

- **Gisela De Vicente**
- Proyecto final – Talento Tech React.js
- GitHub: https://github.com/giseladevicente

🔝 [Volver al índice](#índice)

## Demo del proyecto

Proyecto desplegado en Vercel: 

👉 https://ecommerce-gdv.vercel.app


🔝 [Volver al índice](#índice)