'use client';

import { Building2, CreditCard, BarChart3, Shield, Globe, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { companies } from '../../lib/dummy-data';

export default function CorporateBenefitsSection() {
  const plans = [
    {
      name: 'StartupFlex',
      price: '$20',
      period: 'per employee/month',
      description: 'Perfect for growing startups and small teams',
      credits: '25 workspace credits',
      features: [
        'Up to 50 employees',
        'Basic workspace access',
        'Email support',
        'Usage analytics',
        'Admin dashboard'
      ],
      ideal: 'Teams of 5-50 people'
    },
    {
      name: 'ScaleFlex',
      price: '$35',
      period: 'per employee/month',
      description: 'For scaling companies with distributed teams',
      credits: '50 workspace credits',
      features: [
        'Up to 500 employees',
        'Priority booking',
        'Dedicated account manager',
        'Advanced analytics',
        'Custom integrations',
        'Bulk booking tools'
      ],
      ideal: 'Teams of 50-500 people',
      popular: true
    },
    {
      name: 'EnterpriseFlex',
      price: 'Custom',
      period: 'contact sales',
      description: 'Enterprise-grade solution for large organizations',
      credits: 'Unlimited access',
      features: [
        'Unlimited employees',
        'White-label options',
        'SSO integration',
        'Custom workflows',
        'Dedicated success manager',
        'SLA guarantees',
        'Advanced security'
      ],
      ideal: 'Teams of 500+ people'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Building2 className="w-4 h-4 mr-2" />
            Corporate WorkFlex Benefits
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Workspace Access as an 
            <span className="text-blue-600"> Employee Benefit</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Give your team unlimited access to premium workspaces worldwide. 
            No expense reports, no procurement hassles – just seamless workspace access wherever your team needs to be productive.
          </p>
          
          {/* Success Story */}
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl mx-auto mb-12">
            <div className="flex items-center mb-4">
              <Image src="/logos/techcorp.png" alt="TechCorp" width={48} height={48} className="rounded-lg mr-4" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">TechCorp Solutions</h4>
                <p className="text-gray-600 text-sm">250 employees, EnterpriseFlex plan</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              &ldquo;ShareYourSpace WorkFlex has transformed how our distributed team works. 
              Our employees can access premium workspaces in 50+ cities without any paperwork. 
              It&rsquo;s become our top recruiting advantage.&rdquo;
            </p>
            <div className="flex items-center mt-4 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>$85,000 saved vs traditional office costs this month</span>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Zero Employee Friction</h3>
            <p className="text-gray-600">
              Employees book instantly with their work email. No personal credit cards, 
              no expense reports, no approval delays.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Complete Visibility</h3>
            <p className="text-gray-600">
              Real-time dashboards show usage, spending, and ROI. 
              Understand where your team works and optimize accordingly.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Enterprise Security</h3>
            <p className="text-gray-600">
              SSO integration, compliance controls, and secure booking workflows 
              that meet enterprise security standards.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-12 shadow-lg mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">How WorkFlex Benefits Work</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
              <h4 className="font-semibold mb-2">Company Enrolls</h4>
              <p className="text-gray-600 text-sm">HR sets up the WorkFlex benefit with monthly credits per employee</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
              <h4 className="font-semibold mb-2">Employees Get Access</h4>
              <p className="text-gray-600 text-sm">Team members sign up with their work email and get instant access</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
              <h4 className="font-semibold mb-2">Book Anywhere</h4>
              <p className="text-gray-600 text-sm">Find and book workspaces worldwide using company credits</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">4</div>
              <h4 className="font-semibold mb-2">Track & Optimize</h4>
              <p className="text-gray-600 text-sm">Admins monitor usage and ROI through comprehensive dashboards</p>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Choose Your WorkFlex Plan</h3>
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
                  <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {plan.price}
                    <span className="text-sm font-normal text-gray-500">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
                    {plan.credits}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-6">
                  <p className="text-sm text-gray-600 mb-4">Ideal for: {plan.ideal}</p>
                  <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    plan.popular 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Workplace Benefits?</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join {companies.length}+ companies already offering workspace flexibility as an employee benefit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Schedule Demo
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
              Start Free Trial
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-8 text-sm opacity-80">
            <Globe className="w-4 h-4 mr-2" />
            Available in 50+ cities worldwide • 30-day free trial • No setup fees
          </div>
        </div>
      </div>
    </section>
  );
}
