'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { enhancedSpaces, searchSpaces } from '../../lib/enhanced-data';
import SmartSearchBar, { SearchFilters } from '../../components/ui/SmartSearchBar';
import SmartSpaceCard from '../../components/ui/SmartSpaceCard';
import FiltersModal from '../../components/ui/FiltersModal';
import { ChevronLeft, MapPin } from 'lucide-react';

export default function FlexibleBookingPage() {
  const [searchResults, setSearchResults] = useState(enhancedSpaces);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('price');
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useCallback((filters: SearchFilters, updateUrl = true) => {
    const results = searchSpaces(
      enhancedSpaces,
      filters.location || undefined,
      filters.checkIn ? new Date(filters.checkIn) : undefined,
      filters.checkOut ? new Date(filters.checkOut) : undefined,
      filters.guests || undefined,
      filters.maxPrice || undefined,
      filters.spaceType || undefined
    );
    
    // Sort results
    const sortedResults = [...results].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.basePrice - b.basePrice;
        case 'rating':
          // Use a mock rating calculation based on price and capacity
          const ratingA = Math.min(5, Math.max(3, 5 - (a.basePrice / 100)));
          const ratingB = Math.min(5, Math.max(3, 5 - (b.basePrice / 100)));
          return ratingB - ratingA;
        case 'distance':
          // Mock distance sorting - in real app this would use actual coordinates
          return Math.random() - 0.5;
        default:
          return 0;
      }
    });
    
    setSearchResults(sortedResults);
    setIsSearchActive(true);

    // Update URL with search parameters only if requested
    if (updateUrl) {
      const params = new URLSearchParams();
      if (filters.location) params.set('location', filters.location);
      if (filters.checkIn) params.set('checkIn', filters.checkIn);
      if (filters.checkOut) params.set('checkOut', filters.checkOut);
      if (filters.guests) params.set('guests', filters.guests.toString());
      
      router.push(`/booking/flexible?${params.toString()}`);
    }
  }, [sortBy, router]);

  useEffect(() => {
    // Check if there are URL parameters to initialize search
    const location = searchParams.get('location');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests');
    
    if (location || checkIn || checkOut || guests) {
      // Perform search logic directly here to avoid infinite loops
      const results = searchSpaces(
        enhancedSpaces,
        location || undefined,
        checkIn ? new Date(checkIn) : undefined,
        checkOut ? new Date(checkOut) : undefined,
        guests ? parseInt(guests) : undefined,
        undefined,
        undefined
      );
      
      // Sort results
      const sortedResults = [...results].sort((a, b) => {
        switch (sortBy) {
          case 'price':
            return a.basePrice - b.basePrice;
          case 'rating':
            // Use a mock rating calculation based on price and capacity
            const ratingA = Math.min(5, Math.max(3, 5 - (a.basePrice / 100)));
            const ratingB = Math.min(5, Math.max(3, 5 - (b.basePrice / 100)));
            return ratingB - ratingA;
          case 'distance':
            // Mock distance sorting - in real app this would use actual coordinates
            return Math.random() - 0.5;
          default:
            return 0;
        }
      });
      
      setSearchResults(sortedResults);
      setIsSearchActive(true);
    }
  }, [searchParams, sortBy]);

  const clearSearch = () => {
    setSearchResults(enhancedSpaces);
    setIsSearchActive(false);
    router.push('/booking/flexible');
  };

  const totalResults = searchResults.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="flex items-center py-4 border-b border-gray-200">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to home
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Flexible Workspace Booking</h1>
          </div>

          {/* Search Bar */}
          <div className="py-4">
            <SmartSearchBar onSearch={handleSearch} mode="flexible" showFilters={isSearchActive} />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isSearchActive ? (
          <>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {totalResults} space{totalResults !== 1 ? 's' : ''} available
                </h2>
                <p className="text-gray-600 mt-1">
                  Book flexible workspaces by the hour, day, or week
                </p>
              </div>
              
              {/* Sort Controls Only (Filters removed) */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold text-gray-700 bg-white shadow hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={() => {
                      const dropdown = document.getElementById('sort-dropdown');
                      if (dropdown) dropdown.classList.toggle('hidden');
                    }}
                  >
                    <span className="mr-2">Sort by:</span>
                    {sortBy === 'price' && <span className="font-bold">Price: Low to High</span>}
                    {sortBy === 'rating' && <span className="font-bold">Rating: High to Low</span>}
                    {sortBy === 'distance' && <span className="font-bold">Distance</span>}
                    <svg className="ml-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div id="sort-dropdown" className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-30 hidden">
                    <button
                      onClick={() => { setSortBy('price'); document.getElementById('sort-dropdown')?.classList.add('hidden'); }}
                      className={`block w-full text-left px-5 py-3 text-sm rounded-t-xl ${sortBy === 'price' ? 'bg-gray-100 text-gray-900 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                    >
                      Price: Low to High
                    </button>
                    <button
                      onClick={() => { setSortBy('rating'); document.getElementById('sort-dropdown')?.classList.add('hidden'); }}
                      className={`block w-full text-left px-5 py-3 text-sm ${sortBy === 'rating' ? 'bg-gray-100 text-gray-900 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                    >
                      Rating: High to Low
                    </button>
                    <button
                      onClick={() => { setSortBy('distance'); document.getElementById('sort-dropdown')?.classList.add('hidden'); }}
                      className={`block w-full text-left px-5 py-3 text-sm rounded-b-xl ${sortBy === 'distance' ? 'bg-gray-100 text-gray-900 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                    >
                      Distance
                    </button>
                  </div>
                </div>
                <button
                  onClick={clearSearch}
                  className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Clear all
                </button>
              </div>
            </div>

            {/* Results Grid */}
            {totalResults > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((space) => (
                  <SmartSpaceCard 
                    key={space.id} 
                    space={space} 
                    showContracts={false}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No spaces found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or explore different locations.
                  </p>
                  <button
                    onClick={clearSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Browse all spaces
                  </button>
                </div>
              </div>
            )}

            <FiltersModal
              isOpen={showFiltersModal}
              onClose={() => setShowFiltersModal(false)}
              onApplyFilters={(filters) => {
                // Ensure all required SearchFilters fields are present and spaceType is not null
                const { spaceType, ...rest } = filters;
                handleSearch({
                  location: '',
                  checkIn: '',
                  checkOut: '',
                  guests: 1,
                  ...(spaceType ? { spaceType } : {}),
                  ...rest,
                });
              }}
              mode="flexible"
            />
          </>
        ) : (
          /* Default Browse View */
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Browse flexible workspaces
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {enhancedSpaces.map((space) => (
                <SmartSpaceCard 
                  key={space.id} 
                  space={space} 
                  showContracts={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
