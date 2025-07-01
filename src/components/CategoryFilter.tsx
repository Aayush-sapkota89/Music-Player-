import React, { useState } from 'react';

const categories = [
  { id: 'all', name: 'All Products', count: 89 },
  { id: 'mac', name: 'Mac', count: 24 },
  { id: 'ipad', name: 'iPad', count: 18 },
  { id: 'iphone', name: 'iPhone', count: 15 },
  { id: 'watch', name: 'Apple Watch', count: 12 },
  { id: 'airpods', name: 'AirPods', count: 8 },
  { id: 'tv', name: 'Apple TV', count: 6 },
  { id: 'accessories', name: 'Accessories', count: 6 }
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {category.name} <span className="text-xs opacity-70">({category.count})</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;