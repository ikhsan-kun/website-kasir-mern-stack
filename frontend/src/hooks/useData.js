import { useState, useEffect } from "react";
import { CONFIG } from "@/lib/config";

const ENDPOINTS = {
  USERS: `${CONFIG.BASE_URL}/api/users`,
  PRODUCTS: `${CONFIG.BASE_URL}/api/products`,
  TRANSACTIONS: `${CONFIG.BASE_URL}/api/transactions`,
}

// =============== USERS HOOK ===============
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat user");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      setUsers((prev) => [...prev, data]);
      return { success: true, data };
    } catch (err) {
      setError("Gagal menambahkan user");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u.id === data.id ? data : u))
      );
      return { success: true, data };
    } catch (err) {
      setError("Gagal mengupdate user");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/users/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== id));
      return { success: true };
    } catch (err) {
      setError("Gagal menghapus user");
      return { success: false };
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
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Gagal memuat produk");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const data = await res.json();
      setProducts((prev) => [...prev, data]);
      return { success: true, data };
    } catch (err) {
      setError("Gagal menambahkan produk");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/products/${productData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const data = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === data.id ? data : p))
      );
      return { success: true, data };
    } catch (err) {
      setError("Gagal mengupdate produk");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return { success: true };
    } catch (err) {
      setError("Gagal menghapus produk");
      return { success: false };
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
      const res = await fetch(`${API_BASE}/transactions`);
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      setError("Gagal memuat transaksi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { transactions, loading, error, fetchTransactions };
};
