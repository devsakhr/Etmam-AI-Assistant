import React from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-3 mb-1">
      <p className="text-xs text-gray-500 mb-2 mr-1">منتجات مقترحة لك:</p>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex-none w-48 bg-white border border-gray-200 rounded-xl p-3 shadow-sm snap-start hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
                <div className="h-24 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-300">
                    {/* Placeholder Icon since we don't have real images in JSON yet */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>
                <h3 className="font-bold text-sm text-gray-800 line-clamp-2 leading-tight mb-1 h-10">
                    {product.name}
                </h3>
                <p className="text-teal-600 font-bold text-sm mb-2">
                    {product.price} ر.س
                </p>
            </div>
            
            <a 
                href={product.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-gray-900 text-white text-xs py-2 rounded-lg hover:bg-teal-600 transition-colors"
            >
                عرض المنتج
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;