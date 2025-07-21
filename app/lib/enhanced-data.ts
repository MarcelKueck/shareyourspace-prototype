// Enhanced data transformations and utilities for ShareYourSpace
import { spaces as legacySpaces, Space as LegacySpace } from './dummy-data';
import { Space, SpaceType, WorkspaceUnit } from './types';

// Transform legacy spaces into enhanced spaces
function transformLegacySpace(legacySpace: LegacySpace): Space {
  // Map legacy space types to new format
  const getOfferedSpaceTypes = (spaceId: string): SpaceType[] => {
    // Based on space characteristics, determine offered space types
    switch (spaceId) {
      case 'space-1': // SAP Innovation Hub
      case 'space-2': // Rocket Internet Campus
      case 'space-3': // Volkswagen Future Lab
      case 'space-4': // Deutsche Telekom Hub
        return ['desk', 'meeting-room', 'private-office'];
      case 'space-5': // Adidas Creator Space
      case 'space-6': // Siemens Next47
        return ['hot-desk', 'desk', 'meeting-room'];
      default:
        return ['desk', 'hot-desk'];
    }
  };

  // Generate workspace units based on space characteristics
  const generateWorkspaceUnits = (spaceId: string, teamCapacity: number): WorkspaceUnit[] => {
    const units: WorkspaceUnit[] = [];
    const offeredTypes = getOfferedSpaceTypes(spaceId);
    
    // Generate units based on team capacity
    if (offeredTypes.includes('hot-desk')) {
      for (let i = 1; i <= Math.min(10, Math.floor(teamCapacity * 0.6)); i++) {
        units.push({
          id: `${spaceId}-hotdesk-${i}`,
          unitIdentifier: `Hot Desk ${i}`,
          name: `Hot Desk ${i}`,
          spaceType: 'hot-desk',
          capacity: 1,
          amenities: ['WiFi', 'Power Outlet'],
          status: Math.random() > 0.8 ? 'booked' : 'available',
          price: {
            hourly: legacySpace.pricePerDay / 8,
            daily: legacySpace.pricePerDay * 0.8,
            weekly: legacySpace.pricePerDay * 5,
            monthly: legacySpace.pricePerMonth * 0.9
          }
        });
      }
    }

    if (offeredTypes.includes('desk')) {
      for (let i = 1; i <= Math.min(8, Math.floor(teamCapacity * 0.4)); i++) {
        units.push({
          id: `${spaceId}-desk-${i}`,
          unitIdentifier: `Desk ${i}A`,
          name: `Fixed Desk ${i}`,
          spaceType: 'desk',
          capacity: 1,
          amenities: ['WiFi', 'Power Outlet', 'Storage'],
          status: Math.random() > 0.7 ? 'booked' : 'available',
          price: {
            hourly: legacySpace.pricePerDay / 6,
            daily: legacySpace.pricePerDay,
            weekly: legacySpace.pricePerDay * 6,
            monthly: legacySpace.pricePerMonth
          }
        });
      }
    }

    if (offeredTypes.includes('private-office')) {
      const officeCount = Math.max(1, Math.floor(teamCapacity / 8));
      for (let i = 1; i <= officeCount; i++) {
        units.push({
          id: `${spaceId}-office-${i}`,
          unitIdentifier: `Office ${200 + i}`,
          name: `Private Office ${i}`,
          spaceType: 'private-office',
          capacity: Math.min(8, Math.floor(teamCapacity / officeCount)),
          amenities: ['WiFi', 'Phone', 'Whiteboard', 'Storage', 'Privacy'],
          status: Math.random() > 0.6 ? 'booked' : 'available',
          price: {
            hourly: legacySpace.pricePerDay * 2.5,
            daily: legacySpace.pricePerDay * 3,
            weekly: legacySpace.pricePerDay * 18,
            monthly: legacySpace.pricePerMonth * 2.2
          }
        });
      }
    }

    if (offeredTypes.includes('meeting-room')) {
      for (let i = 1; i <= Math.max(2, Math.floor(teamCapacity / 10)); i++) {
        units.push({
          id: `${spaceId}-meeting-${i}`,
          unitIdentifier: `Meeting Room ${['Alpha', 'Beta', 'Gamma', 'Delta'][i-1] || i}`,
          name: `Meeting Room ${['Alpha', 'Beta', 'Gamma', 'Delta'][i-1] || i}`,
          spaceType: 'meeting-room',
          capacity: 6 + (i * 2),
          amenities: ['WiFi', 'TV/Projector', 'Whiteboard', 'Conference Phone'],
          status: Math.random() > 0.5 ? 'booked' : 'available',
          price: {
            hourly: legacySpace.pricePerDay * 1.5,
            daily: legacySpace.pricePerDay * 8,
            weekly: legacySpace.pricePerDay * 40,
            monthly: legacySpace.pricePerMonth * 6
          }
        });
      }
    }

    return units;
  };

  // Find the cheapest unit for base pricing
  const workspaceUnits = generateWorkspaceUnits(legacySpace.id, legacySpace.teamCapacity || 20);
  const cheapestUnit = workspaceUnits.reduce((min, unit) => 
    unit.price.daily < min.price.daily ? unit : min, workspaceUnits[0]
  );

  const enhancedSpace: Space = {
    id: legacySpace.id,
    title: legacySpace.title,
    hostId: legacySpace.hostId,
    type: legacySpace.type,
    location: legacySpace.location,
    basePrice: cheapestUnit?.price.daily || legacySpace.pricePerDay,
    hourlyRate: cheapestUnit?.price.hourly,
    imageUrls: legacySpace.imageUrls,
    amenities: legacySpace.amenities,
    description: legacySpace.description,
    maxGuests: legacySpace.teamCapacity || 20,
    offeredSpaceTypes: getOfferedSpaceTypes(legacySpace.id),
    workspaceUnits,
    availability: {
      instantBook: Math.random() > 0.3,
      minStay: 1,
      maxStay: 365
    },
    pricing: {
      weeklyDiscount: 15,
      monthlyDiscount: 25,
      longTermDiscount: 35
    },
    contracts: {
      available: legacySpace.type === 'Corporate Hub' || Math.random() > 0.4,
      approvalType: Math.random() > 0.6 ? 'instant' : 'manual',
      plans: [
        {
          id: `${legacySpace.id}-plan-1`,
          name: 'Starter Plan',
          term: '1-month',
          monthlyPrice: legacySpace.pricePerMonth * 0.9,
          spaceType: 'desk',
          maxUsers: 5,
          description: 'Perfect for small teams',
          features: ['Dedicated desk', 'Meeting room access', 'WiFi'],
          discountFromDaily: 10
        },
        {
          id: `${legacySpace.id}-plan-2`,
          name: 'Growth Plan',
          term: '6-months',
          monthlyPrice: legacySpace.pricePerMonth * 0.75,
          setupFee: 150,
          spaceType: 'private-office',
          maxUsers: 15,
          description: 'Ideal for growing teams',
          features: ['Private office', 'All amenities', 'Priority booking'],
          discountFromDaily: 25
        }
      ],
      dedicatedSpace: true,
      includedAmenities: ['WiFi', 'Coffee', 'Meeting Rooms']
    },
    corporateHostBenefits: legacySpace.corporateHostBenefits
  };

  return enhancedSpace;
}

