'use client';

import { useState, useEffect } from 'react';
import { Calendar, Users, CreditCard, Building2, Clock, Plus, Minus, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import { Space } from '../../lib/dummy-data';
import { useAuthStore } from '../../store/authStore';

interface EmployeeBookingWidgetProps {
  spaces: Space[];
}

type QuickBookingOption = {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  color: string;
  popular?: boolean;
};

const quickBookingOptions: QuickBookingOption[] = [
  {
    id: 'quick-meeting',
    name: 'Quick Meeting',
    description: '2-hour focused session',
    duration: '2 hours',
    price: '€8',
    color: 'emerald',
    popular: true
  },
  {
    id: 'half-day',
    name: 'Half Day',
    description: 'Morning or afternoon session',
    duration: '4 hours',
    price: '€16',
    color: 'green'
  },
  {
    id: 'full-day',
    name: 'Full Day',
    description: 'Complete workday access',
    duration: '8 hours',
    price: '€25',
    color: 'blue',
    popular: true
  },
  {
    id: 'week-sprint',
    name: 'Week Sprint',
    description: 'Intense project week',
    duration: '5 days',
    price: '€110',
    color: 'purple'
  },
  {
    id: 'monthly-base',
    name: 'Monthly Base',
    description: 'Your regular workspace',
    duration: '1 month',
    price: '€200',
    color: 'indigo'
  }
];

export default function EmployeeBookingWidget({ spaces }: EmployeeBookingWidgetProps) {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [selectedOption, setSelectedOption] = useState<QuickBookingOption>(quickBookingOptions[2]); // Full day default
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [teamSize, setTeamSize] = useState(1);
  const [customDuration, setCustomDuration] = useState(1);
  const [notes, setNotes] = useState('');
  const [showSpaceSelector, setShowSpaceSelector] = useState(false);
  
  const { corporateAllowance } = useAuthStore();

  // Featured spaces for quick access
  const featuredSpaces = spaces.slice(0, 6);

  // Calculate total price
  const calculatePrice = () => {
    const basePrice = parseInt(selectedOption.price.replace('€', ''));
    const teamMultiplier = teamSize > 1 ? teamSize * 0.8 : 1; // Team discount
    return Math.round(basePrice * teamMultiplier);
  };

  const totalPrice = calculatePrice();
  const hasCorporateCoverage = corporateAllowance?.hasAccess && corporateAllowance.allowanceRemaining >= totalPrice;

  // Auto-set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setStartDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const handleBookNow = () => {
    const spaceName = selectedSpace?.title || 'any available space';
    const message = `Quick booking confirmed!
    
Space: ${spaceName}
Option: ${selectedOption.name}
Duration: ${selectedOption.duration}
Date: ${new Date(startDate).toLocaleDateString()}
Team Size: ${teamSize} ${teamSize === 1 ? 'person' : 'people'}
Total: €${totalPrice}
${hasCorporateCoverage ? `Covered by: ${corporateAllowance?.company?.name || 'Your company'}` : ''}
${notes ? `Notes: ${notes}` : ''}`;
    
    alert(message);
  };

  const isBookingValid = () => {
    return startDate && selectedOption && (selectedOption.id.includes('hour') ? startTime && endTime : true);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Quick Workspace Booking</h2>
        <p className="text-blue-100">Book your perfect workspace in seconds</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Options */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Choose Your Option</h3>
            <span className="text-sm text-gray-500">Popular choices</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickBookingOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option)}
                className={`relative p-4 text-left rounded-lg border-2 transition-all hover:shadow-md ${
                  selectedOption.id === option.id
                    ? `border-${option.color}-500 bg-${option.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option.popular && (
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-start mb-2">
                  <div className={`w-3 h-3 bg-${option.color}-500 rounded-full mt-1`}></div>
                  <div className={`text-${option.color}-600 font-semibold text-lg`}>
                    {option.price}
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{option.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                <div className="text-xs text-gray-500">{option.duration}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Duration for longer bookings */}
        {(selectedOption.id === 'monthly-base' || selectedOption.id === 'week-sprint') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Duration ({selectedOption.id === 'monthly-base' ? 'months' : 'weeks'})
            </label>
            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg max-w-xs">
              <button
                onClick={() => setCustomDuration(Math.max(1, customDuration - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{customDuration}</div>
                <div className="text-sm text-gray-500">
                  {selectedOption.id === 'monthly-base' ? 'month' : 'week'}{customDuration > 1 ? 's' : ''}
                </div>
              </div>
              
              <button
                onClick={() => setCustomDuration(customDuration + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Date and Time Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            When do you want to start?
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

            {/* Time selection for hourly options */}
            {selectedOption.id.includes('hour') && (
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
          </div>
        </div>

        {/* Team Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Team Size
          </label>
          <div className="relative max-w-xs">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'person (just me)' : 'people'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Space Selection (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Preferred Space (Optional)
          </label>
          <div className="space-y-3">
            <button
              onClick={() => setShowSpaceSelector(!showSpaceSelector)}
              className="w-full p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {selectedSpace ? (
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={selectedSpace.imageUrls[0]}
                      alt={selectedSpace.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{selectedSpace.title}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {selectedSpace.location}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSpace(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="text-gray-500">
                  Let us find the best available space for you
                </div>
              )}
            </button>

            {/* Quick Space Options */}
            {showSpaceSelector && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {featuredSpaces.map((space) => (
                  <button
                    key={space.id}
                    onClick={() => {
                      setSelectedSpace(space);
                      setShowSpaceSelector(false);
                    }}
                    className="p-3 text-left border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={space.imageUrls[0]}
                          alt={space.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm truncate">{space.title}</div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {space.location}
                        </div>
                        <div className="flex items-center mt-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-xs text-gray-600">4.8</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Special Requests (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any specific requirements or preferences?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={3}
          />
        </div>

        {/* Price Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">
              {selectedOption.name} {teamSize > 1 && `× ${teamSize} people`}
            </span>
            <span className="text-gray-900">€{totalPrice}</span>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Service fee</span>
            <span className="text-gray-900">€0</span>
          </div>
          
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-semibold text-gray-900">€{totalPrice}</span>
            </div>
            
            {hasCorporateCoverage && corporateAllowance && (
              <div className="mt-2 flex items-center space-x-2 text-sm text-green-700">
                <Building2 className="w-4 h-4" />
                <span>Covered by {corporateAllowance?.company?.name || 'your company'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={handleBookNow}
          disabled={!isBookingValid()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
        >
          <CreditCard className="w-5 h-5" />
          <span>{hasCorporateCoverage ? 'Book Now (Company Covered)' : 'Book Now'}</span>
        </button>

        <p className="text-center text-sm text-gray-500">
          Instant confirmation • No upfront payment required
        </p>
      </div>
    </div>
  );
}