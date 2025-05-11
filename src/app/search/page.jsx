'use client';

import { useSearchParams } from 'next/navigation';
import { searchProductsValue } from '@/data/products/products';
import Navbar from '@/components/Navbar';
import { useCart } from '@/contexts/CartContext';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = searchProductsValue(query);
  const { addToCart } = useCart();

  return (
    
    <div className="p-6">
        <div>
            <Navbar/>   
        </div>
      <h1 className="text-2xl font-bold mb-4">Search results for "{query}"</h1>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden relative">
              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}% OFF
                </div>
              )}

              {/* Product Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{product.category}</p>

                <div className="flex items-center mb-3">
                  <span className="text-lg font-bold text-gray-800">&#8358;{product.price.toFixed(2)}</span>
                  {product.originalPrice > 0 && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      &#8358;{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
          onClick={() => addToCart({ ...product, quantity: 1 })} // ✅ Add to cart
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center"
        >
          {/* SVG icon and text */}
          Add to Cart
        </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
