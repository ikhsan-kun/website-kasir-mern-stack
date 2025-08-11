import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../common/Table';

const ProductsList = ({ products, onView, onEdit, onDelete }) => {
  const handleAction = (action, product) => {
    switch (action) {
      case 'view':
        onView && onView(product);
        break;
      case 'edit':
        onEdit && onEdit(product);
        break;
      case 'delete':
        onDelete && onDelete(product);
        break;
      default:
        break;
    }
  };

  const getStockVariant = (stock) => {
    if (stock < 10) return 'destructive';
    if (stock < 20) return 'secondary';
    return 'default';
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{product.category}</Badge>
                </TableCell>
                <TableCell>Rp {product.price.toLocaleString('id-ID')}</TableCell>
                <TableCell>
                  <Badge variant={getStockVariant(product.stock)}>
                    {product.stock}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={product.isActive ? 'default' : 'destructive'}>
                    {product.isActive ? 'Aktif' : 'Nonaktif'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleAction('view', product)}
                      title="Lihat detail"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleAction('edit', product)}
                      title="Edit produk"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleAction('delete', product)}
                      title="Hapus produk"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductsList;