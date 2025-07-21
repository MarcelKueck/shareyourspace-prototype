'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { enhancedSpaces } from '../../lib/enhanced-data';
import { SpaceType } from '../../lib/types';
import SmartSearchBar, { SearchFilters } from '../../components/ui/SmartSearchBar';
import SmartSpaceCard from '../../components/ui/SmartSpaceCard';
import { ChevronLeft, Building2, SlidersHorizontal } from 'lucide-react';
import FiltersModal from '../../components/ui/FiltersModal';

export default function ContractsPage() {
  const [searchResults, setSearchResults] = useState(enhancedSpaces);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedSpaceType, setSelectedSpaceType] = useState<SpaceType | null>(null);
  const [sortBy, setSortBy] = useState<'price' | 'capacity' | 'type'>('price');
  const [locationFilter, setLocationFilter] = useState('');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter spaces that have contracts available
  const contractSpaces = enhancedSpaces.filter(space => 
    space.contracts?.available && space.contracts.plans.length > 0
  );

  const handleSearch = useCallback((filters: SearchFilters, updateUrl = true) => {
    let filteredSpaces = enhancedSpaces.filter(space => 
      space.contracts?.available && space.contracts.plans.length > 0
    );

    // Filter by space type
    if (filters.spaceType) {
      filteredSpaces = filteredSpaces.filter(space => 
        space.contracts?.plans.some(plan => plan.spaceType === filters.spaceType)
      );
    }

    // Filter by location
    if (filters.location) {
      filteredSpaces = filteredSpaces.filter(space => 
        space.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        space.title.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by team size (guests)
    if (filters.guests && filters.guests > 1) {
      filteredSpaces = filteredSpaces.filter(space => 
        (space.maxGuests || 0) >= filters.guests
      );
    }

    // Filter by max price (monthly)
    if (filters.maxPrice) {
      filteredSpaces = filteredSpaces.filter(space => {
        const monthlyPrice = space.contracts?.plans[0]?.monthlyPrice || space.basePrice * 30;
        return monthlyPrice <= (filters.maxPrice || 0);
      });
    }
    
    // Sort results
    const sortedResults = [...filteredSpaces].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          const priceA = a.contracts?.plans[0]?.monthlyPrice || a.basePrice * 30;
          const priceB = b.contracts?.plans[0]?.monthlyPrice || b.basePrice * 30;
          return priceA - priceB;
        case 'capacity':
          return (b.maxGuests || 0) - (a.maxGuests || 0);
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });
    
    setSearchResults(sortedResults);
    setIsSearchActive(true);
    setSelectedSpaceType(filters.spaceType || null);
    setLocationFilter(filters.location || '');

    // Update URL only if requested (not during initialization)
    if (updateUrl) {
      const params = new URLSearchParams();
      if (filters.spaceType) params.set('type', filters.spaceType);
      if (filters.location) params.set('location', filters.location);
      if (filters.guests) params.set('guests', filters.guests.toString());
      if (filters.startDate) params.set('startDate', filters.startDate);
      if (filters.contractDuration) params.set('duration', filters.contractDuration);
      router.push(`/booking/contracts?${params.toString()}`);
    }
  }, [sortBy, router]);

  useEffect(() => {
    // Check if there are URL parameters to initialize search
    const type = searchParams.get('type') as SpaceType;
    const location = searchParams.get('location');
    
    if (type || location) {
      // Perform the search logic directly here to avoid infinite loops
      let filteredSpaces = enhancedSpaces.filter(space => 
        space.contracts?.available && space.contracts.plans.length > 0
      );

      // Filter by space type
      if (type) {
        filteredSpaces = filteredSpaces.filter(space => 
          space.contracts?.plans.some(plan => plan.spaceType === type)
        );
      }

      // Filter by location
      if (location) {
        filteredSpaces = filteredSpaces.filter(space => 
          space.location.toLowerCase().includes(location.toLowerCase()) ||
          space.title.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      // Sort results
      const sortedResults = [...filteredSpaces].sort((a, b) => {
        switch (sortBy) {
          case 'price':
            const priceA = a.contracts?.plans[0]?.monthlyPrice || a.basePrice * 30;
            const priceB = b.contracts?.plans[0]?.monthlyPrice || b.basePrice * 30;
            return priceA - priceB;
          case 'capacity':
            return (b.maxGuests || 0) - (a.maxGuests || 0);
          case 'type':
            return a.type.localeCompare(b.type);
          default:
            return 0;
        }
      });
      
      setSearchResults(sortedResults);
      setIsSearchActive(true);
      setSelectedSpaceType(type);
      if (location) setLocationFilter(location);
    }
  }, [searchParams, sortBy]);

  const clearSearch = () => {
    setSearchResults(contractSpaces);
    setIsSearchActive(false);
    setSelectedSpaceType(null);
    setLocationFilter('');
    router.push('/booking/contracts');
  };

  const totalResults = searchResults.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to home
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Workspace Contracts</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="py-4">
            <SmartSearchBar onSearch={handleSearch} mode="contract" showFilters={isSearchActive} />
          </div>
        </div>
      </div>

      {/* Browse Contracts - Show when no search is active */}
      {!isSearchActive && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse workspace contracts</h2>
            <p className="text-gray-600 mb-6">Long-term workspace agreements with flexible terms. Use the search bar above to filter by location, team size, and workspace type.</p>
          </div>

          {/* Default Contract Spaces Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contractSpaces.map((space) => (
              <SmartSpaceCard 
                key={space.id} 
                space={space} 
                showContracts={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Results Section */}
      {isSearchActive && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {totalResults} workspace contract{totalResults !== 1 ? 's' : ''} available
              </h2>
              <p className="text-gray-600 mt-1">
                {selectedSpaceType 
                  ? `${selectedSpaceType.replace('-', ' ')} contracts`
                  : 'Long-term workspace agreements with flexible terms'
                }
              </p>
            </div>
            {/* Sort and Filter Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFiltersModal(true)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'capacity' | 'type')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="price">Price: Low to High</option>
                <option value="capacity">Capacity: High to Low</option>
                <option value="type">Type</option>
              </select>
              <button
                onClick={clearSearch}
                className="px-4 py-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
              >
                Clear all
              </button>
            </div>
          </div>

          {/* Filter Chips */}
          {(selectedSpaceType || locationFilter) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedSpaceType && (
                <div className="flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  <span>{selectedSpaceType.replace('-', ' ')}</span>
                  <button
                    onClick={() => handleSearch({
                      location: locationFilter,
                      checkIn: '',
                      checkOut: '',
                      guests: 1,
                      spaceType: undefined,
                      startDate: '',
                      contractDuration: '3-months'
                    })}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </div>
              )}
              {locationFilter && isSearchActive && (
                <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  <span>{locationFilter}</span>
                  <button
                    onClick={() => {
                      setLocationFilter('');
                      handleSearch({
                        location: '',
                        checkIn: '',
                        checkOut: '',
                        guests: 1,
                        spaceType: selectedSpaceType || undefined,
                        startDate: '',
                        contractDuration: '3-months'
                      });
                    }}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results Grid */}
          {totalResults > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((space) => (
                <SmartSpaceCard 
                  key={space.id} 
                  space={space} 
                  showContracts={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No contracts found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or explore different workspace types.
                </p>
                <button
                  onClick={clearSearch}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Browse all contracts
                </button>
              </div>
            </div>
          )}

          {/* Filters Modal */}
          <FiltersModal
            isOpen={showFiltersModal}
            onClose={() => setShowFiltersModal(false)}
            onApplyFilters={(filters) => {
              handleSearch({ ...filters });
            }}
            mode="contract"
          />
        </div>
      )}
    </div>
  );
}
