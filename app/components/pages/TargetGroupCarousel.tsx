'use client';

import { useState, useEffect } from 'react';
import { Building, Users, Zap, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { trustedCompanies } from '../../lib/dummy-data';

interface TargetGroup {
  id: string;
  name: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
    tags: string[];
  }[];
  stats: {
    companies: string;
    bookings: string;
    savings: string;
    locations: string;
  };
  cta: {
    primary: string;
    secondary: string;
  };
  gradient: string;
}

const targetGroups: TargetGroup[] = [
  {
    id: 'corporate-teams',
    name: 'Corporate Teams',
    badge: 'Enterprise Solutions',
    title: 'Workspace benefits',
    subtitle: 'reimagined for teams',
    description: 'Transform how your team works with cross-company benefits, flexible workspace access, and seamless team booking—all in one platform.',
    features: [
      {
        icon: <Building className="w-8 h-8 text-white" />,
        title: 'Cross-Company Benefits',
        description: 'Access workspace networks across partner companies. Your team gets exclusive rates and priority booking at verified corporate hosts.',
        tags: ['Partner Networks', 'Priority Access', 'Bulk Discounts']
      },
      {
        icon: <Users className="w-8 h-8 text-white" />,
        title: 'Team Workspace Management',
        description: 'Book spaces for your entire team with one click. Manage allowances, track usage, and ensure everyone has access to productive environments.',
        tags: ['Team Booking', 'Usage Analytics', 'Smart Allocation']
      },
      {
        icon: <Zap className="w-8 h-8 text-white" />,
        title: 'Host & Earn Benefits',
        description: 'Companies can host their unused spaces and earn revenue while providing workspace access to partner organizations.',
        tags: ['Revenue Stream', 'Space Optimization', 'Network Growth']
      }
    ],
    stats: {
      companies: '250+',
      bookings: '800K+',
      savings: '78%',
      locations: '25+'
    },
    cta: {
      primary: 'Schedule Enterprise Demo',
      secondary: 'View Corporate Plans'
    },
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'startup-founders',
    name: 'Startup Founders',
    badge: 'Startup Solutions',
    title: 'Workspace solutions',
    subtitle: 'built for startups',
    description: 'Scale your team with flexible workspace access, networking opportunities, and budget-friendly solutions designed for growing companies.',
    features: [
      {
        icon: <Zap className="w-8 h-8 text-white" />,
        title: 'Flexible Scaling',
        description: 'Start with day passes and scale to private offices. Add team members without long-term commitments or hefty deposits.',
        tags: ['Day Passes', 'Team Scaling', 'No Deposits']
      },
      {
        icon: <Users className="w-8 h-8 text-white" />,
        title: 'Startup Community',
        description: 'Connect with other founders, investors, and mentors. Access exclusive startup events and networking opportunities.',
        tags: ['Founder Network', 'Investor Meetings', 'Pitch Events']
      },
      {
        icon: <Building className="w-8 h-8 text-white" />,
        title: 'Budget Control',
        description: 'Transparent pricing with no hidden fees. Set team budgets and track spending with real-time cost management.',
        tags: ['Transparent Pricing', 'Budget Tracking', 'Cost Control']
      }
    ],
    stats: {
      companies: '120+',
      bookings: '45K+',
      savings: '65%',
      locations: '18+'
    },
    cta: {
      primary: 'Start Free Trial',
      secondary: 'View Startup Plans'
    },
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'freelancers',
    name: 'Freelancers & Solopreneurs',
    badge: 'Individual Solutions',
    title: 'Your workspace',
    subtitle: 'your way',
    description: 'Find the perfect workspace for your projects, connect with like-minded professionals, and access premium amenities without the premium price.',
    features: [
      {
        icon: <Users className="w-8 h-8 text-white" />,
        title: 'Professional Network',
        description: 'Connect with other freelancers, potential clients, and collaborators. Build meaningful professional relationships that drive your career forward.',
        tags: ['Networking', 'Collaboration', 'Client Meetings']
      },
      {
        icon: <Zap className="w-8 h-8 text-white" />,
        title: 'Flexible Booking',
        description: 'Book by the hour, day, or month. Work when you need to, where you need to, with complete scheduling flexibility.',
        tags: ['Hourly Booking', 'Day Passes', 'Monthly Plans']
      },
      {
        icon: <Building className="w-8 h-8 text-white" />,
        title: 'Premium Amenities',
        description: 'Access high-speed internet, printing, meeting rooms, and premium coffee. All the tools you need to do your best work.',
        tags: ['High-Speed WiFi', 'Meeting Rooms', 'Premium Coffee']
      }
    ],
    stats: {
      companies: '85+',
      bookings: '120K+',
      savings: '45%',
      locations: '22+'
    },
    cta: {
      primary: 'Find Your Space',
      secondary: 'Browse Locations'
    },
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'workspace-hosts',
    name: 'Workspace Hosts',
    badge: 'Host Solutions',
    title: 'Maximize your',
    subtitle: 'space potential',
    description: 'Transform unused spaces into revenue streams while building professional communities. Advanced tools for corporate hosts and independent providers.',
    features: [
      {
        icon: <Building className="w-8 h-8 text-white" />,
        title: 'Revenue Optimization',
        description: 'Dynamic pricing, occupancy analytics, and revenue forecasting. Maximize your space utilization and earnings with data-driven insights.',
        tags: ['Dynamic Pricing', 'Analytics', 'Revenue Forecasting']
      },
      {
        icon: <Users className="w-8 h-8 text-white" />,
        title: 'Community Building',
        description: 'Foster professional connections with AI-powered member matching and curated networking events. Build a thriving workspace community.',
        tags: ['Member Matching', 'Networking Events', 'Community Tools']
      },
      {
        icon: <Zap className="w-8 h-8 text-white" />,
        title: 'Automated Management',
        description: 'Streamline operations with automated booking, payments, and member management. Focus on building community, not administrative tasks.',
        tags: ['Auto Booking', 'Payment Processing', 'Member Management']
      }
    ],
    stats: {
      companies: '180+',
      bookings: '65K+',
      savings: '85%',
      locations: '30+'
    },
    cta: {
      primary: 'List Your Space',
      secondary: 'Host Resources'
    },
    gradient: 'from-orange-500 to-red-500'
  }
];

