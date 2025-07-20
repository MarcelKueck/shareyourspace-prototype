export interface User {
  id: string;
  name: string;
  email: string;
  role:
    | "corporate-host"
    | "pro-provider"
    | "member"
    | "corporate-employee"
    | "corporate-admin"
    | "corporate-executive"
    | "sys-admin"
    | "hub-ambassador";
  profileImageUrl: string;
  company: string;
  companyId: string;
  title: string;
  bio: string;
  corporateBenefits: boolean;
  allowanceRemaining: number;
}

export interface Space {
  id: string;
  title: string;
  hostId: string;
  type: "Corporate Hub" | "Pro Workspace";
  location: string;
  pricePerDay: number;
  pricePerMonth: number;
  imageUrls: string[];
  amenities: string[];
  description: string;
  teamCapacity: number;
  corporateHostBenefits: string[];
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  subscriptionPlan: string;
  employeeCount: number;
  monthlyAllowance: number;
  hostingRevenue: number;
  earnedCredits: number;
  isHost: boolean;
  crossBenefits: boolean;
}

export interface BookingProduct {
  type: "Day Pass" | "Monthly Desk" | "Team Room";
  price: number;
  quantity: number;
  teamSize: number;
}

export interface CorporateBooking {
  id: string;
  spaceId: string;
  teamLeadId: string;
  teamMembers: string[];
  billingType: "corporate" | "mixed";
  coordinationDetails: string;
}

export interface Review {
  spaceId: string;
  userId: string;
  rating: number;
  comment: string;
}

export interface Match {
  targetUserId: string;
  matchReason: string;
}

export interface ChatMessage {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
}
