import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ProductFilters = ({ 
  searchTerm = '', 
  onSearchChange,
  selectedCategory = 'all',
  onCategoryChange,
  categories = [],
  className = ''
}) => {
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(category => {
          const isSelected = selectedCategory === category;
          const displayName = category === 'all' ? 'Semua' : category;
          
          return (
            <Button
              key={category}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className="capitalize"
            >
              {displayName}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFilters;