'use client';

import { useState, useEffect } from 'react';
import { Calendar, Users, CreditCard, Building2, Award, UserPlus, Clock, Plus, Minus } from 'lucide-react';
import { Space } from '../../lib/dummy-data';
import { useAuthStore } from '../../store/authStore';

interface BookingWidgetProps {
  space: Space;
}

type BookingDurationType = 
  | 'hourly' 
  | 'daily' 
  | 'weekly' 
  | 'monthly' 
  | 'quarterly' 
  | 'custom';

type PricingTier = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  unit: string;
  color: string;
  minDuration?: number;
  maxDuration?: number;
  discountPercent?: number;
};

const pricingTiers: PricingTier[] = [
  {
    id: 'hourly',
    name: 'Hourly Access',
    description: 'Perfect for meetings and short sessions',
    basePrice: 4,
    unit: 'hour',
    color: 'emerald',
    minDuration: 2,
    maxDuration: 24
  },
  {
    id: 'daily',
    name: 'Day Pass',
    description: 'Full day workspace access',
    basePrice: 25,
    unit: 'day',
    color: 'green',
    minDuration: 1,
    maxDuration: 30
  },
  {
    id: 'weekly',
    name: 'Weekly Pass',
    description: 'Week-long workspace access',
    basePrice: 140,
    unit: 'week',
    color: 'blue',
    minDuration: 1,
    maxDuration: 12,
    discountPercent: 20
  },
  {
    id: 'monthly',
    name: 'Monthly Desk',
    description: 'Dedicated workspace with storage',
    basePrice: 200,
    unit: 'month',
    color: 'indigo',
    minDuration: 1,
    maxDuration: 12,
    discountPercent: 30
  },
  {
    id: 'quarterly',
    name: 'Quarterly Plan',
    description: 'Long-term commitment with best rates',
    basePrice: 170,
    unit: 'month',
    color: 'purple',
    minDuration: 3,
    maxDuration: 12,
    discountPercent: 35
  }
];

