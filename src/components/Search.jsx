// pages/search.js
"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { data, isLoading, error } = useSWR("/api/products", fetcher);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (data?.products && query) {
      const results = data.products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [data, query]);

  return (
    <div className="min-h-screen flex flex-col bg-amber-800">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Search Results for: "{query}"
          </h1>
          <p className="text-white">
            Found {searchResults.length} products matching your search
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">Error loading products.</p>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">No products found</h2>
            <p className="text-white max-w-md mx-auto">
              Try different keywords or browse our categories.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
