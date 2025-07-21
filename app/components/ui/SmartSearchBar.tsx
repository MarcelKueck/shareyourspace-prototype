'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Filter, Building, Clock, Coffee, Printer, Car, Snowflake, Accessibility, PawPrint, Phone, Monitor, Zap, RefreshCw, KeyRound, Repeat } from 'lucide-react';
import { spaces as allSpaces } from '../../lib/dummy-data';
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
  const [activeField, setActiveField] = useState<'where' | 'checkin' | 'checkout' | 'guests' | null>(null);
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
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedBookingOptions, setSelectedBookingOptions] = useState<string[]>([]);
  const [filteredCount, setFilteredCount] = useState<number>(allSpaces.length);
  // --- Airbnb-style amenities and icons ---
  const amenityOptions: { label: string; icon: React.ReactNode; match: string }[] = [
    { label: 'WiFi', icon: <WifiIcon />, match: 'WiFi' },
    { label: 'Coffee', icon: <Coffee className="w-4 h-4" />, match: 'Coffee' },
    { label: 'Printer', icon: <Printer className="w-4 h-4" />, match: 'Printer' },
    { label: 'Parking', icon: <Car className="w-4 h-4" />, match: 'Parking' },
    { label: 'Kitchen', icon: <span className="w-4 h-4 inline-block">🍳</span>, match: 'Kitchen' },
    { label: 'Air Conditioning', icon: <Snowflake className="w-4 h-4" />, match: 'Air Conditioning' },
    { label: 'Wheelchair Accessible', icon: <Accessibility className="w-4 h-4" />, match: 'Wheelchair Accessible' },
    { label: 'Pet Friendly', icon: <PawPrint className="w-4 h-4" />, match: 'Pet Friendly' },
    { label: 'Phone Booth', icon: <Phone className="w-4 h-4" />, match: 'Phone Booth' },
    { label: 'Monitor', icon: <Monitor className="w-4 h-4" />, match: 'Monitor' },
  ];

  // --- Airbnb-style booking options and icons ---
  const bookingOptions: { label: string; icon: React.ReactNode; key: string }[] = [
    { label: 'Instant Book', icon: <Zap className="w-4 h-4" />, key: 'Instant Book' },
    { label: 'Free Cancellation', icon: <RefreshCw className="w-4 h-4" />, key: 'Free Cancellation' },
    { label: 'Self Check-in', icon: <KeyRound className="w-4 h-4" />, key: 'Self Check-in' },
    { label: 'Flexible Terms', icon: <Repeat className="w-4 h-4" />, key: 'Flexible Terms' },
  ];

  // --- Price histogram ---
  const priceBuckets = Array(20).fill(0);
  allSpaces.forEach(space => {
    const price = space.pricePerDay;
    const idx = Math.min(Math.floor((price - 10) / ((500 - 10) / 20)), 19);
    priceBuckets[idx]++;
  });
  const maxBucket = Math.max(...priceBuckets);

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

  // Close calendar popout on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const calendar = document.getElementById('calendar-popout');
      if (calendar && !calendar.contains(e.target as Node)) {
        setShowCalendar(false);
        setActiveField(null);
      }
    }
    if (showCalendar) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showCalendar]);

  // Only add to recent searches when a real search is performed
  const addRecentSearch = (search: string) => {
    if (!search) return;
    setRecentSearches((prev) => {
      if (prev[0] === search) return prev; // Don't duplicate if already most recent
      const filtered = prev.filter((item) => item !== search);
      return [search, ...filtered].slice(0, 3);
    });
  };

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

  // Close guest/team picker on outside click
  const guestPickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (guestPickerRef.current && !guestPickerRef.current.contains(e.target as Node)) {
        setShowGuestPicker(false);
      }
    }
    if (showGuestPicker) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showGuestPicker]);

  // Add ref for duration picker
  const durationPickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (durationPickerRef.current && !durationPickerRef.current.contains(e.target as Node)) {
        setShowDurationPicker(false);
      }
    }
    if (showDurationPicker) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showDurationPicker]);

  // --- Filtering logic ---
  const filterSpaces = () => {
    let filtered = allSpaces;
    if (location.trim()) {
      filtered = filtered.filter(s => s.location.toLowerCase().includes(location.trim().toLowerCase()));
    }
    if (spaceType) {
      filtered = filtered.filter(s => s.type.toLowerCase().replace(/ /g, '-') === spaceType);
    }
    if (maxPrice) {
      filtered = filtered.filter(s => s.pricePerDay <= maxPrice);
    }
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(s => selectedAmenities.every(a => s.amenities.some(sa => sa.toLowerCase().includes(a.toLowerCase()))));
    }
    // Booking options: for demo, just filter by amenities containing the option (simulate)
    if (selectedBookingOptions.length > 0) {
      filtered = filtered.filter(s => selectedBookingOptions.every(opt => s.amenities.some(a => a.toLowerCase().includes(opt.toLowerCase()))));
    }
    setFilteredCount(filtered.length);
    return filtered;
  };

  // --- Wifi icon fallback ---
  function WifiIcon() {
    return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13a10 10 0 0114 0M8.5 16.5a5 5 0 017 0M12 20h.01" /></svg>;
  }

  // Remove overlay for modal (Airbnb style)
  // ---
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="bg-white rounded-full border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <div className={`grid grid-cols-1 ${mode === 'flexible' ? 'md:grid-cols-4' : 'md:grid-cols-4'} divide-y md:divide-y-0 md:divide-x divide-gray-200`}>
          {/* Where and Date/Contract Section */}
          <div className="md:col-span-3 flex">
            {/* Where */}
            <div
              className={`flex-1 p-4 rounded-l-full transition-colors cursor-pointer relative ${activeField === 'where' ? 'ring-2 ring-rose-400 bg-rose-50' : 'hover:bg-gray-50'}`}
              onClick={() => { setShowLocationPopout(true); setActiveField('where'); }}
            >
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
                    onFocus={() => { setShowLocationPopout(true); setActiveField('where'); }}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && location.trim()) {
                        addRecentSearch(location.trim());
                        setShowLocationPopout(false);
                        setActiveField(null);
                        handleSearch();
                      }
                    }}
                    placeholder="Search destinations"
                    className="w-full text-sm text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none"
                  />
                </div>
              </div>
              {/* Airbnb-style popout */}
              {showLocationPopout && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-20 w-[420px] p-0 animate-fade-in">
                  {/* Recent searches section always visible at the top */}
                  <div className="p-4 pb-0">
                    <div className="text-xs text-gray-500 font-semibold mb-2">Recent searches</div>
                    {recentSearches.length > 0 ? (
                      recentSearches.map((item, idx) => (
                        <button
                          key={item + idx}
                        onClick={() => {
                          setLocation(item);
                          addRecentSearch(item);
                          setShowLocationPopout(false);
                          setActiveField(null);
                          handleSearch();
                        }}
                          className="flex items-center w-full p-2 rounded-lg hover:bg-gray-50 mb-1"
                        >
                          <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                          <div className="flex flex-col text-left">
                            <span className="text-sm text-gray-900 font-medium">{item}</span>
                            <span className="text-xs text-gray-500">Recent search</span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-xs text-gray-400 italic mb-2">No recent searches</div>
                    )}
                  </div>
                  {/* Suggested destinations (scrollable) */}
                  <div className="max-h-56 overflow-y-auto p-4 pt-2 custom-scrollbar">
                    <div className="text-xs text-gray-500 font-semibold mb-2">Suggested destinations</div>
                    {suggestedDestinations.map((dest, idx) => (
                      <button
                        key={dest.label + idx}
                        onClick={() => {
                          setLocation(dest.label);
                          addRecentSearch(dest.label);
                          setShowLocationPopout(false);
                          setActiveField(null);
                          handleSearch();
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
            {/* Separator between Where and Check in */}
            <div className="w-px bg-gray-200 mx-0.5 hidden md:block self-stretch" />
            {/* Date/Contract Section */}
            <div className="flex-1 flex min-w-0">
              {mode === 'flexible' ? (
                <div className="relative flex w-full" style={{ minWidth: 0 }}>
                  {/* Check in field */}
                  <div
                    className={`flex-1 p-4 border-r border-gray-200 transition-colors cursor-pointer relative z-10 ${activeField === 'checkin' ? 'ring-2 ring-rose-400 bg-rose-50' : 'hover:bg-gray-50'}`}
                    style={{ transition: 'box-shadow 0.2s, background 0.2s' }}
                    onClick={() => {
                      setShowExtendedFilters(false);
                      setActiveField('checkin');
                      setShowCalendar(true);
                    }}
                  >
                    <div className="flex items-center space-x-3 cursor-pointer">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Check in</label>
                        <span className="text-sm text-gray-900">
                          {checkIn ? new Date(checkIn).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Add date'}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Check out field */}
                  <div
                    className={`flex-1 p-4 transition-colors cursor-pointer relative z-10 ${activeField === 'checkout' ? 'ring-2 ring-rose-400 bg-rose-50' : 'hover:bg-gray-50'}`}
                    style={{ transition: 'box-shadow 0.2s, background 0.2s' }}
                    onClick={() => {
                      setShowExtendedFilters(false);
                      setActiveField('checkout');
                      setShowCalendar(true);
                    }}
                  >
                    <div className="flex items-center space-x-3 cursor-pointer">
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
                      selectingField={activeField === 'checkout' ? 'checkout' : 'checkin'}
                      onSelectRange={(start, end) => {
                        setCheckIn(start);
                        setCheckOut(end);
                        setActiveField('checkout');
                        setTimeout(() => setActiveField(null), 300); // Smooth transition
                        setShowCalendar(false);
                      }}
                      onSelectCheckIn={(start) => {
                        if (activeField === 'checkout') {
                          setCheckOut(start);
                        } else {
                          setCheckIn(start);
                          // Auto-select next day for check-out if not already set
                          if (!checkOut || new Date(start) >= new Date(checkOut)) {
                            const nextDay = new Date(start);
                            nextDay.setDate(nextDay.getDate() + 1);
                            setCheckOut(nextDay.toISOString().split('T')[0]);
                          }
                          setActiveField('checkout');
                        }
                      }}
                    />
                  )}
                </div>
              ) : (
                <>
                  {/* Start Date for contracts */}
                  <div className="flex items-stretch min-w-0 w-full">
                    <div
                      className={`flex-1 p-4 transition-colors cursor-pointer relative z-10 ${activeField === 'checkin' ? 'ring-2 ring-rose-400 bg-rose-50' : 'hover:bg-gray-50'}`}
                      onClick={() => {
                        setShowExtendedFilters(false);
                        setActiveField('checkin');
                        setShowCalendar(true);
                      }}
                      style={{ minWidth: 0 }}
                    >
                      <div className="flex items-center space-x-3 cursor-pointer">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Start date</label>
                          <span className="text-sm text-gray-900 truncate block">
                            {startDate ? new Date(startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Add date'}
                          </span>
                        </div>
                      </div>
                      {/* Calendar Popout for contract start date */}
                      {typeof window !== 'undefined' && showCalendar && activeField === 'checkin' && (
                        <CalendarPopout
                          show={showCalendar}
                          onClose={() => setShowCalendar(false)}
                          checkIn={startDate}
                          checkOut={startDate}
                          selectingField="checkin"
                          onSelectRange={(start) => {
                            setStartDate(start);
                            setActiveField(null);
                            setShowCalendar(false);
                          }}
                          onSelectCheckIn={(start) => {
                            setStartDate(start);
                            setActiveField(null);
                            setShowCalendar(false);
                          }}
                        />
                      )}
                    </div>
                    {/* Separator */}
                    <div className="w-px bg-gray-200 mx-0.5 self-stretch" />
                    {/* Contract Duration */}
                    <div ref={durationPickerRef} className="flex-1 relative p-4 hover:bg-gray-50 transition-colors cursor-pointer min-w-0">
                      <div 
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => setShowDurationPicker(!showDurationPicker)}
                      >
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Duration
                          </label>
                          <span className="text-sm text-gray-900 truncate block">
                            {contractDurationOptions.find(opt => opt.value === contractDuration)?.label}
                          </span>
                        </div>
                      </div>

                      {/* Duration picker dropdown - Airbnb/Calendar style */}
                      {showDurationPicker && (
                        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-30 w-64 min-w-max animate-fade-in" style={{ fontFamily: 'inherit' }}>
                          <div className="flex flex-col py-2">
                            {contractDurationOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setContractDuration(option.value);
                                  setShowDurationPicker(false);
                                }}
                                className={`w-full text-left px-5 py-3 rounded-xl transition-colors text-base font-semibold
                                  ${contractDuration === option.value ? 'bg-rose-100 text-rose-700' : 'text-gray-900 hover:bg-gray-100'}
                                `}
                                style={{ fontFamily: 'inherit', boxShadow: 'none', outline: 'none', border: 'none', background: 'none' }}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Who / Team Size */}
          <div
            className={`flex-1 p-4 rounded-r-full transition-colors cursor-pointer relative ${activeField === 'guests' ? 'ring-2 ring-rose-400 bg-rose-50 z-10' : 'hover:bg-gray-50'}`}
            onClick={() => { setShowGuestPicker(!showGuestPicker); setActiveField('guests'); }}
          >
            <div className="flex items-center space-x-3">
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
                  addRecentSearch(location.trim());
                  handleSearch();
                }}
                className={`${mode === 'contract' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-rose-500 hover:bg-rose-600'} text-white rounded-full p-3 transition-colors`}
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Guest/Team picker dropdown */}
            {showGuestPicker && (
              <div ref={guestPickerRef} className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-64">
                <div className="p-4">
                  <div className="flex flex-col items-center justify-between">
                    <span className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide">
                      {mode === 'contract' ? 'Team members' : 'Guests'}
                    </span>
                    <div className="flex items-center space-x-3 mb-2">
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={e => {
                          e.stopPropagation();
                          setGuests(Math.max(1, guests - 1));
                        }}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 text-base font-semibold text-gray-700 bg-gray-50"
                      >
                        <span>−</span>
                      </button>
                      <span className="w-10 text-center font-semibold text-base text-gray-900">{guests}</span>
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={e => {
                          e.stopPropagation();
                          setGuests(Math.min(20, guests + 1));
                        }}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 text-base font-semibold text-gray-700 bg-gray-50"
                      >
                        <span>+</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters Button - always visible, styled like Airbnb */}
      <div className="flex items-center justify-end mt-4">
        <button
          onClick={() => setShowExtendedFilters(!showExtendedFilters)}
          className="flex items-center justify-center bg-white border border-gray-300 shadow-md rounded-full px-4 py-2 hover:shadow-lg transition-all text-gray-700 text-base font-semibold"
          style={{ minWidth: 48 }}
        >
          {/* Use a modern filter icon, e.g. Lucide's SlidersHorizontal or similar */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="mr-2 text-rose-500"><path strokeLinecap="round" strokeLinejoin="round" d="M21 6.75H3M21 12H8M21 17.25H13" /><circle cx="8" cy="6.75" r="2" stroke="currentColor" strokeWidth="2" /><circle cx="13" cy="17.25" r="2" stroke="currentColor" strokeWidth="2" /></svg>
          <span>Filters</span>
        </button>
      </div>

      {/* Fancy Extended Filters Panel - Airbnb inspired */}
      {showExtendedFilters && (
        <div className="fixed left-0 right-0 top-0 bottom-0 z-40 pointer-events-none">
          <div
            className="absolute left-1/2 top-24 -translate-x-1/2 z-50 bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-auto p-8 animate-fade-in pointer-events-auto overflow-y-auto"
            style={{ maxHeight: 'calc(100vh - 6rem)' }}
            onWheel={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={() => setShowExtendedFilters(false)}
              aria-label="Close filters"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Filters</h2>
            {/* Type of space */}
            <div className="mb-6">
              <div className="font-semibold text-gray-700 mb-2">Type of space</div>
              <div className="flex gap-3 flex-wrap">
                {['Desk', 'Hot Desk', 'Private Office', 'Meeting Room', 'Coworking', 'Event Space'].map((type, i) => (
                  <button
                    key={type}
                    onClick={() => setSpaceType(spaceType === type.toLowerCase().replace(/ /g, '-') ? undefined : type.toLowerCase().replace(/ /g, '-') as SpaceType)}
                    className={`px-4 py-2 rounded-full border flex items-center gap-2 transition-colors text-sm font-medium ${spaceType === type.toLowerCase().replace(/ /g, '-') ? 'bg-rose-500 text-white border-rose-500' : 'border-gray-300 text-gray-700 hover:border-rose-400'}`}
                  >
                    {/* Icon for each type */}
                    {i === 0 && <Users className="w-4 h-4" />} {i === 1 && <Users className="w-4 h-4" />} {i === 2 && <Building className="w-4 h-4" />} {i === 3 && <Calendar className="w-4 h-4" />} {i === 4 && <Building className="w-4 h-4" />} {i === 5 && <Calendar className="w-4 h-4" />}
                    {type}
                  </button>
                ))}
              </div>
            </div>
            {/* Price range with histogram */}
            <div className="mb-6">
              <div className="font-semibold text-gray-700 mb-2">Price range (per day)</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-end gap-1 h-16 w-full mb-2">
                  {priceBuckets.map((count, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end">
                      <div style={{ height: `${count && maxBucket ? (count / maxBucket) * 48 : 2}px` }} className={`w-2 rounded-t bg-rose-400 transition-all duration-200 ${count === maxBucket ? 'bg-rose-500' : ''}`}></div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={10}
                    max={500}
                    value={maxPrice || 500}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                  <span className="text-gray-700 font-semibold">€{maxPrice || 500}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>€10</span>
                  <span>€500+</span>
                </div>
              </div>
            </div>
            {/* Amenities */}
            <div className="mb-6">
              <div className="font-semibold text-gray-700 mb-2">Amenities</div>
              <div className="flex gap-2 flex-wrap">
                {amenityOptions.map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedAmenities(selectedAmenities.includes(opt.label) ? selectedAmenities.filter(a => a !== opt.label) : [...selectedAmenities, opt.label])}
                    className={`px-3 py-2 rounded-full border flex items-center gap-2 text-sm font-medium ${selectedAmenities.includes(opt.label) ? 'bg-rose-500 text-white border-rose-500' : 'border-gray-300 text-gray-700 hover:bg-rose-50'}`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Booking options */}
            <div className="mb-6">
              <div className="font-semibold text-gray-700 mb-2">Booking options</div>
              <div className="flex gap-2 flex-wrap">
                {bookingOptions.map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedBookingOptions(selectedBookingOptions.includes(opt.label) ? selectedBookingOptions.filter(o => o !== opt.label) : [...selectedBookingOptions, opt.label])}
                    className={`px-3 py-2 rounded-full border flex items-center gap-2 text-sm font-medium ${selectedBookingOptions.includes(opt.label) ? 'bg-rose-500 text-white border-rose-500' : 'border-gray-300 text-gray-700 hover:bg-rose-50'}`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-8">
              <button
                className="text-gray-500 hover:underline text-base font-semibold px-3 py-2 rounded focus:outline-none"
                onClick={() => {
                  setSpaceType(undefined);
                  setMaxPrice(undefined);
                  setSelectedAmenities([]);
                  setSelectedBookingOptions([]);
                }}
              >
                Clear all
              </button>
              <button
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 rounded-full text-lg shadow-lg transition-all"
                onClick={() => {
                  setShowExtendedFilters(false);
                  const filtered = filterSpaces();
                  setFilteredCount(filtered.length);
                  // Optionally, trigger a search with the filtered results
                  handleSearch();
                }}
              >
                Show {filteredCount} results
              </button>
            </div>
          </div>
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
  selectingField?: 'checkin' | 'checkout';
  onSelectRange: (start: string, end: string) => void;
  onSelectCheckIn: (start: string) => void;
};

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function pad(num: number): string {
  return num.toString().padStart(2, '0');
}

const CalendarPopout: React.FC<CalendarPopoutProps> = ({ show, onClose, checkIn, checkOut, selectingField = 'checkin', onSelectRange, onSelectCheckIn }) => {
  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(today.getFullYear());
  const [selecting, setSelecting] = useState<'checkin' | 'checkout'>(selectingField);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  // Determine if single-date mode (contract) or range mode (flexible)
  const isSingleDateMode = checkIn === checkOut;

  // Update selecting when prop changes
  useEffect(() => {
    setSelecting(selectingField);
  }, [selectingField]);

  useEffect(() => {
    if (show) {
      setMonth(today.getMonth());
      setYear(today.getFullYear());
      setHoveredDate(null);
      setSelecting(selectingField);
    }
    // eslint-disable-next-line
  }, [show, selectingField]);

  if (!show) return null;

  // Build calendar grid
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const days: (string | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(`${year}-${pad(month + 1)}-${pad(d)}`);
  }

  // --- Single-date mode (contract) ---
  if (isSingleDateMode) {
    // Only one circle, no range, no hover highlight
    const isSelected = (date: string) => date === checkIn;
    const isPast = (date: string) => {
      const dateObj = new Date(date);
      return dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    };
    return (
      <div id="calendar-popout" className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-30 w-[420px] p-6 animate-fade-in" style={{ minWidth: 320 }}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setMonth(month === 0 ? 11 : month - 1)} className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-800 font-bold text-lg">&#8592;</button>
          <div className="font-bold text-xl text-gray-900 drop-shadow-sm">{new Date(year, month).toLocaleString(undefined, { month: 'long' })} {year}</div>
          <button onClick={() => setMonth(month === 11 ? 0 : month + 1)} className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-800 font-bold text-lg">&#8594;</button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2 text-xs text-gray-600 font-semibold">
          {['S','M','T','W','T','F','S'].map((d, i) => <div key={d + i} className="text-center">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, idx) => date ? (
            <button
              key={date}
              onClick={() => !isPast(date) && onSelectCheckIn(date)}
              className={`aspect-square w-9 rounded-full text-sm font-medium transition-all duration-100
                ${isPast(date) ? 'text-gray-400 line-through cursor-not-allowed bg-gray-50' :
                  isSelected(date) ? 'bg-rose-500 text-white shadow-lg ring-2 ring-rose-400' :
                  'text-gray-900 hover:bg-rose-50 hover:ring-2 hover:ring-rose-300'}
              `}
              disabled={isPast(date)}
            >
              {Number(date.split('-')[2])}
            </button>
          ) : <div key={idx} />)}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button onClick={onClose} className="text-gray-700 hover:underline text-base font-semibold px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-rose-400">Cancel</button>
        </div>
      </div>
    );
  }

  // --- Range mode (flexible) ---
  // Range highlight logic
  const isInRange = (date: string) => {
    if (selecting === 'checkout' && checkIn && hoveredDate && hoveredDate > checkIn) {
      return date > checkIn && date < hoveredDate;
    }
    if (!checkIn || !checkOut) return false;
    return date > checkIn && date < checkOut;
  };
  const isStart = (date: string) => {
    if (selecting === 'checkout' && checkIn && hoveredDate) return date === checkIn;
    return date === checkIn;
  };
  const isEnd = (date: string) => {
    if (selecting === 'checkout' && checkIn && hoveredDate) return date === hoveredDate;
    return date === checkOut;
  };

  function handleDayClick(date: string) {
    if (selecting === 'checkin') {
      onSelectCheckIn(date);
      setSelecting('checkout');
      setHoveredDate(null);
    } else {
      if (date > checkIn) {
        onSelectRange(checkIn, date);
        setSelecting('checkin');
        setHoveredDate(null);
      } else {
        onSelectCheckIn(date);
        setSelecting('checkout');
        setHoveredDate(null);
      }
    }
  }

  // Helper: is date in the past
  const isPast = (date: string) => {
    const dateObj = new Date(date);
    return dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  return (
    <div id="calendar-popout" className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-30 w-[420px] p-6 animate-fade-in" style={{ minWidth: 320 }}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setMonth(month === 0 ? 11 : month - 1)} className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-800 font-bold text-lg">&#8592;</button>
        <div className="font-bold text-xl text-gray-900 drop-shadow-sm">{new Date(year, month).toLocaleString(undefined, { month: 'long' })} {year}</div>
        <button onClick={() => setMonth(month === 11 ? 0 : month + 1)} className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-800 font-bold text-lg">&#8594;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2 text-xs text-gray-600 font-semibold">
        {['S','M','T','W','T','F','S'].map((d, i) => <div key={d + i} className="text-center">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) => date ? (
          <button
            key={date}
            onClick={() => !isPast(date) && handleDayClick(date)}
            onMouseEnter={() => selecting === 'checkout' && setHoveredDate(date)}
            // Do not reset hoveredDate on mouse leave, so the highlight stays on the last hovered date
            className={`aspect-square w-9 rounded-full text-sm font-medium transition-all duration-100
              ${isPast(date) ? 'text-gray-400 line-through cursor-not-allowed bg-gray-50' :
                isStart(date) || isEnd(date) ? 'bg-rose-500 text-white shadow-lg ring-2 ring-rose-400' :
                isInRange(date) ? 'bg-rose-100 text-rose-700' :
                'text-gray-900 hover:bg-rose-50 hover:ring-2 hover:ring-rose-300'}
            `}
            disabled={isPast(date)}
          >
            {Number(date.split('-')[2])}
          </button>
        ) : <div key={idx} />)}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button onClick={onClose} className="text-gray-700 hover:underline text-base font-semibold px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-rose-400">Cancel</button>
        <div className="flex gap-2">
          {[1,2,3,7,14].map(n => (
            <button
              key={n}
              className="px-2 py-1 text-xs rounded-full border border-gray-300 hover:bg-gray-100 font-semibold text-gray-700"
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
