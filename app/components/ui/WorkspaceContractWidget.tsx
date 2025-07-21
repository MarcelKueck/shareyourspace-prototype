'use client';

import { useState } from 'react';
import { Calendar, Users, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Space, WorkspacePlan, ContractTerm, WorkspaceUnit } from '../../lib/types';
import { useAuthStore } from '../../store/authStore';

interface WorkspaceContractWidgetProps {
  space: Space;
  selectedUnit: WorkspaceUnit | null;
}

export default function WorkspaceContractWidget({ space, selectedUnit }: WorkspaceContractWidgetProps) {
  const [selectedPlan, setSelectedPlan] = useState<WorkspacePlan | null>(null);
  const [startDate, setStartDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');
  const { currentUser } = useAuthStore();

  if (!space.contracts?.available) {
    return null;
  }

  const { contracts } = space;
  const isInstantApproval = contracts.approvalType === 'instant';

  const handlePlanSelect = (plan: WorkspacePlan) => {
    setSelectedPlan(plan);
  };

  const calculateTotalPrice = (plan: WorkspacePlan) => {
    const monthlyPrice = plan.monthlyPrice;
    const setupFee = plan.setupFee || 0;
    return { monthlyPrice, setupFee, total: monthlyPrice + setupFee };
  };

  const getTermLabel = (term: ContractTerm) => {
    switch (term) {
      case '1-month': return '1 Month';
      case '3-months': return '3 Months';
      case '6-months': return '6 Months';
      case '12-months': return '12 Months';
      default: return term;
    }
  };

  const availablePlans = selectedUnit
    ? contracts.plans.filter(plan => plan.spaceType === selectedUnit.spaceType)
    : [];

  const handleApplication = () => {
    if (!selectedPlan || !startDate || !selectedUnit) return;

    const applicationDetails = {
      spaceId: space.id,
      unitId: selectedUnit.id,
      unitIdentifier: selectedUnit.unitIdentifier,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      startDate,
      companyName: companyName || currentUser?.company,
      userId: currentUser?.id,
      message
    };

    console.log('Contract application:', applicationDetails);
    alert(isInstantApproval ? 'Workspace booked successfully!' : 'Application submitted for review!');
  };

  if (!selectedUnit) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Workspace Contracts</h3>
        <p className="text-gray-600">
          Please select a workspace unit to see available contract options.
        </p>
      </div>
    );
  }

  if (availablePlans.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Workspace Contracts</h3>
        <p className="text-gray-600">
          There are no long-term contract options available for the selected workspace unit.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            {selectedUnit.name} Contracts
          </h3>
          <div className="flex items-center space-x-2">
            {isInstantApproval ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-green-600 font-medium">Instant Approval</span>
              </>
            ) : (
              <>
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-blue-600 font-medium">Host Review</span>
              </>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          Long-term workspace solutions with dedicated space and premium amenities.
          {contracts.dedicatedSpace && ' Includes dedicated workspace assignment.'}
        </p>
      </div>

      {/* Plan Selection */}
      <div className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Choose Your Plan</h4>
        <div className="space-y-3">
          {availablePlans.map((plan) => {
            const pricing = calculateTotalPrice(plan);
            const isSelected = selectedPlan?.id === plan.id;
            
            return (
              <div
                key={plan.id}
                onClick={() => handlePlanSelect(plan)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-semibold text-gray-900">{plan.name}</h5>
                    <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">€{pricing.monthlyPrice}/mo</div>
                    <div className="text-xs text-green-600 font-medium">
                      {plan.discountFromDaily}% off daily rate
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{getTermLabel(plan.term)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>Up to {selectedUnit.capacity} {selectedUnit.capacity > 1 ? 'people' : 'person'}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {plan.features.slice(0, 3).map((feature, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {plan.features.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{plan.features.length - 3} more
                    </span>
                  )}
                </div>
                
                {pricing.setupFee > 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    One-time setup fee: €{pricing.setupFee}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Application Form */}
        {selectedPlan &&
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h5 className="font-semibold text-gray-900 mb-4">
              {isInstantApproval ? 'Book Your Workspace' : 'Apply for Workspace'}
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={currentUser?.company || 'Your company name'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {!isInstantApproval && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message to Host
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell the host about your team and workspace needs..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Pricing Summary */}
            <div className="mb-4 p-3 bg-white rounded-lg border">
              <div className="flex justify-between text-sm mb-2">
                <span>Monthly rate</span>
                <span>€{selectedPlan.monthlyPrice}</span>
              </div>
              {selectedPlan.setupFee && selectedPlan.setupFee > 0 && (
                <div className="flex justify-between text-sm mb-2">
                  <span>Setup fee (one-time)</span>
                  <span>€{selectedPlan.setupFee}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>First month total</span>
                <span>€{calculateTotalPrice(selectedPlan).total}</span>
              </div>
            </div>

            <button
              onClick={handleApplication}
              disabled={!startDate}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>
                {isInstantApproval ? 'Book Workspace' : 'Submit Application'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              {isInstantApproval 
                ? 'Your workspace will be ready on your start date'
                : 'Host will review and respond within 24 hours'
              }
            </p>
          </div>
        }
      </div>
    </div>
  );
}
