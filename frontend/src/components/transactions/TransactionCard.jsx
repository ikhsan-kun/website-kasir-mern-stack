import React from 'react';
import { Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TransactionCard = ({ 
  transaction, 
  onView, 
  onDownload,
  showActions = true 
}) => {
  const getPaymentMethodColor = (method) => {
    switch (method.toLowerCase()) {
      case 'cash':
        return 'bg-green-100 text-green-800';
      case 'qris':
        return 'bg-blue-100 text-blue-800';
      case 'debit':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
      {/* Transaction Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-medium font-mono text-sm">
            {transaction.code}
          </p>
          <Badge 
            className={`text-xs ${getPaymentMethodColor(transaction.paymentMethod)}`}
            variant="secondary"
          >
            {transaction.paymentMethod}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {transaction.customerName || 'Customer'} • {formatDateTime(transaction.createdAt)}
        </p>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <span>{transaction.items?.length || 0} item(s)</span>
          {transaction.change > 0 && (
            <>
              <span>•</span>
              <span>Kembalian: Rp {transaction.change.toLocaleString('id-ID')}</span>
            </>
          )}
        </div>
      </div>

      {/* Price and Actions */}
      <div className="flex items-center gap-3 ml-4">
        <div className="text-right">
          <p className="font-bold text-green-600">
            Rp {transaction.total.toLocaleString('id-ID')}
          </p>
          {transaction.paidAmount && transaction.paidAmount > transaction.total && (
            <p className="text-xs text-muted-foreground">
              Bayar: Rp {transaction.paidAmount.toLocaleString('id-ID')}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView && onView(transaction)}
              title="Lihat detail"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDownload && onDownload(transaction)}
              title="Download struk"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;