import React, { useState, useEffect } from 'react';
import { CheckCircle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const CheckoutDialog = ({ 
  isOpen, 
  onClose, 
  onProcessPayment,
  cart = [],
  total = 0,
  loading = false 
}) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paidAmount, setPaidAmount] = useState('');

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setPaymentMethod('cash');
      setPaidAmount('');
    }
  }, [isOpen]);

  const calculateChange = () => {
    const paid = parseFloat(paidAmount) || 0;
    return paid - total;
  };

  const change = calculateChange();
  const isPaymentValid = paymentMethod === 'qris' || (paymentMethod === 'cash' && change >= 0 && paidAmount);

  const handleProcessPayment = () => {
    if (!isPaymentValid || loading) return;

    const paymentData = {
      method: paymentMethod,
      paidAmount: paymentMethod === 'cash' ? parseFloat(paidAmount) : total,
      change: paymentMethod === 'cash' ? change : 0,
      total
    };

    onProcessPayment(paymentData);
  };

  const paymentMethods = [
    {
      id: 'cash',
      label: 'Tunai',
      icon: DollarSign,
      description: 'Pembayaran dengan uang tunai'
    },
    {
      id: 'qris',
      label: 'QRIS',
      icon: null,
      emoji: '📱',
      description: 'Pembayaran digital dengan QRIS'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pembayaran</DialogTitle>
          <DialogDescription>
            Total: <span className="font-bold text-blue-600">
              Rp {total.toLocaleString('id-ID')}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Payment Method Selection */}
          <div>
            <Label className="text-sm font-medium">Metode Pembayaran</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {paymentMethods.map(method => {
                const isSelected = paymentMethod === method.id;
                const IconComponent = method.icon;

                return (
                  <Button
                    key={method.id}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => setPaymentMethod(method.id)}
                    className="h-12 flex flex-col items-center justify-center"
                    disabled={loading}
                  >
                    <div className="flex items-center space-x-2">
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                      {method.emoji && <span className="text-lg">{method.emoji}</span>}
                      <span className="text-sm">{method.label}</span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Cash Payment Details */}
          {paymentMethod === 'cash' && (
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Jumlah Bayar</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  className="mt-1"
                  disabled={loading}
                  min={total}
                  step="1000"
                />
              </div>

              {/* Payment Summary */}
              {paidAmount && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-medium">Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bayar:</span>
                      <span className="font-medium">
                        Rp {parseFloat(paidAmount || 0).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold border-t pt-2">
                      <span>Kembalian:</span>
                      <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                        Rp {change.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                  
                  {change < 0 && (
                    <p className="text-xs text-red-600 mt-2">
                      Jumlah bayar kurang dari total
                    </p>
                  )}
                </div>
              )}

              {/* Quick Amount Buttons */}
              <div>
                <Label className="text-sm text-muted-foreground">Jumlah Cepat:</Label>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {[
                    Math.ceil(total / 1000) * 1000, // Round up to nearest thousand
                    Math.ceil(total / 5000) * 5000, // Round up to nearest 5k
                    Math.ceil(total / 10000) * 10000, // Round up to nearest 10k
                  ].filter((amount, index, arr) => arr.indexOf(amount) === index && amount > total)
                   .slice(0, 3)
                   .map(amount => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setPaidAmount(amount.toString())}
                      disabled={loading}
                      className="text-xs"
                    >
                      Rp {amount.toLocaleString('id-ID')}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* QRIS Payment Info */}
          {paymentMethod === 'qris' && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-center space-y-2">
                <div className="text-2xl">📱</div>
                <p className="text-sm font-medium text-blue-800">
                  Pembayaran QRIS
                </p>
                <p className="text-xs text-blue-600">
                  Customer akan membayar melalui aplikasi digital
                </p>
                <p className="text-sm font-bold text-blue-800">
                  Rp {total.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={loading}
          >
            Batal
          </Button>
          <Button
            onClick={handleProcessPayment}
            disabled={!isPaymentValid || loading}
            className="flex-1"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Proses Pembayaran
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;