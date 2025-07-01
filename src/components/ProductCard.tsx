import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  specs: string;
  savings: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const savingsPercent = Math.round((product.savings / product.originalPrice) * 100);

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Save ${product.savings}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">{product.specs}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-gray-900">${product.price.toLocaleString()}</div>
            <div className="text-sm text-gray-500 line-through">${product.originalPrice.toLocaleString()}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-green-600">You save {savingsPercent}%</div>
          </div>
        </div>

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductCard;