'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, Users, ChevronDown, Building, Zap, Globe } from 'lucide-react';
import { spaces } from './lib/dummy-data';
import DiscoverySection from './components/pages/DiscoverySection';

export default function HomePage() {
  const [activeSearchField, setActiveSearchField] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [workspaceType, setWorkspaceType] = useState('');
  const [bookingType, setBookingType] = useState('');
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);
  const [showBookingDropdown, setShowBookingDropdown] = useState(false);

  // Filter spaces by type for different sections
  const corporateHubs = spaces.filter(space => space.type === 'Corporate Hub');
  const proWorkspaces = spaces.filter(space => space.type === 'Pro Workspace');
  const featuredSpaces = spaces.slice(0, 6); // First 6 spaces as featured

  const popularSearches = [
    'Corporate Hubs in San Francisco',
    'Pro Workspaces in Berlin', 
    'Monthly Desks in London',
    'Day Pass in Tokyo',
    'Private Offices in NYC'
  ];

  // Close dropdowns when clicking outside
  const handleSearchBarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const closeDropdowns = () => {
    setShowWorkspaceDropdown(false);
    setShowBookingDropdown(false);
    setActiveSearchField(null);
  };

  return (
    <div className="min-h-screen" onClick={closeDropdowns}>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Professional Background Image - Modern Office */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')"
          }}
        ></div>
        
        {/* Sophisticated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/50 to-slate-900/80"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-7xl mx-auto px-4">
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block">Find your perfect</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                workspace
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light">
              Connect with inspiring spaces and like-minded professionals in the world&apos;s most dynamic work environments
            </p>
          </div>
          
          {/* Enhanced WeWork-style Search Bar */}
          <div className="mt-16 max-w-6xl mx-auto relative z-[9999]">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-2 shadow-2xl transition-all duration-500 hover:shadow-3xl relative z-[9999]" onClick={handleSearchBarClick}>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                
                {/* Location Field */}
                <div 
                  className={`relative cursor-pointer transition-all duration-300 ${
                    activeSearchField === 'location' ? 'transform scale-[1.02] shadow-lg' : ''
                  }`}
                  onClick={() => setActiveSearchField('location')}
                >
                  <div className="p-6 rounded-2xl hover:bg-gray-50/80 transition-all duration-200">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Search destinations"
                          className="w-full text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none text-lg font-medium focus:placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workspace Type Field */}
                <div 
                  className={`relative cursor-pointer transition-all duration-300 z-[60] ${
                    activeSearchField === 'workspace' ? 'transform scale-[1.02] shadow-lg' : ''
                  }`}
                  onClick={() => {
                    setActiveSearchField('workspace');
                    setShowWorkspaceDropdown(!showWorkspaceDropdown);
                    setShowBookingDropdown(false);
                  }}
                >
                  <div className="p-6 rounded-2xl hover:bg-gray-50/80 transition-all duration-200">
                    <div className="flex items-start space-x-4">
                      <Building className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Workspace Type
                        </label>
                        <div className="text-lg font-medium text-gray-900">
                          {workspaceType || 'Choose workspace style'}
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 mt-2 flex-shrink-0 transition-transform duration-200 ${showWorkspaceDropdown ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  
                  {/* Custom Workspace Dropdown */}
                  {showWorkspaceDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[9999] animate-fade-in-up">
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setWorkspaceType('Corporate Hub');
                          setShowWorkspaceDropdown(false);
                        }}
                        className="p-6 hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 cursor-pointer"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Corporate Hub</h4>
                            <p className="text-sm text-gray-600">Work alongside companies and their teams. Perfect for networking and collaboration opportunities.</p>
                          </div>
                        </div>
                      </div>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setWorkspaceType('Pro Workspace');
                          setShowWorkspaceDropdown(false);
                        }}
                        className="p-6 hover:bg-purple-50 transition-colors duration-200 cursor-pointer"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Pro Workspace</h4>
                            <p className="text-sm text-gray-600">Dedicated professional spaces with Hub Ambassadors. Focused, productive environments.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Booking Type Field */}
                <div 
                  className={`relative cursor-pointer transition-all duration-300 z-[60] ${
                    activeSearchField === 'booking' ? 'transform scale-[1.02] shadow-lg' : ''
                  }`}
                  onClick={() => {
                    setActiveSearchField('booking');
                    setShowBookingDropdown(!showBookingDropdown);
                    setShowWorkspaceDropdown(false);
                  }}
                >
                  <div className="p-6 rounded-2xl hover:bg-gray-50/80 transition-all duration-200">
                    <div className="flex items-start space-x-4">
                      <Calendar className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Booking Type
                        </label>
                        <div className="text-lg font-medium text-gray-900">
                          {bookingType || 'Select your plan'}
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 mt-2 flex-shrink-0 transition-transform duration-200 ${showBookingDropdown ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  
                  {/* Custom Booking Dropdown */}
                  {showBookingDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[9999] animate-fade-in-up">
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setBookingType('Day Pass');
                          setShowBookingDropdown(false);
                        }}
                        className="p-6 hover:bg-green-50 transition-colors duration-200 border-b border-gray-100 cursor-pointer"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-gray-900">Day Pass</h4>
                              <span className="text-sm font-semibold text-green-600">From $25/day</span>
                            </div>
                            <p className="text-sm text-gray-600">Perfect for trying out spaces or short-term projects. Full access for the day.</p>
                          </div>
                        </div>
                      </div>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setBookingType('Monthly Desk');
                          setShowBookingDropdown(false);
                        }}
                        className="p-6 hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 cursor-pointer"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-gray-900">Monthly Desk</h4>
                              <span className="text-sm font-semibold text-blue-600">From $200/month</span>
                            </div>
                            <p className="text-sm text-gray-600">Your dedicated desk with storage. Build relationships and establish routine.</p>
                          </div>
                        </div>
                      </div>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setBookingType('Private Office');
                          setShowBookingDropdown(false);
                        }}
                        className="p-6 hover:bg-purple-50 transition-colors duration-200 cursor-pointer"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-gray-900">Private Office</h4>
                              <span className="text-sm font-semibold text-purple-600">From $800/month</span>
                            </div>
                            <p className="text-sm text-gray-600">Enclosed space for teams. Privacy, security, and professional environment.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <div className="p-2">
                  <button className="w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 min-h-[88px] text-lg">
                    <Search className="w-6 h-6" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-10 animate-fade-in-up delay-300">
              <p className="text-gray-300 text-sm mb-6 font-medium">Popular searches:</p>
              <div className="flex flex-wrap gap-4 justify-center">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Value Proposition Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The future of flexible workspace
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From corporate hubs fostering innovation to professional workspaces designed for productivity—find your perfect work environment that adapts to your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-100 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Prime Locations</h3>
              <p className="text-gray-600 leading-relaxed">Access premium workspaces in the heart of business districts and innovation hubs worldwide.</p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-100 rounded-full animate-ping delay-200"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Driven</h3>
              <p className="text-gray-600 leading-relaxed">Connect with like-minded professionals and build meaningful business relationships that last.</p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-100 rounded-full animate-ping delay-500"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexible Terms</h3>
              <p className="text-gray-600 leading-relaxed">From daily passes to monthly memberships—work on your terms with maximum flexibility and control.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Sections */}
      <div className="bg-white">
        <DiscoverySection 
          title="Featured Workspaces" 
          spaces={featuredSpaces} 
        />
        
        <DiscoverySection 
          title="Corporate Innovation Hubs" 
          spaces={corporateHubs} 
        />
        
        <DiscoverySection 
          title="Professional Workspaces" 
          spaces={proWorkspaces} 
        />
      </div>
    </div>
  );
}
