'use client';

import { Heart, Star } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Space } from '../../lib/dummy-data';

interface SpaceCardProps {
  space: Space;
}

export default function SpaceCard({ space }: SpaceCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Link href={`/spaces/${space.id}`} className="group cursor-pointer block">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl mb-3">
        <Image
          src={space.imageUrls[0] || '/placeholder-workspace.jpg'}
          alt={space.title}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
        >
          <Heart 
            className={`w-4 h-4 ${
              isWishlisted 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-600'
            }`}
          />
        </button>

        {/* Space Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            space.type === 'Corporate Hub' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {space.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1">
        {/* Title and Location */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
              {space.title}
            </h3>
            <p className="text-sm text-gray-600">{space.location}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">4.8</span>
          <span className="text-sm text-gray-600">(24 reviews)</span>
        </div>

        {/* Price */}
        <div className="pt-1">
          <span className="font-semibold text-gray-900">
            ${space.pricePerMonth}
          </span>
          <span className="text-gray-600"> / month</span>
        </div>
      </div>
    </Link>
  );
}
