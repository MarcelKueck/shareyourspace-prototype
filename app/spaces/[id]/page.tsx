'use client';

import { useState, useEffect } from 'react';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Wifi, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { users, reviews } from '../../lib/dummy-data';
import { enhancedSpaces } from '../../lib/enhanced-data';
import { WorkspaceUnit, SpaceType } from '../../lib/types';
import FlexibleBookingWidget from '../../components/ui/FlexibleBookingWidget';
import WorkspaceContractWidget from '../../components/ui/WorkspaceContractWidget';
import WorkspaceSelectionWidget from '../../components/ui/WorkspaceSelectionWidget';
import { useSearchStore } from '../../store/searchStore';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function SpacePage({ params }: PageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [spaceId, setSpaceId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode') as 'flexible' | 'contract' || 'flexible';
  
  const { spaceType: storedSpaceType, setSearchFilters } = useSearchStore();
  const urlType = searchParams.get('type') as SpaceType | null;
  const initialType = urlType || storedSpaceType;
  
  const [selectedUnit, setSelectedUnit] = useState<WorkspaceUnit | null>(null);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setSpaceId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  // Update search store with URL parameters
  useEffect(() => {
    const location = searchParams.get('location');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests');
    const spaceType = searchParams.get('type') as SpaceType;
    
    if (location || checkIn || checkOut || guests || spaceType) {
      setSearchFilters({
        checkIn: checkIn ? new Date(checkIn) : null,
        checkOut: checkOut ? new Date(checkOut) : null,
        guests: guests ? parseInt(guests) : 1,
        spaceType: spaceType || null
      });
    }
  }, [searchParams, setSearchFilters]);

  const space = enhancedSpaces.find((s) => s.id === spaceId);

  useEffect(() => {
    if (space && !selectedUnit) {
        const availableUnits = space.workspaceUnits.filter(u => u.status === 'available');
        if (initialType) {
            const firstUnitOfType = availableUnits.find(u => u.spaceType === initialType);
            if (firstUnitOfType) {
                setSelectedUnit(firstUnitOfType);
                return;
            }
        }
        if (availableUnits.length > 0) {
            setSelectedUnit(availableUnits[0]);
        }
    }
  }, [space, initialType, selectedUnit]);
  
  if (!spaceId) {
    return <div className="bg-white text-black p-8">Loading...</div>;
  }

  if (!space) {
    notFound();
  }

  const host = users.find((u) => u.id === space.hostId);
  
  const hubAmbassador = space.type === 'Pro Workspace' 
    ? users.find(u => u.role === 'hub-ambassador')
    : null;

  const spaceReviews = reviews.filter((r) => r.spaceId === space.id);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % space.imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + space.imageUrls.length) % space.imageUrls.length);
  };

  const handleUnitSelect = (unit: WorkspaceUnit | null) => {
    setSelectedUnit(unit);
  };

  // Build back link based on mode and search parameters
  const buildBackLink = () => {
    const params = new URLSearchParams();
    const location = searchParams.get('location');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests');
    const spaceType = searchParams.get('type');
    
    if (location) params.set('location', location);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);
    if (spaceType) params.set('type', spaceType);
    
    const basePath = mode === 'contract' ? '/booking/contracts' : '/booking/flexible';
    return params.toString() ? `${basePath}?${params.toString()}` : basePath;
  };

  return (
    <div className="bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to search link */}
        <Link href={buildBackLink()} className="text-sm text-blue-600 hover:underline mb-4 inline-block">
          <ArrowLeft className="w-4 h-4 inline-block mr-1" />
          Back to {mode === 'contract' ? 'contracts' : 'flexible bookings'}
        </Link>

        {/* Title and details */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{space.title}</h1>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
              <span>4.9 ({spaceReviews.length} reviews)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{space.location}</span>
            </div>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              space.type === 'Corporate Hub' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {space.type}
            </span>
            {mode === 'contract' && space.contracts?.available && (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                Contract Mode
              </span>
            )}
          </div>
          {mode === 'contract' && (
            <p className="text-sm text-gray-600 mt-2">
              Browse long-term workspace contracts with dedicated space and premium benefits
            </p>
          )}
        </div>

        {/* Image Gallery */}
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-8 shadow-lg">
          <Image
            src={space.imageUrls[currentImageIndex]}
            alt={space.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md">
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Host Info */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-semibold">Hosted by {host?.name}</h2>
                <p className="text-gray-600">
                  {space.type === 'Pro Workspace' && hubAmbassador ? `Hub Ambassador: ${hubAmbassador.name}` : `Part of ${host?.company}`}
                </p>
              </div>
              <Image
                src={host?.profileImageUrl || ''}
                alt={host?.name || ''}
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>

            <WorkspaceSelectionWidget 
              space={space}
              initialType={initialType}
              onUnitSelect={handleUnitSelect}
              selectedUnit={selectedUnit}
            />

            {/* Description */}
            <div className="py-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold mb-4">About this space</h3>
              <p className="text-gray-600 whitespace-pre-line">{space.description}</p>
            </div>

            {/* Amenities */}
            <div className="py-6">
              <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {space.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <Wifi className="w-5 h-5 mr-3 text-gray-700" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Widget Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {mode === 'flexible' ? (
                <FlexibleBookingWidget space={space} selectedUnit={selectedUnit} />
              ) : (
                <WorkspaceContractWidget space={space} selectedUnit={selectedUnit} />
              )}
              
              {/* Mode Switch */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Looking for something else?</div>
                <div className="flex gap-2">
                  {mode === 'contract' ? (
                    <button
                      onClick={() => router.push(`/spaces/${space.id}?mode=flexible${initialType ? `&type=${initialType}` : ''}`)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Switch to flexible booking →
                    </button>
                  ) : (
                    space.contracts?.available && (
                      <button
                        onClick={() => router.push(`/spaces/${space.id}?mode=contract${initialType ? `&type=${initialType}` : ''}`)}
                        className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                      >
                        Switch to workspace contracts →
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
