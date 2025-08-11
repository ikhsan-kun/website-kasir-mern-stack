import React from 'react';
import { Clock, Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionCard from './TransactionCard';
import EmptyState from '../common/EmptyState';

const TransactionsList = ({ 
  transactions = [], 
  onViewTransaction, 
  onDownloadReceipt,
  loading = false,
  maxItems = 10,
  showHeader = true,
  className = ''
}) => {
  const displayTransactions = transactions.slice(0, maxItems);

  const totalRevenue = transactions.reduce((sum, transaction) => sum + transaction.total, 0);

  if (loading) {
    return (
      <Card className={className}>
        {showHeader && (
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <div className="animate-pulse bg-gray-200 h-6 w-40 rounded"></div>
            </CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse p-4 border rounded-lg">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div>
                    <div className="h-3 bg-gray-200 rounded w-16 ml-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Transaksi Hari Ini ({transactions.length})
            </div>
            {transactions.length > 0 && (
              <div className="text-sm font-normal text-muted-foreground">
                Total: Rp {totalRevenue.toLocaleString('id-ID')}
              </div>
            )}
          </CardTitle>
        </CardHeader>
      )}
      
      <CardContent>
        {displayTransactions.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title="Belum ada transaksi hari ini"
            description="Transaksi yang berhasil akan muncul di sini"
            className="py-8"
          />
        ) : (
          <div className="space-y-3">
            {displayTransactions.map(transaction => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onView={onViewTransaction}
                onDownload={onDownloadReceipt}
              />
            ))}
            
            {transactions.length > maxItems && (
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Menampilkan {maxItems} dari {transactions.length} transaksi
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsList;