'use client';

import { useState } from 'react';
import { X, Wifi, Car, Coffee, Monitor, Printer, Users, Building, BedDouble, Bath, Star, Award, ChevronDown, ChevronUp, Languages, Accessibility, Home } from 'lucide-react';
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
  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [showPropertyType, setShowPropertyType] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showHostLanguage, setShowHostLanguage] = useState(false);

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
            {/* Recommended for you */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for you</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                <div className="flex flex-col items-center min-w-[80px]">
                  <Coffee className="w-8 h-8 mb-1" />
                  <span className="text-xs">Kitchen</span>
                </div>
                <div className="flex flex-col items-center min-w-[80px]">
                  <Car className="w-8 h-8 mb-1" />
                  <span className="text-xs">Free parking</span>
                </div>
                <div className="flex flex-col items-center min-w-[80px]">
                  <Monitor className="w-8 h-8 mb-1" />
                  <span className="text-xs">TV</span>
                </div>
                <div className="flex flex-col items-center min-w-[80px]">
                  <Printer className="w-8 h-8 mb-1" />
                  <span className="text-xs">Printer</span>
                </div>
                <div className="flex flex-col items-center min-w-[80px]">
                  <Wifi className="w-8 h-8 mb-1" />
                  <span className="text-xs">Wifi</span>
                </div>
              </div>
            </div>
            {/* Rooms and beds */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rooms and beds</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <span className="mb-1">Bedrooms</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setBedrooms(Math.max(0, bedrooms - 1))} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">-</button>
                    <span className="w-6 text-center">{bedrooms === 0 ? 'Any' : bedrooms}</span>
                    <button onClick={() => setBedrooms(bedrooms + 1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">+</button>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="mb-1">Beds</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setBeds(Math.max(0, beds - 1))} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">-</button>
                    <span className="w-6 text-center">{beds === 0 ? 'Any' : beds}</span>
                    <button onClick={() => setBeds(beds + 1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">+</button>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="mb-1">Bathrooms</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setBathrooms(Math.max(0, bathrooms - 1))} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">-</button>
                    <span className="w-6 text-center">{bathrooms === 0 ? 'Any' : bathrooms}</span>
                    <button onClick={() => setBathrooms(bathrooms + 1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">+</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Standout stays */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Standout stays</h3>
              <div className="flex gap-3">
                <button className="flex flex-col items-center p-3 border rounded-lg hover:border-gray-400">
                  <Star className="w-6 h-6 mb-1 text-yellow-400" />
                  <span className="text-xs">Guest favorite</span>
                </button>
                <button className="flex flex-col items-center p-3 border rounded-lg hover:border-gray-400">
                  <Award className="w-6 h-6 mb-1 text-purple-500" />
                  <span className="text-xs">Luxe</span>
                </button>
              </div>
            </div>
            {/* Expandable sections */}
            <div>
              {/* Property type */}
              <button onClick={() => setShowPropertyType(!showPropertyType)} className="flex items-center justify-between w-full py-3 border-b">
                <span className="flex items-center gap-2"><Home className="w-5 h-5" /> Property type</span>
                {showPropertyType ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showPropertyType && (
                <div className="py-3 pl-8 text-sm text-gray-700">Apartment, House, Loft, Villa, ...</div>
              )}
              {/* Accessibility features */}
              <button onClick={() => setShowAccessibility(!showAccessibility)} className="flex items-center justify-between w-full py-3 border-b">
                <span className="flex items-center gap-2"><Accessibility className="w-5 h-5" /> Accessibility features</span>
                {showAccessibility ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showAccessibility && (
                <div className="py-3 pl-8 text-sm text-gray-700">Elevator, Step-free access, Accessible bathroom, ...</div>
              )}
              {/* Host language */}
              <button onClick={() => setShowHostLanguage(!showHostLanguage)} className="flex items-center justify-between w-full py-3 border-b">
                <span className="flex items-center gap-2"><Languages className="w-5 h-5" /> Host language</span>
                {showHostLanguage ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHostLanguage && (
                <div className="py-3 pl-8 text-sm text-gray-700">English, German, French, ...</div>
              )}
            </div>
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
