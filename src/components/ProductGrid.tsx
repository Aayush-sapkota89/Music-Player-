import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    id: '1',
    name: 'MacBook Air 13-inch M2',
    price: 999,
    originalPrice: 1199,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'mac',
    specs: '8-core CPU, 8-core GPU, 256GB SSD',
    savings: 200
  },
  {
    id: '2',
    name: 'iPad Pro 12.9-inch',
    price: 899,
    originalPrice: 1099,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'ipad',
    specs: 'M2 chip, 128GB, Wi-Fi',
    savings: 200
  },
  {
    id: '3',
    name: 'iPhone 14 Pro',
    price: 829,
    originalPrice: 999,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'iphone',
    specs: '128GB, Deep Purple',
    savings: 170
  },
  {
    id: '4',
    name: 'Apple Watch Series 8',
    price: 329,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'watch',
    specs: '45mm, GPS, Midnight Aluminum',
    savings: 70
  },
  {
    id: '5',
    name: 'MacBook Pro 14-inch',
    price: 1799,
    originalPrice: 1999,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    category: 'mac',
    specs: 'M2 Pro chip, 512GB SSD, Space Gray',
    savings: 200
  },
  {
    id: '6',
    name: 'AirPods Pro 2nd Gen',
    price: 199,
    originalPrice: 249,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'airpods',
    specs: 'Active Noise Cancellation, MagSafe Case',
    savings: 50
  },
  {
    id: '7',
    name: 'iPad Air 10.9-inch',
    price: 479,
    originalPrice: 599,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'ipad',
    specs: 'M1 chip, 64GB, Wi-Fi, Blue',
    savings: 120
  },
  {
    id: '8',
    name: 'Apple TV 4K',
    price: 149,
    originalPrice: 179,
    image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'tv',
    specs: '3rd generation, 64GB',
    savings: 30
  },
  {
    id: '9',
    name: 'iPhone 13',
    price: 529,
    originalPrice: 629,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'iphone',
    specs: '128GB, Pink',
    savings: 100
  }
];

interface ProductGridProps {
  selectedCategory: string;
}

const ProductGrid = ({ selectedCategory }: ProductGridProps) => {
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {selectedCategory === 'all' ? 'All Refurbished Products' : `Refurbished ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
          </h2>
          <p className="text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;