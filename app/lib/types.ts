// Enhanced type definitions for ShareYourSpace

export type UserRole = 'corporate-host' | 'pro-provider' | 'member' | 'corporate-employee' | 'corporate-admin' | 'corporate-executive' | 'sys-admin' | 'hub-ambassador';

export type BookingDuration = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'long-term';
export type SpaceType = 'desk' | 'private-office' | 'meeting-room' | 'hot-desk';
export type ContractTerm = '1-month' | '3-months' | '6-months' | '12-months';
export type ApprovalType = 'instant' | 'manual';
export type UnitStatus = 'available' | 'booked' | 'maintenance';

export interface WorkspaceUnit {
  id: string;
  unitIdentifier: string; // e.g., "Desk 1A", "Office 203", "Meeting Room 'Galaxy'"
  name: string; // User-friendly name, can be the same as unitIdentifier
  spaceType: SpaceType;
  capacity: number;
  amenities: string[]; // Unit-specific amenities
  status: UnitStatus;
  // Simple booking schedule for dummy data. In a real app, this would be more complex.
  bookings?: Array<{
    from: string; // ISO date
    to: string; // ISO date
    userId: string;
  }>;
  price: {
    hourly?: number;
    daily: number;
    weekly: number;
    monthly: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImageUrl: string;
  company: string;
  companyId?: string;
  title: string;
  bio: string;
  corporateBenefits?: {
    hasAccess: boolean;
    allowanceRemaining: number;
    monthlyAllowance: number;
    usedThisMonth: number;
  };
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  subscriptionPlan: 'Startup Pack' | 'Growth Pack' | 'Enterprise Pack';
  employeeCount: number;
  monthlyAllowance: number;
  hostingRevenue: number;
  earnedCredits: number;
  isHost: boolean;
  crossBenefits: {
    hostDiscount: number; // percentage
    priorityAccess: boolean;
    verifiedBadge: boolean;
  };
}

export interface Space {
  id:string;
  title: string;
  hostId: string;
  type: 'Corporate Hub' | 'Pro Workspace';
  location: string;
  basePrice: number; // Base price per day for the cheapest available unit
  hourlyRate?: number; // Optional hourly rate for the cheapest available unit
  imageUrls: string[];
  amenities: string[]; // General amenities for the whole space
  description: string;
  maxGuests: number; // Max guests in the largest unit
  // spaceType is now a list of offered types
  offeredSpaceTypes: SpaceType[];
  workspaceUnits: WorkspaceUnit[];
  floorPlanUrl?: string; // URL for a visual floor plan image
  availability: {
    instantBook: boolean;
    minStay: number; // minimum days
    maxStay: number; // maximum days
  };
  pricing: {
    weeklyDiscount: number; // percentage
    monthlyDiscount: number; // percentage
    longTermDiscount: number; // percentage for 3+ months
  };
  // NEW: Contract offerings
  contracts?: {
    available: boolean;
    approvalType: ApprovalType;
    plans: WorkspacePlan[];
    dedicatedSpace: boolean; // Whether contracts include dedicated desks/offices
    includedAmenities?: string[]; // Extra amenities for contract holders
  };
  corporateHostBenefits?: {
    isVerifiedHost: boolean;
    offersEmployeeBenefits: boolean;
    crossBenefitsAvailable: boolean;
  };
}

export interface WorkspacePlan {
  id: string;
  name: string;
  term: ContractTerm;
  monthlyPrice: number;
  setupFee?: number;
  spaceType: SpaceType;
  maxUsers: number;
  description: string;
  features: string[];
  discountFromDaily: number; // percentage savings compared to daily rate
}

export interface BookingRequest {
  id: string;
  spaceId: string;
  userId: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  guests: number;
  totalPrice: number;
  breakdown: {
    basePrice: number;
    nights: number;
    weeklyDiscount?: number;
    monthlyDiscount?: number;
    serviceFee: number;
    corporateDiscount?: number;
  };
  status: 'pending' | 'confirmed' | 'cancelled';
  isTeamBooking: boolean;
  teamMembers?: string[]; // user IDs
  corporateCoverage?: {
    companyId: string;
    coveredAmount: number;
  };
}

export interface Review {
  spaceId: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Match {
  memberId: string;
  targetUserId: string;
  matchReason: string;
}

export interface ChatMessage {
  conversationId: string;
  senderId: string;
  message: string;
  timestamp: string;
}

// Pricing calculator interface
export interface PricingCalculation {
  basePrice: number;
  nights: number;
  subtotal: number;
  weeklyDiscount?: number;
  monthlyDiscount?: number;
  corporateDiscount?: number;
  serviceFee: number;
  totalPrice: number;
  pricePerNight?: number;
  discountApplied?: boolean;
  hours?: number; // For hourly bookings
}

// Contract application and management
export interface ContractApplication {
  id: string;
  spaceId: string;
  planId: string;
  userId: string;
  companyName?: string;
  teamSize: number;
  startDate: string; // ISO date string
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'cancelled';
  monthlyPrice: number;
  setupFee?: number;
  message?: string; // User's application message
  hostResponse?: string; // Host's response
  createdAt: string;
  approvedAt?: string;
}

export interface ActiveContract {
  id: string;
  applicationId: string;
  spaceId: string;
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  monthlyPrice: number;
  status: 'active' | 'cancelled' | 'expired';
  nextBillingDate: string;
  cancellationNotice?: {
    date: string;
    effectiveDate: string;
    reason?: string;
  };
}
