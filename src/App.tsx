import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Producto } from './services/api';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { ProductCard } from './components/ProductCard';
import { SearchBar } from './components/SearchBar';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import './App.css';
function App() {
  const { productos, loading } = useProducts();
  const { carrito, agregarAlCarrito, total } = useCart();
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  useEffect(() => {
    const resultados = productos.filter(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductosFiltrados(resultados);
  }, [busqueda, productos]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Mi Tienda</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {carrito.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {carrito.length}
                  </span>
                )}
              </div>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4">
            <SearchBar value={busqueda} onChange={setBusqueda} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productosFiltrados.map(producto => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onSelect={setProductoSeleccionado}
              onAddToCart={agregarAlCarrito}
            />
          ))}
        </div>
      </main>

      {productoSeleccionado && (
        <ProductDetail
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
          onAddToCart={agregarAlCarrito}
        />
      )}

      <Cart items={carrito} total={total} />
    </div>
  );
}

export default App;