import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    const prodWithSource = {
      ...producto,
      source: producto.source || "unknown",
    };
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find(
        (item) =>
          item.id === prodWithSource.id && item.source === prodWithSource.source
      );
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === prodWithSource.id && item.source === prodWithSource.source
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...prodWithSource, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id, removeAll = false, source = undefined) => {
    setCarrito((prevCarrito) =>
      prevCarrito.reduce((acc, item) => {
        const matchById = item.id === id;
        const matchBySource = source ? item.source === source : true;
        if (!(matchById && matchBySource)) return acc.concat(item);
        if (removeAll) return acc; 
        if (item.cantidad > 1)
          return acc.concat({ ...item, cantidad: item.cantidad - 1 });
        return acc; 
      }, [])
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
