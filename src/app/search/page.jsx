'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import Navbar from '@/components/Navbar';
import { useCart } from '@/contexts/CartContext';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get('q') || '';
  const { addToCart } = useCart();

  const [query, setQuery] = useState(rawQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced search function
  const fetchSearchResults = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm || searchTerm.trim().length < 3) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(searchTerm.trim())}`);
        const data = await res.json();
        setResults(data?.products || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500), // 500ms delay
    []
  );

  // Effect for debounced search
  useEffect(() => {
    setQuery(rawQuery);
    fetchSearchResults(rawQuery);
  }, [rawQuery, fetchSearchResults]);

  return (
    <div className="p-6">
      <Navbar />

      <h1 className="text-2xl font-bold mb-4">Search results for "{query}"</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden relative">
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}% OFF
                </div>
              )}
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image || '/placeholder.png'}
                  alt={product.name || 'Product'}
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{product.category}</p>

                <div className="flex items-center mb-3">
                  <span className="text-lg font-bold text-gray-800">
                    &#8358;{(product.price || 0).toFixed(2)}
                  </span>
                  {product.originalPrice > 0 && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      &#8358;{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() =>
                    addToCart({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    })
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center"
                >
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
