'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, ChevronDown, Building } from 'lucide-react';
import { spaces, bookingProducts, popularSearches } from './lib/dummy-data';
import DiscoverySection from './components/pages/DiscoverySection';
import TargetGroupCarousel from './components/pages/TargetGroupCarousel';

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
          <div className="mt-16 max-w-7xl mx-auto relative z-[9999]">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-2 shadow-2xl transition-all duration-500 hover:shadow-3xl relative z-[9999]" onClick={handleSearchBarClick}>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                
                {/* Location Field */}
                <div 
                  className={`relative cursor-pointer transition-all duration-300 ${
                    activeSearchField === 'location' ? 'transform scale-[1.02] shadow-lg' : ''
                  }`}
                  onClick={() => setActiveSearchField('location')}
                >
                  <div className="p-4 rounded-2xl hover:bg-gray-50/80 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Search destinations"
                          className="w-full text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none text-base font-medium focus:placeholder-gray-400"
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
                  <div className="p-4 rounded-2xl hover:bg-gray-50/80 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-purple-500 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                          Workspace Type
                        </label>
                        <div className="text-base font-medium text-gray-900">
                          {workspaceType || 'Choose workspace style'}
                        </div>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${showWorkspaceDropdown ? 'rotate-180' : ''}`} />
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
                        className="p-4 hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                          <div>
                            <h4 className="font-bold text-gray-900">Corporate Hub</h4>
                            <p className="text-xs text-gray-600">Network with companies & teams</p>
                          </div>
                        </div>
                      </div>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setWorkspaceType('Pro Workspace');
                          setShowWorkspaceDropdown(false);
                        }}
                        className="p-4 hover:bg-purple-50 transition-colors duration-200 cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                          <div>
                            <h4 className="font-bold text-gray-900">Pro Workspace</h4>
                            <p className="text-xs text-gray-600">Professional spaces with ambassadors</p>
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
                  <div className="p-4 rounded-2xl hover:bg-gray-50/80 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                          Booking Type
                        </label>
                        <div className="text-base font-medium text-gray-900">
                          {bookingType || 'Select your plan'}
                        </div>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${showBookingDropdown ? 'rotate-180' : ''}`} />
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
                        className="p-4 hover:bg-green-50 transition-colors duration-200 border-b border-gray-100 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                            <div>
                              <h4 className="font-bold text-gray-900">Day Pass</h4>
                              <p className="text-xs text-gray-600">Try spaces & short projects</p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-green-600">From $25</span>
                        </div>
                      </div>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setBookingType('Monthly Desk');
                          setShowBookingDropdown(false);
                        }}
                        className="p-4 hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <div>
                              <h4 className="font-bold text-gray-900">Monthly Desk</h4>
                              <p className="text-xs text-gray-600">Dedicated desk with storage</p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-blue-600">From $200</span>
                        </div>
                      </div>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setBookingType('Private Office');
                          setShowBookingDropdown(false);
                        }}
                        className="p-4 hover:bg-purple-50 transition-colors duration-200 border-b border-gray-100 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                            <div>
                              <h4 className="font-bold text-gray-900">Private Office</h4>
                              <p className="text-xs text-gray-600">Enclosed space for teams</p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-purple-600">From $800</span>
                        </div>
                      </div>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setBookingType('Team Room');
                          setShowBookingDropdown(false);
                        }}
                        className="p-4 hover:bg-indigo-50 transition-colors duration-200 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-indigo-500 rounded-full flex-shrink-0"></div>
                            <div>
                              <h4 className="font-bold text-gray-900">Team Room</h4>
                              <p className="text-xs text-gray-600">Collaborative space for groups</p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-indigo-600">From $50/hr</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <div className="p-2">
                  <button className="w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2 min-h-[64px] text-base">
                    <Search className="w-5 h-5" />
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

      {/* Dynamic Target Group Solutions Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <TargetGroupCarousel />
      </section>

      {/* Discovery Sections */}
      <div className="bg-white">
        {/* Featured Workspaces */}
        <DiscoverySection 
          title="Featured Workspaces" 
          spaces={featuredSpaces} 
        />
        
        {/* Day Pass Friendly */}
        <DiscoverySection 
          title="Perfect for Day Passes" 
          spaces={spaces.filter(space => 
            bookingProducts.some(bp => 
              bp.spaceId === space.id && bp.type === 'Day Pass'
            )
          ).slice(0, 8)} 
        />
        
        {/* Monthly Desks */}
        <DiscoverySection 
          title="Monthly Desk Options" 
          spaces={spaces.filter(space => 
            bookingProducts.some(bp => 
              bp.spaceId === space.id && bp.type === 'Monthly Desk'
            )
          ).slice(0, 8)} 
        />
        
        {/* Private Offices */}
        <DiscoverySection 
          title="Private Office Suites" 
          spaces={spaces.filter(space => 
            bookingProducts.some(bp => 
              bp.spaceId === space.id && bp.type === 'Private Office'
            )
          ).slice(0, 8)} 
        />
        
        {/* Team Rooms */}
        <DiscoverySection 
          title="Team Collaboration Rooms" 
          spaces={spaces.filter(space => 
            bookingProducts.some(bp => 
              bp.spaceId === space.id && bp.type === 'Team Room'
            )
          ).slice(0, 8)} 
        />
        
        {/* Corporate Hubs */}
        <DiscoverySection 
          title="Corporate Innovation Hubs" 
          spaces={corporateHubs} 
        />
        
        {/* Professional Workspaces */}
        <DiscoverySection 
          title="Professional Workspaces" 
          spaces={proWorkspaces} 
        />
        
        {/* Premium Locations */}
        <DiscoverySection 
          title="Premium Locations" 
          spaces={spaces.filter(space => space.pricePerMonth > 400).slice(0, 8)} 
        />
        
        {/* Budget-Friendly */}
        <DiscoverySection 
          title="Great Value Workspaces" 
          spaces={spaces.filter(space => space.pricePerMonth <= 300).slice(0, 8)} 
        />
      </div>
    </div>
  );
}
