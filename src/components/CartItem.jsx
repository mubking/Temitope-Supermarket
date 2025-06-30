import React from "react";

const CartItem = ({ item, updateQuantity, removeFromCart, formatCurrency }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
      <div className="relative w-full sm:w-24 aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-lg text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1">Item ID: {item.id}</p>
        <div className="mt-3 flex items-center">
          <span className="font-medium text-lg">
            {formatCurrency(item.price)}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-3 mt-2 sm:mt-0">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))} className="h-8 w-8">-</button>
          <span className="w-10 text-center">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8">+</button>
        </div>
        <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm">
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;