'use client';

import { useState } from 'react';
import { Building2, Users, TrendingUp, Shield, Globe, CheckCircle, ArrowRight, Star, Zap } from 'lucide-react';
import { companies, corporateMetrics } from '../lib/dummy-data';
import CorporateOnboardingModal from '../components/ui/CorporateOnboardingModal';

export default function EnterprisePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const benefits = [
    {
      icon: Users,
      title: 'Zero Employee Friction',
      description: 'Employees book instantly with work email. No credit cards, no expense reports, no delays.',
      color: 'blue'
    },
    {
      icon: TrendingUp,
      title: 'Complete Cost Control',
      description: 'Predictable monthly costs, real-time usage tracking, and clear ROI analytics.',
      color: 'green'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SSO integration, compliance controls, and secure workflows that meet enterprise standards.',
      color: 'purple'
    },
    {
      icon: Globe,
      title: 'Global Workspace Access',
      description: 'Your team can work productively from 500+ premium locations across 50+ cities.',
      color: 'indigo'
    }
  ];

  const useCases = [
    {
      title: 'Distributed Teams',
      description: 'Support remote employees with professional workspace access wherever they are',
      stats: '85% of companies plan to maintain hybrid work models'
    },
    {
      title: 'Business Travel',
      description: 'Replace expensive hotel business centers with premium coworking spaces',
      stats: 'Save up to 60% vs traditional business travel workspace costs'
    },
    {
      title: 'Project Teams',
      description: 'Temporary workspaces for client projects, events, or cross-functional initiatives',
      stats: '40% faster project setup with flexible workspace access'
    },
    {
      title: 'Talent Acquisition',
      description: 'Attract top talent with unlimited workspace flexibility as a core benefit',
      stats: '73% of workers want flexible work options to remain post-pandemic'
    }
  ];

  const plans = [
    {
      name: 'StartupFlex',
      price: '$20',
      credits: '25 credits',
      employees: '5-50 employees',
      features: [
        'Basic workspace access',
        'Email support',
        'Usage analytics',
        'Admin dashboard',
        'Monthly credit allowance'
      ],
      cta: 'Start Free Trial'
    },
    {
      name: 'ScaleFlex',
      price: '$35',
      credits: '50 credits', 
      employees: '50-500 employees',
      popular: true,
      features: [
        'Priority booking',
        'Dedicated account manager',
        'Advanced analytics',
        'Bulk booking tools',
        'Custom integrations',
        'Quarterly business reviews'
      ],
      cta: 'Schedule Demo'
    },
    {
      name: 'EnterpriseFlex',
      price: 'Custom',
      credits: 'Unlimited',
      employees: '500+ employees',
      features: [
        'White-label options',
        'SSO integration',
        'Custom workflows',
        'Dedicated success manager',
        'SLA guarantees',
        'Advanced security controls'
      ],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-700 rounded-full text-sm font-medium mb-6">
                <Building2 className="w-4 h-4 mr-2" />
                Enterprise Workspace Solution
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Workspace Access as an 
                <span className="text-blue-300"> Employee Benefit</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Transform how your distributed team works with unlimited access to premium workspaces worldwide. 
                No expense reports, no procurement hassles – just seamless productivity anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowOnboarding(true)}
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Global Companies Using WorkFlex</span>
                    <span className="text-2xl font-bold">{companies.length}+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Active Employees</span>
                    <span className="text-2xl font-bold">
                      {companies.reduce((sum, company) => sum + company.employeeCount, 0).toLocaleString()}+
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Monthly Cost Savings</span>
                    <span className="text-2xl font-bold text-green-300">
                      ${corporateMetrics.reduce((sum, metric) => sum + metric.costSavings, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Employee Satisfaction</span>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold mr-2">4.8</span>
                      <div className="flex">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Leading Companies Choose WorkFlex
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join forward-thinking organizations that have transformed their workplace strategy 
              with flexible workspace benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-16 h-16 bg-${benefit.color}-100 rounded-xl flex items-center justify-center mb-6`}>
                  <benefit.icon className={`w-8 h-8 text-${benefit.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Perfect for Every Enterprise Use Case
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-semibold mb-4">{useCase.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{useCase.description}</p>
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {useCase.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Choose Your WorkFlex Plan
            </h2>
            <p className="text-xl text-gray-600">
              Flexible plans that scale with your team and business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-xl p-8 shadow-lg relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {plan.price}
                    {plan.price !== 'Custom' && <span className="text-lg font-normal text-gray-500">/employee/month</span>}
                  </div>
                  <p className="text-gray-600 mb-4">{plan.credits} per employee</p>
                  <p className="text-sm text-gray-500">{plan.employees}</p>
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
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Workplace Benefits?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of companies already offering workspace flexibility as a core employee benefit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowOnboarding(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Demo
            </button>
          </div>
          <p className="text-sm opacity-75 mt-6">
            30-day free trial • No setup fees • Cancel anytime
          </p>
        </div>
      </section>

      {/* Onboarding Modal */}
      <CorporateOnboardingModal 
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
}
