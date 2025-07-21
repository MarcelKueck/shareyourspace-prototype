'use client';

import { useState, useEffect } from 'react';
import { Users, Star, Minus, Plus, CreditCard, Clock, Calendar } from 'lucide-react';
import { Space, WorkspaceUnit } from '../../lib/types';
import { calculatePricing } from '../../lib/enhanced-data';
import { useAuthStore } from '../../store/authStore';
import { useSearchStore } from '../../store/searchStore';

interface FlexibleBookingWidgetProps {
  space: Space;
  selectedUnit: WorkspaceUnit | null;
}

export default function FlexibleBookingWidget({ space, selectedUnit }: FlexibleBookingWidgetProps) {
  const { 
    checkIn: storedCheckIn, 
    checkOut: storedCheckOut, 
    guests: storedGuests 
  } = useSearchStore();

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    // To avoid timezone issues, manually construct the date string
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [checkInDate, setCheckInDate] = useState(formatDateForInput(storedCheckIn));
  const [checkOutDate, setCheckOutDate] = useState(formatDateForInput(storedCheckOut));
  const [guests, setGuests] = useState(storedGuests || 1);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [bookingType, setBookingType] = useState<'daily' | 'hourly'>('daily');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  
  const { corporateAllowance, currentUser } = useAuthStore();

  // Use selected unit's price if available, otherwise fall back to space's base price
  const baseDailyPrice = selectedUnit?.price.daily ?? space.basePrice;
  const baseHourlyPrice = selectedUnit?.price.hourly ?? space.hourlyRate ?? Math.round(baseDailyPrice / 8);
  const maxGuestsForUnit = selectedUnit?.capacity ?? space.maxGuests;
  
  // Calculate pricing when dates change
  const calculateCurrentPrice = () => {
    if (bookingType === 'hourly' && checkInDate && startTime && endTime) {
      // Hourly booking calculation
      const start = parseInt(startTime.split(':')[0]);
      const end = parseInt(endTime.split(':')[0]);
      const hours = Math.max(1, end - start);
      const hourlyRate = baseHourlyPrice;
      const subtotal = hourlyRate * hours * guests;
      const serviceFee = Math.round(subtotal * 0.14);
      
      return {
        basePrice: hourlyRate,
        nights: 1, // Not applicable, but for consistency
        subtotal,
        totalPrice: subtotal + serviceFee,
        serviceFee,
        hours,
        weeklyDiscount: 0,
        monthlyDiscount: 0,
        corporateDiscount: 0
      };
    }

    // Daily booking - standard Airbnb-style calculation
    if (!checkInDate || !checkOutDate) {
      return {
        basePrice: baseDailyPrice,
        nights: 1,
        subtotal: baseDailyPrice,
        totalPrice: baseDailyPrice + Math.round(baseDailyPrice * 0.14),
        serviceFee: Math.round(baseDailyPrice * 0.14),
        weeklyDiscount: 0,
        monthlyDiscount: 0,
        corporateDiscount: 0
      };
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const corporateDiscount = (currentUser?.companyId && space.corporateHostBenefits?.crossBenefitsAvailable)
      ? corporateAllowance?.company?.crossBenefits.hostDiscount ?? 0
      : 0;

    return calculatePricing(space, checkIn, checkOut, corporateDiscount, selectedUnit ?? undefined);
  };

  const currentPricing = calculateCurrentPrice();
  
  // Auto-set checkout date when checkin is selected (for daily bookings)
  useEffect(() => {
    if (bookingType === 'daily' && checkInDate && !checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkIn);
      checkOut.setDate(checkOut.getDate() + 1);
      setCheckOutDate(checkOut.toISOString().split('T')[0]);
    }
  }, [checkInDate, checkOutDate, bookingType]);

  // Validation
  const isBookingValid = () => {
    if (bookingType === 'daily') {
      return checkInDate && checkOutDate && new Date(checkInDate) < new Date(checkOutDate);
    } else {
      return checkInDate && startTime && endTime && startTime < endTime;
    }
  };

  const hasCorporateCoverage = corporateAllowance?.hasAccess && corporateAllowance.allowanceRemaining >= currentPricing.totalPrice;

  const handleBooking = () => {
    if (!isBookingValid() || !selectedUnit) return;

    const bookingDetails = {
      spaceId: space.id,
      unitId: selectedUnit?.id,
      unitType: selectedUnit?.spaceType,
      checkIn: checkInDate,
      checkOut: bookingType === 'daily' ? checkOutDate : checkInDate,
      startTime: bookingType === 'hourly' ? startTime : null,
      endTime: bookingType === 'hourly' ? endTime : null,
      guests,
      totalPrice: currentPricing.totalPrice,
      bookingType,
      hasCorporateCoverage,
    };
    console.log('Booking submitted:', bookingDetails);
    alert(`Booking request sent for ${selectedUnit?.name || space.title}! Total: $${currentPricing.totalPrice.toFixed(2)}`);
  };

  if (!selectedUnit) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Book Your Space</h3>
        <p className="text-gray-600">
          Please select a workspace unit to see availability and pricing.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Book {selectedUnit.name}
          </h3>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="font-semibold">4.9</span>
            <span className="text-sm text-gray-500">(23 reviews)</span>
          </div>
        </div>
        
        {/* Corporate coverage indicator */}
        {hasCorporateCoverage && (
          <div className="mt-3 px-3 py-2 bg-green-50 rounded-full">
            <span className="text-sm font-medium text-green-800">
              ✓ Covered by {corporateAllowance?.company?.name}
            </span>
          </div>
        )}
      </div>

      {/* Booking form */}
      <div className="p-6 space-y-4">
        {/* Booking type toggle - only show if space has hourly rates or unit has hourly rates */}
        {(space.hourlyRate || selectedUnit?.price.hourly) && (
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBookingType('daily')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                bookingType === 'daily' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Daily
            </button>
            <button
              onClick={() => setBookingType('hourly')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                bookingType === 'hourly' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Hourly
            </button>
          </div>
        )}

        {/* Date and Time Selection */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {bookingType === 'hourly' ? (
            // Hourly booking form
            <div className="space-y-0 divide-y divide-gray-300">
              <div className="p-3">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full text-gray-900 bg-transparent border-none outline-none"
                />
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-300">
                <div className="p-3">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                    Start Time
                  </label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full text-gray-900 bg-transparent border-none outline-none"
                  >
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <option key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="p-3">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                    End Time
                  </label>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full text-gray-900 bg-transparent border-none outline-none"
                  >
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = (i + 1).toString().padStart(2, '0');
                      return (
                        <option key={hour} value={`${hour}:00`} disabled={`${hour}:00` <= startTime}>
                          {hour}:00
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            // Daily booking form - classic Airbnb style
            <div className="grid grid-cols-2 divide-x divide-gray-300">
              <div className="p-3">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                  Check-in
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full text-gray-900 bg-transparent border-none outline-none"
                />
              </div>
              <div className="p-3">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                  Check-out
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  min={checkInDate ? new Date(new Date(checkInDate).getTime() + 86400000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                  className="w-full text-gray-900 bg-transparent border-none outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Guests selection */}
        <div className="relative">
          <div 
            className="p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
            onClick={() => setShowGuestPicker(!showGuestPicker)}
          >
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
              Guests
            </label>
            <div className="flex items-center justify-between">
              <span className="text-gray-900">
                {guests} {guests === 1 ? 'guest' : 'guests'}
              </span>
              <Users className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Guest picker dropdown */}
          {showGuestPicker && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Guests</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{guests}</span>
                    <button
                      onClick={() => setGuests(Math.min(maxGuestsForUnit, guests + 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Maximum {maxGuestsForUnit} guests
                </p>
                <button
                  onClick={() => setShowGuestPicker(false)}
                  className="mt-3 w-full py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Price breakdown */}
      {isBookingValid() && (
        <div className="px-6 pb-4">
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-gray-600">
              <span>
                €{bookingType === 'hourly' ? currentPricing.basePrice : currentPricing.basePrice} × {
                  bookingType === 'hourly' 
                    ? `${currentPricing.hours || 1} ${(currentPricing.hours || 1) === 1 ? 'hour' : 'hours'}`
                    : `${currentPricing.nights} ${currentPricing.nights === 1 ? 'day' : 'days'}`
                }
                {guests > 1 && ` × ${guests} guests`}
              </span>
              <span>€{currentPricing.subtotal}</span>
            </div>
            
            {bookingType === 'daily' && (currentPricing.weeklyDiscount || 0) > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Weekly discount</span>
                <span>-€{currentPricing.weeklyDiscount}</span>
              </div>
            )}
            
            {bookingType === 'daily' && (currentPricing.monthlyDiscount || 0) > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Monthly discount</span>
                <span>-€{currentPricing.monthlyDiscount}</span>
              </div>
            )}
            
            {bookingType === 'daily' && (currentPricing.corporateDiscount || 0) > 0 && (
              <div className="flex justify-between text-purple-600">
                <span>Corporate host discount</span>
                <span>-€{currentPricing.corporateDiscount}</span>
              </div>
            )}
            
            <div className="flex justify-between text-gray-600">
              <span>Service fee</span>
              <span>€{currentPricing.serviceFee}</span>
            </div>
            
            <div className="flex justify-between font-semibold text-gray-900 text-lg pt-3 border-t border-gray-200">
              <span>Total</span>
              <span>€{currentPricing.totalPrice}</span>
            </div>
          </div>
        </div>
      )}

      {/* Book button */}
      <div className="p-6 pt-0">
        <button
          onClick={handleBooking}
          disabled={!isBookingValid()}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
        >
          <CreditCard className="w-5 h-5" />
          <span>Reserve</span>
        </button>
        
        <p className="text-center text-sm text-gray-500 mt-3">
          You won&apos;t be charged yet
        </p>
        
        {/* Instant book badge */}
        {space.availability.instantBook && (
          <div className="flex items-center justify-center mt-2">
            <span className="text-xs font-medium text-green-600">⚡ Instant Book</span>
          </div>
        )}
      </div>
    </div>
  );
}