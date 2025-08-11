import { useState, useEffect } from 'react';

// Mock data - dalam implementasi nyata, ini akan diganti dengan API calls
const mockUsers = [
  { id: '1', username: 'admin1', email: 'admin@example.com', role: 'admin', isActive: true, createdAt: '2024-01-15' },
  { id: '2', username: 'kasir1', email: 'kasir1@example.com', role: 'kasir', isActive: true, createdAt: '2024-01-16' },
  { id: '3', username: 'kasir2', email: 'kasir2@example.com', role: 'kasir', isActive: false, createdAt: '2024-01-17' },
];

const mockProducts = [
  { id: '1', name: 'Nasi Gudeg', price: 15000, stock: 50, category: 'Makanan', isActive: true },
  { id: '2', name: 'Es Teh Manis', price: 5000, stock: 100, category: 'Minuman', isActive: true },
  { id: '3', name: 'Ayam Bakar', price: 25000, stock: 30, category: 'Makanan', isActive: true },
  { id: '4', name: 'Kopi Hitam', price: 8000, stock: 15, category: 'Minuman', isActive: true },
];

const mockTransactions = [
  { id: '1', code: 'TRX001', kasirId: '2', customerName: 'Budi', total: 45000, paymentMethod: 'Cash', paidAmount: 50000, change: 5000, createdAt: '2024-08-11 10:30' },
  { id: '2', code: 'TRX002', kasirId: '2', customerName: 'Sari', total: 20000, paymentMethod: 'QRIS', paidAmount: 20000, change: 0, createdAt: '2024-08-11 11:15' },
  { id: '3', code: 'TRX003', kasirId: '1', customerName: 'Ahmad', total: 35000, paymentMethod: 'Debit', paidAmount: 35000, change: 0, createdAt: '2024-08-11 12:45' },
];

// Custom hook untuk manajemen data users
export const useUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addUser = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        ...userData,
        id: String(users.length + 1),
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setUsers(prevUsers => [...prevUsers, newUser]);
      return { success: true, data: newUser };
    } catch (err) {
      setError('Gagal menambahkan user');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userData.id ? { ...user, ...userData } : user
        )
      );
      return { success: true, data: userData };
    } catch (err) {
      setError('Gagal mengupdate user');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      return { success: true };
    } catch (err) {
      setError('Gagal menghapus user');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser
  };
};

// Custom hook untuk manajemen data produk
export const useProducts = () => {
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addProduct = async (productData) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProduct = {
        ...productData,
        id: String(products.length + 1),
        isActive: true
      };
      
      setProducts(prevProducts => [...prevProducts, newProduct]);
      return { success: true, data: newProduct };
    } catch (err) {
      setError('Gagal menambahkan produk');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productData) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productData.id ? { ...product, ...productData } : product
        )
      );
      return { success: true, data: productData };
    } catch (err) {
      setError('Gagal mengupdate produk');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      return { success: true };
    } catch (err) {
      setError('Gagal menghapus produk');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct
  };
};

// Custom hook untuk data transaksi
export const useTransactions = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshTransactions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app, this would fetch from API
      return { success: true };
    } catch (err) {
      setError('Gagal memuat transaksi');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    loading,
    error,
    refreshTransactions
  };
};

// Custom hook untuk statistik dashboard
export const useStats = (users, products, transactions) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalTransactions: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    setStats({
      totalUsers: users.length,
      totalProducts: products.length,
      totalTransactions: transactions.length,
      totalRevenue: transactions.reduce((sum, t) => sum + t.total, 0)
    });
  }, [users, products, transactions]);

  return stats;
};