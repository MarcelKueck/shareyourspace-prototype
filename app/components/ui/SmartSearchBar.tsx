'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Filter, Building, Clock } from 'lucide-react';
import { SpaceType, ContractTerm } from '../../lib/types';
import { useSearchStore } from '../../store/searchStore';

interface SmartSearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  mode?: 'flexible' | 'contract';
  showFilters?: boolean;
}

export interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  spaceType?: SpaceType;
  maxPrice?: number;
  // Contract-specific fields
  startDate?: string;
  contractDuration?: ContractTerm;
}

export default function SmartSearchBar({ onSearch, mode = 'flexible', showFilters = false }: SmartSearchBarProps) {
  const { 
    checkIn: storedCheckIn, 
    checkOut: storedCheckOut, 
    guests: storedGuests,
    spaceType: storedSpaceType, 
    setSearchFilters 
  } = useSearchStore();

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    // To avoid timezone issues, manually construct the date string
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(formatDateForInput(storedCheckIn));
  const [checkOut, setCheckOut] = useState(formatDateForInput(storedCheckOut));
  const [startDate, setStartDate] = useState('');
  const [contractDuration, setContractDuration] = useState<ContractTerm>('3-months');
  const [guests, setGuests] = useState(storedGuests);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [showExtendedFilters, setShowExtendedFilters] = useState(false);
  const [spaceType, setSpaceType] = useState<SpaceType | undefined>(storedSpaceType || undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const handleSearch = () => {
    if (mode === 'flexible') {
      setSearchFilters({
        checkIn: checkIn ? new Date(checkIn) : null,
        checkOut: checkOut ? new Date(checkOut) : null,
        guests,
        spaceType: spaceType || null,
      });

      onSearch({
        location,
        checkIn,
        checkOut,
        guests,
        spaceType,
        maxPrice
      });
    } else {
      // Contract mode
      setSearchFilters({
        checkIn: startDate ? new Date(startDate) : null,
        checkOut: null, // Not needed for contracts
        guests,
        spaceType: spaceType || null,
      });

      onSearch({
        location,
        checkIn: '',
        checkOut: '',
        guests,
        spaceType,
        maxPrice,
        startDate,
        contractDuration
      });
    }
  };

  const contractDurationOptions: { value: ContractTerm; label: string }[] = [
    { value: '1-month', label: '1 Month' },
    { value: '3-months', label: '3 Months' },
    { value: '6-months', label: '6 Months' },
    { value: '12-months', label: '12 Months' },
  ];

  const popularDestinations = [
    'Berlin',
    'Munich',
    'Hamburg',
    'Frankfurt',
    'Cologne'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="bg-white rounded-full border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <div className={`grid grid-cols-1 ${mode === 'flexible' ? 'md:grid-cols-4' : 'md:grid-cols-4'} divide-y md:divide-y-0 md:divide-x divide-gray-200`}>
          
          {/* Where */}
          <div className="p-4 rounded-l-full hover:bg-gray-50 transition-colors cursor-pointer relative">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Where
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Search destinations"
                  className="w-full text-sm text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none"
                />
              </div>
            </div>
            
            {/* Popular destinations dropdown */}
            {location && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-64">
                {popularDestinations
                  .filter(dest => dest.toLowerCase().includes(location.toLowerCase()))
                  .map(dest => (
                    <button
                      key={dest}
                      onClick={() => setLocation(dest)}
                      className="w-full text-left p-3 hover:bg-gray-50 text-sm"
                    >
                      {dest}
                    </button>
                  ))}
              </div>
            )}
          </div>

          {mode === 'flexible' ? (
            <>
              {/* Check in */}
              <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Check in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full text-sm text-gray-900 bg-transparent border-none outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Check out */}
              <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Check out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full text-sm text-gray-900 bg-transparent border-none outline-none"
                      placeholder="End date"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Start Date for contracts */}
              <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Start date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full text-sm text-gray-900 bg-transparent border-none outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Contract Duration */}
              <div className="relative p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div 
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() => setShowDurationPicker(!showDurationPicker)}
                >
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Duration
                    </label>
                    <span className="text-sm text-gray-900">
                      {contractDurationOptions.find(opt => opt.value === contractDuration)?.label}
                    </span>
                  </div>
                </div>

                {/* Duration picker dropdown */}
                {showDurationPicker && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-48">
                    <div className="p-2">
                      {contractDurationOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setContractDuration(option.value);
                            setShowDurationPicker(false);
                          }}
                          className={`w-full text-left p-3 rounded hover:bg-gray-50 text-sm transition-colors ${
                            contractDuration === option.value ? 'bg-blue-50 text-blue-700' : ''
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Who / Team Size */}
          <div className="relative p-4 rounded-r-full">
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setShowGuestPicker(!showGuestPicker)}
            >
              {mode === 'contract' ? (
                <Building className="w-5 h-5 text-gray-400" />
              ) : (
                <Users className="w-5 h-5 text-gray-400" />
              )}
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {mode === 'contract' ? 'Team size' : 'Who'}
                </label>
                <span className="text-sm text-gray-900">
                  {guests} {mode === 'contract' ? (guests === 1 ? 'person' : 'people') : (guests === 1 ? 'guest' : 'guests')}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearch();
                }}
                className={`${mode === 'contract' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-rose-500 hover:bg-rose-600'} text-white rounded-full p-3 transition-colors`}
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Guest/Team picker dropdown */}
            {showGuestPicker && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-64">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {mode === 'contract' ? 'Team members' : 'Guests'}
                    </span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                      >
                        <span className="text-gray-600">−</span>
                      </button>
                      <span className="w-8 text-center font-medium">{guests}</span>
                      <button
                        onClick={() => setGuests(Math.min(20, guests + 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                      >
                        <span className="text-gray-600">+</span>
                      </button>
                    </div>
                  </div>
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
      </div>

      {/* Filters - Only show when showFilters prop is true */}
      {showFilters && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowExtendedFilters(!showExtendedFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:border-gray-400 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>

            {/* Quick filters */}
            <div className="hidden md:flex items-center space-x-2">
              {['desk', 'hot-desk', 'private-office', 'meeting-room'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSpaceType(spaceType === type ? undefined : type as SpaceType)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    spaceType === type 
                      ? 'bg-gray-900 text-white border-gray-900' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

        {/* Price filter */}
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-sm text-gray-600">Max price:</span>
          <select
            value={maxPrice || ''}
            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="">Any</option>
            <option value="25">€25</option>
            <option value="50">€50</option>
            <option value="100">€100</option>
          </select>
        </div>
        </div>
      )}

      {/* Extended filters panel */}
      {showFilters && showExtendedFilters && (
        <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Space type */}
            <div>
              <h4 className="font-medium mb-3">Space type</h4>
              <div className="space-y-2">
                {[
                  { value: 'desk', label: 'Desk' },
                  { value: 'hot-desk', label: 'Hot Desk' },
                  { value: 'private-office', label: 'Private Office' },
                  { value: 'meeting-room', label: 'Meeting Room' }
                ].map(({ value, label }) => (
                  <label key={value} className="flex items-center">
                    <input
                      type="radio"
                      name="spaceType"
                      value={value}
                      checked={spaceType === value}
                      onChange={(e) => setSpaceType(e.target.value as SpaceType)}
                      className="mr-2"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div>
              <h4 className="font-medium mb-3">Price range</h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={maxPrice || 100}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>€10</span>
                  <span>€{maxPrice || 100}</span>
                  <span>€100+</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setSpaceType(undefined);
                setMaxPrice(undefined);
                setShowExtendedFilters(false);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear all
            </button>
            <button
              onClick={() => {
                handleSearch();
                setShowExtendedFilters(false);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
            >
              Show places
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
