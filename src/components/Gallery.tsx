import React from 'react';

const Gallery = () => {
  const images = [
    {
      url: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Coffee brewing process'
    },
    {
      url: 'https://images.pexels.com/photos/1833399/pexels-photo-1833399.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Barista making latte art'
    },
    {
      url: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Coffee beans close up'
    },
    {
      url: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Cafe interior atmosphere'
    },
    {
      url: 'https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Fresh pastries display'
    },
    {
      url: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Coffee cup with foam art'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold text-lg">Gallery</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">
            Moments Worth Sharing
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Take a glimpse into our world of coffee craftsmanship, cozy atmosphere, 
            and the beautiful moments that happen every day at 10 X Cafe.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-square">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">Follow us for more coffee moments</p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
            @10xcafe on Instagram
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;