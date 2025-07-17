'use client';

import { useState } from 'react';
import { CreditCard, Clock, CheckCircle, Info } from 'lucide-react';
import { companies, corporateUsers, spaces, bookingProducts } from '../../lib/dummy-data';

interface EmployeeBookingWidgetProps {
  spaceId: string;
  employeeId: string;
}

export default function EmployeeBookingWidget({ spaceId, employeeId }: EmployeeBookingWidgetProps) {
  const [selectedBookingType, setSelectedBookingType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const employee = corporateUsers.find(u => u.id === employeeId);
  const company = companies.find(c => c.name === employee?.company);
  const space = spaces.find(s => s.id === spaceId);
  const availableProducts = bookingProducts.filter(p => p.spaceId === spaceId && p.isAvailable);

  if (!employee || !company || !space) {
    return <div>Error loading booking information</div>;
  }

  const selectedProduct = availableProducts.find(p => p.type === selectedBookingType);
  const creditsRequired = selectedProduct?.price || 0;
  const hasEnoughCredits = company.monthlyCredits - company.usedCredits >= creditsRequired;

  const handleBooking = () => {
    if (hasEnoughCredits && selectedProduct) {
      setShowConfirmation(true);
    }
  };

  const confirmBooking = () => {
    // In a real app, this would make an API call
    alert('Booking confirmed! Your company credits have been used.');
    setShowConfirmation(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border p-6 sticky top-6">
      {/* Company Badge */}
      <div className="flex items-center mb-6 p-3 bg-blue-50 rounded-lg">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
          <CreditCard className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-medium text-blue-900">Corporate Benefits</p>
          <p className="text-sm text-blue-700">{company.name} • {company.subscriptionPlan}</p>
        </div>
      </div>

      {/* Credit Balance */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Available Credits</span>
          <span className="font-bold text-lg text-gray-900">
            {(company.monthlyCredits - company.usedCredits).toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(100 - (company.usedCredits / company.monthlyCredits) * 100, 0)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Resets monthly • No personal payment required
        </p>
      </div>

      {/* Booking Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Workspace Option
        </label>
        <div className="space-y-3">
          {availableProducts.map((product) => (
            <div 
              key={product.type}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedBookingType === product.type 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedBookingType(product.type)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{product.type}</h4>
                  <p className="text-sm text-gray-600">{product.minDuration}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{product.price} credits</p>
                  <p className="text-xs text-gray-500">{product.quantity} available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      {selectedBookingType && (
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Cost Summary */}
      {selectedProduct && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Credits Required</span>
            <span className="font-medium">{creditsRequired}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Payment Method</span>
            <span className="text-sm text-blue-600 font-medium">Company Credits</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Cost</span>
              <span className="font-bold text-green-600">FREE</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Covered by {company.name}
            </p>
          </div>
        </div>
      )}

      {/* Credit Warning */}
      {selectedProduct && !hasEnoughCredits && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <Info className="w-4 h-4 text-red-500 mr-2" />
            <p className="text-sm font-medium text-red-800">Insufficient Credits</p>
          </div>
          <p className="text-sm text-red-700 mt-1">
            This booking requires {creditsRequired} credits, but only {company.monthlyCredits - company.usedCredits} are available.
            Contact your admin to add more credits.
          </p>
        </div>
      )}

      {/* Approval Process Info */}
      {company.settings.autoApproveBookings ? (
        <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            <p className="text-sm text-green-800">Auto-approved bookings enabled</p>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-yellow-500 mr-2" />
            <p className="text-sm text-yellow-800">Requires admin approval</p>
          </div>
        </div>
      )}

      {/* Book Button */}
      <button
        onClick={handleBooking}
        disabled={!selectedProduct || !startDate || !endDate || !hasEnoughCredits}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          selectedProduct && startDate && endDate && hasEnoughCredits
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {!hasEnoughCredits ? 'Insufficient Credits' : 
         company.settings.autoApproveBookings ? 'Book Instantly' : 'Request Booking'}
      </button>

      {/* Company Policy Info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h5 className="text-xs font-medium text-gray-700 mb-2">Company Policy</h5>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Max booking duration: {company.settings.maxBookingDuration} days</li>
          <li>• Available categories: {company.settings.allowedCategories.join(', ')}</li>
          <li>• Monthly credit allowance: {company.monthlyCredits.toLocaleString()}</li>
        </ul>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Booking</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Workspace</span>
                <span className="font-medium">{space.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-medium">{selectedProduct?.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dates</span>
                <span className="font-medium">{startDate} to {endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Credits</span>
                <span className="font-medium">{creditsRequired}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmBooking}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
