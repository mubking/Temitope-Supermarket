// components/CategorySection.js
import Link from "next/link";

const categories = [
  { id: 1, name: 'Milk & Milk Powders', image: '/placeholder.svg', slug: 'milk-and-milk-powders', icon: '🥛' },
  { id: 2, name: 'Beverages', image: '/placeholder.svg', slug: 'beverages', icon: '🧃' },
  { id: 3, name: 'Cereals & Custards', image: '/placeholder.svg', slug: 'cereals-and-custards', icon: '🥣' },
  { id: 4, name: 'Spreads', image: '/placeholder.svg', slug: 'spreads', icon: '🍯' },
  { id: 5, name: 'Infant Formulas', image: '/placeholder.svg', slug: 'infant-formulas', icon: '🍼' },
  { id: 6, name: 'Grains & Cooking Essentials', image: '/placeholder.svg', slug: 'grains-and-oils', icon: '🌾' },
{
  id: 6,
  name: "Body Care & Cosmetics",
  image: "/cosmetics.jpg", // Replace with your actual image path
  slug: "body-care",
  icon: "🌸"
}
];

const CategorySection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link 
              href={`/category/${category.slug}`} 
              key={category.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="p-4 text-center">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-medium text-gray-800">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
