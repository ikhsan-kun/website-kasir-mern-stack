import React from 'react';
import { Package } from 'lucide-react';
import ProductCard from './ProductCard';
import EmptyState from '../common/EmptyState';

const ProductGrid = ({ 
  products = [], 
  cart = [], 
  onAddToCart, 
  onUpdateQuantity,
  loading = false,
  className = '' 
}) => {
  // Get quantity from cart for each product
  const getCartQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  if (loading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ${className}`}>
        {/* Loading skeleton */}
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-white rounded-lg border p-4 space-y-3">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="Tidak ada produk"
        description="Coba ubah kata kunci pencarian atau kategori"
        className={className}
      />
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ${className}`}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          cartQuantity={getCartQuantity(product.id)}
          onAddToCart={onAddToCart}
          onUpdateQuantity={onUpdateQuantity}
          disabled={loading}
        />
      ))}
    </div>
  );
};

export default ProductGrid;