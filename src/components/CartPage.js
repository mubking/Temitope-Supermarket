// // app/cart/page.js or components/CartPage.js
// "use client"; // Add this to mark this component as a client-side component

// import { useCart } from "@/contexts/CartContext"; // Import useCart from CartContext

// const CartPage = () => {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useCart(); // useCart should only be used in client-side components

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="space-y-4">
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between border p-4 rounded"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-16 h-16 object-cover rounded"
//               />
//               <div className="flex-1 ml-4">
//                 <h3 className="font-medium">{item.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   ₦{item.price.toFixed(2)} x {item.quantity}
//                 </p>
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.id, Math.max(item.quantity - 1, 1))
//                     }
//                     className="px-2 py-1 bg-gray-200 rounded"
//                   >
//                     -
//                   </button>
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.id, item.quantity + 1)
//                     }
//                     className="px-2 py-1 bg-gray-200 rounded"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-red-500 text-sm"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <button
//             onClick={clearCart}
//             className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Clear Cart
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;
