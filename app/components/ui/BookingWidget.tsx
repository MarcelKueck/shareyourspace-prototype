'use client';

import { useState } from 'react';
import { Calendar, Users, CreditCard, Building2, Award, UserPlus } from 'lucide-react';
import { Space, bookingProducts } from '../../lib/dummy-data';
import { useAuthStore } from '../../store/authStore';

interface BookingWidgetProps {
  space: Space;
}

export default function BookingWidget({ space }: BookingWidgetProps) {
  const [selectedBookingType, setSelectedBookingType] = useState<'Day Pass' | 'Monthly Desk' | 'Private Office' | 'Team Room'>('Monthly Desk');
  const [checkInDate, setCheckInDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [isTeamBooking, setIsTeamBooking] = useState(false);
  
  const { corporateAllowance, enableTeamBooking } = useAuthStore();

  // Get booking products for this space
  const spaceBookingProducts = bookingProducts.filter(bp => bp.spaceId === space.id);
  const selectedProduct = spaceBookingProducts.find(bp => bp.type === selectedBookingType);
  
  const basePrice = selectedProduct?.price || 0;
  const serviceFee = Math.round(basePrice * 0.12); // 12% service fee
  
  // Calculate corporate discount if applicable
  const corporateDiscount = corporateAllowance?.company?.isHost && space.corporateHostBenefits?.crossBenefitsAvailable 
    ? Math.round(basePrice * (corporateAllowance.company.crossBenefits.hostDiscount / 100)) 
    : 0;
  
  const discountedPrice = basePrice - corporateDiscount;
  const totalPrice = discountedPrice + serviceFee;
  
  // Check if user has corporate coverage
  const hasCorporateCoverage = corporateAllowance?.hasAccess && corporateAllowance.allowanceRemaining >= totalPrice;
  const isTeamBookingAvailable = selectedBookingType === 'Team Room' || guests > 1;

  const handleBookNow = () => {
    if (isTeamBookingAvailable && !isTeamBooking) {
      setIsTeamBooking(true);
      enableTeamBooking(true);
      alert('Team booking mode enabled! You can now invite team members.');
      return;
    }
    
    const message = hasCorporateCoverage 
      ? `Booking confirmed for ${space.title}!\nType: ${selectedBookingType}\nTotal: $${totalPrice}\nCovered by: ${corporateAllowance?.company?.name || 'Your company'}`
      : `Booking confirmed for ${space.title}!\nType: ${selectedBookingType}\nTotal: $${totalPrice}`;
    
    alert(message);
  };

  return (
    <div className="sticky top-24 bg-white rounded-xl border border-gray-200 shadow-lg p-6">
      {/* Price Header */}
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-900">${discountedPrice}</span>
          {corporateDiscount > 0 && (
            <span className="text-lg line-through text-gray-400 ml-2">${basePrice}</span>
          )}
          <span className="text-gray-600 ml-1">
            {selectedBookingType === 'Day Pass' ? ' / day' : selectedBookingType === 'Team Room' ? ' / day' : ' / month'}
          </span>
        </div>
        
        {/* Corporate Coverage Indicator */}
        {hasCorporateCoverage && (
          <div className="mt-2 flex items-center space-x-1 text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full">
            <Building2 className="w-4 h-4" />
            <span>Covered by {corporateAllowance?.company?.name || 'your company'}</span>
          </div>
        )}
        
        {/* Host Discount Indicator */}
        {corporateDiscount > 0 && (
          <div className="mt-1 flex items-center space-x-1 text-sm text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
            <Award className="w-4 h-4" />
            <span>Host discount: ${corporateDiscount} off</span>
          </div>
        )}
      </div>

      {/* Booking Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Booking Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {spaceBookingProducts.map((product) => (
            <button
              key={product.type}
              onClick={() => setSelectedBookingType(product.type)}
              className={`p-3 text-sm font-medium rounded-lg border transition-colors ${
                selectedBookingType === product.type
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {product.type}
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {selectedBookingType === 'Day Pass' ? 'Date' : 'Start Date'}
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      {/* Guests Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Team Size
        </label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'person' : 'people'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">
            ${basePrice} × 1 {selectedBookingType === 'Day Pass' ? 'day' : selectedBookingType === 'Team Room' ? 'day' : 'month'}
          </span>
          <span className="text-gray-900">${basePrice}</span>
        </div>
        
        {corporateDiscount > 0 && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-green-600">Host discount</span>
            <span className="text-green-600">-${corporateDiscount}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Service fee</span>
          <span className="text-gray-900">${serviceFee}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-semibold text-gray-900">${totalPrice}</span>
          </div>
          
          {hasCorporateCoverage && corporateAllowance && (
            <div className="mt-1 text-sm text-green-600">
              Remaining allowance: ${corporateAllowance.allowanceRemaining - totalPrice}
            </div>
          )}
        </div>
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        disabled={!checkInDate}
        className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        {isTeamBookingAvailable && !isTeamBooking ? (
          <>
            <UserPlus className="w-5 h-5" />
            <span>Book for Team</span>
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            <span>{hasCorporateCoverage ? 'Reserve (Company Covered)' : 'Reserve'}</span>
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-500 mt-3">
        You won&apos;t be charged yet
      </p>

      {/* Availability Note */}
      {selectedProduct && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            <span className="font-medium">{selectedProduct.quantity} spots available</span> for {selectedBookingType.toLowerCase()}
          </p>
        </div>
      )}
    </div>
  );
}
