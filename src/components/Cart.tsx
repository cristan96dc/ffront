import { ShoppingCart, X, Send, Plus, Minus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { ItemCarrito } from '../services/api';

interface CartProps {
  items: ItemCarrito[];
  total: number;
  onRemoveItem?: (id: number) => void;
  onClearCart?: () => void;
  onUpdateQuantity?: (id: number, cantidad: number) => void;
}

export function Cart({ items, total, onRemoveItem, onClearCart, onUpdateQuantity }: CartProps) {
  const [isOpen, setIsOpen] = useState(false);

  const generarMensajeWhatsApp = () => {
    if (items.length === 0) {
      return encodeURIComponent('¡Hola! Me interesa conocer más sobre sus productos 😊');
    }

    let mensaje = '🛒 *Pedido desde Mi Tienda* 🛒\n\n';

    items.forEach(item => {
      mensaje += `• ${item.nombre}\n`;
      mensaje += `  Cantidad: ${item.cantidad}\n`;
      mensaje += `  Precio: $${item.valor.toFixed(2)} c/u\n`;
      mensaje += `  Subtotal: $${(item.valor * item.cantidad).toFixed(2)}\n\n`;
    });

    mensaje += `━━━━━━━━━━━━━━━━\n`;
    mensaje += `💰 *TOTAL: $${total.toFixed(2)}*\n\n`;
    mensaje += `¡Gracias por tu pedido! 😊`;

    return encodeURIComponent(mensaje);
  };

  const enviarPorWhatsApp = () => {
    const mensaje = generarMensajeWhatsApp();
    const numeroWhatsApp = '5491234567890';
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    window.open(url, '_blank');
  };

  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <>
      {/* Botón flotante del carrito - SIEMPRE VISIBLE */}
      <button
        className="cart-float-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart className="cart-icon" />
        {totalItems > 0 && (
          <span className="cart-badge">{totalItems}</span>
        )}
      </button>

      {/* Panel del carrito - se abre/cierra */}
      {isOpen && (
        <div className="cart-panel">
          <div className="cart-header">
            <div className="cart-title-section">
              <h3 className="cart-title">Mi Carrito</h3>
              <p className="cart-subtitle">
                {totalItems === 0 ? 'Vacío' : `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`}
              </p>
            </div>

            <button className="cart-close-btn" onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>

          <div className="cart-content">
            {items.length === 0 ? (
              <div className="cart-empty">
                <p className="cart-empty-text">Tu carrito está vacío</p>
                <p className="cart-empty-subtext">¡Agrega productos para comenzar!</p>
              </div>
            ) : (
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-header">
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.nombre}</div>
                        <div className="cart-item-price">${item.valor.toFixed(2)} c/u</div>
                      </div>

                      {onRemoveItem && (
                        <button
                          className="cart-item-remove"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 />
                        </button>
                      )}
                    </div>

                    <div className="cart-item-footer">
                      <div className="cart-item-quantity">
                        {onUpdateQuantity && (
                          <button
                            className="quantity-btn-small"
                            onClick={() => onUpdateQuantity(item.id, item.cantidad - 1)}
                            disabled={item.cantidad <= 1}
                          >
                            <Minus />
                          </button>
                        )}

                        <span className="quantity-display">{item.cantidad}</span>

                        {onUpdateQuantity && (
                          <button
                            className="quantity-btn-small"
                            onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}
                          >
                            <Plus />
                          </button>
                        )}
                      </div>

                      <span className="cart-item-total">
                        ${(item.valor * item.cantidad).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="cart-total-section">
              <div className="cart-total-box">
                <span className="cart-total-label">Total:</span>
                <span className="cart-total-amount">${total.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="cart-actions">
            <button className="cart-whatsapp-btn" onClick={enviarPorWhatsApp}>
              <Send />
              <span>{items.length === 0 ? 'Consultar por WhatsApp' : 'Enviar por WhatsApp'}</span>
            </button>

            {items.length > 0 && onClearCart && (
              <button className="cart-clear-btn" onClick={onClearCart}>
                Vaciar Carrito
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}