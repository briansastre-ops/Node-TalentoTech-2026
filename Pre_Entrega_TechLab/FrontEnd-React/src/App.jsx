// import { useState, useEffect } from 'react'

// function App() {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Usamos Async/Await como en la Misión 2
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('https://fakestoreapi.com/products')
//         const data = await response.json()
//         setProducts(data)
//       } catch (error) {
//         console.error("Error cargando productos:", error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchProducts()
//   }, [])

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <header className="mb-10 text-center">
//         <h1 className="text-4xl font-bold text-blue-800">Brian Sastre - Tienda de Ropa</h1>
//         <p className="text-gray-600">Proyecto Pre-Entrega TechLab</p>
//       </header>

//       {loading ? (
//         <div className="text-center font-bold text-xl">Cargando inventario...</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products.map(product => (
//             <div key={product.id} className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between">
//               <img src={product.image} alt={product.title} className="h-48 w-full object-contain mb-4" />
//               <div>
//                 <h2 className="font-semibold text-gray-800 truncate">{product.title}</h2>
//                 <p className="text-blue-600 font-bold text-lg mt-2">${product.price}</p>
//               </div>
//               <button className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
//                 Ver detalle
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default App
// 
import { useState, useEffect } from 'react'

import './App.css'

/* ─── Category map ─── */
const CATEGORY_LABELS = {
    "men's clothing": "Hombres",
    "women's clothing": "Mujeres",
    "jewelery": "Joyería",
    "electronics": "Electrónica",
}

/* ─── Stars ─── */
function Stars({ rating }) {
    const full = Math.round(rating)
    return (
        <span className="stars">
            {'★'.repeat(full)}{'☆'.repeat(5 - full)}
        </span>
    )
}

/* ─── Product Modal ─── */
function ProductModal({ product, onClose }) {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    return (
        <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                <button className="modal-close" onClick={onClose}>✕</button>
                <div className="modal-img-panel">
                    <img className="modal-img" src={product.image} alt={product.title} />
                </div>
                <div className="modal-info">
                    <div className="modal-cat">
                        {CATEGORY_LABELS[product.category] || product.category}
                    </div>
                    <h2 className="modal-title">{product.title}</h2>
                    <div className="modal-rating">
                        <Stars rating={product.rating?.rate || 4} />
                        <span className="rating-text">
                            {product.rating?.rate} · {product.rating?.count} reseñas
                        </span>
                    </div>
                    <div className="modal-price">${product.price}</div>
                    <p className="modal-desc">{product.description}</p>
                    <button className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    )
}

