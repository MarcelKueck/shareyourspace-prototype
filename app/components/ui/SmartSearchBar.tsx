'use client';

import { useState, useRef, useEffect } from 'react';
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
  // Calendar popout state
  const [showCalendar, setShowCalendar] = useState(false);
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
  const [showLocationPopout, setShowLocationPopout] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  // Airbnb-style suggested destinations for the popout
  const suggestedDestinations: { label: string; icon: React.ReactNode; sub: string; isNearby?: boolean }[] = [
    { label: 'Nearby', icon: <MapPin className="w-5 h-5 text-blue-500" />, sub: "Find what's around you", isNearby: true },
    { label: 'Berlin', icon: <Building className="w-5 h-5 text-orange-500" />, sub: 'Popular city' },
    { label: 'Munich', icon: <Building className="w-5 h-5 text-orange-500" />, sub: 'Popular city' },
    { label: 'Hamburg', icon: <Building className="w-5 h-5 text-orange-500" />, sub: 'Popular city' },
    { label: 'Frankfurt', icon: <Building className="w-5 h-5 text-orange-500" />, sub: 'Popular city' },
    { label: 'Cologne', icon: <Building className="w-5 h-5 text-orange-500" />, sub: 'Popular city' },
  ];
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
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

  // Remove unused popularDestinations

  // Geolocation for "Nearby"
  useEffect(() => {
    if (showLocationPopout && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setUserLocation('Your current location');
        },
        () => {
          setUserLocation(null);
        }
      );
    }
  }, [showLocationPopout]);

  // Save recent searches
  useEffect(() => {
    if (location && !recentSearches.includes(location)) {
      setRecentSearches((prev) => [location, ...prev.slice(0, 2)]);
    }
    // eslint-disable-next-line
  }, [location]);

  // Close popout on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (locationInputRef.current && !locationInputRef.current.contains(e.target as Node)) {
        setShowLocationPopout(false);
      }
    }
    if (showLocationPopout) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showLocationPopout]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="bg-white rounded-full border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <div className={`grid grid-cols-1 ${mode === 'flexible' ? 'md:grid-cols-4' : 'md:grid-cols-4'} divide-y md:divide-y-0 md:divide-x divide-gray-200`}>
          {/* Where and Date/Contract Section */}
          <div className="md:col-span-3 flex">
            {/* Where */}
            <div className="flex-1 p-4 rounded-l-full hover:bg-gray-50 transition-colors cursor-pointer relative" onClick={() => setShowLocationPopout(true)}>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Where
                  </label>
                  <input
                    ref={locationInputRef}
                    type="text"
                    value={location}
                    onFocus={() => setShowLocationPopout(true)}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Search destinations"
                    className="w-full text-sm text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none"
                  />
                </div>
              </div>
              {/* Airbnb-style popout */}
              {showLocationPopout && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-20 w-80 p-4 animate-fade-in">
                  {/* Recent searches */}
                  {recentSearches.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 font-semibold mb-2">Recent searches</div>
                      {recentSearches.map((item, idx) => (
                        <button
                          key={item + idx}
                          onClick={() => setLocation(item)}
                          className="flex items-center w-full p-2 rounded-lg hover:bg-gray-50 mb-1"
                        >
                          <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                          <div className="flex flex-col text-left">
                            <span className="text-sm text-gray-900 font-medium">{item}</span>
                            <span className="text-xs text-gray-500">Recent search</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Suggested destinations */}
                  <div>
                    <div className="text-xs text-gray-500 font-semibold mb-2">Suggested destinations</div>
                    {suggestedDestinations.map((dest, idx) => (
                      <button
                        key={dest.label + idx}
                        onClick={() => {
                          if (dest.isNearby && userLocation) setLocation(userLocation);
                          else setLocation(dest.label);
                          setShowLocationPopout(false);
                        }}
                        className="flex items-center w-full p-2 rounded-lg hover:bg-gray-50 mb-1"
                      >
                        {dest.icon}
                        <div className="flex flex-col text-left ml-3">
                          <span className="text-sm text-gray-900 font-medium">{dest.label}</span>
                          <span className="text-xs text-gray-500">{dest.isNearby && userLocation ? userLocation : dest.sub}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Date/Contract Section */}
            <div className="flex-1">
              {mode === 'flexible' ? (
                <div className="relative flex" style={{ minWidth: 0 }}>
                  <div
                    className="flex-1 p-4 hover:bg-gray-50 transition-colors cursor-pointer border-r border-gray-200"
                    onClick={() => setShowExtendedFilters(false)}
                  >
                    <div className="flex items-center space-x-3" onClick={() => setShowCalendar(true)}>
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Check in</label>
                        <span className="text-sm text-gray-900">
                          {checkIn ? new Date(checkIn).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Add date'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex-1 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setShowExtendedFilters(false)}
                  >
                    <div className="flex items-center space-x-3" onClick={() => setShowCalendar(true)}>
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Check out</label>
                        <span className="text-sm text-gray-900">
                          {checkOut ? new Date(checkOut).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Add date'}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Calendar Popout */}
                  {typeof window !== 'undefined' && (
                    <CalendarPopout
                      show={showCalendar}
                      onClose={() => setShowCalendar(false)}
                      checkIn={checkIn}
                      checkOut={checkOut}
                      onSelectRange={(start, end) => {
                        setCheckIn(start);
                        setCheckOut(end);
                        setShowCalendar(false);
                      }}
                      onSelectCheckIn={(start) => {
                        setCheckIn(start);
                        // Auto-select next day for check-out
                        const nextDay = new Date(start);
                        nextDay.setDate(nextDay.getDate() + 1);
                        setCheckOut(nextDay.toISOString().split('T')[0]);
                      }}
                    />
                  )}
                </div>
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
            </div>
          </div>

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
        {/* ...existing code for extended filters... */}
        </div>
      )}
    </div>
  );
}

// --- Custom Calendar Popout Component ---
// Place these helpers and the CalendarPopout component at the very end of the file, after all other code.

type CalendarPopoutProps = {
  show: boolean;
  onClose: () => void;
  checkIn: string;
  checkOut: string;
  onSelectRange: (start: string, end: string) => void;
  onSelectCheckIn: (start: string) => void;
};

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function pad(num: number): string {
  return num.toString().padStart(2, '0');
}

function CalendarPopout({ show, onClose, checkIn, checkOut, onSelectRange, onSelectCheckIn }: CalendarPopoutProps) {
  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(today.getFullYear());
  const [selecting, setSelecting] = useState<'checkin' | 'checkout'>('checkin');

  useEffect(() => {
    if (show) {
      setMonth(today.getMonth());
      setYear(today.getFullYear());
      setSelecting('checkin');
    }
    // eslint-disable-next-line
  }, [show]);

  if (!show) return null;

  // Build calendar grid
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const days: (string | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(`${year}-${pad(month + 1)}-${pad(d)}`);
  }

  // Range highlight logic
  const isInRange = (date: string) => {
    if (!checkIn || !checkOut) return false;
    return date > checkIn && date < checkOut;
  };
  const isStart = (date: string) => date === checkIn;
  const isEnd = (date: string) => date === checkOut;

  function handleDayClick(date: string) {
    if (selecting === 'checkin') {
      onSelectCheckIn(date);
      setSelecting('checkout');
    } else {
      if (date > checkIn) {
        onSelectRange(checkIn, date);
        setSelecting('checkin');
      } else {
        onSelectCheckIn(date);
        setSelecting('checkout');
      }
    }
  }

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-30 w-[420px] p-6 animate-fade-in" style={{ minWidth: 320 }}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setMonth(month === 0 ? 11 : month - 1)} className="p-2 rounded hover:bg-gray-100">&#8592;</button>
        <div className="font-semibold text-lg">{new Date(year, month).toLocaleString(undefined, { month: 'long' })} {year}</div>
        <button onClick={() => setMonth(month === 11 ? 0 : month + 1)} className="p-2 rounded hover:bg-gray-100">&#8594;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2 text-xs text-gray-500">
        {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-center">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) => date ? (
          <button
            key={date}
            onClick={() => handleDayClick(date)}
            className={`aspect-square w-9 rounded-full text-sm font-medium
              ${isStart(date) || isEnd(date) ? 'bg-rose-500 text-white shadow-lg' :
                isInRange(date) ? 'bg-rose-100 text-rose-700' :
                'text-gray-900 hover:bg-gray-100'}
            `}
            disabled={date < today.toISOString().split('T')[0]}
          >
            {Number(date.split('-')[2])}
          </button>
        ) : <div key={idx} />)}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button onClick={onClose} className="text-gray-500 hover:underline text-sm">Cancel</button>
        <div className="flex gap-2">
          {[1,2,3,7,14].map(n => (
            <button
              key={n}
              className="px-2 py-1 text-xs rounded-full border border-gray-300 hover:bg-gray-100"
              onClick={() => {
                const start = today.toISOString().split('T')[0];
                const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + n).toISOString().split('T')[0];
                onSelectRange(start, end);
                onClose();
              }}
            >
              {n === 1 ? 'Exact dates' : `± ${n} day${n > 1 ? 's' : ''}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
