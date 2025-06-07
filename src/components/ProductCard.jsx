"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";

const ProductCard = ({ product }) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const { cart, addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlist(storedWishlist.includes(product._id));
  }, [product._id]);

  const handleWishlist = () => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let updatedWishlist;

    if (isWishlist) {
      updatedWishlist = storedWishlist.filter((id) => id !== product._id);
      setIsWishlist(false);
    } else {
      updatedWishlist = [...storedWishlist, product._id];
      setIsWishlist(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = () => {
    if (!product.inStock) {
      showToast({
        title: "🚫 Out of Stock",
        description: "This product is currently unavailable. You’ll be notified when it’s back.",
        status: "warning",
      });
      return;
    }

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    showToast({
      title: "✅ Added to Cart",
      description: `${product.name} was added to your cart.`,
      status: "success",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden relative">
      {product.discount > 0 && (
        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
          {product.discount}% OFF
        </div>
      )}

      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${isWishlist ? "text-red-500 fill-red-500" : "text-gray-400"}`}
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

      <Link href={`/product/${product._id}`}>
        <div className="h-48 overflow-hidden cursor-pointer">
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            className="max-h-48 w-auto mx-auto object-contain transition-transform hover:scale-105"
          />

        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product._id}`}>
          <h3 className="font-medium text-gray-800 mb-1 hover:text-blue-600 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>

        <div className="flex items-center mb-3">
          <span className="text-lg font-bold text-gray-800">
            ₦{typeof product.price === "number" ? product.price.toFixed(2) : "0.00"}
          </span>
          {typeof product.originalPrice === "number" && product.originalPrice > 0 && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ₦{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full text-white py-2 px-4 rounded flex items-center justify-center cursor-pointer 
            ${product.inStock ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