// Transform all legacy spaces
export const enhancedSpaces: Space[] = legacySpaces.map(transformLegacySpace);

// Search function for enhanced spaces
export function searchSpaces(
  spaces: Space[],
  location?: string,
  checkIn?: Date,
  checkOut?: Date,
  guests?: number,
  maxPrice?: number,
  spaceType?: SpaceType
): Space[] {
  return spaces.filter(space => {
    // Location filter
    if (location && !space.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }

    // Guests filter
    if (guests && space.maxGuests < guests) {
      return false;
    }

    // Price filter
    if (maxPrice && space.basePrice > maxPrice) {
      return false;
    }

    // Space type filter
    if (spaceType && !space.offeredSpaceTypes.includes(spaceType)) {
      return false;
    }

    // For now, we're not filtering by dates as that would require more complex availability logic
    // In a real app, this would check unit availability for the given date range

    return true;
  });
}

// Additional utility functions
export function getSpacesByType(spaceType: SpaceType): Space[] {
  return enhancedSpaces.filter(space => space.offeredSpaceTypes.includes(spaceType));
}

export function getSpacesWithContracts(): Space[] {
  return enhancedSpaces.filter(space => space.contracts?.available);
}

export function getInstantBookSpaces(): Space[] {
  return enhancedSpaces.filter(space => space.availability.instantBook);
}

// Pricing calculation interface
export interface PricingBreakdown {
  basePrice: number;
  hours?: number;
  nights: number;
  subtotal: number;
  weeklyDiscount: number;
  monthlyDiscount: number;
  corporateDiscount: number;
  serviceFee: number;
  totalPrice: number;
}

// Calculate pricing for flexible bookings
export function calculatePricing(
  space: Space,
  checkIn: Date,
  checkOut: Date,
  corporateDiscountPercent: number = 0,
  selectedUnit?: WorkspaceUnit
): PricingBreakdown {
  // Calculate duration
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  const hours = Math.ceil(timeDiff / (1000 * 60 * 60));
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  // Determine if this is an hourly or daily booking
  const isHourlyBooking = hours <= 8; // Less than 8 hours = hourly booking
  
  // Get the base price from selected unit or cheapest unit
  const unit = selectedUnit || space.workspaceUnits[0];
  const basePrice = isHourlyBooking 
    ? (unit?.price.hourly || space.hourlyRate || space.basePrice / 8)
    : (unit?.price.daily || space.basePrice);
  
  // Calculate subtotal
  const quantity = isHourlyBooking ? hours : days;
  const subtotal = basePrice * quantity;
  
  // Calculate discounts (only apply to daily bookings)
  let weeklyDiscount = 0;
  let monthlyDiscount = 0;
  
  if (!isHourlyBooking) {
    // Weekly discount (7+ days)
    if (days >= 7) {
      weeklyDiscount = subtotal * (space.pricing.weeklyDiscount / 100);
    }
    
    // Monthly discount (30+ days) - replaces weekly discount
    if (days >= 30) {
      weeklyDiscount = 0;
      monthlyDiscount = subtotal * (space.pricing.monthlyDiscount / 100);
    }
  }
  
  // Corporate discount
  const corporateDiscount = subtotal * (corporateDiscountPercent / 100);
  
  // Calculate subtotal after discounts
  const discountedSubtotal = subtotal - weeklyDiscount - monthlyDiscount - corporateDiscount;
  
  // Service fee (5% of discounted subtotal)
  const serviceFee = discountedSubtotal * 0.05;
  
  // Total price
  const totalPrice = discountedSubtotal + serviceFee;
  
  return {
    basePrice,
    hours: isHourlyBooking ? hours : undefined,
    nights: days,
    subtotal,
    weeklyDiscount,
    monthlyDiscount,
    corporateDiscount,
    serviceFee,
    totalPrice: Math.max(totalPrice, 0) // Ensure non-negative
  };
}