export default function TargetGroupCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === targetGroups.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // 6 seconds per slide

    return () => clearInterval(interval);
  }, [isPlaying, isPaused]);

  const currentGroup = targetGroups[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === targetGroups.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? targetGroups.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Header with Controls */}
      <div className="text-center mb-20">
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className={`inline-block px-6 py-3 rounded-full text-sm font-semibold backdrop-blur-sm transition-all duration-500 ${
            currentGroup.id === 'corporate-teams' 
              ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
              : currentGroup.id === 'startup-founders'
              ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
              : currentGroup.id === 'freelancers'
              ? 'bg-green-500/20 border border-green-500/30 text-green-300'
              : 'bg-orange-500/20 border border-orange-500/30 text-orange-300'
          }`}>
            {currentGroup.badge}
          </div>
          
          {/* Playback Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
            </button>
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 transition-all duration-500">
          <span className="block">{currentGroup.title}</span>
          <span className={`block bg-gradient-to-r ${currentGroup.gradient} bg-clip-text text-transparent`}>
            {currentGroup.subtitle}
          </span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
          {currentGroup.description}
        </p>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-3 mb-12">
        {targetGroups.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-12 bg-white' 
                : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div 
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {targetGroups.map((group) => (
            <div key={group.id} className="min-w-full">
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                {/* Features Overview */}
                <div className="space-y-8">
                  {group.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-start space-x-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${group.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                          <p className="text-gray-300 leading-relaxed text-lg">
                            {feature.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {feature.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className={`px-3 py-1 rounded-full text-sm font-medium ${
                                group.id === 'corporate-teams' 
                                  ? 'bg-blue-500/20 text-blue-300'
                                  : group.id === 'startup-founders'
                                  ? 'bg-purple-500/20 text-purple-300'
                                  : group.id === 'freelancers'
                                  ? 'bg-green-500/20 text-green-300'
                                  : 'bg-orange-500/20 text-orange-300'
                              }`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Stats & CTA */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">
                    <h3 className="text-3xl font-bold text-white mb-8 text-center">
                      Join Leading {group.name}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-8 mb-10">
                      <div className="text-center">
                        <div className={`text-4xl font-bold mb-2 ${
                          group.id === 'corporate-teams' 
                            ? 'text-blue-400'
                            : group.id === 'startup-founders'
                            ? 'text-purple-400'
                            : group.id === 'freelancers'
                            ? 'text-green-400'
                            : 'text-orange-400'
                        }`}>{group.stats.companies}</div>
                        <div className="text-gray-300 font-medium">Partner Companies</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-4xl font-bold mb-2 ${
                          group.id === 'corporate-teams' 
                            ? 'text-cyan-400'
                            : group.id === 'startup-founders'
                            ? 'text-pink-400'
                            : group.id === 'freelancers'
                            ? 'text-emerald-400'
                            : 'text-red-400'
                        }`}>{group.stats.bookings}</div>
                        <div className="text-gray-300 font-medium">Bookings</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-4xl font-bold mb-2 ${
                          group.id === 'corporate-teams' 
                            ? 'text-blue-400'
                            : group.id === 'startup-founders'
                            ? 'text-purple-400'
                            : group.id === 'freelancers'
                            ? 'text-green-400'
                            : 'text-orange-400'
                        }`}>{group.stats.savings}</div>
                        <div className="text-gray-300 font-medium">Cost Savings</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-4xl font-bold mb-2 ${
                          group.id === 'corporate-teams' 
                            ? 'text-cyan-400'
                            : group.id === 'startup-founders'
                            ? 'text-pink-400'
                            : group.id === 'freelancers'
                            ? 'text-emerald-400'
                            : 'text-red-400'
                        }`}>{group.stats.locations}</div>
                        <div className="text-gray-300 font-medium">Locations</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <button className={`w-full bg-gradient-to-r ${group.gradient} hover:scale-105 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:shadow-2xl text-lg`}>
                        {group.cta.primary}
                      </button>
                      <button className="w-full border-2 border-white/30 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-white/10 transition-all duration-300 text-lg">
                        {group.cta.secondary}
                      </button>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <p className="text-gray-400 text-sm mb-4">Trusted by teams at:</p>
                      <div className="flex justify-center items-center space-x-8 opacity-60">
                        {trustedCompanies.map((company, index) => (
                          <div key={index} className="text-white font-bold text-lg">{company}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full blur-xl animate-pulse ${
                    group.id === 'corporate-teams' 
                      ? 'bg-blue-500/20'
                      : group.id === 'startup-founders'
                      ? 'bg-purple-500/20'
                      : group.id === 'freelancers'
                      ? 'bg-green-500/20'
                      : 'bg-orange-500/20'
                  }`}></div>
                  <div className={`absolute -bottom-6 -left-6 w-16 h-16 rounded-full blur-xl animate-pulse delay-1000 ${
                    group.id === 'corporate-teams' 
                      ? 'bg-cyan-500/20'
                      : group.id === 'startup-founders'
                      ? 'bg-pink-500/20'
                      : group.id === 'freelancers'
                      ? 'bg-emerald-500/20'
                      : 'bg-red-500/20'
                  }`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-12 mb-8">
        <div className="w-full bg-white/10 rounded-full h-1">
          <div 
            className={`h-1 bg-gradient-to-r ${currentGroup.gradient} rounded-full transition-all duration-300`}
            style={{ width: `${((currentIndex + 1) / targetGroups.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
