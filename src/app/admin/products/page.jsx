"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import axios from "axios";

export default function AdminProductsPage() {
  const { data, error, isLoading, mutate } = useSWR("/api/admin/products", fetcher);
  const [form, setForm] = useState({ name: "", price: "", category: "", image: null });
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/products/${id}`);
      mutate();
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Error deleting product");
    }
  };

  const handleToggleStock = async (id, current) => {
    try {
      await axios.patch(`/api/admin/products/${id}`, { inStock: !current });
      mutate();
    } catch (err) {
      console.error("❌ Stock toggle error:", err);
      alert("Error updating stock status");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const imageForm = new FormData();
      imageForm.append("file", form.image);

      const uploadRes = await axios.post("/api/admin/upload", imageForm);
      console.log("UPLOAD RESULT:", uploadRes.data); // ✅ log result

      const imageUrl = uploadRes.data.url;

      await axios.post("/api/admin/products", {
        name: form.name,
        price: parseFloat(form.price),
        category: form.category,
        image: imageUrl,
        inStock: true,
      });
      setForm({ name: "", price: "", category: "", image: null });
      mutate();
    } catch (err) {
      console.error("❌ Create error:", err);
      alert("Error creating product");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error || !Array.isArray(data?.products)) return <p>Error loading products</p>;

  const filteredProducts = searchTerm.trim()
    ? data.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data.products;

  return (
    <div className="p-2 flex w-full min-h-screen gap-2">
      <AdminSidebar />

      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-6 w-full"
        />

        <form onSubmit={handleCreate} className="mb-6 space-y-2">
          <input
            className="border p-2 rounded w-full"
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border p-2 rounded w-full"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            className="border p-2 rounded w-full"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            type="file"
            className="border p-2 rounded w-full"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white p-4 shadow rounded">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p>₦{product.price}</p>
              <p>{product.category}</p>
              <p className="text-sm text-gray-500">
                {product.inStock === false ? "❌ Out of Stock" : "✅ In Stock"}
              </p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleToggleStock(product._id, product.inStock)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  {product.inStock ? "Mark Out of Stock" : "Mark In Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
