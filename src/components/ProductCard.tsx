import type { Producto } from '../services/api';
import { API_URL } from '../services/api';

interface ProductCardProps {
  producto: Producto;
  onSelect: (producto: Producto) => void;
  onAddToCart: (producto: Producto) => void;
}

export function ProductCard({ producto, onSelect, onAddToCart }: ProductCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => onSelect(producto)}
    >
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {producto.imagen ? (
          <img
            src={`${API_URL}${producto.imagen}`}
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">Sin imagen</span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{producto.nombre}</h3>
        <p className="text-2xl font-bold text-blue-600 mt-2">
          ${producto.valor.toFixed(2)}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(producto);
          }}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}