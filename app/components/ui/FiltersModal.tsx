'use client';

import { useState } from 'react';
import { X, Wifi, Car, Coffee, Monitor, Printer, Users, Building } from 'lucide-react';
import { SpaceType } from '../../lib/types';

interface FilterOptions {
  spaceType?: SpaceType | null;
  maxPrice?: number;
  amenities?: string[];
  bookingOptions?: string[];
}

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  mode: 'flexible' | 'contract';
}

export default function FiltersModal({ isOpen, onClose, onApplyFilters, mode }: FiltersModalProps) {
  const [priceRange, setPriceRange] = useState([10, 100]);
  const [selectedSpaceType, setSelectedSpaceType] = useState<SpaceType | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [bookingOptions, setBookingOptions] = useState<string[]>([]);

  if (!isOpen) return null;

  const spaceTypes = [
    { id: 'desk', label: 'Desk', icon: Monitor },
    { id: 'hot-desk', label: 'Hot Desk', icon: Users },
    { id: 'private-office', label: 'Private Office', icon: Building },
    { id: 'meeting-room', label: 'Meeting Room', icon: Users },
  ];

  const amenities = [
    { id: 'wifi', label: 'Wifi', icon: Wifi },
    { id: 'parking', label: 'Free parking', icon: Car },
    { id: 'coffee', label: 'Coffee', icon: Coffee },
    { id: 'printer', label: 'Printer', icon: Printer },
  ];

  const bookingOptionsList = [
    { id: 'instant-book', label: 'Instant Book' },
    { id: 'free-cancellation', label: 'Free cancellation' },
    { id: 'allows-pets', label: 'Allows pets' },
  ];

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleBookingOptionToggle = (optionId: string) => {
    setBookingOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      spaceType: selectedSpaceType,
      maxPrice: priceRange[1],
      amenities: selectedAmenities,
      bookingOptions,
    });
    onClose();
  };

  const handleClearAll = () => {
    setSelectedSpaceType(null);
    setPriceRange([10, 100]);
    setSelectedAmenities([]);
    setBookingOptions([]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Space Type */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Type of workspace</h3>
              <div className="grid grid-cols-2 gap-3">
                {spaceTypes.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedSpaceType(selectedSpaceType === id ? null : id as SpaceType)}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      selectedSpaceType === id
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-2" />
                    <div className="font-medium">{label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Price range
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {mode === 'flexible' ? 'Hourly prices including fees and taxes' : 'Monthly prices including fees and taxes'}
              </p>
              
              {/* Price Range Slider */}
              <div className="px-2">
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <div className="text-sm">
                    <span className="font-medium">€{priceRange[0]}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">€{priceRange[1]}+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {amenities.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => handleAmenityToggle(id)}
                    className={`p-3 border rounded-lg text-left transition-all flex items-center space-x-3 ${
                      selectedAmenities.includes(id)
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Booking Options */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking options</h3>
              <div className="space-y-3">
                {bookingOptionsList.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => handleBookingOptionToggle(id)}
                    className={`w-full p-3 border rounded-lg text-left transition-all ${
                      bookingOptions.includes(id)
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl">
            <div className="flex justify-between items-center">
              <button
                onClick={handleClearAll}
                className="text-gray-900 font-medium underline hover:no-underline"
              >
                Clear all
              </button>
              <button
                onClick={handleApplyFilters}
                className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                  mode === 'contract' 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
