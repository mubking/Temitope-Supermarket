"use client";

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const { data, error, isLoading } = useSWR('/api/products', fetcher);

  const tabs = [
    { id: 'featured', label: 'Featured' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'sale', label: 'On Sale' },
  ];

const getProductsForTab = () => {
  if (!data?.products) return [];

  switch (activeTab) {
    case 'new':
      return data.products.filter(p => p.isNew);
    case 'sale':
      return data.products.filter(p => p.discount);
    default: {
      const shuffled = [...data.products].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 12);
    }
  }
};


  const displayedProducts = getProductsForTab();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load products</p>;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Our Products</h2>

          <div className="flex items-center space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <div key={product._id} className="relative group border border-gray-200 rounded-lg p-4 bg-white">
              <ProductCard product={product} />
              {product.inStock ? (
                <span className="absolute top-2 right-2 text-sm px-2 py-1 bg-green-100 text-green-800 rounded-md">In Stock</span>
              ) : (
                <span className="absolute top-2 right-2 text-sm px-2 py-1 bg-red-100 text-red-700 rounded-md">Out of Stock</span>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium"
          >
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
