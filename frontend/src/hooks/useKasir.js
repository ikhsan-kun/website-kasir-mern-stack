import { useState, useEffect, useCallback } from 'react';

// Mock data
const mockProducts = [
  { id: '1', name: 'Nasi Gudeg', price: 15000, stock: 50, category: 'Makanan' },
  { id: '2', name: 'Ayam Bakar', price: 25000, stock: 30, category: 'Makanan' },
  { id: '3', name: 'Es Teh Manis', price: 5000, stock: 100, category: 'Minuman' },
  { id: '4', name: 'Es Jeruk', price: 7000, stock: 80, category: 'Minuman' },
  { id: '5', name: 'Soto Ayam', price: 18000, stock: 25, category: 'Makanan' },
  { id: '6', name: 'Kopi Hitam', price: 8000, stock: 60, category: 'Minuman' },
];

// Hook untuk manajemen waktu real-time
export const useTimer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return currentTime;
};

// Hook untuk manajemen produk
export const useProducts = () => {
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProductStock = useCallback((productId, newStock) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, stock: Math.max(0, newStock) }
        : product
    ));
  }, []);

  const reduceStock = useCallback((cartItems) => {
    setProducts(prev => prev.map(product => {
      const cartItem = cartItems.find(item => item.id === product.id);
      if (cartItem) {
        return { ...product, stock: Math.max(0, product.stock - cartItem.quantity) };
      }
      return product;
    }));
  }, []);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app, fetch from API
      setProducts(mockProducts);
    } catch (err) {
      setError('Gagal memuat produk');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    updateProductStock,
    reduceStock,
    refreshProducts
  };
};

// Hook untuk filter produk
export const useProductFilters = (products) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory && product.stock > 0;
  });

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredProducts
  };
};

// Hook untuk manajemen keranjang
export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');

  const addToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item exists and stock allows
        if (existingItem.quantity < product.stock) {
          return prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return prevCart; // No change if max stock reached
      } else {
        // Add new item to cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) {
        // Ensure quantity doesn't exceed stock
        const validQuantity = Math.min(newQuantity, item.stock);
        return { ...item, quantity: Math.max(0, validQuantity) };
      }
      return item;
    }));
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setCustomerName('');
  }, []);

  // Calculate totals
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return {
    cart,
    customerName,
    setCustomerName,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItems
  };
};

// Hook untuk manajemen transaksi
export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTransaction = useCallback(async (transactionData) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newTransaction = {
        id: Date.now().toString(),
        code: `TRX${String(transactions.length + 1).padStart(3, '0')}`,
        ...transactionData,
        createdAt: new Date().toLocaleString('id-ID')
      };

      setTransactions(prev => [newTransaction, ...prev]);
      return { success: true, transaction: newTransaction };
    } catch (err) {
      setError('Gagal menyimpan transaksi');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [transactions.length]);

  const getTransactionById = useCallback((id) => {
    return transactions.find(transaction => transaction.id === id);
  }, [transactions]);

  const getTodayTransactions = useCallback(() => {
    const today = new Date().toDateString();
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt).toDateString();
      return transactionDate === today;
    });
  }, [transactions]);

  const getTotalRevenue = useCallback((filterTransactions = transactions) => {
    return filterTransactions.reduce((total, transaction) => total + transaction.total, 0);
  }, [transactions]);

  return {
    transactions,
    loading,
    error,
    addTransaction,
    getTransactionById,
    getTodayTransactions,
    getTotalRevenue
  };
};

// Hook untuk checkout process
export const useCheckout = (cart, customerName, onSuccess) => {
  const [isOpen, setIsOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const openCheckout = useCallback(() => {
    if (cart.length === 0) return;
    setIsOpen(true);
  }, [cart.length]);

  const closeCheckout = useCallback(() => {
    if (processing) return;
    setIsOpen(false);
  }, [processing]);

  const processPayment = useCallback(async (paymentData) => {
    if (cart.length === 0 || processing) return;

    setProcessing(true);

    try {
      const transactionData = {
        items: [...cart],
        customerName: customerName || 'Customer',
        total: paymentData.total,
        paymentMethod: paymentData.method,
        paidAmount: paymentData.paidAmount,
        change: paymentData.change
      };

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (onSuccess) {
        await onSuccess(transactionData);
      }

      setIsOpen(false);
      
      // Show success message
      const changeMessage = paymentData.change > 0 
        ? `Kembalian: Rp ${paymentData.change.toLocaleString('id-ID')}` 
        : '';
      
      alert(`Transaksi berhasil! ${changeMessage}`);

    } catch (error) {
      alert('Transaksi gagal: ' + error.message);
    } finally {
      setProcessing(false);
    }
  }, [cart, customerName, processing, onSuccess]);

  return {
    isCheckoutOpen: isOpen,
    openCheckout,
    closeCheckout,
    processPayment,
    processing
  };
};