import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CartItem = ({ 
  item, 
  onUpdateQuantity, 
  onRemove,
  disabled = false 
}) => {
  const handleIncrement = () => {
    if (!disabled && item.quantity < item.stock) {
      onUpdateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (!disabled) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    if (!disabled) {
      onRemove(item.id);
    }
  };

  const totalPrice = item.price * item.quantity;
  const maxQuantityReached = item.quantity >= item.stock;

  return (
    <div className="flex items-center justify-between p-3 border-b last:border-b-0">
      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate" title={item.name}>
          {item.name}
        </h4>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
          <span>Rp {item.price.toLocaleString('id-ID')}</span>
          <span>×</span>
          <span>{item.quantity}</span>
          {maxQuantityReached && (
            <span className="text-amber-600">(Max stok)</span>
          )}
        </div>
      </div>

      {/* Price and Controls */}
      <div className="flex items-center space-x-2 ml-4">
        <span className="font-medium text-blue-600 text-sm min-w-max">
          Rp {totalPrice.toLocaleString('id-ID')}
        </span>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-1">
          <Button
            size="sm"
            variant="outline"
            onClick={handleDecrement}
            disabled={disabled}
            className="h-6 w-6 p-0 hover:bg-gray-100"
          >
            <Minus className="w-3 h-3" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleIncrement}
            disabled={disabled || maxQuantityReached}
            className="h-6 w-6 p-0 hover:bg-gray-100"
          >
            <Plus className="w-3 h-3" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleRemove}
            disabled={disabled}
            className="h-6 w-6 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
            title="Hapus dari keranjang"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;