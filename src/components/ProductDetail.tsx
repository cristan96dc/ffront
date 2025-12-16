import { X, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import type { Producto } from '../services/api';
import { API_URL } from '../services/api';

interface ProductDetailProps {
  producto: Producto;
  onClose: () => void;
  onAddToCart: (producto: Producto, cantidad?: number) => void;
}

export function ProductDetail({ producto, onClose, onAddToCart }: ProductDetailProps) {
  const [cantidad, setCantidad] = useState(1);

  const incrementar = () => setCantidad(prev => prev + 1);
  const decrementar = () => setCantidad(prev => Math.max(1, prev - 1));

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setCantidad(value);
    }
  };

  const handleAgregarAlCarrito = () => {
    for (let i = 0; i < cantidad; i++) {
      onAddToCart(producto);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg max-w-2xl w-full p-6 transform transition-all duration-300 scale-100 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{producto.nombre}</h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {producto.imagen && (
          <img
            src={`${API_URL}${producto.imagen}`}
            alt={producto.nombre}
            className="w-full h-96 object-contain bg-gray-100 rounded-lg mb-4"
          />
        )}

        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-600 text-lg">Precio:</span>
          <span className="text-3xl font-bold text-blue-600">${producto.valor.toFixed(2)}</span>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cantidad
          </label>
          <div className="quantity-controls">
            <button
              onClick={decrementar}
              className="quantity-btn"
              type="button"
            >
              <Minus size={20} />
            </button>

            <input
              type="number"
              value={cantidad}
              onChange={handleCantidadChange}
              className="quantity-input"
              min="1"
            />

            <button
              onClick={incrementar}
              className="quantity-btn"
              type="button"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAgregarAlCarrito}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition-all"
          >
            Agregar al carrito ({cantidad})
          </button>
        </div>
      </div>
    </div>
  );
}