'use client';

import { useState } from 'react';
import { Menu, X, User, LogOut, Building } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import AuthModal from './AuthModal';

export default function BurgerMenu() {
  const { isAuthenticated, currentUser, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleUserClick = () => {
    if (isAuthenticated) {
      // Handle authenticated user actions
    } else {
      setIsAuthModalOpen(true);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const menuItems = [
    { 
      label: 'List Your Space', 
      action: () => {
        // Handle list space navigation
        setIsMenuOpen(false);
      },
      icon: <Building className="w-5 h-5" />
    },
  ];

  return (
    <>
      {/* Burger Menu Button - Fixed in top right */}
      <div className="fixed top-4 right-4 z-[9998]">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 hover:bg-white hover:shadow-xl transition-all duration-300"
          aria-label="Menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Background Overlay */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9997]" 
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-out">
            <div className="p-6">
              {/* Logo/Brand */}
              <div className="mb-8 pt-8">
                <h1 className="text-2xl font-bold text-gray-900">ShareYourSpace</h1>
                <p className="text-sm text-gray-600 mt-1">Flexible Workspaces, Anywhere</p>
              </div>

              {/* User Section */}
              <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                {isAuthenticated && currentUser ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-sm text-gray-600">{currentUser.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleUserClick}
                    className="flex items-center space-x-3 w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Sign In / Register</span>
                  </button>
                )}
              </div>

              {/* Navigation Items */}
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="flex items-center space-x-3 w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.icon}
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Additional Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-2 text-sm text-gray-600">
                  <button className="block hover:text-gray-900 transition-colors">Help & Support</button>
                  <button className="block hover:text-gray-900 transition-colors">Privacy Policy</button>
                  <button className="block hover:text-gray-900 transition-colors">Terms of Service</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
