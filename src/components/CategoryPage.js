"use client";

import { useRouter } from "next/router";
import { milkAndMilkPowders } from "@/data/products/milkAndMilkPowders";
import Link from "next/link"; // Add Link for navigation

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query; // Get the slug from the URL

  // If slug is not loaded yet, show loading
  if (!slug) return <div>Loading...</div>;

  // Filter products by categorySlug
  const categoryProducts = milkAndMilkPowders.filter(
    (product) => product.categorySlug === slug
  );

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-gray-800 capitalize">
        {slug.replace("-", " ")} Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden relative">
              {/* Product Badge (if on sale or featured) */}
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}% OFF
                </div>
              )}

              {/* Wishlist Button */}
              <button 
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-gray-400" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
              </button>

              {/* Product Image */}
              <Link href={`/product/${product.id}`}>
                <div className="h-48 overflow-hidden cursor-pointer">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-medium text-gray-800 mb-1 hover:text-blue-600 transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-2">{product.category}</p>

                {/* Price */}
                <div className="flex items-center mb-3">
                  <span className="text-lg font-bold text-gray-800">&#8358;{product.price.toFixed(2)}</span>
                  {product.originalPrice > 0 && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      &#8358;{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
