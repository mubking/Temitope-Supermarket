// Utility functions for product operations

// Get all products from a specific category
export const getProductsByCategory = (products, category) => {
    return products.filter(product => product.category === category);
  };
  
  // Get a product by ID from a collection of products
  export const getProductById = (products, id) => {
    return products.find(product => product.id === id);
  };
  
  // Get a selection of featured products
  export const getFeaturedProducts = (products, limit = 8) => {
    return products.slice(0, limit);
  };
  
  // Get products marked as new
  export const getNewProducts = (products, limit = 8) => {
    return products.filter(product => product.isNew).slice(0, limit);
  };
  
  // Get discounted products, sorted by discount percentage
  export const getDiscountedProducts = (products, limit = 8) => {
    return products
      .filter(product => product.discount > 0)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, limit);
  };
  
  // Search products by term (name, category, description, size)
  export const searchProducts = (products, query) => {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.size.toLowerCase().includes(searchTerm)
    );
  };
  
  // Get all unique categories from products
  export const getAllCategories = (products) => {
    const categories = products.map(product => product.category);
    return [...new Set(categories)]; // Remove duplicates
  };
  