// // Main products file that combines all product categories and exports utility functions
// import { milkAndMilkPowders } from './milkAndMilkPowders';
// import { beverages } from './beverages';
// import { cerealsAndCustards } from './cerealsAndCustards';
// import { infantFormulas } from './infantFormulas';
// import { spreads } from './spreads';
// import { 
//   getProductsByCategory, 
//   getProductById, 
//   getFeaturedProducts, 
//   getNewProducts, 
//   getDiscountedProducts,
//   searchProducts,
//   getAllCategories
// } from './productUtils';

// // Combine all product categories into a single array
// export const products = [
//   ...milkAndMilkPowders,
//   ...beverages,
//   ...cerealsAndCustards,
//   ...infantFormulas,
//   ...spreads
// ];

// // Re-export the utility functions with products pre-bound
// export const getProductsByCategoryName = (category) => getProductsByCategory(products, category);
// export const getProductByIdValue = (id) => getProductById(products, id);
// export const getFeaturedProductsValue = (limit) => getFeaturedProducts(products, limit);
// export const getNewProductsValue = (limit) => getNewProducts(products, limit);
// export const getDiscountedProductsValue = (limit) => getDiscountedProducts(products, limit);
// export const searchProductsValue = (query) => searchProducts(products, query);
// export const getAllCategoriesValue = () => getAllCategories(products);

// // For backward compatibility, also export the utility functions with the original names
// export {
//   getProductsByCategory,
//   getProductById,
//   getFeaturedProducts,
//   getNewProducts,
//   getDiscountedProducts,
//   searchProducts,
//   getAllCategories
// };