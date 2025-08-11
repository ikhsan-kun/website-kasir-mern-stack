// src/hooks/useData.js
import { useState, useEffect } from "react";
import { config as CONFIG } from "@/lib/config";

// =============== USERS HOOK ===============
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${CONFIG.BASE_URL}/api/users/getAllUsers`);
      const data = await res.json();
      setUsers(data);
    } catch {
      setError("Gagal memuat user");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch(`${CONFIG.BASE_URL}/api/users/postUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      setUsers((prev) => [...prev, data]);
    } catch {
      setError("Gagal menambahkan user");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    setLoading(true);
    try {
      const res = await fetch(`${CONFIG.BASE_URL}/api/users/updateUser/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      setUsers((prev) => prev.map((u) => (u.id === id ? data : u)));
    } catch {
      setError("Gagal mengupdate user");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await fetch(`${CONFIG.BASE_URL}/api/users/deleteUser/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      setError("Gagal menghapus user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, addUser, updateUser, deleteUser, fetchUsers };
};

// =============== PRODUCTS HOOK ===============
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${CONFIG.BASE_URL}/api/products/getAllProducts`);
      const data = await res.json();
      setProducts(data);
    } catch {
      setError("Gagal memuat produk");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    setLoading(true);
    try {
      const res = await fetch(`${CONFIG.BASE_URL}/api/products/postProduct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const data = await res.json();
      setProducts((prev) => [...prev, data]);
    } catch {
      setError("Gagal menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    setLoading(true);
    try {
      const res = await fetch(`${CONFIG.BASE_URL}/api/products/updateProduct/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const data = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? data : p)));
    } catch {
      setError("Gagal mengupdate produk");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await fetch(`${CONFIG.BASE_URL}/api/products/deleteProduct/${id}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError("Gagal menghapus produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, addProduct, updateProduct, deleteProduct, fetchProducts };
};

// =============== TRANSACTIONS HOOK ===============
export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${CONFIG.BASE_URL}/api/transactions/getAllTransactions`);
      const data = await res.json();
      setTransactions(data);
    } catch {
      setError("Gagal memuat transaksi");
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transactionData) => {
    setLoading(true);
    try {
      const res = await fetch(`${CONFIG.BASE_URL}/api/transactions/postTransaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });
      const data = await res.json();
      setTransactions((prev) => [...prev, data]);
    } catch {
      setError("Gagal menambahkan transaksi");
    } finally {
      setLoading(false);
    }
  };

  const updateTransaction = async (id, transactionData) => {
    setLoading(true);
    try {
      const res = await fetch(`${CONFIG.BASE_URL}/api/transactions/updateTransaction/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });
      const data = await res.json();
      setTransactions((prev) => prev.map((t) => (t.id === id ? data : t)));
    } catch {
      setError("Gagal mengupdate transaksi");
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    setLoading(true);
    try {
      await fetch(`${CONFIG.BASE_URL}/api/transactions/deleteTransaction/${id}`, {
        method: "DELETE",
      });
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Gagal menghapus transaksi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { transactions, loading, error, addTransaction, updateTransaction, deleteTransaction, fetchTransactions };
};

// =============== TRANSACTION ITEMS HOOK ===============
export const useTransactionItems = () => {
  const [transactionItems, setTransactionItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactionItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${CONFIG.BASE_URL}/api/transactionItems/getAllTransactionItems`);
      const data = await res.json();
      setTransactionItems(data);
    } catch {
      setError("Gagal memuat item transaksi");
    } finally {
      setLoading(false);
    }
  };

  const addTransactionItem = async (itemData) => {
    setLoading(true);
    try {
      const res = await fetch(`${CONFIG.BASE_URL}/api/transactionItems/postTransactionItem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      const data = await res.json();
      setTransactionItems((prev) => [...prev, data]);
    } catch {
      setError("Gagal menambahkan item transaksi");
    } finally {
      setLoading(false);
    }
  };

  const updateTransactionItem = async (id, itemData) => {
    setLoading(true);
    try {
      const res = await fetch(`${CONFIG.BASE_URL}/api/transactionItems/updateTransactionItem/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      const data = await res.json();
      setTransactionItems((prev) => prev.map((i) => (i.id === id ? data : i)));
    } catch {
      setError("Gagal mengupdate item transaksi");
    } finally {
      setLoading(false);
    }
  };

  const deleteTransactionItem = async (id) => {
    setLoading(true);
    try {
      await fetch(`${CONFIG.BASE_URL}/api/transactionItems/deleteTransactionItem/${id}`, {
        method: "DELETE",
      });
      setTransactionItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      setError("Gagal menghapus item transaksi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionItems();
  }, []);

  return { transactionItems, loading, error, addTransactionItem, updateTransactionItem, deleteTransactionItem, fetchTransactionItems };
};

export const useStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 120,
    totalProducts: 35,
    totalTransactions: 58,
    totalRevenue: 1250000, // contoh dalam Rupiah
  });

  useEffect(() => {
    // Kalau nanti ada API, tinggal ganti fetch di sini
    // fetch("/api/stats").then(res => res.json()).then(setStats);
  }, []);

  return stats;
};