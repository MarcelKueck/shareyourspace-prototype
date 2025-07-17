'use client';

import { useState } from 'react';
import { Building2, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface CorporateOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CorporateOnboardingModal({ isOpen, onClose }: CorporateOnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    domain: '',
    employeeCount: '',
    adminName: '',
    adminEmail: '',
    title: '',
    plan: 'ScaleFlex',
    autoApprove: true,
    maxDuration: '30',
    categories: ['Day Pass', 'Monthly Desk'] as string[]
  });

  const plans = [
    {
      id: 'StartupFlex',
      name: 'StartupFlex',
      price: '$20',
      credits: '25 credits',
      ideal: '5-50 employees',
      features: ['Basic workspace access', 'Email support', 'Usage analytics']
    },
    {
      id: 'ScaleFlex', 
      name: 'ScaleFlex',
      price: '$35',
      credits: '50 credits',
      ideal: '50-500 employees',
      features: ['Priority booking', 'Account manager', 'Advanced analytics'],
      popular: true
    },
    {
      id: 'EnterpriseFlex',
      name: 'EnterpriseFlex', 
      price: 'Custom',
      credits: 'Unlimited',
      ideal: '500+ employees',
      features: ['White-label options', 'SSO integration', 'Dedicated success manager']
    }
  ];

  const categoryOptions = ['Day Pass', 'Monthly Desk', 'Private Office'];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // In a real app, this would make an API call
    alert('Corporate account setup initiated! You will receive setup instructions via email.');
    onClose();
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Setup Corporate WorkFlex</h2>
                <p className="text-sm text-gray-600">Step {step} of 4</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Company Information</h3>
                <p className="text-gray-600 mb-6">Tell us about your organization</p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    placeholder="Your Company Inc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Email Domain *
                  </label>
                  <input
                    type="text"
                    value={formData.domain}
                    onChange={(e) => setFormData({...formData, domain: e.target.value})}
                    placeholder="yourcompany.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Only employees with this email domain can join your workspace program
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Employees
                  </label>
                  <select
                    value={formData.employeeCount}
                    onChange={(e) => setFormData({...formData, employeeCount: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select range</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Admin Contact</h3>
                <p className="text-gray-600 mb-6">Who will manage the WorkFlex program?</p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.adminName}
                    onChange={(e) => setFormData({...formData, adminName: e.target.value})}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Email *
                  </label>
                  <input
                    type="email"
                    value={formData.adminEmail}
                    onChange={(e) => setFormData({...formData, adminEmail: e.target.value})}
                    placeholder="jane@yourcompany.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="HR Manager, Office Manager, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Choose Your Plan</h3>
                <p className="text-gray-600 mb-6">Select the WorkFlex plan that fits your team</p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {plans.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      formData.plan === plan.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    } ${plan.popular ? 'ring-2 ring-blue-200' : ''}`}
                    onClick={() => setFormData({...formData, plan: plan.id})}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="font-semibold text-lg">{plan.name}</h4>
                          {plan.popular && (
                            <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Ideal for {plan.ideal}</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{plan.price}</p>
                        <p className="text-sm text-gray-600">per employee/month</p>
                        <p className="text-xs text-gray-500 mt-1">{plan.credits}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Workspace Policies</h3>
                <p className="text-gray-600 mb-6">Configure how employees can use WorkFlex</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.autoApprove}
                      onChange={(e) => setFormData({...formData, autoApprove: e.target.checked})}
                      className="mr-3 w-4 h-4 text-blue-600"
                    />
                    <span className="font-medium">Auto-approve bookings</span>
                  </label>
                  <p className="text-sm text-gray-600 ml-7">
                    Employees can book instantly without admin approval
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum booking duration
                  </label>
                  <select
                    value={formData.maxDuration}
                    onChange={(e) => setFormData({...formData, maxDuration: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="7">1 week</option>
                    <option value="14">2 weeks</option>
                    <option value="30">1 month</option>
                    <option value="90">3 months</option>
                    <option value="365">1 year</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Allowed workspace types
                  </label>
                  <div className="space-y-2">
                    {categoryOptions.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                          className="mr-3 w-4 h-4 text-blue-600"
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              step === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          {step === 4 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Setup
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
