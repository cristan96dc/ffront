import { ShoppingBag, Trash2 } from 'lucide-react';
import type { ItemCarrito } from '../services/api';

interface CartProps {
  items: ItemCarrito[];
  total: number;
  onRemoveItem?: (id: number) => void;
  onClearCart?: () => void;
}

export function Cart({ items, total, onRemoveItem, onClearCart }: CartProps) {
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl p-5 w-80 z-40 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          <h3 className="font-bold text-lg">Carrito</h3>
          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
            {items.length}
          </span>
        </div>
        
        {onClearCart && items.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Vaciar
          </button>
        )}
      </div>
      
      <div className="space-y-3 max-h-60 overflow-y-auto mb-4 pr-2">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">{item.nombre}</span>
                <span className="text-xs text-gray-500">x{item.cantidad}</span>
              </div>
              <div className="text-sm text-gray-600">
                ${item.valor.toFixed(2)} c/u
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="font-bold text-blue-600">
                ${(item.valor * item.cantidad).toFixed(2)}
              </span>
              
              {onRemoveItem && (
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-3">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-lg">Total:</span>
          <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
        </div>
        
        <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Finalizar compra
        </button>
      </div>
    </div>
  );
}