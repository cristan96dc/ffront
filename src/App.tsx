import { useState, useEffect, useRef, useCallback } from 'react';
import type { Producto } from './services/api';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { useTipos } from './hooks/useTipos';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import './App.css';

const ITEMS_POR_PAGINA = 12;

function App() {
  const { productos, loading } = useProducts();
  const { tipos } = useTipos();
  const { carrito, agregarAlCarrito, removerDelCarrito, actualizarCantidad, limpiarCarrito, total } = useCart();
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState<number | null>(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [visibles, setVisibles] = useState(ITEMS_POR_PAGINA);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resultados = productos.filter(p => {
      const matchNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const matchTipo = tipoSeleccionado ? p.tipo === tipoSeleccionado : true;
      return matchNombre && matchTipo;
    });
    setProductosFiltrados(resultados);
    setVisibles(ITEMS_POR_PAGINA);
  }, [busqueda, productos, tipoSeleccionado]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setVisibles(prev => prev + ITEMS_POR_PAGINA);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (loading) return (
    <div className="loading-screen">
      <div className="loading-box">
        <div className="spinner"></div>
        <p className="loading-text">Cargando productos...</p>
      </div>
    </div>
  );

  const productosVisibles = productosFiltrados.slice(0, visibles);
  const hayMas = visibles < productosFiltrados.length;

  return (
    <div>
      <header className="app-header">
        <div className="header-inner">
          <div className="header-top">
            <div className="logo-wrapper">
              <div className="logo-carrito">
                <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12h10l12 38h36l8-28H28" stroke="#F5C518" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="36" cy="60" r="4.5" fill="#F5C518"/>
                  <circle cx="58" cy="60" r="4.5" fill="#F5C518"/>
                </svg>
              </div>
              <div className="logo-texto">
                <div className="nombre">STOCK<span>EARCE</span></div>
                <div className="sub">Distribuidora Mayorista</div>
              </div>
            </div>
          </div>

          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>

          {/* FILTRO POR TIPO */}
          {tipos.length > 0 && (
            <div className="tipos-filter">
              <button
                className={`tipo-btn ${tipoSeleccionado === null ? 'activo' : ''}`}
                onClick={() => setTipoSeleccionado(null)}
              >
                Todos
              </button>
              {tipos.map(tipo => (
                <button
                  key={tipo.id}
                  className={`tipo-btn ${tipoSeleccionado === tipo.id ? 'activo' : ''}`}
                  onClick={() => setTipoSeleccionado(tipo.id)}
                >
                  {tipo.nombre}
                </button>
              ))}
            </div>
          )}

        </div>
      </header>

      <main className="main-content">
        <div className="productos-grid">
          {productosVisibles.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <div className="empty-title">Sin resultados</div>
              <p className="empty-sub">No encontramos productos con ese nombre.</p>
            </div>
          ) : (
            productosVisibles.map(producto => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onSelect={setProductoSeleccionado}
                onAddToCart={agregarAlCarrito}
              />
            ))
          )}
        </div>

        {hayMas && (
          <div ref={loaderRef} style={{ padding: '20px', textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto' }}></div>
          </div>
        )}
      </main>

      {productoSeleccionado && (
        <ProductDetail
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
          onAddToCart={agregarAlCarrito}
        />
      )}

      <Cart
        items={carrito}
        total={total}
        onRemoveItem={removerDelCarrito}
        onClearCart={limpiarCarrito}
        onUpdateQuantity={actualizarCantidad}
      />
    </div>
  );
}

export default App;