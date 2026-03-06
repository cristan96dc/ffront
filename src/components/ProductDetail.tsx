import { X, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import type { Producto } from '../services/api';

interface ProductDetailProps {
  producto: Producto;
  onClose: () => void;
  onAddToCart: (producto: Producto, cantidad?: number) => void;
}

export function ProductDetail({ producto, onClose, onAddToCart }: ProductDetailProps) {
  const [cantidad, setCantidad] = useState(1);

  const handleAgregarAlCarrito = () => {
    for (let i = 0; i < cantidad; i++) onAddToCart(producto);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{producto.nombre}</h2>
          <button className="modal-close" onClick={onClose}><X /></button>
        </div>
        <div className="modal-body">
          {producto.imagen && (
            <img src={producto.imagen} alt={producto.nombre} className="modal-imagen" />
          )}
          <div className="modal-precio-row">
            <span className="modal-precio-label">Precio unitario</span>
            <span className="modal-precio">${producto.valor.toFixed(2)}</span>
          </div>
          <span className="cantidad-label">Cantidad</span>
          <div className="quantity-controls">
            <button className="quantity-btn" onClick={() => setCantidad(p => Math.max(1, p - 1))}>
              <Minus size={18} />
            </button>
            <input
              type="number"
              className="quantity-input"
              value={cantidad}
              min="1"
              onChange={e => { const v = parseInt(e.target.value); if (!isNaN(v) && v > 0) setCantidad(v); }}
            />
            <button className="quantity-btn" onClick={() => setCantidad(p => p + 1)}>
              <Plus size={18} />
            </button>
          </div>
          <button className="btn-agregar-modal" onClick={handleAgregarAlCarrito}>
            🛒 Agregar al carrito ({cantidad})
          </button>
        </div>
      </div>
    </div>
  );
}