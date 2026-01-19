
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onAuthClick?: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
  isLoggedIn?: boolean;
  onProfileClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAuthClick, currentPage = 'home', onNavigate, isLoggedIn = false, onProfileClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      window.location.hash = page;
      setMobileMenuOpen(false);
    }
  };

  const isActive = (page: string) => currentPage === page;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={() => navigateTo('home')}>
            <img 
              src="/assets/ryzenflow-logo.svg" 
              alt="RyzenFlow Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-lg font-bold tracking-tight text-gray-900">RyzenFlow</span>
          </div>

          {/* Centered Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {/* Product Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                  isActive('product')
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Product
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => navigateTo('product')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium first:rounded-t-lg"
                >
                  Overview
                </button>
                <button className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium">
                  Features
                </button>
                <button className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium last:rounded-b-lg">
                  Security
                </button>
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                  isActive('solutions')
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Solutions
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => navigateTo('solutions')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium first:rounded-t-lg"
                >
                  By Team Type
                </button>
                <button className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium">
                  By Use Case
                </button>
                <button className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium last:rounded-b-lg">
                  Case Studies
                </button>
              </div>
            </div>

            {/* Pricing Link */}
            <button
              onClick={() => navigateTo('pricing')}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                isActive('pricing')
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Pricing
            </button>

            {/* Support Link */}
            <button
              onClick={() => navigateTo('support')}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                isActive('support')
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Support
            </button>
          </div>

          {/* Right CTA */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <div className="hidden md:block relative group">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                    AJ
                  </div>
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-0 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                    <button
                      onClick={() => {
                        onProfileClick?.();
                        setProfileDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium first:rounded-t-lg flex items-center gap-2"
                    >
                      <User size={16} />
                      Profile
                    </button>
                    <button className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-2">
                      <Settings size={16} />
                      Settings
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await signOut(auth);
                          setProfileDropdownOpen(false);
                          window.location.href = '/';
                        } catch (error) {
                          console.error('Logout error:', error);
                        }
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-red-700 hover:bg-red-50 font-medium last:rounded-b-lg flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onAuthClick}
                className="hidden md:block px-6 py-2 text-sm font-bold bg-[#10b981] text-white rounded-full hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10"
              >
                Get Started
              </button>
            )}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-6 shadow-xl">
          <button
            onClick={() => navigateTo('product')}
            className={`text-base font-medium text-left ${isActive('product') ? 'text-emerald-600' : 'text-gray-900'}`}
          >
            Product
          </button>
          <button
            onClick={() => navigateTo('solutions')}
            className={`text-base font-medium text-left ${isActive('solutions') ? 'text-emerald-600' : 'text-gray-900'}`}
          >
            Solutions
          </button>
          <button
            onClick={() => navigateTo('pricing')}
            className={`text-base font-medium text-left ${isActive('pricing') ? 'text-emerald-600' : 'text-gray-900'}`}
          >
            Pricing
          </button>
          <button
            onClick={() => navigateTo('support')}
            className={`text-base font-medium text-left ${isActive('support') ? 'text-emerald-600' : 'text-gray-900'}`}
          >
            Support
          </button>
          <button 
            onClick={onAuthClick}
            className="w-full py-3 bg-[#10b981] text-white font-bold rounded-full"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};
