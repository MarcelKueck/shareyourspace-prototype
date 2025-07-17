'use client';

import { useState } from 'react';
import { Building, Home, TrendingUp, Users, DollarSign, BarChart3, CheckCircle, ArrowRight, Zap, Shield } from 'lucide-react';

export default function HostsPage() {
  const [activeHostType, setActiveHostType] = useState<'corporate' | 'professional'>('corporate');

  const corporateHostBenefits = [
    {
      icon: DollarSign,
      title: 'Monetize Empty Desks',
      description: 'Turn unused office space into recurring revenue while maintaining your company culture.',
      metric: 'Up to $25k/month additional revenue'
    },
    {
      icon: Users,
      title: 'AI Talent Matching',
      description: 'Our AI Recruiting Agent finds professionals whose skills complement your team.',
      metric: '3x faster talent discovery'
    },
    {
      icon: Zap,
      title: 'Innovation Catalyst',
      description: 'Cross-pollinate ideas with external talent to spark innovation within your organization.',
      metric: '40% increase in collaborative projects'
    },
    {
      icon: Shield,
      title: 'Vetted Community',
      description: 'All members are verified professionals, ensuring quality and security for your workspace.',
      metric: '99.8% positive host ratings'
    }
  ];

  const professionalHostBenefits = [
    {
      icon: TrendingUp,
      title: 'Maximize Occupancy',
      description: 'Smart pricing and demand analytics help optimize your space utilization and revenue.',
      metric: 'Average 85% occupancy rate'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive dashboards track bookings, revenue, and member satisfaction.',
      metric: 'Real-time performance insights'
    },
    {
      icon: Users,
      title: 'Hub Ambassador Program',
      description: 'We provide trained community managers to enhance the member experience.',
      metric: '4.8/5 average member satisfaction'
    },
    {
      icon: Building,
      title: 'Professional Marketing',
      description: 'Professional photography, SEO-optimized listings, and targeted marketing campaigns.',
      metric: '300% more visibility than competitors'
    }
  ];

  const hostingOptions = [
    {
      type: 'corporate',
      title: 'Corporate Hub',
      subtitle: 'Share your company workspace',
      description: 'Perfect for companies with extra desks in active offices who want to monetize space while building an innovation ecosystem.',
      features: [
        'AI Recruiting Agent for talent discovery',
        'Company culture integration',
        'Innovation collaboration tools',
        'Corporate partnership opportunities',
        'Flexible hosting schedule',
        'Revenue sharing model'
      ],
      cta: 'Become a Corporate Host',
      revenue: '$15-45/desk/day',
      setup: '< 1 week'
    },
    {
      type: 'professional',
      title: 'Pro Workspace',
      subtitle: 'List your dedicated workspace',
      description: 'Ideal for property managers, landlords, and workspace operators who want to maximize their real estate investment.',
      features: [
        'Hub Ambassador Program management',
        'Professional space optimization',
        'Advanced booking management',
        'Marketing and promotion support',
        'Community building tools',
        'Premium listing features'
      ],
      cta: 'List Your Space',
      revenue: '$200-2000/month/space',
      setup: '< 3 days'
    }
  ];

  const successStories = [
    {
      type: 'corporate',
      company: 'TechCorp Innovation',
      location: 'San Francisco, CA',
      revenue: '$28k/month',
      story: 'Transformed 20 empty desks into a thriving innovation hub, connecting with 15+ startups and generating significant revenue.',
      metric: '450% ROI on unused space'
    },
    {
      type: 'professional',
      company: 'Brooklyn Creative Loft',
      location: 'Brooklyn, NY',
      revenue: '$35k/month',
      story: 'Increased occupancy from 60% to 95% while building a vibrant creative community of designers and artists.',
      metric: '58% increase in monthly revenue'
    }
  ];

  const currentBenefits = activeHostType === 'corporate' ? corporateHostBenefits : professionalHostBenefits;
  const currentOption = hostingOptions.find(option => option.type === activeHostType);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-700 rounded-full text-sm font-medium mb-6">
              <Building className="w-4 h-4 mr-2" />
              Host with ShareYourSpace
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transform Your Space into a 
              <span className="text-purple-300"> Revenue Engine</span>
            </h1>
            <p className="text-xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Whether you&apos;re a company with extra desks or a property owner with dedicated workspace, 
              turn your underutilized space into consistent revenue while building community.
            </p>
          </div>

          {/* Host Type Selector */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 flex">
              <button
                onClick={() => setActiveHostType('corporate')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                  activeHostType === 'corporate'
                    ? 'bg-white text-indigo-900 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Building className="w-5 h-5 mx-auto mb-2" />
                Corporate Host
              </button>
              <button
                onClick={() => setActiveHostType('professional')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                  activeHostType === 'professional'
                    ? 'bg-white text-indigo-900 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Home className="w-5 h-5 mx-auto mb-2" />
                Professional Provider
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {activeHostType === 'corporate' ? 'Corporate Host Benefits' : 'Professional Provider Benefits'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {activeHostType === 'corporate' 
                ? 'Turn your company office into an innovation ecosystem while generating revenue'
                : 'Maximize your property investment with smart workspace management'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{benefit.description}</p>
                <div className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg">
                  {benefit.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hosting Details Section */}
      {currentOption && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-6">
                  {activeHostType === 'corporate' ? 'Corporate Hub' : 'Pro Workspace'}
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {currentOption.title}
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {currentOption.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-indigo-600">{currentOption.revenue}</div>
                    <div className="text-sm text-gray-600">Potential Revenue</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">{currentOption.setup}</div>
                    <div className="text-sm text-gray-600">Setup Time</div>
                  </div>
                </div>

                <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center">
                  {currentOption.cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-6">What&apos;s Included</h3>
                <ul className="space-y-4">
                  {currentOption.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Success Stories from Our Hosts
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    {story.type === 'corporate' ? 
                      <Building className="w-6 h-6 text-indigo-600" /> :
                      <Home className="w-6 h-6 text-indigo-600" />
                    }
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{story.company}</h3>
                    <p className="text-gray-600">{story.location}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">{story.story}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-xl font-bold text-green-600">{story.revenue}</div>
                    <div className="text-sm text-gray-600">Monthly Revenue</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm font-semibold text-blue-600">{story.metric}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How Hosting Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'List Your Space',
                description: 'Create your listing with photos, amenities, and availability. Our team helps optimize your profile.'
              },
              {
                step: '2', 
                title: 'Get Verified',
                description: 'Quick verification process ensures quality and builds trust with potential members.'
              },
              {
                step: '3',
                title: 'Welcome Members',
                description: 'Start hosting verified professionals. Our platform handles bookings, payments, and communications.'
              },
              {
                step: '4',
                title: 'Earn & Grow',
                description: 'Receive monthly payouts and grow your community with our marketing and support tools.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Hosting?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of hosts already earning revenue from their underutilized spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
              <Building className="w-5 h-5 mr-2" />
              List as Corporate Host
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors flex items-center justify-center">
              <Home className="w-5 h-5 mr-2" />
              List as Pro Provider
            </button>
          </div>
          <p className="text-sm opacity-75 mt-6">
            No listing fees • 24/7 support • Start earning in days
          </p>
        </div>
      </section>
    </div>
  );
}
