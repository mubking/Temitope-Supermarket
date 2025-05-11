// // pages/category/[slug].js
// import { useRouter } from "next/router";
// import { milkAndMilkPowders } from "@/data/products/milkAndMilkPowders";

// const CategoryPage = () => {
//   const router = useRouter();
//   const { slug } = router.query; // Get the slug from the URL

//   // If slug is not loaded yet, show loading
//   if (!slug) return <div>Loading...</div>;

//   // Filter products by categorySlug
//   const categoryProducts = milkAndMilkPowders.filter(
//     (product) => product.categorySlug === slug
//   );

//   return (
//     <div className="container mx-auto py-12">
//       <h2 className="text-3xl font-bold text-gray-800 capitalize">
//         {slug.replace("-", " ")} Products
//       </h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
//         {categoryProducts.length > 0 ? (
//           categoryProducts.map((product) => (
//             <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-48 object-cover mb-4"
//               />
//               <h3 className="font-medium text-gray-800">{product.name}</h3>
//               <p className="text-gray-500">&#8358;{product.price}</p>
//               <p className="text-sm text-gray-500 bg-amber-400">{product.description}</p>
//             </div>
//           ))
//         ) : (
//           <p>No products found in this category.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;
