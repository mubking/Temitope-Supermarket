// pages/search.js
"use client"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { searchProductsValue as searchProducts } from "../data/products"; // Your search logic

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const results = searchProducts(query);
    const timer = setTimeout(() => {
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col bg-amber-800">
      <Navbar />
      {/* <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Search Results for: "{query}"
          </h1>
          <p className="text-gray-600">
            Found {searchResults.length} products matching your search
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product, index) => {
  const fixedProduct = {
    id: product.id || index, // fallback to index if no ID
    name: product.name || "Unnamed Product",
    price: product.price ?? 0,
    image: product.image || "/placeholder.jpg",
    quantity: 1,
    ...product,
  };

  return <ProductCard key={fixedProduct.id} product={fixedProduct} />;
})}

          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No products found</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Try different keywords or browse our categories.
            </p>
          </div>
        )}
      </main> */}
      <Footer />
    </div>
  );
};

export default SearchPage;
