# Pre-Entrega Talento Tech - React.js

## E-commerce React.js

Proyecto de un E-commerce desarrollado con React + Vite, utilizando React-Bootstrap para el diseño, FakeStore API como fuente de productos y SweetAlert2 para las alertas.

## 📑 Índice

- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Ejecución del proyecto](#ejecución-del-proyecto)
- [Rama de entrega](#rama-de-entrega)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
  - [Navbar](#navbar)
  - [Home](#home)
  - [Nosotros](#nosotros)
  - [Categorías](#categorías)
  - [Perfil y Administración](#perfil-y-administración)
  - [Carrito](#carrito)

## Tecnologías utilizadas

- ⚛️ **React** (con Vite)
- 🎨 **React-Bootstrap**
- 🧭 **React Router DOM**
- 💬 **SweetAlert2**
- 🌟 **Font Awesome Icons**
- 🛍️ **FakeStore API**
- 👥 **RandomUser API**

🔝 [Volver al índice](#📑-índice)

## Ejecución del proyecto

1. Clonar el repositorio

```bash
   git clone https://github.com/giseladevicente/proyectofinal-25235-gdv.git
```

2. Acceder al directorio del proyecto

```bash
cd nombre-del-proyecto
```

3. Instalar dependencias

```bash
npm install
```

4. Ejecutar el proyecto

```bash
npm run dev
```

🔝 [Volver al índice](#📑-índice)

## Rama de entrega

El proyecto se encuentra en la rama **pre-entrega**.

🔝 [Volver al índice](#📑-índice)

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
│ └── RutaProtegida.jsx
├── pages/
│ ├── Administracion.jsx
│ ├── Carrito.jsx
│ ├── Categorias.jsx
│ ├── Home.jsx
│ ├── Login.jsx
│ ├── Nosotros.jsx
│ ├── Perfil.jsx
│ └── Productos.jsx
├── styles/
  ├── Footer.css
│ └── Nav.css
├── App.jsx
└── main.jsx
```

🔝 [Volver al índice](#📑-índice)

## Funcionalidades

### Navbar

- Navegación entre todas las secciones del sitio: **Home**, **Nosotros**, **Categorías**, **Perfil**, **Admin**, **Carrito** y **Login**.
- Incluye un **buscador** (sin funcionalidad activa por el momento).
- El botón de **inicio de sesión** cambia dinámicamente a “Cerrar sesión” al autenticarse.
- El botón de **carrito** muestra una alerta si el usuario intenta acceder sin iniciar sesión.

🔝 [Volver al índice](#📑-índice)

### Home

- Contiene un **banner principal** con un botón que redirige a la página de _Todos los productos_.
- Presenta una **sección de productos destacados** con descuentos aplicados.

🔝 [Volver al índice](#📑-índice)

### Nosotros

- Utiliza la **API RandomUser** para mostrar información de integrantes ficticios del equipo.
- Incluye un **formulario de contacto**.

🔝 [Volver al índice](#📑-índice)

### Categorías

- Permite filtrar productos por categoría:
  - 👩 Mujer
  - 👨 Hombre
  - 💻 Electrónica
  - 💍 Joyería
  - 🛒 Todos los productos
- Cada producto se muestra en una **card** con imagen, descripción y precio.
- Los productos destacados incluyen **descuento visible** que son respetados en todas las categorias.
- Cada card tiene un botón **“Agregar al carrito”**, que muestra un **SweetAlert2** confirmando la acción (sin funcionalidad real aún).

🔝 [Volver al índice](#📑-índice)

### Perfil y Administración

- Secciones visibles **solo al iniciar sesión**.
- El sistema de autenticación utiliza `localStorage` para controlar el estado del usuario y sus rutas están **protegidas**, siendo solo accesibles si el usuario está logueado.
- Incluyen una estructura básica pensada para futuras funcionalidades.

🔝 [Volver al índice](#📑-índice)

### Carrito

- Página estructurada pero **sin funcionalidad completa**.
- Muestra un esquema estático como base para su desarrollo posterior.

🔝 [Volver al índice](#📑-índice)
