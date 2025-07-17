'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { Space } from '../../lib/dummy-data';
import SpaceCard from '../ui/SpaceCard';

interface DiscoverySectionProps {
  title: string;
  spaces: Space[];
}

export default function DiscoverySection({ title, spaces }: DiscoverySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          
          {/* Navigation Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Scrollable Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {spaces.map((space) => (
            <div key={space.id} className="flex-none w-80">
              <SpaceCard space={space} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
