'use client';

import { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import AuthModal from '../ui/AuthModal';

export default function Header() {
  const { isAuthenticated, currentUser, logout } = useAuthStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleUserClick = () => {
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">ShareYourSpace</h1>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-6">
              <a href="/hosts" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Become a Host
              </a>
              <a href="/members" className="text-gray-700 hover:text-primary font-medium transition-colors">
                For Members
              </a>
              <a href="/enterprise" className="text-gray-700 hover:text-primary font-medium transition-colors">
                For Enterprise
              </a>
              
              {/* User Profile / Login */}
              <div className="relative">
                <button 
                  onClick={handleUserClick}
                  className="flex items-center space-x-2 p-2 rounded-full border border-gray-300 hover:shadow-md transition-shadow"
                >
                  <User className="w-5 h-5 text-gray-600" />
                  {isAuthenticated && currentUser && (
                    <span className="text-sm font-medium text-gray-700">
                      {currentUser.name}
                    </span>
                  )}
                </button>

                {/* User Menu Dropdown */}
                {isAuthenticated && showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                      <p className="text-xs text-gray-500">{currentUser?.email}</p>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Close dropdown when clicking outside */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
