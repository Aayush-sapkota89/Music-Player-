import React, { useState, useEffect } from 'react';
import { Coffee, Menu, X, MapPin, Phone, Clock } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 120; // Account for both info bar and main header
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top info bar */}
      <div className="bg-amber-900 text-amber-100 py-2 text-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>123 Coffee Street, Downtown</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>(555) 123-CAFE</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Open Daily 6:00 AM - 10:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg top-0' : 'bg-transparent top-10'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Coffee className={`w-8 h-8 ${isScrolled ? 'text-amber-900' : 'text-white'}`} />
              <span className={`text-2xl font-bold ${isScrolled ? 'text-amber-900' : 'text-white'}`}>
                10 X Cafe
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-medium hover:text-amber-600 transition-colors duration-200 cursor-pointer ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200">
                Order Online
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? 
                <X className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} /> : 
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              }
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
              <div className="px-4 py-4 space-y-3">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 cursor-pointer"
                  >
                    {item.name}
                  </a>
                ))}
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200">
                  Order Online
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;