import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Usamos Async/Await como en la Misión 2
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error cargando productos:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-800">Brian Sastre - Tienda de Ropa</h1>
        <p className="text-gray-600">Proyecto Pre-Entrega TechLab</p>
      </header>

      {loading ? (
        <div className="text-center font-bold text-xl">Cargando inventario...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between">
              <img src={product.image} alt={product.title} className="h-48 w-full object-contain mb-4" />
              <div>
                <h2 className="font-semibold text-gray-800 truncate">{product.title}</h2>
                <p className="text-blue-600 font-bold text-lg mt-2">${product.price}</p>
              </div>
              <button className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Ver detalle
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App