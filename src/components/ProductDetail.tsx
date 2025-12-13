import { X } from 'lucide-react';
import type { Producto } from '../services/api';
import { API_URL } from '../services/api';

interface ProductDetailProps {
  producto: Producto;
  onClose: () => void;
  onAddToCart: (producto: Producto) => void;
}

export function ProductDetail({ producto, onClose, onAddToCart }: ProductDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">{producto.nombre}</h2>
          <button onClick={onClose}><X className="w-6 h-6" /></button>
        </div>

        {producto.imagen && (
          <img src={`${API_URL}${producto.imagen}`} alt={producto.nombre} className="w-full h-96 object-contain bg-gray-100 rounded-lg mb-4" />
        )}

        <div className="flex justify-between items-center mb-4">
          <span>Precio:</span>
          <span className="text-3xl font-bold text-blue-600">${producto.valor.toFixed(2)}</span>
        </div>

        <button
          onClick={() => {
            onAddToCart(producto);
            onClose();
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}