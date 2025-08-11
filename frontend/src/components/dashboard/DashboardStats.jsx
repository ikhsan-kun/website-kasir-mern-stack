import React from 'react';
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react';
import StatsCard from '../common/StatsCard';

const DashboardStats = ({ stats }) => {
  const statsConfig = [
    {
      title: 'Total Pengguna',
      value: stats.totalUsers,
      description: '+2 dari bulan lalu',
      icon: Users,
      trendDirection: 'up'
    },
    {
      title: 'Total Produk',
      value: stats.totalProducts,
      description: '+5 dari bulan lalu',
      icon: Package,
      trendDirection: 'up'
    },
    {
      title: 'Total Transaksi',
      value: stats.totalTransactions,
      description: '+12% dari kemarin',
      icon: ShoppingCart,
      trendDirection: 'up'
    },
    {
      title: 'Total Pendapatan',
      value: `Rp ${stats.totalRevenue.toLocaleString('id-ID')}`,
      description: '+8% dari kemarin',
      icon: DollarSign,
      trendDirection: 'up'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          trend={true}
          trendDirection={stat.trendDirection}
        />
      ))}
    </div>
  );
};

export default DashboardStats;