export default function EnhancedBookingWidget({ space }: BookingWidgetProps) {
  const [selectedTier, setSelectedTier] = useState<PricingTier>(pricingTiers[1]);
  const [durationType, setDurationType] = useState<BookingDurationType>('daily');
  const [customDuration, setCustomDuration] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [guests, setGuests] = useState(1);
  const [isTeamBooking, setIsTeamBooking] = useState(false);
  
  const { corporateAllowance, enableTeamBooking } = useAuthStore();

  // Calculate duration based on dates for custom bookings
  const calculateDurationFromDates = () => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    
    switch (selectedTier.unit) {
      case 'hour':
        if (startTime && endTime) {
          const startDateTime = new Date(`${startDate} ${startTime}`);
          const endDateTime = new Date(`${endDate} ${endTime}`);
          return Math.max(selectedTier.minDuration || 1, Math.ceil((endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60)));
        }
        return selectedTier.minDuration || 2;
      case 'day':
        return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
      case 'week':
        return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7)));
      case 'month':
        return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30)));
      default:
        return customDuration;
    }
  };

  const totalDuration = durationType === 'custom' || (startDate && endDate) 
    ? calculateDurationFromDates() 
    : customDuration;

  // Calculate total price with dynamic pricing
  const calculateTotalPrice = () => {
    let basePrice = selectedTier.basePrice * totalDuration;
    
    // Apply bulk discounts
    if (totalDuration >= 3 && selectedTier.unit === 'month') {
      basePrice *= 0.9; // 10% discount for 3+ months
    }
    if (totalDuration >= 6 && selectedTier.unit === 'month') {
      basePrice *= 0.85; // 15% additional discount for 6+ months
    }
    if (totalDuration >= 12 && selectedTier.unit === 'month') {
      basePrice *= 0.8; // 20% additional discount for 12+ months
    }
    
    // Team size pricing multiplier
    if (guests > 1 && selectedTier.unit !== 'hour') {
      basePrice *= Math.min(guests * 0.8, guests); // Slight discount per person for teams
    }
    
    return Math.round(basePrice);
  };

  const totalBasePrice = calculateTotalPrice();
  const serviceFee = Math.round(totalBasePrice * 0.12); // 12% service fee
  
  // Calculate corporate discount
  const corporateDiscount = corporateAllowance?.company?.isHost && space.corporateHostBenefits?.crossBenefitsAvailable 
    ? Math.round(totalBasePrice * (corporateAllowance.company.crossBenefits.hostDiscount / 100)) 
    : 0;

  const discountedPrice = totalBasePrice - corporateDiscount;
  const totalPrice = discountedPrice + serviceFee;
  
  // Validation
  const isBookingValid = () => {
    if (!startDate) return false;
    if (selectedTier.unit === 'hour' && (!startTime || !endTime || startTime >= endTime)) return false;
    if (durationType === 'custom' && !endDate) return false;
    return totalDuration >= (selectedTier.minDuration || 1);
  };

  // Check corporate coverage
  const hasCorporateCoverage = corporateAllowance?.hasAccess && corporateAllowance.allowanceRemaining >= totalPrice;
  const isTeamBookingAvailable = guests > 1 || selectedTier.id === 'quarterly';

  const handleBookNow = () => {
    if (isTeamBookingAvailable && !isTeamBooking) {
      setIsTeamBooking(true);
      enableTeamBooking(true);
      alert('Team booking mode enabled! You can now invite team members.');
      return;
    }
    
    const message = hasCorporateCoverage 
      ? `Booking confirmed for ${space.title}!\nType: ${selectedTier.name}\nDuration: ${totalDuration} ${selectedTier.unit}${totalDuration > 1 ? 's' : ''}\nTotal: €${totalPrice}\nCovered by: ${corporateAllowance?.company?.name || 'Your company'}`
      : `Booking confirmed for ${space.title}!\nType: ${selectedTier.name}\nDuration: ${totalDuration} ${selectedTier.unit}${totalDuration > 1 ? 's' : ''}\nTotal: €${totalPrice}`;
    
    alert(message);
  };

  // Auto-set end date for non-custom bookings
  useEffect(() => {
    if (startDate && durationType !== 'custom') {
      const start = new Date(startDate);
      const end = new Date(start);
      
      switch (selectedTier.unit) {
        case 'day':
          end.setDate(start.getDate() + customDuration - 1);
          break;
        case 'week':
          end.setDate(start.getDate() + (customDuration * 7) - 1);
          break;
        case 'month':
          end.setMonth(start.getMonth() + customDuration);
          end.setDate(end.getDate() - 1);
          break;
      }
      
      if (selectedTier.unit !== 'hour') {
        setEndDate(end.toISOString().split('T')[0]);
      }
    }
  }, [startDate, customDuration, selectedTier.unit, durationType]);

  return (
    <div className="sticky top-24 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Price Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">€{Math.round(discountedPrice / totalDuration)}</span>
            <span className="text-gray-500 ml-1">/{selectedTier.unit}</span>
            {corporateDiscount > 0 && (
              <span className="text-lg line-through text-gray-400 ml-2">€{Math.round(totalBasePrice / totalDuration)}</span>
            )}
          </div>
          {totalDuration > 1 && (
            <div className="text-right">
              <div className="text-sm text-gray-500">{totalDuration} {selectedTier.unit}s total</div>
              <div className="text-lg font-semibold text-gray-900">€{discountedPrice}</div>
            </div>
          )}
        </div>
        
        {/* Corporate Coverage & Discount Indicators */}
        <div className="mt-3 space-y-2">
          {hasCorporateCoverage && (
            <div className="flex items-center space-x-2 text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full">
              <Building2 className="w-4 h-4" />
              <span>Covered by {corporateAllowance?.company?.name || 'your company'}</span>
            </div>
          )}
          
          {corporateDiscount > 0 && (
            <div className="flex items-center space-x-2 text-sm text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
              <Award className="w-4 h-4" />
              <span>Host discount: €{corporateDiscount} off</span>
            </div>
          )}
          
          {selectedTier.discountPercent && totalDuration >= 3 && (
            <div className="flex items-center space-x-2 text-sm text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              <Award className="w-4 h-4" />
              <span>{selectedTier.discountPercent}% bulk discount applied</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Pricing Tier Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose Your Plan
          </label>
          <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
            {pricingTiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => {
                  setSelectedTier(tier);
                  setDurationType(tier.id as BookingDurationType);
                  setCustomDuration(tier.minDuration || 1);
                }}
                className={`p-4 text-left rounded-lg border-2 transition-all hover:shadow-md ${
                  selectedTier.id === tier.id
                    ? `border-${tier.color}-500 bg-${tier.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 bg-${tier.color}-500 rounded-full`}></div>
                      <h4 className="font-semibold text-gray-900">{tier.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{tier.description}</p>
                    {tier.discountPercent && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {tier.discountPercent}% off
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold text-${tier.color}-600`}>€{tier.basePrice}</div>
                    <div className="text-xs text-gray-500">per {tier.unit}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Duration ({selectedTier.unit}s)
          </label>
          <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
            <button
              onClick={() => setCustomDuration(Math.max(selectedTier.minDuration || 1, customDuration - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{customDuration}</div>
              <div className="text-sm text-gray-500">{selectedTier.unit}{customDuration > 1 ? 's' : ''}</div>
            </div>
            
            <button
              onClick={() => setCustomDuration(Math.min(selectedTier.maxDuration || 12, customDuration + 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {/* Quick duration buttons */}
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedTier.unit === 'day' && [1, 3, 7, 14].map(days => (
              <button
                key={days}
                onClick={() => setCustomDuration(days)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  customDuration === days 
                    ? 'bg-blue-100 border-blue-300 text-blue-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {days} {days === 1 ? 'day' : 'days'}
              </button>
            ))}
            
            {selectedTier.unit === 'month' && [1, 3, 6, 12].map(months => (
              <button
                key={months}
                onClick={() => setCustomDuration(months)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  customDuration === months 
                    ? 'bg-blue-100 border-blue-300 text-blue-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {months} {months === 1 ? 'month' : 'months'}
              </button>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {selectedTier.unit === 'hour' ? 'Date & Time' : 'Start Date'}
          </label>
          
          <div className="space-y-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Time selection for hourly bookings */}
            {selectedTier.unit === 'hour' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Start Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">End Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* End date preview for multi-day bookings */}
            {endDate && selectedTier.unit !== 'hour' && (
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between">
                  <span>End Date:</span>
                  <span className="font-medium">{new Date(endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Total Duration:</span>
                  <span className="font-medium">{totalDuration} {selectedTier.unit}{totalDuration > 1 ? 's' : ''}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Team Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Team Size
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'person' : 'people'}
                </option>
              ))}
            </select>
          </div>
          
          {guests > 4 && (
            <p className="mt-2 text-sm text-amber-700 bg-amber-50 p-2 rounded">
              Large teams may require space availability confirmation
            </p>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              €{selectedTier.basePrice} × {totalDuration} {selectedTier.unit}{totalDuration > 1 ? 's' : ''}
              {guests > 1 && ` × ${guests} people`}
            </span>
            <span className="text-gray-900">€{totalBasePrice}</span>
          </div>
          
          {corporateDiscount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-green-600">Host discount</span>
              <span className="text-green-600">-€{corporateDiscount}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Service fee</span>
            <span className="text-gray-900">€{serviceFee}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-semibold text-gray-900">€{totalPrice}</span>
            </div>
            
            {hasCorporateCoverage && corporateAllowance && (
              <div className="mt-1 text-sm text-green-600">
                Remaining allowance: €{corporateAllowance.allowanceRemaining - totalPrice}
              </div>
            )}
          </div>
        </div>

        {/* Book Now Button */}
        <button
          onClick={handleBookNow}
          disabled={!isBookingValid()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
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

        <p className="text-center text-sm text-gray-500">
          You won&apos;t be charged yet
        </p>

        {/* Availability Note */}
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-sm text-green-800">
            <span className="font-medium">✓ Available</span> for {selectedTier.name.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
