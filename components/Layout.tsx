import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { NavigationItem } from '../types';

const navItems: NavigationItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Contact', path: '/contact' },
];

// Custom Logo Component matching the image provided
const HabashLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" className={className}>
    <line x1="25" y1="15" x2="25" y2="85" strokeLinecap="round" className="text-brand-900" />
    <line x1="75" y1="15" x2="75" y2="85" strokeLinecap="round" className="text-brand-900" />
    <path d="M25 50 Q50 20 75 50 Q50 80 25 50 Z" className="text-brand-600" stroke="currentColor" fill="none" />
    <circle cx="50" cy="50" r="10" className="text-brand-900" fill="currentColor" stroke="none" />
  </svg>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-slate-600 overflow-x-hidden">
      {/* Top Bar */}
      <div className="bg-brand-900 text-white py-2 text-xs sm:text-sm relative z-50">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="flex items-center space-x-4">
            <span className="flex items-center hover:text-brand-200 transition-colors"><Phone className="w-3 h-3 mr-1.5" /> {COMPANY_INFO.mobile}</span>
            <span className="hidden sm:flex items-center hover:text-brand-200 transition-colors"><Mail className="w-3 h-3 mr-1.5" /> {COMPANY_INFO.email}</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-brand-400 transition-all hover:scale-110"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="hover:text-brand-400 transition-all hover:scale-110"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-brand-400 transition-all hover:scale-110"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      {/* Modern Glass Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          scrolled ? 'glass border-gray-200 shadow-lg py-2' : 'bg-white/80 backdrop-blur-md border-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="transition-transform duration-500 group-hover:rotate-180">
               <HabashLogo className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            <div className="leading-tight flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold text-brand-900 tracking-tight">HABASH</h1>
              <span className="text-[0.65rem] sm:text-xs font-bold text-brand-600 tracking-[0.2em] uppercase">Medicals</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-brand-50 hover:text-brand-600 ${
                  location.pathname === item.path 
                    ? 'text-brand-600 bg-brand-50 shadow-sm' 
                    : 'text-slate-600'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full transform -translate-x-1/2 mb-1"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-brand-900 hover:bg-brand-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl animate-in slide-in-from-top-5">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-lg font-medium py-3 px-4 rounded-lg flex items-center justify-between ${
                    location.pathname === item.path 
                      ? 'bg-brand-50 text-brand-700 pl-6' 
                      : 'text-slate-700 hover:bg-gray-50'
                  } transition-all duration-300`}
                  onClick={closeMenu}
                >
                  {item.label}
                  {location.pathname === item.path && <div className="w-2 h-2 bg-brand-500 rounded-full"></div>}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Modern Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8 relative overflow-hidden">
        {/* Abstract Background Shape in Footer */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-1 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white p-1.5 rounded-lg">
                   <HabashLogo className="w-8 h-8" />
                </div>
                <span className="text-xl font-bold tracking-wide">Habash Med</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {COMPANY_INFO.tagline}
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="bg-slate-800 p-2 rounded-full text-slate-300 hover:text-white hover:bg-brand-600 transition-all duration-300 hover:-translate-y-1"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="bg-slate-800 p-2 rounded-full text-slate-300 hover:text-white hover:bg-brand-600 transition-all duration-300 hover:-translate-y-1"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="bg-slate-800 p-2 rounded-full text-slate-300 hover:text-white hover:bg-brand-600 transition-all duration-300 hover:-translate-y-1"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3 text-slate-400">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="hover:text-brand-400 hover:pl-2 transition-all duration-300 text-sm inline-block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Categories</h3>
              <ul className="space-y-3 text-slate-400">
                <li><Link to="/products?category=Refraction" className="hover:text-brand-400 hover:pl-2 transition-all duration-300 text-sm inline-block">Refraction Units</Link></li>
                <li><Link to="/products?category=Diagnosis" className="hover:text-brand-400 hover:pl-2 transition-all duration-300 text-sm inline-block">Diagnostic Imaging</Link></li>
                <li><Link to="/products?category=Laboratory" className="hover:text-brand-400 hover:pl-2 transition-all duration-300 text-sm inline-block">Lensmeters</Link></li>
                <li><Link to="/products" className="hover:text-brand-400 hover:pl-2 transition-all duration-300 text-sm inline-block">View All Products</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-brand-500 flex-shrink-0" />
                  <span>{COMPANY_INFO.address}</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-brand-500 flex-shrink-0" />
                  <span>{COMPANY_INFO.phone}</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-brand-500 flex-shrink-0" />
                  <span>{COMPANY_INFO.email}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.fullName}. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed for Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;