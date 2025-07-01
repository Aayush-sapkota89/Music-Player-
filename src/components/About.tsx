import React from 'react';
import { Award, Heart, Leaf, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Award Winning',
      description: 'Recognized for excellence in coffee quality and customer service across the region.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Made with Love',
      description: 'Every cup is crafted with passion and attention to detail by our skilled baristas.'
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Sustainable',
      description: 'Ethically sourced beans supporting fair trade and environmental responsibility.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community',
      description: 'A gathering place where friendships are made and memories are created.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1833399/pexels-photo-1833399.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Coffee preparation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-6 rounded-2xl shadow-xl">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <div className="mb-6">
              <span className="text-amber-600 font-semibold text-lg">About 10 X Cafe</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">
                Crafting Perfect Coffee Since 2008
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At 10 X Cafe, we believe that great coffee is more than just a beverage—it's an experience. 
                Our journey began with a simple mission: to serve the finest coffee while creating a warm, 
                welcoming space where our community can connect and thrive.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                From our carefully selected single-origin beans to our expertly trained baristas, 
                every element of your coffee experience is designed to exceed expectations and 
                create moments worth savoring.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="text-amber-600 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;