import React, { useState } from "react";
import { Plus, Filter, Download } from "lucide-react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

// Layout Components
import Layout from "../components/layout/Layout";

// Feature Components
import DashboardStats from "@/components/dashboard/DashboardStats";
import UsersList from "@/components/users/UsersList";
import UserForm from "@/components/users/UserForm";
import ProductsList from "../components/products/ProductsList";
import TransactionsList from "@/components/transactions/TransactionsList";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Custom Hooks
import {
  useUsers,
  useProducts,
  useTransactions,
  useStats,
} from "../hooks/useData";

// Recent Transactions Component
const RecentTransactions = ({ transactions }) => (
  <Card>
    <CardHeader>
      <CardTitle>Transaksi Terbaru</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {transactions.slice(0, 5).map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{transaction.code}</p>
              <p className="text-sm text-muted-foreground">
                {transaction.customerName || "Customer"}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                Rp {transaction.total.toLocaleString("id-ID")}
              </p>
              <p className="text-sm text-muted-foreground">
                {transaction.paymentMethod}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Low Stock Products Component
const LowStockProducts = ({ products }) => (
  <Card>
    <CardHeader>
      <CardTitle>Stok Produk Rendah</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {products
          .filter((p) => p.stock < 40)
          .map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {product.category}
                </p>
              </div>
              <Badge variant={product.stock < 20 ? "destructive" : "secondary"}>
                {product.stock} tersisa
              </Badge>
            </div>
          ))}
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "dashboard";

  // User management state
  const {
    users,
    loading: usersLoading,
    addUser,
    updateUser,
    deleteUser,
  } = useUsers();
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Product management
  const { products } = useProducts();

  // Transactions
  const { transactions } = useTransactions();

  // Statistics
  const stats = useStats(users, products, transactions);

  // User management handlers
  const handleUserSubmit = async (userData) => {
    const result = selectedUser
      ? await updateUser(userData)
      : await addUser(userData);

    if (result.success) {
      setUserFormOpen(false);
      setSelectedUser(null);
    }
  };

  const handleUserEdit = (user) => {
    setSelectedUser(user);
    setUserFormOpen(true);
  };

  const handleUserDelete = async (user) => {
    if (window.confirm(`Hapus user ${user.username}?`)) {
      await deleteUser(user.id);
    }
  };

  // Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-6">
      <DashboardStats stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions transactions={transactions} />
        <LowStockProducts products={products} />
      </div>
    </div>
  );

  // Users Content
  const UsersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manajemen Pengguna</h2>
        <Button
          onClick={() => {
            setSelectedUser(null);
            setUserFormOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>
      <UsersList
        users={users}
        onView={() => {}}
        onEdit={handleUserEdit}
        onDelete={handleUserDelete}
      />
      <UserForm
        isOpen={userFormOpen}
        onClose={() => {
          setUserFormOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleUserSubmit}
        user={selectedUser}
        isLoading={usersLoading}
      />
    </div>
  );

  // Products Content
  const ProductsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manajemen Produk</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Produk
        </Button>
      </div>
      <ProductsList products={products} onView={() => {}} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );

  // Transactions Content
  const TransactionsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Riwayat Transaksi</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <TransactionsList transactions={transactions} onView={() => {}} onDownload={() => {}} />
    </div>
  );

  return (
    <Layout activeTab={currentPath} setActiveTab={(tab) => navigate(`/admin/${tab}`)}>
      <Routes>
        <Route path="dashboard" element={<DashboardContent />} />
        <Route path="users" element={<UsersContent />} />
        <Route path="products" element={<ProductsContent />} />
        <Route path="transactions" element={<TransactionsContent />} />
        <Route path="*" element={<DashboardContent />} />
      </Routes>
    </Layout>
  );
};

export default AdminDashboard;
