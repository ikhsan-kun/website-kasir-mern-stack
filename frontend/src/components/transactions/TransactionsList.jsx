// src/components/transactions/TransactionsList.jsx
import React from "react";
import { Eye, Download } from "lucide-react";

const TransactionsList = ({ transactions, onView, onDownload }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white shadow rounded p-4 text-center text-gray-500">
        Tidak ada transaksi
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow rounded">
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
          <tr>
            <th className="px-6 py-3">Kode</th>
            <th className="px-6 py-3">Pelanggan</th>
            <th className="px-6 py-3">Total</th>
            <th className="px-6 py-3">Metode Pembayaran</th>
            <th className="px-6 py-3">Tanggal</th>
            <th className="px-6 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b last:border-none hover:bg-gray-50"
            >
              <td className="px-6 py-3 font-medium text-gray-800">
                {transaction.code}
              </td>
              <td className="px-6 py-3">
                {transaction.customerName || "Customer"}
              </td>
              <td className="px-6 py-3">
                Rp {transaction.total.toLocaleString("id-ID")}
              </td>
              <td className="px-6 py-3">{transaction.paymentMethod}</td>
              <td className="px-6 py-3">
                {new Date(transaction.date).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-3 flex items-center justify-end gap-2">
                <button
                  onClick={() => onView(transaction)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                  title="Lihat Detail"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDownload(transaction)}
                  className="p-1 text-green-600 hover:text-green-800"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
