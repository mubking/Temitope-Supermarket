'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const discounted = data.products.filter(p => p.discount > 0);
        setDeals(discounted);
      } catch (err) {
        console.error('Failed to load deals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">🔥 Hot Deals</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Save big on your favorite groceries! Limited-time offers updated daily.
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading deals...</p>
        ) : deals.length === 0 ? (
          <p className="text-center text-red-500 font-medium">No deals available at the moment. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {deals.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
