'use client';

import { useState } from 'react';
import { Calendar, Users, CreditCard } from 'lucide-react';
import { Space, bookingProducts } from '../../lib/dummy-data';

interface BookingWidgetProps {
  space: Space;
}

export default function BookingWidget({ space }: BookingWidgetProps) {
  const [selectedBookingType, setSelectedBookingType] = useState<'Day Pass' | 'Monthly Desk'>('Monthly Desk');
  const [checkInDate, setCheckInDate] = useState('');
  const [guests, setGuests] = useState(1);

  // Get booking products for this space
  const spaceBookingProducts = bookingProducts.filter(bp => bp.spaceId === space.id);
  const selectedProduct = spaceBookingProducts.find(bp => bp.type === selectedBookingType);
  
  const basePrice = selectedProduct?.price || 0;
  const serviceFee = Math.round(basePrice * 0.12); // 12% service fee
  const totalPrice = basePrice + serviceFee;

  const handleBookNow = () => {
    alert(`Booking confirmed for ${space.title}!\nType: ${selectedBookingType}\nTotal: $${totalPrice}`);
  };

  return (
    <div className="sticky top-24 bg-white rounded-xl border border-gray-200 shadow-lg p-6">
      {/* Price Header */}
      <div className="flex items-baseline mb-6">
        <span className="text-2xl font-bold text-gray-900">${basePrice}</span>
        <span className="text-gray-600 ml-1">
          {selectedBookingType === 'Day Pass' ? ' / day' : ' / month'}
        </span>
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
            ${basePrice} × 1 {selectedBookingType === 'Day Pass' ? 'day' : 'month'}
          </span>
          <span className="text-gray-900">${basePrice}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Service fee</span>
          <span className="text-gray-900">${serviceFee}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-semibold text-gray-900">${totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        disabled={!checkInDate}
        className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        <CreditCard className="w-5 h-5" />
        <span>Reserve</span>
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
