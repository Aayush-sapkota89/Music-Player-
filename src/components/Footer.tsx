import React from 'react';
import { Coffee, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Quick Links',
      links: ['Home', 'About Us', 'Menu', 'Gallery', 'Contact', 'Order Online']
    },
    {
      title: 'Menu Categories',
      links: ['Coffee', 'Espresso Drinks', 'Cold Beverages', 'Pastries', 'Breakfast', 'Lunch']
    },
    {
      title: 'Services',
      links: ['Dine In', 'Takeaway', 'Online Ordering', 'Catering', 'Private Events', 'Coffee Subscriptions']
    }
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, name: 'Instagram' },
    { icon: <Facebook className="w-5 h-5" />, name: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, name: 'Twitter' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Coffee className="w-8 h-8 text-amber-400" />
              <span className="text-2xl font-bold">10 X Cafe</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Where every cup tells a story of passion, quality, and the perfect blend 
              of tradition and innovation. Join us for an unforgettable coffee experience.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>123 Coffee Street, Downtown</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>(555) 123-CAFE</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>hello@10xcafe.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-300 mb-6">Subscribe to get updates on new menu items, events, and special offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <span>© 2025 10 X Cafe. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for coffee lovers.</span>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-600 text-gray-300 hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;