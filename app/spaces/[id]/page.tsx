'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, MapPin, Wifi, Coffee, Phone, Calendar, Users as UsersIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { spaces, users, reviews, bookingProducts } from '../../lib/dummy-data';
import BookingWidget from '../../components/ui/BookingWidget';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function SpacePage({ params }: PageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [spaceId, setSpaceId] = useState<string | null>(null);
  
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setSpaceId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  if (!spaceId) {
    return <div>Loading...</div>;
  }

  // Find the space by ID
  const space = spaces.find((s) => s.id === spaceId);
  if (!space) {
    notFound();
  }

  // Find the host
  const host = users.find((u) => u.id === space.hostId);
  
  // Find hub ambassador if it's a Pro Workspace
  const hubAmbassador = space.type === 'Pro Workspace' 
    ? users.find((u) => u.role === 'hub-ambassador')
    : null;

  // Get reviews for this space
  const spaceReviews = reviews.filter((r) => r.spaceId === space.id);
  
  // Get booking products for this space
  const spaceBookingProducts = bookingProducts.filter((bp) => bp.spaceId === space.id);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === space.imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? space.imageUrls.length - 1 : prev - 1
    );
  };

  const amenityIcons: { [key: string]: React.ReactNode } = {
    'WiFi': <Wifi className="w-5 h-5" />,
    'Coffee': <Coffee className="w-5 h-5" />,
    'Phone Booths': <Phone className="w-5 h-5" />,
    'Meeting Rooms': <UsersIcon className="w-5 h-5" />,
    '24/7 Access': <Calendar className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Photo Gallery */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <Image
          src={space.imageUrls[currentImageIndex]}
          alt={`${space.title} - Image ${currentImageIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
        
        {/* Navigation Arrows */}
        {space.imageUrls.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {space.imageUrls.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {space.imageUrls.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Space Type Badge */}
        <div className="absolute top-6 left-6">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
            space.type === 'Corporate Hub' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {space.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Location */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {space.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{space.location}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">4.8</span>
                  <span className="text-gray-600 ml-1">({spaceReviews.length} reviews)</span>
                </div>
              </div>
            </div>

            {/* Host Information */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {space.type === 'Corporate Hub' ? 'Hosted by' : 'Managed by'}
              </h2>
              <div className="flex items-start space-x-4">
                <Image
                  src={host?.profileImageUrl || '/placeholder-avatar.jpg'}
                  alt={host?.name || 'Host'}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{host?.name}</h3>
                  <p className="text-gray-600">{host?.title} at {host?.company}</p>
                  <p className="text-gray-700 mt-2">{host?.bio}</p>
                </div>
              </div>

              {/* Hub Ambassador for Pro Workspaces */}
              {hubAmbassador && space.type === 'Pro Workspace' && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Your On-Site Hub Ambassador</h4>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={hubAmbassador.profileImageUrl}
                      alt={hubAmbassador.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-green-800">{hubAmbassador.name}</p>
                      <p className="text-sm text-green-700">{hubAmbassador.bio}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this workspace</h2>
              <p className="text-gray-700 leading-relaxed">{space.description}</p>
            </div>

            {/* Amenities */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">What this space offers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {space.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    {amenityIcons[amenity] || <div className="w-5 h-5 bg-gray-300 rounded" />}
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Options */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Options</h2>
              <div className="grid gap-4">
                {spaceBookingProducts.map((product) => (
                  <div key={product.type} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900">{product.type}</h3>
                        <p className="text-gray-600">
                          {product.quantity} spots available
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                        <p className="text-gray-600">
                          {product.type === 'Day Pass' ? 'per day' : 'per month'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Reviews ({spaceReviews.length})
              </h2>
              <div className="space-y-6">
                {spaceReviews.map((review, index) => {
                  const reviewer = users.find(u => u.id === review.userId);
                  return (
                    <div key={index} className="flex space-x-4">
                      <Image
                        src={reviewer?.profileImageUrl || '/placeholder-avatar.jpg'}
                        alt={reviewer?.name || 'Reviewer'}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{reviewer?.name}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <BookingWidget space={space} />
          </div>
        </div>
      </div>
    </div>
  );
}
