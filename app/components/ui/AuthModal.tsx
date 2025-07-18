'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Building, CheckCircle, Briefcase } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { getCompanyByDomain, type Company, demoAccounts, users } from '../../lib/dummy-data';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<'member' | 'corporate-host' | 'pro-provider' | 'corporate-employee'>('member');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [detectedCompany, setDetectedCompany] = useState<Company | null>(null);

  const { login } = useAuthStore();

  // Detect corporate email domain
  useEffect(() => {
    if (email && email.includes('@')) {
      const domain = email.split('@')[1];
      const company = getCompanyByDomain(domain);
      if (company) {
        setDetectedCompany(company);
        // Auto-switch to corporate employee if company detected
        if (activeTab === 'signup' && userType === 'member') {
          setUserType('corporate-employee');
        }
      } else {
        setDetectedCompany(null);
      }
    } else {
      setDetectedCompany(null);
    }
  }, [email, activeTab, userType]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(email);
    if (success) {
      onClose();
      resetForm();
    } else {
      setError(`Invalid email. Try: ${demoAccounts.slice(0, 4).map(acc => acc.email).join(', ')}`);
    }
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo, automatically log in with first available email of selected type
    let demoEmail = '';
    switch (userType) {
      case 'member':
        demoEmail = users.find(u => u.role === 'member')?.email || 'iris@freelancer.com';
        break;
      case 'corporate-host':
        demoEmail = users.find(u => u.role === 'corporate-host')?.email || 'alice@techcorp.com';
        break;
      case 'pro-provider':
        demoEmail = users.find(u => u.role === 'pro-provider')?.email || 'bob@provider.com';
        break;
      case 'corporate-employee':
        // Use the detected company's domain to find a corporate employee
        if (detectedCompany) {
          demoEmail = users.find(u => u.role === 'corporate-employee' && u.companyId === detectedCompany.id)?.email || 'carol@startupx.io';
        } else {
          demoEmail = users.find(u => u.role === 'corporate-employee')?.email || 'carol@startupx.io';
        }
        break;
    }

    const success = login(demoEmail);
    if (success) {
      onClose();
      resetForm();
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setUserType('member');
    setError('');
    setActiveTab('login');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Welcome to ShareYourSpace
            </h2>
            <button
              onClick={handleClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'login'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-3 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'signup'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  {isLoading ? 'Logging in...' : 'Log In'}
                </button>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700 font-medium mb-1">Demo Accounts:</p>
                  {demoAccounts.slice(0, 6).map((account, index) => (
                    <p key={index} className="text-xs text-blue-600">• {account.email} ({account.role})</p>
                  ))}
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  {/* Corporate Benefits Detection */}
                  {detectedCompany && (
                    <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-900 mb-1">
                            🎉 Corporate Benefits Detected!
                          </h4>
                          <p className="text-sm text-blue-700 mb-2">
                            We found that <strong>{detectedCompany.name}</strong> is part of our corporate network.
                          </p>
                          <div className="space-y-1">
                            <div className="flex items-center text-xs text-blue-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Monthly allowance: ${detectedCompany.monthlyAllowance}
                            </div>
                            <div className="flex items-center text-xs text-blue-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Host discount: {detectedCompany.crossBenefits.hostDiscount}%
                            </div>
                            <div className="flex items-center text-xs text-blue-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {detectedCompany.crossBenefits.priorityAccess ? 'Priority access enabled' : 'Standard access'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a...
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="member"
                        checked={userType === 'member'}
                        onChange={(e) => setUserType(e.target.value as 'member' | 'corporate-host' | 'pro-provider' | 'corporate-employee')}
                        className="mr-3 text-primary focus:ring-primary"
                        disabled={detectedCompany !== null}
                      />
                      <div className="flex items-center">
                        <User className={`w-4 h-4 mr-2 ${detectedCompany ? 'text-gray-300' : 'text-gray-500'}`} />
                        <span className={`text-sm ${detectedCompany ? 'text-gray-400' : 'text-gray-900'}`}>
                          Independent professional looking for workspace
                        </span>
                      </div>
                    </label>
                    
                    {detectedCompany && (
                      <label className="flex items-center bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <input
                          type="radio"
                          value="corporate-employee"
                          checked={userType === 'corporate-employee'}
                          onChange={(e) => setUserType(e.target.value as 'member' | 'corporate-host' | 'pro-provider' | 'corporate-employee')}
                          className="mr-3 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                          <div>
                            <span className="text-sm font-medium text-blue-900">
                              Employee at {detectedCompany.name}
                            </span>
                            <div className="text-xs text-blue-600">
                              Access corporate benefits and team booking
                            </div>
                          </div>
                        </div>
                      </label>
                    )}
                    
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="corporate-host"
                        checked={userType === 'corporate-host'}
                        onChange={(e) => setUserType(e.target.value as 'member' | 'corporate-host' | 'pro-provider' | 'corporate-employee')}
                        className="mr-3 text-primary focus:ring-primary"
                      />
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-sm">Company with extra desks to share</span>
                      </div>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="pro-provider"
                        checked={userType === 'pro-provider'}
                        onChange={(e) => setUserType(e.target.value as 'member' | 'corporate-host' | 'pro-provider' | 'corporate-employee')}
                        className="mr-3 text-primary focus:ring-primary"
                      />
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-sm">Property manager/landlord</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors ${
                    detectedCompany 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white' 
                      : 'bg-primary hover:bg-primary-dark text-white'
                  } disabled:bg-gray-300`}
                >
                  {isLoading ? 'Creating Account...' : 
                   detectedCompany ? `Join ${detectedCompany.name} Network` : 'Create Account'}
                </button>

                <div className={`mt-4 p-3 rounded-lg ${detectedCompany ? 'bg-blue-50' : 'bg-green-50'}`}>
                  <p className={`text-xs ${detectedCompany ? 'text-blue-700' : 'text-green-700'}`}>
                    {detectedCompany 
                      ? `🎉 You'll get instant access to ${detectedCompany.name}'s workspace benefits and partner network!`
                      : 'This is a demo. Signup will automatically log you in with a sample account.'
                    }
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
