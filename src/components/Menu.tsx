import React, { useState } from 'react';
import { Star } from 'lucide-react';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('coffee');

  const categories = [
    { id: 'coffee', name: 'Coffee', count: 12 },
    { id: 'espresso', name: 'Espresso', count: 8 },
    { id: 'cold', name: 'Cold Drinks', count: 10 },
    { id: 'pastries', name: 'Pastries', count: 15 },
    { id: 'breakfast', name: 'Breakfast', count: 9 }
  ];

  const menuItems = {
    coffee: [
      { name: 'House Blend', price: 4.50, description: 'Our signature medium roast with notes of chocolate and caramel', popular: true },
      { name: 'Ethiopian Single Origin', price: 5.50, description: 'Bright and fruity with floral undertones', popular: false },
      { name: 'Colombian Supreme', price: 5.00, description: 'Rich and full-bodied with a smooth finish', popular: true },
      { name: 'French Roast', price: 4.75, description: 'Dark and bold with smoky undertones', popular: false }
    ],
    espresso: [
      { name: 'Classic Espresso', price: 3.00, description: 'Double shot of our premium espresso blend', popular: true },
      { name: 'Cappuccino', price: 4.25, description: 'Espresso with steamed milk and foam art', popular: true },
      { name: 'Latte', price: 4.75, description: 'Smooth espresso with steamed milk', popular: true },
      { name: 'Americano', price: 3.50, description: 'Espresso with hot water for a clean taste', popular: false }
    ],
    cold: [
      { name: 'Iced Coffee', price: 4.00, description: 'Cold brew served over ice with your choice of milk', popular: true },
      { name: 'Frappé', price: 5.25, description: 'Blended coffee drink with whipped cream', popular: true },
      { name: 'Cold Brew', price: 4.50, description: 'Smooth and less acidic, steeped for 12 hours', popular: false },
      { name: 'Iced Latte', price: 4.75, description: 'Espresso and cold milk over ice', popular: true }
    ],
    pastries: [
      { name: 'Croissant', price: 3.25, description: 'Buttery, flaky French pastry', popular: true },
      { name: 'Blueberry Muffin', price: 3.75, description: 'Fresh baked with wild blueberries', popular: true },
      { name: 'Chocolate Chip Cookie', price: 2.50, description: 'Warm, gooey, and made fresh daily', popular: false },
      { name: 'Danish Pastry', price: 3.50, description: 'Sweet pastry with seasonal fruit filling', popular: false }
    ],
    breakfast: [
      { name: 'Avocado Toast', price: 8.50, description: 'Smashed avocado on artisan bread with everything seasoning', popular: true },
      { name: 'Breakfast Sandwich', price: 7.25, description: 'Egg, cheese, and bacon on a fresh croissant', popular: true },
      { name: 'Yogurt Parfait', price: 6.50, description: 'Greek yogurt with granola and fresh berries', popular: false },
      { name: 'Oatmeal Bowl', price: 5.75, description: 'Steel-cut oats with nuts, fruits, and honey', popular: false }
    ]
  };

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold text-lg">Our Menu</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">
            Crafted with Passion
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of premium coffees, artisan pastries, 
            and fresh breakfast options made with the finest ingredients.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid md:grid-cols-2 gap-6">
          {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  {item.popular && (
                    <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                      <Star className="w-3 h-3 fill-current" />
                      Popular
                    </div>
                  )}
                </div>
                <span className="text-2xl font-bold text-amber-600">${item.price}</span>
              </div>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
            Order Online Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;