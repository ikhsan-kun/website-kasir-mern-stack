import React from 'react';
import KasirHeader from './KasirHeader';

const KasirLayout = ({ 
  children, 
  currentTime = new Date(),
  user = { name: 'Kasir', email: 'kasir@example.com' },
  onProfile,
  onSettings,
  onLogout
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <KasirHeader
        currentTime={currentTime}
        user={user}
        onProfile={onProfile}
        onSettings={onSettings}
        onLogout={onLogout}
      />
      
      <main className="h-[calc(100vh-73px)]">
        {children}
      </main>
    </div>
  );
};

export default KasirLayout;