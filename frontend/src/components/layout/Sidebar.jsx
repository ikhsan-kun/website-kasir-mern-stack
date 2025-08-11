import React from 'react';
import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'users', label: 'Pengguna', icon: Users },
    { id: 'products', label: 'Produk', icon: Package },
    { id: 'transactions', label: 'Transaksi', icon: ShoppingCart },
  ];

  return (
    <div className={`bg-gray-900 text-white h-screen fixed left-0 top-0 z-50 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-5 h-5" />
          </div>
          {sidebarOpen && <span className="font-bold text-xl">Kasir Admin</span>}
        </div>
      </div>
      
      <nav className="mt-8">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-700 transition-colors ${
              activeTab === item.id ? 'bg-gray-700 border-r-2 border-blue-500' : ''
            }`}
            title={!sidebarOpen ? item.label : undefined}
          >
            <item.icon className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;