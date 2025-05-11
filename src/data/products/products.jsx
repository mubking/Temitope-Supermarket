import { milkAndMilkPowders } from './milkAndMilkPowders';
import { beverages } from './beverages';
import { cerealsAndCustards } from './cerealsAndCustards';
import { spreads } from './spreads';
import { infantFormulas } from './infantFormulas';
import { grainsAndOils } from './grains & cooking essentials';

export const products = [
  ...milkAndMilkPowders,
  ...beverages,
  ...cerealsAndCustards,
  ...spreads,
  ...infantFormulas,
  ...grainsAndOils,
];

// Featured products
export const getFeaturedProductsValue = () => [
  ...milkAndMilkPowders.slice(0, 2),
  ...beverages.slice(12, 17 ),
  ...infantFormulas.slice(0,2),
  ...spreads.slice(2,5),
  ...grainsAndOils.slice(1,5)
];

// New arrivals
export const getNewProductsValue = () => [
  ...cerealsAndCustards.filter(item => item.isNew),
  ...spreads.filter(item => item.isNew)
];

// General additional products (no discount filtering)
export const getMoreProductsValue = () => [
  ...cerealsAndCustards.slice(0, 3),
  ...beverages.slice(0, 1)
];

// 🔍 Search function
export const searchProductsValue = (query) => {
  if (!query) return [];
  return products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
};
