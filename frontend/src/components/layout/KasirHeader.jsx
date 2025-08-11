import React from 'react';
import { ShoppingCart } from 'lucide-react';
import UserMenu from '../common/UserMenu';

const KasirHeader = ({ 
  currentTime = new Date(),
  user,
  onProfile,
  onSettings,
  onLogout 
}) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID');
  };

  return (
    <header className="bg-white shadow-sm border-b px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section - Logo & Date */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl">Kasir POS</h1>
              <p className="text-sm text-muted-foreground">
                {formatDate(currentTime)}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Time & User Menu */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium">
              {formatTime(currentTime)}
            </p>
            <p className="text-xs text-muted-foreground">Waktu Sistem</p>
          </div>

          <UserMenu
            user={user}
            onProfile={onProfile}
            onSettings={onSettings}
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default KasirHeader;