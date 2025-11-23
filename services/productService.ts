import { Product } from '../types';

// Cache to store products after fetching
let productsCache: Product[] | null = null;

async function loadProducts(): Promise<Product[]> {
  if (productsCache) {
    return productsCache;
  }

  try {
    // Fetch from the public folder
    const response = await fetch('/products.json');
    if (!response.ok) {
      console.error('Failed to fetch products:', response.statusText);
      return [];
    }
    const data = await response.json();
    productsCache = data;
    return data;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

export async function searchProducts(query: string, limit: number = 5): Promise<Product[]> {
  if (!query || query.trim().length < 2) return [];

  const products = await loadProducts();
  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(' ');

  // Filter products
  const matchedProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const productCategory = product.category.toLowerCase();
    const productDesc = product.description.toLowerCase();

    // Check if any significant word from the query appears in name or category
    // We filter out very short words to avoid noise
    return queryWords.some(word => 
      word.length > 1 && (
        productName.includes(word) || 
        productCategory.includes(word) ||
        productDesc.includes(word)
      )
    );
  });

  // Simple ranking: Exact name match or category match gets priority
  matchedProducts.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    
    // Prioritize if name starts with query
    const aStarts = aName.startsWith(normalizedQuery) ? 1 : 0;
    const bStarts = bName.startsWith(normalizedQuery) ? 1 : 0;
    
    return bStarts - aStarts;
  });

  return matchedProducts.slice(0, limit);
}
