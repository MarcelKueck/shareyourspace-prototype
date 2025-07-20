'use client';

import { Heart, Star, Clock, CheckCircle, Users, Shield, Award } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Space, getSpacePricing, getAvailableBookingTypes, getSpaceTeamCapacity, hasHostBenefits } from '../../lib/dummy-data';
import { useAuthStore } from '../../store/authStore';

interface SpaceCardProps {
  space: Space;
}

export default function SpaceCard({ space }: SpaceCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { currentUser, corporateAllowance } = useAuthStore();
  
  const pricing = getSpacePricing(space.id);
  const availableBookings = getAvailableBookingTypes(space.id);
  const teamCapacity = getSpaceTeamCapacity(space.id);
  const hostHasCorpBenefits = hasHostBenefits(space.id);
  const isVerifiedHost = space.corporateHostBenefits?.isVerifiedHost;
  
  // Check if current user's company is also a host and gets cross-benefits
  const userGetsHostDiscount = currentUser?.companyId && corporateAllowance?.company?.isHost && hostHasCorpBenefits;

  return (
    <Link href={`/spaces/${space.id}`} className="group cursor-pointer block">
      {/* Image Container - Ultra Compact with 4:3 ratio */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-1.5 sm:mb-2">
        <Image
          src={space.imageUrls[0] || '/placeholder-workspace.jpg'}
          alt={space.title}
          width={300}
          height={225}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Heart Icon */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors z-10"
        >
          <Heart 
            className={`w-3 h-3 ${
              isWishlisted 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-600'
            }`}
          />
        </button>

        {/* Space Type Badge */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            space.type === 'Corporate Hub' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {space.type}
          </span>
          
          {/* Verified Host Badge */}
          {isVerifiedHost && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Verified Host</span>
            </span>
          )}
          
          {/* Cross-benefits Available */}
          {userGetsHostDiscount && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 flex items-center space-x-1">
              <Award className="w-3 h-3" />
              <span>Host Discount</span>
            </span>
          )}
        </div>

        {/* Team Capacity and Booking Options Badge */}
        <div className="absolute bottom-1.5 left-1.5 flex space-x-1">
          {teamCapacity > 1 && (
            <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-white/90 text-gray-700 flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>Team up to {teamCapacity}</span>
            </span>
          )}
          
          {availableBookings.length > 1 && (
            <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-white/90 text-gray-700 flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <span>{availableBookings.length} options</span>
            </span>
          )}
        </div>
      </div>

      {/* Content - Ultra Compact */}
      <div className="space-y-1">
        {/* Title and Location */}
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1 text-sm leading-tight">
            {space.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-1">{space.location}</p>
        </div>

        {/* Available Booking Types - Ultra Compact */}
        <div className="flex flex-wrap gap-1">
          {availableBookings.slice(0, 2).map((booking, index) => (
            <span 
              key={index}
              className={`px-1.5 py-0.5 text-xs rounded ${
                booking.type === 'Day Pass' 
                  ? 'bg-green-50 text-green-700'
                  : booking.type === 'Monthly Desk'
                  ? 'bg-blue-50 text-blue-700'
                  : booking.type === 'Team Room'
                  ? 'bg-orange-50 text-orange-700'
                  : 'bg-purple-50 text-purple-700'
              }`}
            >
              {booking.type}
            </span>
          ))}
          {availableBookings.length > 2 && (
            <span className="px-1.5 py-0.5 text-xs rounded bg-gray-50 text-gray-600">
              +{availableBookings.length - 2}
            </span>
          )}
          
          {/* Corporate Coverage Indicator */}
          {corporateAllowance?.hasAccess && (
            <span className="px-1.5 py-0.5 text-xs rounded bg-blue-50 text-blue-700 font-medium">
              Corporate
            </span>
          )}
        </div>

        {/* Rating - Ultra Compact */}
        <div className="flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">4.8</span>
          <span className="text-xs text-gray-600">(24)</span>
        </div>

        {/* Price Display - Ultra Compact */}
        <div>
          {pricing ? (
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-semibold text-gray-900 text-sm">
                  ${pricing.price}
                </span>
                <span className="text-gray-600 text-xs">{pricing.label}</span>
              </div>
              {pricing.available.length > 1 && (
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="w-2.5 h-2.5" />
                  <span>Multiple</span>
                </div>
              )}
            </div>
          ) : (
            <span className="text-gray-600 text-xs">Contact for pricing</span>
          )}
        </div>
      </div>
    </Link>
  );
}
