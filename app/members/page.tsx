'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Users, MapPin, Calendar, Coffee, Wifi, Zap, Heart, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { spaces } from '../lib/dummy-data';

export default function MembersPage() {
  const [selectedMemberType, setSelectedMemberType] = useState<'freelancer' | 'remote' | 'startup' | 'nomad'>('freelancer');

  const memberTypes = [
    {
      id: 'freelancer',
      title: 'Freelancers',
      subtitle: 'Independent professionals',
      description: 'Perfect for consultants, designers, writers, and other solo professionals who need professional workspace.',
      pain: 'Working from cafes gets old, and home offices can be isolating.',
      solution: 'Access professional environments with networking opportunities.',
      icon: Users
    },
    {
      id: 'remote',
      title: 'Remote Workers',
      subtitle: 'Distributed team members',
      description: 'Ideal for employees of companies that embrace remote work and need occasional professional space.',
      pain: 'Need professional environment for important calls and focused work.',
      solution: 'Premium workspaces when you need them most.',
      icon: Wifi
    },
    {
      id: 'startup',
      title: 'Startup Founders',
      subtitle: 'Early-stage entrepreneurs',
      description: 'Great for founders who need flexible workspace as they grow their team and business.',
      pain: 'Expensive co-working commitments before knowing team size needs.',
      solution: 'Scale workspace access as your startup grows.',
      icon: Zap
    },
    {
      id: 'nomad',
      title: 'Digital Nomads',
      subtitle: 'Location-independent workers',
      description: 'Perfect for professionals who travel while working and need reliable workspace anywhere.',
      pain: 'Unreliable internet and workspace quality while traveling.',
      solution: 'Vetted, professional spaces in every destination.',
      icon: MapPin
    }
  ];

  const benefits = [
    {
      icon: Coffee,
      title: 'Premium Amenities',
      description: 'High-speed internet, coffee, meeting rooms, and all the essentials for productive work.',
      feature: 'All workspace essentials included'
    },
    {
      icon: Users,
      title: 'Professional Network',
      description: 'Connect with like-minded professionals and discover collaboration opportunities.',
      feature: 'AI-powered networking suggestions'
    },
    {
      icon: Calendar,
      title: 'Flexible Booking',
      description: 'Book by the hour, day, week, or month. No long-term commitments required.',
      feature: 'From 1 hour to 12 months'
    },
    {
      icon: Heart,
      title: 'Vetted Community',
      description: 'All members and hosts are verified professionals ensuring quality and safety.',
      feature: '99.8% positive member experience'
    }
  ];

  const membershipPlans = [
    {
      name: 'Explorer',
      price: 'Pay-as-you-go',
      description: 'Perfect for occasional workspace needs',
      features: [
        'Book any available workspace',
        'Access to member community',
        'Basic networking features',
        'Mobile app access',
        'Customer support'
      ],
      ideal: 'Occasional users',
      cta: 'Start Exploring'
    },
    {
      name: 'Professional',
      price: '$49/month',
      description: 'Best for regular workspace users',
      popular: true,
      features: [
        'Priority booking access',
        'Advanced networking features',
        'Exclusive member events',
        '10% discount on all bookings',
        'Dedicated account manager',
        'Premium customer support'
      ],
      ideal: 'Regular users (5+ days/month)',
      cta: 'Go Professional'
    },
    {
      name: 'Executive',
      price: '$149/month',
      description: 'Premium experience for power users',
      features: [
        'Guaranteed booking availability',
        'Access to premium-only spaces',
        'Concierge booking service',
        '20% discount on all bookings',
        'Private member events',
        'Personal workspace consultant'
      ],
      ideal: 'Heavy users (15+ days/month)',
      cta: 'Go Executive'
    }
  ];

  const featuredSpaces = spaces.slice(0, 3);
  const currentMemberType = memberTypes.find(type => type.id === selectedMemberType);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 via-teal-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-700 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              Join the Community
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your Perfect 
              <span className="text-green-300"> Workspace Community</span>
            </h1>
            <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who&apos;ve discovered the perfect blend of flexibility, 
              community, and productivity in our curated workspace network.
            </p>
          </div>

          {/* Member Type Selector */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {memberTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedMemberType(type.id as 'freelancer' | 'remote' | 'startup' | 'nomad')}
                  className={`p-4 rounded-xl transition-all ${
                    selectedMemberType === type.id
                      ? 'bg-white text-green-900 shadow-lg transform scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <type.icon className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold text-sm">{type.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Member Type Section */}
      {currentMemberType && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
                  <currentMemberType.icon className="w-4 h-4 mr-2" />
                  {currentMemberType.subtitle}
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {currentMemberType.title}
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {currentMemberType.description}
                </p>

                <div className="space-y-6">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <h4 className="font-semibold text-red-800 mb-2">The Problem</h4>
                    <p className="text-red-700">{currentMemberType.pain}</p>
                  </div>
                  
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Our Solution</h4>
                    <p className="text-green-700">{currentMemberType.solution}</p>
                  </div>
                </div>

                <button className="mt-8 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold mb-6">Why {currentMemberType.title} Love ShareYourSpace</h3>
                <div className="space-y-4">
                  {[
                    'No long-term commitments or deposits',
                    'Access to premium workspace amenities',
                    'Vetted professional community',
                    'Flexible booking from 1 hour to 12 months',
                    'Networking and collaboration opportunities',
                    'Locations in 50+ cities worldwide'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Be Productive
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;ve thought of everything so you can focus on what matters most – your work and connections.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{benefit.description}</p>
                <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  {benefit.feature}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spaces Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Discover Amazing Workspaces
            </h2>
            <p className="text-xl text-gray-600">
              From corporate innovation hubs to creative lofts – find your perfect workspace
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredSpaces.map((space) => (
              <div key={space.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image 
                    src={space.imageUrls[0]} 
                    alt={space.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      space.type === 'Corporate Hub' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {space.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{space.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{space.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-green-600">${space.pricePerDay}</span>
                      <span className="text-gray-600 text-sm">/day</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Explore All Workspaces
            </button>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Choose Your Membership Level
            </h2>
            <p className="text-xl text-gray-600">
              Find the perfect plan for your workspace needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {membershipPlans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-xl p-8 shadow-lg relative ${plan.popular ? 'ring-2 ring-green-500' : 'border border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-green-600 mb-2">{plan.price}</div>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <p className="text-sm text-gray-500">Ideal for: {plan.ideal}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.popular 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Workspace Community?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of professionals who&apos;ve discovered their perfect workspace through ShareYourSpace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
              <Users className="w-5 h-5 mr-2" />
              Join as Member
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Browse Workspaces
            </button>
          </div>
          <p className="text-sm opacity-75 mt-6">
            No signup fees • Cancel anytime • 24/7 support
          </p>
        </div>
      </section>
    </div>
  );
}
