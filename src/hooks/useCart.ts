import { useState, useEffect } from 'react';
import type { Producto, ItemCarrito } from '../services/api';

export function useCart() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito(prev => {
      const exists = prev.find(item => item.id === producto.id);
      
      if (exists) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const removerDelCarrito = (id: number) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad < 1) {
      removerDelCarrito(id);
      return;
    }
    
    setCarrito(prev =>
      prev.map(item =>
        item.id === id ? { ...item, cantidad } : item
      )
    );
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const total = carrito.reduce(
    (sum, item) => sum + (item.valor * item.cantidad),
    0
  );

  return {
    carrito,
    agregarAlCarrito,
    removerDelCarrito,
    actualizarCantidad,
    limpiarCarrito,
    total,
    cantidadTotal: carrito.reduce((sum, item) => sum + item.cantidad, 0)
  };
}