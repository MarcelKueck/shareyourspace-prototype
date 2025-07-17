'use client';

import { Search } from 'lucide-react';
import { spaces } from './lib/dummy-data';
import DiscoverySection from './components/pages/DiscoverySection';

export default function HomePage() {
  // Filter spaces by type for different sections
  const corporateHubs = spaces.filter(space => space.type === 'Corporate Hub');
  const proWorkspaces = spaces.filter(space => space.type === 'Pro Workspace');
  const featuredSpaces = spaces.slice(0, 6); // First 6 spaces as featured

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')"
          }}
        ></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Your Perfect
            <br />
            <span className="text-yellow-300">Workspace</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Connect with like-minded professionals in inspiring spaces
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-full p-2 shadow-2xl">
            <div className="flex items-center">
              <div className="flex-1 px-6">
                <input
                  type="text"
                  placeholder="Where do you want to work?"
                  className="w-full py-4 text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none text-lg"
                />
              </div>
              <button className="bg-primary hover:bg-primary-dark text-white rounded-full p-4 transition-colors">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Sections */}
      <div className="bg-gray-50">
        <DiscoverySection 
          title="Featured Workspaces" 
          spaces={featuredSpaces} 
        />
        
        <DiscoverySection 
          title="Corporate Hubs" 
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
