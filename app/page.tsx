'use client';

import { Calendar, Building } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { enhancedSpaces } from './lib/enhanced-data';
import DiscoverySection from './components/pages/DiscoverySection';
import TargetGroupCarousel from './components/pages/TargetGroupCarousel';

export default function HomePage() {
  const router = useRouter();

  // Filter spaces by different categories using enhanced spaces
  const featuredSpaces = enhancedSpaces.slice(0, 8);
  const hourlySpaces = enhancedSpaces.filter(space => space.hourlyRate && space.hourlyRate <= 15);
  const dailySpaces = enhancedSpaces.filter(space => space.basePrice <= 30);
  const monthlySpaces = enhancedSpaces.filter(space => space.basePrice * 30 <= 300 * 30); // approximate monthly cost
  const privateOffices = enhancedSpaces.filter(space => space.offeredSpaceTypes.includes('private-office'));
  const meetingRooms = enhancedSpaces.filter(space => space.offeredSpaceTypes.includes('meeting-room'));
  const corporateSpaces = enhancedSpaces.filter(space => space.type === 'Corporate Hub');
  const premiumSpaces = enhancedSpaces.filter(space => space.basePrice > 400);
  const budgetSpaces = enhancedSpaces.filter(space => space.basePrice <= 25);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
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
              Book flexible spaces or secure long-term workspace contracts in the world&apos;s most dynamic work environments
            </p>
          </div>
          
          {/* Dual Booking Options */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up">
              {/* Short-term Booking Card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group cursor-pointer transform hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/30 transition-colors">
                    <Calendar className="w-8 h-8 text-blue-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Book a Space</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Flexible hourly, daily, or weekly workspace bookings. Perfect for meetings, events, or temporary needs.
                  </p>
                  <button 
                    onClick={() => router.push('/booking/flexible')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-colors group-hover:bg-blue-500"
                  >
                    Start Booking
                  </button>
                </div>
              </div>

              {/* Long-term Contract Card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group cursor-pointer transform hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/30 transition-colors">
                    <Building className="w-8 h-8 text-purple-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Get Workspace Contract</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Monthly workspace contracts with dedicated desks, offices, and team spaces. Better rates for committed teams.
                  </p>
                  <button 
                    onClick={() => router.push('/booking/contracts')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition-colors group-hover:bg-purple-500"
                  >
                    Explore Contracts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Target Group Solutions Section */}
      <section className="h-screen min-h-[800px] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="w-full h-full overflow-hidden">
          <TargetGroupCarousel />
        </div>
      </section>

      {/* Discovery Sections */}
      <div className="bg-white">
        <DiscoverySection title="Featured Workspaces" spaces={featuredSpaces} />
        <DiscoverySection title="Great Hourly Rates" spaces={hourlySpaces} />
        <DiscoverySection title="Perfect for Day Passes" spaces={dailySpaces} />
        <DiscoverySection title="Monthly Desk Options" spaces={monthlySpaces} />
        <DiscoverySection title="Private Office Suites" spaces={privateOffices} />
        <DiscoverySection title="Meeting Room Solutions" spaces={meetingRooms} />
        <DiscoverySection title="Corporate Innovation Hubs" spaces={corporateSpaces} />
        <DiscoverySection title="Premium Locations" spaces={premiumSpaces} />
        <DiscoverySection title="Great Value Workspaces" spaces={budgetSpaces} />
      </div>
    </div>
  );
}
