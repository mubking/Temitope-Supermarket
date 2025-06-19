// File: src/app/products/page.jsx

"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ProductCard from "@/components/ProductCard";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function AllProductsPage() {
  const { data, error, isLoading } = useSWR("/api/products", fetcher);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Failed to load products.</p>;

  return (
    <div className="container mx-auto px-4 py-10">
        <DashboardNavbar/>
      <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((product) => (
          <div key={product._id} className="border p-4 rounded-md bg-white">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
