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
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10 py-6 sm:py-8">
      {/* Header with Controls - Proper Top Spacing */}
      <div className="text-center mb-3 sm:mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm transition-all duration-500 ${
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
          
          {/* Playback Controls - Responsive */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              {isPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-white" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
            </button>
            <button
              onClick={prevSlide}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </button>
          </div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 transition-all duration-500">
          <span className="block">{currentGroup.title}</span>
          <span className={`block bg-gradient-to-r ${currentGroup.gradient} bg-clip-text text-transparent`}>
            {currentGroup.subtitle}
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light px-2 sm:px-4">
          {currentGroup.description}
        </p>
      </div>

      {/* Slide Indicators - Compact */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        {targetGroups.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 sm:w-12 bg-white' 
                : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Main Content - Fully Responsive */}
      <div 
        className="overflow-hidden flex-1"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {targetGroups.map((group) => (
            <div key={group.id} className="min-w-full flex items-center px-2 sm:px-0">
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 items-start lg:items-center">
                {/* Features Overview - Ultra Compact Design */}
                <div className="space-y-2 sm:space-y-2.5 lg:space-y-3 order-2 lg:order-1">
                  {group.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-start space-x-2.5 sm:space-x-3">
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br ${group.gradient} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <div className="scale-[0.45] sm:scale-50 lg:scale-75">
                            {feature.icon}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1 leading-tight">{feature.title}</h3>
                          <p className="text-gray-300 leading-relaxed text-xs sm:text-sm lg:text-sm line-clamp-2 sm:line-clamp-none">
                            {feature.description}
                          </p>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {feature.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span key={tagIndex} className={`px-1.5 py-0.5 rounded text-xs font-medium ${
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
                            {feature.tags.length > 2 && (
                              <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-white/10 text-white/60">
                                +{feature.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Stats & CTA - Ultra Compact Design */}
                <div className="relative order-1 lg:order-2 px-2 sm:px-0">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 border border-white/20 shadow-2xl">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3 text-center">
                      Join Leading {group.name}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3 mb-3 sm:mb-4">
                      <div className="text-center">
                        <div className={`text-lg sm:text-xl lg:text-2xl font-bold mb-0.5 ${
                          group.id === 'corporate-teams' 
                            ? 'text-blue-400'
                            : group.id === 'startup-founders'
                            ? 'text-purple-400'
                            : group.id === 'freelancers'
                            ? 'text-green-400'
                            : 'text-orange-400'
                        }`}>{group.stats.companies}</div>
                        <div className="text-gray-300 font-medium text-xs">Companies</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg sm:text-xl lg:text-2xl font-bold mb-0.5 ${
                          group.id === 'corporate-teams' 
                            ? 'text-cyan-400'
                            : group.id === 'startup-founders'
                            ? 'text-pink-400'
                            : group.id === 'freelancers'
                            ? 'text-emerald-400'
                            : 'text-red-400'
                        }`}>{group.stats.bookings}</div>
                        <div className="text-gray-300 font-medium text-xs">Bookings</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg sm:text-xl lg:text-2xl font-bold mb-0.5 ${
                          group.id === 'corporate-teams' 
                            ? 'text-blue-400'
                            : group.id === 'startup-founders'
                            ? 'text-purple-400'
                            : group.id === 'freelancers'
                            ? 'text-green-400'
                            : 'text-orange-400'
                        }`}>{group.stats.savings}</div>
                        <div className="text-gray-300 font-medium text-xs">Savings</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg sm:text-xl lg:text-2xl font-bold mb-0.5 ${
                          group.id === 'corporate-teams' 
                            ? 'text-cyan-400'
                            : group.id === 'startup-founders'
                            ? 'text-pink-400'
                            : group.id === 'freelancers'
                            ? 'text-emerald-400'
                            : 'text-red-400'
                        }`}>{group.stats.locations}</div>
                        <div className="text-gray-300 font-medium text-xs">Locations</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <button className={`w-full bg-gradient-to-r ${group.gradient} hover:scale-105 text-white font-bold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-all duration-300 transform hover:shadow-2xl text-xs sm:text-sm`}>
                        {group.cta.primary}
                      </button>
                      <button className="w-full border-2 border-white/30 text-white font-semibold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg hover:bg-white/10 transition-all duration-300 text-xs sm:text-sm">
                        {group.cta.secondary}
                      </button>
                    </div>
                    
                    <div className="mt-2 sm:mt-3 text-center">
                      <p className="text-gray-400 text-xs mb-1.5">Trusted by:</p>
                      <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 opacity-60">
                        {trustedCompanies.slice(0, 3).map((company, index) => (
                          <div key={index} className="text-white font-bold text-xs whitespace-nowrap">{company}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements - Compact */}
                  <div className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-12 sm:h-12 rounded-full blur-lg animate-pulse ${
                    group.id === 'corporate-teams' 
                      ? 'bg-blue-500/20'
                      : group.id === 'startup-founders'
                      ? 'bg-purple-500/20'
                      : group.id === 'freelancers'
                      ? 'bg-green-500/20'
                      : 'bg-orange-500/20'
                  }`}></div>
                  <div className={`absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-6 h-6 sm:w-10 sm:h-10 rounded-full blur-lg animate-pulse delay-1000 ${
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

      {/* Progress Bar - Compact */}
      <div className="mt-4 sm:mt-6">
        <div className="w-full bg-white/10 rounded-full h-0.5 sm:h-1">
          <div 
            className={`h-0.5 sm:h-1 bg-gradient-to-r ${currentGroup.gradient} rounded-full transition-all duration-300`}
            style={{ width: `${((currentIndex + 1) / targetGroups.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
