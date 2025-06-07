"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useState, useEffect, useMemo } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import axios from "axios";
import debounce from "lodash.debounce";

export default function AdminProductsPage() {
  const { data, error, isLoading, mutate } = useSWR("/api/admin/products", fetcher);
  const [form, setForm] = useState({ name: "", price: "", category: "", image: null });
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
const [previewImage, setPreviewImage] = useState(null);
const [editPreviewImage, setEditPreviewImage] = useState(null);

  const debouncedInput = useMemo(
    () => debounce((value) => setDebouncedSearch(value), 400),
    []
  );

  useEffect(() => {
    debouncedInput(searchTerm);
    return () => debouncedInput.cancel();
  }, [searchTerm, debouncedInput]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/products/${id}`);
      mutate();
    } catch (err) {
      alert("Error deleting product");
    }
  };

  const handleToggleStock = async (id, current) => {
    try {
      await axios.patch(`/api/admin/products/${id}`, { inStock: !current });
      mutate();
    } catch (err) {
      alert("Error updating stock status");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const imageForm = new FormData();
      imageForm.append("file", form.image);

      const uploadRes = await axios.post("/api/admin/upload", imageForm);
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
      alert("Error creating product");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = editingProduct.image;

      if (editingProduct.newImage) {
        const imageForm = new FormData();
        imageForm.append("file", editingProduct.newImage);

        const uploadRes = await axios.post("/api/admin/upload", imageForm);
        imageUrl = uploadRes.data.url;
      }

      await axios.patch(`/api/admin/products/${editingProduct._id}`, {
        name: editingProduct.name,
        price: parseFloat(editingProduct.price),
        category: editingProduct.category,
        image: imageUrl,
      });

      setEditingProduct(null);
      mutate();
    } catch (err) {
      alert("Error updating product");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error || !Array.isArray(data?.products)) return <p>Error loading products</p>;

  const filteredProducts = debouncedSearch.trim()
    ? data.products.filter((product) =>
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
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
  onChange={(e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreviewImage(URL.createObjectURL(file)); // live preview
  }}
/>

{previewImage && (
  <img
    src={previewImage}
    alt="Preview"
    className="mt-2 w-32 h-32 object-cover rounded"
  />
)}

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </form>

        {editingProduct && (
          <form onSubmit={handleEditSubmit} className="bg-white p-4 shadow mb-6 rounded space-y-3">
            <h2 className="text-lg font-bold mb-2">Edit Product</h2>
            <input
              className="border p-2 rounded w-full"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
            />
            <input
              className="border p-2 rounded w-full"
              type="number"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
            />
            <input
              className="border p-2 rounded w-full"
              value={editingProduct.category}
              onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
            />
           <input
  type="file"
  className="border p-2 rounded w-full"
  onChange={(e) => {
    const file = e.target.files[0];
    setEditingProduct({ ...editingProduct, newImage: file });
    setEditPreviewImage(URL.createObjectURL(file)); // live preview
  }}
/>

{editPreviewImage ? (
  <img
    src={editPreviewImage}
    alt="New Preview"
    className="mt-2 w-32 h-32 object-cover rounded"
  />
) : (
  <img
    src={editingProduct.image}
    alt="Current"
    className="mt-2 w-32 h-32 object-cover rounded"
  />
)}

            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white p-4 shadow rounded">
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
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
                <button
                  onClick={() => setEditingProduct(product)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
