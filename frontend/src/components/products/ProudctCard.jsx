import React from 'react';
import { Package, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const ProductCard = ({ 
  product, 
  cartQuantity = 0, 
  onAddToCart, 
  onUpdateQuantity,
  disabled = false 
}) => {
  const isOutOfStock = product.stock === 0;
  const maxQuantityReached = cartQuantity >= product.stock;

  const handleAdd = () => {
    if (!disabled && !isOutOfStock) {
      onAddToCart(product);
    }
  };

  const handleIncrement = () => {
    if (!maxQuantityReached) {
      onUpdateQuantity(product.id, cartQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (cartQuantity > 0) {
      onUpdateQuantity(product.id, cartQuantity - 1);
    }
  };

  return (
    <Card className={`cursor-pointer transition-all hover:shadow-lg ${disabled ? 'opacity-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          {/* Product Image/Icon */}
          <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
            <Package className="w-8 h-8 text-blue-600" />
          </div>

          {/* Product Info */}
          <div className="space-y-1">
            <h3 className="font-medium text-sm line-clamp-2" title={product.name}>
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground">{product.category}</p>
            
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-600">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
              <Badge 
                variant={product.stock > 10 ? 'default' : product.stock > 0 ? 'secondary' : 'destructive'} 
                className="text-xs"
              >
                {product.stock} stok
              </Badge>
            </div>
          </div>

          {/* Action Section */}
          {cartQuantity > 0 ? (
            <div className="flex items-center justify-between bg-blue-50 rounded-lg p-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleDecrement}
                className="h-7 w-7 p-0"
                disabled={disabled}
              >
                <Minus className="w-3 h-3" />
              </Button>
              
              <span className="font-medium text-blue-600 px-2">
                {cartQuantity}
              </span>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleIncrement}
                disabled={disabled || maxQuantityReached}
                className="h-7 w-7 p-0"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={disabled || isOutOfStock}
              className="w-full"
              variant={isOutOfStock ? 'secondary' : 'default'}
            >
              <Plus className="w-3 h-3 mr-1" />
              {isOutOfStock ? 'Stok Habis' : 'Tambah'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;