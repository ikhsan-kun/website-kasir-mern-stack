import React from 'react';
import { Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../common/Table';

const TransactionsList = ({ transactions, onView, onDownload }) => {
  const handleAction = (action, transaction) => {
    switch (action) {
      case 'view':
        onView && onView(transaction);
        break;
      case 'download':
        onDownload && onDownload(transaction);
        break;
      default:
        break;
    }
  };

  const getPaymentMethodVariant = (method) => {
    switch (method.toLowerCase()) {
      case 'cash':
        return 'default';
      case 'qris':
        return 'secondary';
      case 'debit':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode Transaksi</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Metode Pembayaran</TableHead>
              <TableHead>Kembalian</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium font-mono">
                  {transaction.code}
                </TableCell>
                <TableCell>
                  {transaction.customerName || (
                    <span className="text-muted-foreground italic">-</span>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  Rp {transaction.total.toLocaleString('id-ID')}
                </TableCell>
                <TableCell>
                  <Badge variant={getPaymentMethodVariant(transaction.paymentMethod)}>
                    {transaction.paymentMethod}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={transaction.change > 0 ? 'text-green-600' : 'text-muted-foreground'}>
                    Rp {transaction.change.toLocaleString('id-ID')}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDateTime(transaction.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleAction('view', transaction)}
                      title="Lihat detail transaksi"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleAction('download', transaction)}
                      title="Download receipt"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionsList;