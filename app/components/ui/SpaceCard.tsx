'use client';

import { Heart, Star, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Space, getSpacePricing, getAvailableBookingTypes } from '../../lib/dummy-data';

interface SpaceCardProps {
  space: Space;
}

export default function SpaceCard({ space }: SpaceCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const pricing = getSpacePricing(space.id);
  const availableBookings = getAvailableBookingTypes(space.id);

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
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors z-10"
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

        {/* Booking Options Badge */}
        {availableBookings.length > 1 && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/90 text-gray-700 flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <span>{availableBookings.length} booking options</span>
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Title and Location */}
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
            {space.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-1">{space.location}</p>
        </div>

        {/* Available Booking Types */}
        <div className="flex flex-wrap gap-1">
          {availableBookings.slice(0, 2).map((booking, index) => (
            <span 
              key={index}
              className={`px-2 py-1 text-xs rounded-full ${
                booking.type === 'Day Pass' 
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : booking.type === 'Monthly Desk'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-purple-50 text-purple-700 border border-purple-200'
              }`}
            >
              {booking.type}
            </span>
          ))}
          {availableBookings.length > 2 && (
            <span className="px-2 py-1 text-xs rounded-full bg-gray-50 text-gray-600 border border-gray-200">
              +{availableBookings.length - 2} more
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">4.8</span>
          <span className="text-sm text-gray-600">(24 reviews)</span>
        </div>

        {/* Price Display */}
        <div className="pt-1">
          {pricing ? (
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-semibold text-gray-900 text-lg">
                  ${pricing.price}
                </span>
                <span className="text-gray-600">{pricing.label}</span>
              </div>
              {pricing.available.length > 1 && (
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>Multiple options</span>
                </div>
              )}
            </div>
          ) : (
            <span className="text-gray-600 text-sm">Contact for pricing</span>
          )}
        </div>
      </div>
    </Link>
  );
}
