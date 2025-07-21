'use client';

import { Heart, CheckCircle, Users, Shield, Award } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Space } from '../../lib/types';
import { useAuthStore } from '../../store/authStore';

interface SmartSpaceCardProps {
  space: Space;
  showContracts?: boolean;
}

export default function SmartSpaceCard({ space, showContracts = false }: SmartSpaceCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { currentUser, corporateAllowance } = useAuthStore();
  
  // Enhanced space has basePrice and hourlyRate instead of pricePerDay/pricePerMonth
  const dailyPrice = space.basePrice;
  const hourlyPrice = space.hourlyRate;
  const isVerifiedHost = space.corporateHostBenefits?.isVerifiedHost;
  
  // Check if current user's company is also a host and gets cross-benefits
  const userGetsHostDiscount = currentUser?.companyId && corporateAllowance?.company?.isHost && space.corporateHostBenefits?.crossBenefitsAvailable;

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
                : 'text-gray-600 hover:text-red-500'
            } transition-colors`}
          />
        </button>

        {/* Corporate Benefits Badge */}
        {userGetsHostDiscount && (
          <div className="absolute bottom-1.5 left-1.5 bg-green-500 text-white px-1.5 py-0.5 rounded text-xs font-medium flex items-center">
            <Award className="w-3 h-3 mr-1" />
            Host Benefits
          </div>
        )}
        
        {/* Verified Host Badge */}
        {isVerifiedHost && (
          <div className="absolute top-1.5 left-1.5 bg-blue-500 text-white px-1.5 py-0.5 rounded text-xs font-medium flex items-center">
            <Shield className="w-3 h-3 mr-1" />
            Verified
          </div>
        )}

        {/* Instant Book Badge */}
        {space.availability.instantBook && (
          <div className="absolute bottom-1.5 right-1.5 bg-green-500 text-white px-1.5 py-0.5 rounded text-xs font-medium flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            Instant
          </div>
        )}
      </div>

      {/* Content - Ultra Compact */}
      <div className="space-y-1">
        {/* Location and Host Status */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-600 truncate flex-1">{space.location}</p>
          {space.type === 'Corporate Hub' && (
            <div className="flex items-center ml-2">
              <Users className="w-3 h-3 text-blue-500" />
            </div>
          )}
        </div>
        
        {/* Title */}
        <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {space.title}
        </h3>
        
        {/* Space Types */}
        <div className="flex flex-wrap gap-1">
          {space.offeredSpaceTypes.slice(0, 3).map((spaceType) => (
            <span
              key={spaceType}
              className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded"
            >
              {spaceType.replace('-', ' ')}
            </span>
          ))}
          {space.offeredSpaceTypes.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
              +{space.offeredSpaceTypes.length - 3}
            </span>
          )}
        </div>

        {/* Amenities Preview */}
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span className="truncate">
            {space.amenities.slice(0, 2).join(' • ')}
            {space.amenities.length > 2 && '...'}
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex flex-col">
            {showContracts && space.contracts?.available ? (
              <>
                <div className="flex items-baseline space-x-1">
                  <span className="font-semibold text-sm text-purple-600">
                    ${space.contracts.plans[0]?.monthlyPrice}
                  </span>
                  <span className="text-xs text-gray-500">per month</span>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="font-medium text-xs text-gray-700 line-through">
                    ${dailyPrice * 30}
                  </span>
                  <span className="text-xs text-green-600">Save {space.contracts.plans[0]?.discountFromDaily}%</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-baseline space-x-1">
                  <span className="font-semibold text-sm text-gray-900">
                    ${dailyPrice}
                  </span>
                  <span className="text-xs text-gray-500">per day</span>
                </div>
                {hourlyPrice && (
                  <div className="flex items-baseline space-x-1">
                    <span className="font-medium text-xs text-gray-700">
                      ${hourlyPrice}
                    </span>
                    <span className="text-xs text-gray-500">per hour</span>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Contract Available */}
          {space.contracts?.available && (
            <div className={`text-xs px-2 py-1 rounded font-medium ${
              showContracts 
                ? 'bg-purple-500 text-white' 
                : 'bg-purple-100 text-purple-700'
            }`}>
              {showContracts ? 'Contract Mode' : 'Contracts'}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
