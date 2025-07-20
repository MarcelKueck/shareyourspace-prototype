'use client';

import { useState } from 'react';
import { Calendar, Users, CreditCard, Building2, Award, UserPlus } from 'lucide-react';
import { Space, bookingProducts } from '../../lib/dummy-data';
import { useAuthStore } from '../../store/authStore';

interface BookingWidgetProps {
  space: Space;
}

export default function BookingWidget({ space }: BookingWidgetProps) {
  const [selectedBookingType, setSelectedBookingType] = useState<'Hourly Pass' | 'Day Pass' | 'Monthly Desk' | 'Private Office' | 'Team Room'>('Day Pass');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [guests, setGuests] = useState(1);
  const [isTeamBooking, setIsTeamBooking] = useState(false);
  const [duration, setDuration] = useState(1); // For monthly bookings
  
  const { corporateAllowance, enableTeamBooking } = useAuthStore();

  // Get booking products for this space
  const spaceBookingProducts = bookingProducts.filter(bp => bp.spaceId === space.id);
  const selectedProduct = spaceBookingProducts.find(bp => bp.type === selectedBookingType);
  
  const basePrice = selectedProduct?.price || 0;
  
  // Calculate total price based on booking type and duration
  const calculateTotalPrice = () => {
    let totalBasePrice = basePrice;
    
    if (selectedBookingType === 'Hourly Pass' && startTime && endTime) {
      const start = new Date(`2000-01-01 ${startTime}`);
      const end = new Date(`2000-01-01 ${endTime}`);
      const hours = Math.max(2, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60))); // Min 2 hours
      totalBasePrice = basePrice * hours;
    } else if (selectedBookingType === 'Day Pass' && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);
      totalBasePrice = basePrice * days;
    } else if (selectedBookingType === 'Team Room' && startTime && endTime) {
      const start = new Date(`2000-01-01 ${startTime}`);
      const end = new Date(`2000-01-01 ${endTime}`);
      const hours = Math.max(2, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60))); // Min 2 hours
      totalBasePrice = basePrice * hours;
    } else if ((selectedBookingType === 'Monthly Desk' || selectedBookingType === 'Private Office') && duration) {
      totalBasePrice = basePrice * duration;
    }
    
    return totalBasePrice;
  };
  
  const totalBasePrice = calculateTotalPrice();
  const serviceFee = Math.round(totalBasePrice * 0.12); // 12% service fee
  
  // Calculate corporate discount if applicable
  const corporateDiscount = corporateAllowance?.company?.isHost && space.corporateHostBenefits?.crossBenefitsAvailable 
    ? Math.round(totalBasePrice * (corporateAllowance.company.crossBenefits.hostDiscount / 100)) 
    : 0;
  
  // Validation function
  const isBookingValid = () => {
    if (!startDate) return false;
    
    if (selectedBookingType === 'Hourly Pass' || selectedBookingType === 'Team Room') {
      return startTime && endTime && startTime < endTime;
    }
    
    if (selectedBookingType === 'Day Pass') {
      return endDate && startDate <= endDate;
    }
    
    return true; // Monthly/Private Office just need start date
  };

  const discountedPrice = totalBasePrice - corporateDiscount;
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
      ? `Booking confirmed for ${space.title}!\nType: ${selectedBookingType}\nTotal: €${totalPrice}\nCovered by: ${corporateAllowance?.company?.name || 'Your company'}`
      : `Booking confirmed for ${space.title}!\nType: ${selectedBookingType}\nTotal: €${totalPrice}`;
    
    alert(message);
  };

  return (
    <div className="sticky top-24 bg-white rounded-xl border border-gray-200 shadow-lg p-6">
      {/* Price Header */}
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-900">€{discountedPrice}</span>
          <span className="text-gray-500 ml-1">
            {selectedBookingType === 'Hourly Pass' 
              ? '/hour' 
              : selectedBookingType === 'Day Pass' 
              ? '/day' 
              : selectedBookingType === 'Team Room'
              ? '/hour'
              : '/month'
            }
          </span>
          {corporateDiscount > 0 && (
            <span className="text-lg line-through text-gray-400 ml-2">€{basePrice}</span>
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
            <span>Host discount: €{corporateDiscount} off</span>
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

      {/* Dynamic Date/Time Selection based on booking type */}
      <div className="mb-6">
        {selectedBookingType === 'Hourly Pass' && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Date & Time
            </label>
            <div className="grid grid-cols-1 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">Minimum 2 hours required</p>
            </div>
          </div>
        )}

        {selectedBookingType === 'Day Pass' && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Dates (Select Start & End)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    min={startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedBookingType === 'Team Room' && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Date & Time
            </label>
            <div className="grid grid-cols-1 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">Minimum 2 hours required</p>
            </div>
          </div>
        )}

        {(selectedBookingType === 'Monthly Desk' || selectedBookingType === 'Private Office') && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Start Date & Duration
            </label>
            <div className="grid grid-cols-1 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Duration (Months)</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {[1, 2, 3, 6, 12].map(months => (
                    <option key={months} value={months}>
                      {months} {months === 1 ? 'month' : 'months'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
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
            {selectedBookingType === 'Hourly Pass' && startTime && endTime && (
              <>€{basePrice} × {Math.max(2, Math.ceil((new Date(`2000-01-01 ${endTime}`).getTime() - new Date(`2000-01-01 ${startTime}`).getTime()) / (1000 * 60 * 60)))} hours</>
            )}
            {selectedBookingType === 'Day Pass' && startDate && endDate && (
              <>€{basePrice} × {Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1)} days</>
            )}
            {selectedBookingType === 'Team Room' && startTime && endTime && (
              <>€{basePrice} × {Math.max(2, Math.ceil((new Date(`2000-01-01 ${endTime}`).getTime() - new Date(`2000-01-01 ${startTime}`).getTime()) / (1000 * 60 * 60)))} hours</>
            )}
            {(selectedBookingType === 'Monthly Desk' || selectedBookingType === 'Private Office') && (
              <>€{basePrice} × {duration} {duration === 1 ? 'month' : 'months'}</>
            )}
          </span>
          <span className="text-gray-900">€{totalBasePrice}</span>
        </div>
        
        {corporateDiscount > 0 && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-green-600">Host discount</span>
            <span className="text-green-600">-€{corporateDiscount}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Service fee</span>
          <span className="text-gray-900">€{serviceFee}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-semibold text-gray-900">€{totalBasePrice - corporateDiscount + serviceFee}</span>
          </div>
          
          {hasCorporateCoverage && corporateAllowance && (
            <div className="mt-1 text-sm text-green-600">
              Remaining allowance: €{corporateAllowance.allowanceRemaining - (totalBasePrice - corporateDiscount + serviceFee)}
            </div>
          )}
        </div>
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        disabled={!isBookingValid()}
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
