import type { Producto } from '../services/api';

interface ProductCardProps {
  producto: Producto;
  onSelect: (producto: Producto) => void;
  onAddToCart: (producto: Producto) => void;
}

export function ProductCard({ producto, onSelect, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card" onClick={() => onSelect(producto)}>
      <div className="product-card-image">
        {producto.imagen ? (
          <img src={producto.imagen} alt={producto.nombre} />
        ) : (
          <span className="sin-imagen">Sin imagen</span>
        )}
      </div>
      <div className="product-card-body">
        <div className="product-card-nombre">{producto.nombre}</div>
        <div className="product-card-precio">
          ${producto.valor.toFixed(2)} <span>c/u</span>
        </div>
        <button
          className="btn-agregar-card"
          onClick={e => { e.stopPropagation(); onAddToCart(producto); }}
        >
          + Agregar
        </button>
      </div>
    </div>
  );
}