/* ─── Skeleton card ─── */
function SkeletonCard() {
    return (
        <div style={{ background: 'var(--ink-2)' }}>
            <div className="skeleton" style={{ height: 280 }} />
            <div style={{ padding: '18px 18px 22px' }}>
                <div className="skeleton" style={{ height: 8, width: '40%', marginBottom: 10 }} />
                <div className="skeleton" style={{ height: 14, width: '80%', marginBottom: 6 }} />
                <div className="skeleton" style={{ height: 14, width: '60%', marginBottom: 16 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="skeleton" style={{ height: 13, width: '25%' }} />
                    <div className="skeleton" style={{ height: 30, width: 30 }} />
                </div>
            </div>
        </div>
    )
}

/* ─── Marquee text ─── */
const MARQUEE_ITEMS = ['Nueva Colección', 'Envío Gratis +$5000', 'Devolución sin cargo', 'Calidad Premium', 'Atención 24hs', 'Pagos en cuotas']
function Marquee() {
    const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
    return (
        <div className="marquee-wrap">
            <div className="marquee-inner">
                {items.map((t, i) => (
                    <span key={i}>
                        {t}
                        <span className="marquee-sep">✦</span>
                    </span>
                ))}
            </div>
        </div>
    )
}

/* ─── Custom cursor ─── */
function Cursor() {
    useEffect(() => {
        const dot = document.getElementById('cur-dot')
        const ring = document.getElementById('cur-ring')
        let rx = 0, ry = 0
        const move = (e) => {
            const x = e.clientX, y = e.clientY
            if (dot) { dot.style.left = x + 'px'; dot.style.top = y + 'px' }
            rx += (x - rx) * 0.12
            ry += (y - ry) * 0.12
            if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px' }
        }
        let frame; const animate = () => { frame = requestAnimationFrame(animate) }
        animate()
        window.addEventListener('mousemove', move)
        return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(frame) }
    }, [])
    return (
        <>
            <div id="cur-dot" className="cursor" />
            <div id="cur-ring" className="cursor-ring" />
        </>
    )
}

/* ─── App ─── */
const ALL_FILTER = 'all'

export default function App() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(null)
    const [filter, setFilter] = useState(ALL_FILTER)
    const [cart, setCart] = useState([])

    /* ── fetch – BACKEND INTACTO ── */
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.error('Error cargando productos:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const categories = [ALL_FILTER, ...new Set(products.map(p => p.category))]
    const visible = filter === ALL_FILTER ? products : products.filter(p => p.category === filter)

    const addToCart = (e, id) => {
        e.stopPropagation()
        setCart(prev => [...prev, id])
    }

    const getBadge = (product) => {
        if (product.id <= 4) return { text: 'Nuevo', cls: 'badge-new' }
        if (product.price < 20) return { text: 'Oferta', cls: 'badge-sale' }
        return null
    }

    return (
        <>
            <Cursor />

            {/* NAV */}
            <nav className="nav fade-up">
                <div className="nav-logo">Sastre</div>
                <div className="nav-links">
                    <button className="nav-link active">Colección</button>
                    <button className="nav-link">Lookbook</button>
                    <button className="nav-link">Marcas</button>
                    <button className="nav-link">Nosotros</button>
                </div>
                <div className="nav-actions">
                    <button className="nav-icon-btn" aria-label="Buscar">
                        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
                            <circle cx="9" cy="9" r="6" /><path d="m15 15 3 3" />
                        </svg>
                    </button>
                    <div className="cart-wrap">
                        <button className="nav-icon-btn" aria-label="Carrito">
                            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
                                <path d="M6 2 4 6H2l2 9h12l2-9h-2L14 2H6zM6 6h8" />
                            </svg>
                        </button>
                        {cart.length > 0 && <div className="cart-badge">{cart.length}</div>}
                    </div>
                    <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: 'var(--ink-4)',
                        border: '0.5px solid var(--cream-15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, color: 'var(--cream-60)',
                    }}>B</div>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero">
                <div className="hero-left fade-up">
                    <div className="hero-tag">Colección Otoño — 2025</div>
                    <h1 className="hero-h1">
                        Estilo que<br />
                        <em>define</em> tu<br />
                        identidad
                    </h1>
                    <p className="hero-sub">
                        Piezas cuidadosamente seleccionadas para quienes valoran
                        la calidad sin renunciar al carácter propio.
                    </p>
                    <div className="hero-ctas">
                        <button className="btn-primary">Ver colección</button>
                        <button className="btn-ghost">Lookbook</button>
                    </div>
                    <div className="hero-stats">
                        <div>
                            <div className="stat-num">{products.length || '—'}</div>
                            <div className="stat-label">Productos</div>
                        </div>
                        <div>
                            <div className="stat-num">12k</div>
                            <div className="stat-label">Clientes</div>
                        </div>
                        <div>
                            <div className="stat-num">4.9</div>
                            <div className="stat-label">Valoración</div>
                        </div>
                    </div>
                </div>
                <div className="hero-right">
                    {products[0] && (
                        <div className="hero-img-wrap" onClick={() => setSelected(products[0])}>
                            <div className="hero-img-frame" />
                            <div className="hero-corner tl" />
                            <div className="hero-corner br" />
                            <img className="hero-product-img" src={products[0].image} alt={products[0].title} />
                            <div className="hero-caption">
                                <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 400, color: 'var(--cream)' }}>
                                    {products[0].title.split(' ').slice(0, 4).join(' ')}
                                </div>
                                <div style={{ fontSize: 12, color: 'var(--gold)', marginTop: 4, letterSpacing: '0.06em' }}>
                                    ${products[0].price}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="hero-counter">01 / {String(products.length).padStart(2, '0')}</div>
                </div>
            </section>

            <Marquee />

            {/* CATALOG */}
            <section className="section">
                <div className="filters-row">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat === ALL_FILTER ? 'Todo' : (CATEGORY_LABELS[cat] || cat)}
                        </button>
                    ))}
                </div>

                <div className="section-header">
                    <div>
                        <span className="section-title">
                            {filter === ALL_FILTER ? 'Colección' : (CATEGORY_LABELS[filter] || filter)}
                        </span>
                        <span className="section-count">
                            {loading ? '—' : `${visible.length} piezas`}
                        </span>
                    </div>
                    <button className="see-all">Ver todo →</button>
                </div>

                {loading ? (
                    <div className="products-grid">
                        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : (
                    <div className="products-grid">
                        {visible.map((product, i) => {
                            const badge = getBadge(product)
                            return (
                                <div
                                    key={product.id}
                                    className="product-card"
                                    style={{ animationDelay: `${i * 0.04}s` }}
                                    onClick={() => setSelected(product)}
                                >
                                    <div className="product-img-box">
                                        {badge && (
                                            <span className={`product-badge ${badge.cls}`}>{badge.text}</span>
                                        )}
                                        <img className="product-img-el" src={product.image} alt={product.title} />
                                        <div className="product-overlay">
                                            <button className="overlay-btn">Ver detalle</button>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <div className="product-cat">
                                            {CATEGORY_LABELS[product.category] || product.category}
                                        </div>
                                        <div className="product-name">{product.title}</div>
                                        <div className="product-bottom">
                                            <span className="product-price">${product.price}</span>
                                            <button
                                                className="add-btn"
                                                title="Agregar al carrito"
                                                onClick={(e) => addToCart(e, product.id)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </section>

            {/* VALUE PROPS */}
            <div className="value-strip">
                {[
                    { icon: '✦  Envío', title: 'Entrega en 24–48 hs', text: 'Despachamos desde Buenos Aires. Seguimiento en tiempo real incluido.' },
                    { icon: '✦  Calidad', title: 'Garantía en cada pieza', text: 'Marcas seleccionadas con estándares de calidad verificados.' },
                    { icon: '✦  Pagos', title: 'Hasta 12 cuotas sin interés', text: 'Todos los medios de pago. Compra segura con cifrado SSL.' },
                ].map(({ icon, title, text }) => (
                    <div key={title} className="value-item">
                        <div className="value-icon">{icon}</div>
                        <div className="value-title">{title}</div>
                        <p className="value-text">{text}</p>
                    </div>
                ))}
            </div>

            {/* FOOTER */}
            <footer className="footer">
                <div className="footer-logo">Sastre</div>
                <div className="footer-links">
                    <button className="footer-link">Términos</button>
                    <button className="footer-link">Privacidad</button>
                    <button className="footer-link">Contacto</button>
                </div>
                <div className="footer-copy">© 2025 Sastre — Brian Sastre</div>
            </footer>

            {/* MODAL */}
            {selected && (
                <ProductModal product={selected} onClose={() => setSelected(null)} />
            )}
        </>
    )
}
