import React from 'react';
import { CreditCard, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import CartItem from './CartItem';
import EmptyState from '../common/EmptyState';

const CartSummary = ({ 
  cart = [],
  customerName = '',
  onCustomerNameChange,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout,
  onClearCart,
  total = 0,
  disabled = false
}) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const hasItems = cart.length > 0;

  return (
    <div className="w-80 bg-white border-l shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Keranjang</h2>
          <Badge variant="secondary">{totalItems} item</Badge>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
        {!hasItems ? (
          <EmptyState
            icon={ShoppingCart}
            title="Keranjang kosong"
            description="Pilih produk untuk memulai transaksi"
            className="p-4"
          />
        ) : (
          <div>
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveFromCart}
                disabled={disabled}
              />
            ))}
          </div>
        )}
      </div>

      {/* Checkout Section */}
      {hasItems && (
        <div className="p-4 border-t bg-gray-50">
          <div className="space-y-3">
            {/* Customer Name Input */}
            <div>
              <Label className="text-sm">Nama Customer (Opsional)</Label>
              <Input
                placeholder="Masukkan nama customer"
                value={customerName}
                onChange={(e) => onCustomerNameChange(e.target.value)}
                className="mt-1"
                disabled={disabled}
              />
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-blue-600">
                Rp {total.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button 
                className="w-full" 
                size="lg"
                onClick={onCheckout}
                disabled={disabled || !hasItems}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Checkout
              </Button>
              
              <Button 
                variant="outline" 
                onClick={onClearCart} 
                className="w-full"
                disabled={disabled}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;