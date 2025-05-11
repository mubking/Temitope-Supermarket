// /src/app/api/products/route.js (App Router)

export async function GET() {
    const products = [
      {
        id: 1,
        name: "Organic Bananas",
        category: "Fruits",
        price: 1.99,
        originalPrice: 2.49,
        discount: 20,
        image: "/placeholder.svg",
        rating: 4.5,
        reviews: 120,
        isNew: false,
        inStock: true,
      },
      // ...add more
    ];
  
    return Response.json(products);
  }

  
//   how to fetch data to frontend 

//   "use client";

// import { useEffect, useState } from "react";

// const FeaturedProducts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch("/api/products")
//       .then((res) => res.json())
//       .then(setProducts);
//   }, []);

//   return (
//     <div>
//       {products.map((p) => (
//         <div key={p.id}>{p.name}</div>
//       ))}
//     </div>
//   );
// };

// export default FeaturedProducts;
