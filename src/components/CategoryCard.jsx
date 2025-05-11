// // import { Link } from "react-router-dom";
// // import { Category } from "../types";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { AppleIcon, MilkIcon, BeefIcon, CroissantIcon, CoffeeIcon, ContainerIcon } from "lucide-react";

// // interface CategoryCardProps {
// //   category: Category;
// }

// // const CategoryCard = ({ category }: CategoryCardProps) => {
//   return (
//     <Link to={`/category/${category.id}`}>
//       <Card className="h-full overflow-hidden product-card-shadow">
//         <div className="relative h-32 overflow-hidden bg-grocery-light">
//           {category.image ? (
//             <img
//               src={category.image}
//               alt={category.name}
//               className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-grocery-secondary/20 to-grocery-primary/20">
//               {getCategoryIcon(category.icon, "h-12 w-12 text-grocery-primary")}
//             </div>
//           )}
//         </div>

//         <CardContent className="p-4 text-center">
//           <h3 className="font-medium">{category.name}</h3>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// };

// const getCategoryIcon = (iconName: string, className: string) => {
//   switch (iconName) {
//     case "apple":
//       return <AppleIcon className={className} />;
//     case "milk":
//       return <MilkIcon className={className} />;
//     case "beef":
//       return <BeefIcon className={className} />;
//     case "croissant":
//       return <CroissantIcon className={className} />;
//     case "coffee":
//       return <CoffeeIcon className={className} />;
//     case "container":
//       return <ContainerIcon className={className} />;
//     default:
//       return <AppleIcon className={className} />;
//   }
// };

// export default CategoryCard;