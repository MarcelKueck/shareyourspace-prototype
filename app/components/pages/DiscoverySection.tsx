'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { Space as LegacySpace } from '../../lib/dummy-data';
import { Space as EnhancedSpace } from '../../lib/types';
import SpaceCard from '../ui/SpaceCard';
import SmartSpaceCard from '../ui/SmartSpaceCard';

interface DiscoverySectionProps {
  title: string;
  spaces: LegacySpace[] | EnhancedSpace[];
}

// Type guard to check if space is enhanced
function isEnhancedSpace(space: LegacySpace | EnhancedSpace): space is EnhancedSpace {
  return 'basePrice' in space;
}

export default function DiscoverySection({ title, spaces }: DiscoverySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-3 sm:py-4 lg:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Ultra Compact */}
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{title}</h2>
          
          {/* Navigation Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={scrollLeft}
              className="p-1.5 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={scrollRight}
              className="p-1.5 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Scrollable Cards Container - Ultra Compact */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-2 sm:space-x-3 lg:space-x-4 overflow-x-auto scrollbar-hide pb-1 sm:pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {spaces.map((space) => (
            <div key={space.id} className="flex-none w-60 sm:w-64 lg:w-72">
              {isEnhancedSpace(space) ? (
                <SmartSpaceCard space={space} />
              ) : (
                <SpaceCard space={space} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
