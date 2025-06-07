// app/category/[slug]/page.jsx
import { getProductsByCategory } from "@/lib/getProductsByCategory";

export default async function Page({ params }) {
  const slug = params.slug; // ✅ just use it directly, no await

  const products = await getProductsByCategory(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">{slug.replace(/-/g, " ")}</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow-sm">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-lg font-medium mt-2">{product.name}</h2>
              <p className="text-sm text-gray-700 mt-1">₦{product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
