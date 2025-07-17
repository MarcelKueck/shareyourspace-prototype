// lib/dummy-data.ts

export type UserRole = 'corporate-host' | 'pro-provider' | 'member' | 'sys-admin' | 'hub-ambassador' | 'corporate-admin' | 'corporate-employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImageUrl: string;
  company: string;
  title: string;
  bio: string;
}

export interface Space {
  id: string;
  title: string;
  hostId: string;
  type: 'Corporate Hub' | 'Pro Workspace';
  location: string;
  pricePerMonth: number;
  pricePerDay: number;
  imageUrls: string[];
  amenities: string[];
  description: string;
}

export interface BookingProduct {
  spaceId: string;
  type: 'Day Pass' | 'Monthly Desk' | 'Private Office';
  price: number;
  quantity: number;
  isAvailable: boolean;
  minDuration?: string; // e.g., '1 day', '1 week', '1 month'
}

export interface Review {
  spaceId: string;
  userId: string;
  rating: number;
  comment: string;
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

// NEW: Corporate Benefits Program Interfaces
export interface Company {
  id: string;
  name: string;
  domain: string; // for email verification (e.g., "techcorp.com")
  logo: string;
  subscriptionPlan: 'StartupFlex' | 'ScaleFlex' | 'EnterpriseFlex';
  monthlyCredits: number;
  usedCredits: number;
  employeeCount: number;
  adminUserId: string;
  settings: {
    autoApproveBookings: boolean;
    maxBookingDuration: number; // in days
    allowedCategories: string[];
    budgetAlerts: boolean;
  };
  isActive: boolean;
  joinedDate: string;
}

export interface EmployeeBooking {
  id: string;
  employeeId: string;
  companyId: string;
  spaceId: string;
  bookingType: string;
  startDate: string;
  endDate: string;
  creditsUsed: number;
  status: 'pending' | 'approved' | 'active' | 'completed' | 'cancelled';
  approvedBy?: string;
}

export interface CorporateDashboardMetrics {
  companyId: string;
  month: string;
  totalBookings: number;
  activeEmployees: number;
  creditsUsed: number;
  costSavings: number; // vs traditional office costs
  popularLocations: string[];
  employeeSatisfaction: number;
}

// Dummy Users
export const users: User[] = [
  {
    id: 'u1',
    name: 'Alice Corporate',
    email: 'alice@corp.com',
    role: 'corporate-host',
    profileImageUrl: '/profile/alice.jpg',
    company: 'TechCorp',
    title: 'Office Manager',
    bio: 'Building a culture of innovation at TechCorp.'
  },
  {
    id: 'u2',
    name: 'Bob Provider',
    email: 'bob@provider.com',
    role: 'pro-provider',
    profileImageUrl: '/profile/bob.jpg',
    company: 'WorkspacePro',
    title: 'Property Manager',
    bio: 'Maximizing value for workspace owners.'
  },
  {
    id: 'u3',
    name: 'Carol Member',
    email: 'carol@startup.com',
    role: 'member',
    profileImageUrl: '/profile/carol.jpg',
    company: 'StartupX',
    title: 'Founder',
    bio: 'Connecting with innovators everywhere.'
  },
  {
    id: 'u4',
    name: 'Dave Admin',
    email: 'dave@sysadmin.com',
    role: 'sys-admin',
    profileImageUrl: '/profile/dave.jpg',
    company: 'ShareYourSpace',
    title: 'Platform Admin',
    bio: 'Ensuring a safe and thriving marketplace.'
  },
  {
    id: 'u5',
    name: 'Eve Ambassador',
    email: 'eve@proworkspace.com',
    role: 'hub-ambassador',
    profileImageUrl: '/profile/eve.jpg',
    company: 'WorkspacePro',
    title: 'Hub Ambassador',
    bio: 'Fostering community at WorkspacePro.'
  },
  {
    id: 'u6',
    name: 'Frank Corporate Admin',
    email: 'frank@techcorp.com',
    role: 'corporate-admin',
    profileImageUrl: '/profile/frank.jpg',
    company: 'TechCorp',
    title: 'Corporate Administrator',
    bio: 'Managing corporate accounts and employee engagement.'
  },
  {
    id: 'u7',
    name: 'Grace Employee',
    email: 'grace@techcorp.com',
    role: 'corporate-employee',
    profileImageUrl: '/profile/grace.jpg',
    company: 'TechCorp',
    title: 'Software Engineer',
    bio: 'Passionate about building scalable web applications.'
  }
];

// Dummy Spaces - Comprehensive Dataset
export const spaces: Space[] = [
  // CORPORATE HUBS
  {
    id: 'space-1',
    title: 'TechCorp Innovation Hub',
    hostId: 'u1',
    type: 'Corporate Hub',
    location: 'San Francisco, CA',
    pricePerMonth: 850,
    pricePerDay: 45,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    ],
    amenities: ['WiFi', 'Coffee Bar', 'Meeting Rooms', '24/7 Access', 'Parking', 'Gym'],
    description: 'Premium tech hub in SOMA district with cutting-edge facilities and vibrant startup ecosystem.'
  },
  {
    id: 'space-2',
    title: 'Microsoft Reactor',
    hostId: 'u1',
    type: 'Corporate Hub',
    location: 'Seattle, WA',
    pricePerMonth: 750,
    pricePerDay: 40,
    imageUrls: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'
    ],
    amenities: ['WiFi', 'Event Space', 'Mentorship', 'Tech Talks', 'Kitchen', 'Lockers'],
    description: 'Microsoft\'s community hub for developers and entrepreneurs with world-class mentorship programs.'
  },
  {
    id: 'space-3',
    title: 'Google Campus Workspace',
    hostId: 'u1',
    type: 'Corporate Hub',
    location: 'Mountain View, CA',
    pricePerMonth: 950,
    pricePerDay: 50,
    imageUrls: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'
    ],
    amenities: ['WiFi', 'Massage Rooms', 'Nap Pods', 'Gourmet Cafe', 'Bike Rental', 'Meditation Room'],
    description: 'Experience Google\'s innovative work culture in this premium campus workspace with world-class amenities.'
  },
  {
    id: 'space-4',
    title: 'Amazon Catalyst Hub',
    hostId: 'u1',
    type: 'Corporate Hub',
    location: 'Austin, TX',
    pricePerMonth: 650,
    pricePerDay: 35,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    ],
    amenities: ['WiFi', 'AWS Credits', 'Product Labs', 'Mentoring', 'Demo Days', 'Networking Events'],
    description: 'Join Amazon\'s startup accelerator environment with access to AWS services and industry experts.'
  },
  {
    id: 'space-5',
    title: 'Salesforce Trailblazer Hub',
    hostId: 'u1',
    type: 'Corporate Hub',
    location: 'New York, NY',
    pricePerMonth: 800,
    pricePerDay: 42,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'
    ],
    amenities: ['WiFi', 'Salesforce Training', 'CRM Access', 'Customer Success Labs', 'Rooftop Terrace'],
    description: 'Learn and grow with Salesforce ecosystem partners in this collaborative Manhattan workspace.'
  },
  {
    id: 'space-6',
    title: 'IBM Watson Studio',
    hostId: 'u1',
    type: 'Corporate Hub',
    location: 'Boston, MA',
    pricePerMonth: 720,
    pricePerDay: 38,
    imageUrls: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'
    ],
    amenities: ['WiFi', 'AI Lab', 'Watson Access', 'Research Library', 'Think Tank Rooms'],
    description: 'Innovation lab focused on AI and machine learning with access to IBM Watson technologies.'
  },

  // PRO WORKSPACES
  {
    id: 'space-7',
    title: 'Creative Commons Loft',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Brooklyn, NY',
    pricePerMonth: 450,
    pricePerDay: 25,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'
    ],
    amenities: ['WiFi', 'Natural Light', 'Art Studios', 'Gallery Space', 'Darkroom'],
    description: 'Inspiring loft space perfect for designers, artists, and creative professionals in trendy Brooklyn.'
  },
  {
    id: 'space-8',
    title: 'The Productive Space',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Chicago, IL',
    pricePerMonth: 380,
    pricePerDay: 22,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800'
    ],
    amenities: ['WiFi', 'Standing Desks', 'Phone Booths', 'Wellness Room', 'Healthy Snacks'],
    description: 'Focus-optimized workspace designed for maximum productivity with wellness-centered amenities.'
  },
  {
    id: 'space-9',
    title: 'Digital Nomad Hub',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Miami, FL',
    pricePerMonth: 520,
    pricePerDay: 28,
    imageUrls: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800'
    ],
    amenities: ['WiFi', 'Ocean View', 'Travel Desk Support', '24/7 Access', 'Coworking Events'],
    description: 'Beachside workspace perfect for remote workers and digital nomads with global community.'
  },
  {
    id: 'space-10',
    title: 'Executive Suites Downtown',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Los Angeles, CA',
    pricePerMonth: 680,
    pricePerDay: 38,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    ],
    amenities: ['WiFi', 'Concierge Service', 'Private Offices', 'Business Lounge', 'Valet Parking'],
    description: 'Professional executive workspace in downtown LA with premium business services and amenities.'
  },
  {
    id: 'space-11',
    title: 'Tech Valley Commons',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Palo Alto, CA',
    pricePerMonth: 590,
    pricePerDay: 32,
    imageUrls: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'
    ],
    amenities: ['WiFi', 'Venture Capital Network', 'Pitch Practice Rooms', 'Legal Clinic', 'Demo Days'],
    description: 'Strategic workspace in Silicon Valley with connections to VCs, accelerators, and tech leaders.'
  },
  {
    id: 'space-12',
    title: 'Green Workspace',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Portland, OR',
    pricePerMonth: 420,
    pricePerDay: 24,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    ],
    amenities: ['WiFi', 'Living Walls', 'Organic Coffee', 'Bike Storage', 'Solar Powered', 'Composting'],
    description: 'Eco-friendly workspace with sustainable practices and biophilic design in green Portland.'
  },

  // BUDGET-FRIENDLY OPTIONS
  {
    id: 'space-13',
    title: 'Startup Garage',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Detroit, MI',
    pricePerMonth: 280,
    pricePerDay: 18,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    ],
    amenities: ['WiFi', 'Maker Space', '3D Printers', 'Workshop Tools', 'Community Kitchen'],
    description: 'Affordable maker space for entrepreneurs and creators in Detroit\'s innovation district.'
  },
  {
    id: 'space-14',
    title: 'Student Union Co-work',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Nashville, TN',
    pricePerMonth: 250,
    pricePerDay: 15,
    imageUrls: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'
    ],
    amenities: ['WiFi', 'Study Groups', 'Tutoring', 'Gaming Area', 'Music Practice Rooms'],
    description: 'Budget-friendly workspace near universities with young entrepreneur community and learning resources.'
  },
  {
    id: 'space-15',
    title: 'Community Workshop',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Phoenix, AZ',
    pricePerMonth: 320,
    pricePerDay: 20,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    ],
    amenities: ['WiFi', 'Workshop Space', 'Tool Library', 'Community Events', 'Flexible Desks'],
    description: 'Collaborative community space perfect for freelancers and small business owners on a budget.'
  }
];

// Comprehensive Booking Products
export const bookingProducts: BookingProduct[] = [
  // Corporate Hubs - Premium options
  { spaceId: 'space-1', type: 'Day Pass', price: 45, quantity: 15, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-1', type: 'Monthly Desk', price: 850, quantity: 8, isAvailable: true, minDuration: '1 month' },
  { spaceId: 'space-1', type: 'Private Office', price: 1200, quantity: 3, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-2', type: 'Day Pass', price: 40, quantity: 12, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-2', type: 'Monthly Desk', price: 750, quantity: 10, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-3', type: 'Day Pass', price: 50, quantity: 10, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-3', type: 'Monthly Desk', price: 950, quantity: 6, isAvailable: true, minDuration: '1 month' },
  { spaceId: 'space-3', type: 'Private Office', price: 1500, quantity: 2, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-4', type: 'Day Pass', price: 35, quantity: 20, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-4', type: 'Monthly Desk', price: 650, quantity: 15, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-5', type: 'Day Pass', price: 42, quantity: 12, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-5', type: 'Monthly Desk', price: 800, quantity: 8, isAvailable: true, minDuration: '1 month' },
  { spaceId: 'space-5', type: 'Private Office', price: 1300, quantity: 4, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-6', type: 'Day Pass', price: 38, quantity: 8, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-6', type: 'Monthly Desk', price: 720, quantity: 6, isAvailable: true, minDuration: '1 month' },
  
  // Pro Workspaces - Flexible options
  { spaceId: 'space-7', type: 'Day Pass', price: 25, quantity: 25, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-7', type: 'Monthly Desk', price: 450, quantity: 12, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-8', type: 'Day Pass', price: 22, quantity: 30, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-8', type: 'Monthly Desk', price: 380, quantity: 15, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-9', type: 'Day Pass', price: 28, quantity: 20, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-9', type: 'Monthly Desk', price: 520, quantity: 10, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-10', type: 'Day Pass', price: 38, quantity: 15, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-10', type: 'Monthly Desk', price: 680, quantity: 8, isAvailable: true, minDuration: '1 month' },
  { spaceId: 'space-10', type: 'Private Office', price: 1100, quantity: 5, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-11', type: 'Day Pass', price: 32, quantity: 18, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-11', type: 'Monthly Desk', price: 590, quantity: 12, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-12', type: 'Day Pass', price: 24, quantity: 22, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-12', type: 'Monthly Desk', price: 420, quantity: 14, isAvailable: true, minDuration: '1 month' },
  
  // Budget-friendly options
  { spaceId: 'space-13', type: 'Day Pass', price: 18, quantity: 35, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-13', type: 'Monthly Desk', price: 280, quantity: 20, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-14', type: 'Day Pass', price: 15, quantity: 40, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-14', type: 'Monthly Desk', price: 250, quantity: 25, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-15', type: 'Day Pass', price: 20, quantity: 30, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-15', type: 'Monthly Desk', price: 320, quantity: 18, isAvailable: true, minDuration: '1 month' }
];

// Comprehensive Reviews
export const reviews: Review[] = [
  { spaceId: 'space-1', userId: 'u3', rating: 5, comment: 'Amazing tech hub with incredible networking opportunities!' },
  { spaceId: 'space-1', userId: 'u5', rating: 4, comment: 'Great facilities and very professional environment.' },
  { spaceId: 'space-2', userId: 'u3', rating: 5, comment: 'Microsoft Reactor is fantastic for learning and growth.' },
  { spaceId: 'space-3', userId: 'u3', rating: 5, comment: 'Google workspace exceeded all expectations!' },
  { spaceId: 'space-4', userId: 'u5', rating: 4, comment: 'Austin vibe is perfect for startup culture.' },
  { spaceId: 'space-5', userId: 'u3', rating: 4, comment: 'Salesforce training opportunities are invaluable.' },
  { spaceId: 'space-6', userId: 'u5', rating: 5, comment: 'AI lab access is a game changer for my projects.' },
  { spaceId: 'space-7', userId: 'u3', rating: 5, comment: 'Brooklyn loft has such inspiring creative energy!' },
  { spaceId: 'space-8', userId: 'u5', rating: 4, comment: 'Perfect for focused work with great wellness amenities.' },
  { spaceId: 'space-9', userId: 'u3', rating: 5, comment: 'Ocean view makes remote work feel like vacation!' },
  { spaceId: 'space-10', userId: 'u5', rating: 4, comment: 'Executive suites are perfect for client meetings.' },
  { spaceId: 'space-11', userId: 'u3', rating: 5, comment: 'VC connections helped scale my startup!' },
  { spaceId: 'space-12', userId: 'u5', rating: 4, comment: 'Love the eco-friendly approach and bike storage.' },
  { spaceId: 'space-13', userId: 'u3', rating: 4, comment: 'Great value for money with amazing maker space!' },
  { spaceId: 'space-14', userId: 'u5', rating: 3, comment: 'Perfect for students and young entrepreneurs.' },
  { spaceId: 'space-15', userId: 'u3', rating: 4, comment: 'Community workshop has great collaborative spirit.' }
];

// Corporate Benefits Program Data
export const companies: Company[] = [
  {
    id: 'company-1',
    name: 'TechCorp Solutions',
    domain: 'techcorp.com',
    logo: '/logos/techcorp.png',
    subscriptionPlan: 'EnterpriseFlex',
    monthlyCredits: 10000,
    usedCredits: 3240,
    employeeCount: 250,
    adminUserId: 'u-corp-admin-1',
    settings: {
      autoApproveBookings: true,
      maxBookingDuration: 30,
      allowedCategories: ['Day Pass', 'Monthly Desk', 'Private Office'],
      budgetAlerts: true
    },
    isActive: true,
    joinedDate: '2024-01-15'
  },
  {
    id: 'company-2',
    name: 'StartupX',
    domain: 'startupx.io',
    logo: '/logos/startupx.png',
    subscriptionPlan: 'StartupFlex',
    monthlyCredits: 500,
    usedCredits: 180,
    employeeCount: 12,
    adminUserId: 'u-corp-admin-2',
    settings: {
      autoApproveBookings: false,
      maxBookingDuration: 14,
      allowedCategories: ['Day Pass', 'Monthly Desk'],
      budgetAlerts: true
    },
    isActive: true,
    joinedDate: '2024-03-01'
  },
  {
    id: 'company-3',
    name: 'ScaleUp Inc',
    domain: 'scaleup.com',
    logo: '/logos/scaleup.png',
    subscriptionPlan: 'ScaleFlex',
    monthlyCredits: 2000,
    usedCredits: 756,
    employeeCount: 85,
    adminUserId: 'u-corp-admin-3',
    settings: {
      autoApproveBookings: true,
      maxBookingDuration: 21,
      allowedCategories: ['Day Pass', 'Monthly Desk'],
      budgetAlerts: false
    },
    isActive: true,
    joinedDate: '2024-02-10'
  }
];

export const corporateUsers: User[] = [
  {
    id: 'u-corp-admin-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    role: 'corporate-admin',
    profileImageUrl: '/profile/sarah.jpg',
    company: 'TechCorp Solutions',
    title: 'VP of Operations',
    bio: 'Ensuring our distributed team has access to world-class workspaces everywhere.'
  },
  {
    id: 'u-corp-emp-1',
    name: 'Michael Chen',
    email: 'michael.chen@techcorp.com',
    role: 'corporate-employee',
    profileImageUrl: '/profile/michael.jpg',
    company: 'TechCorp Solutions',
    title: 'Senior Software Engineer',
    bio: 'Digital nomad developer working from amazing spaces around the world.'
  },
  {
    id: 'u-corp-emp-2',
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@techcorp.com',
    role: 'corporate-employee',
    profileImageUrl: '/profile/emma.jpg',
    company: 'TechCorp Solutions',
    title: 'Product Manager',
    bio: 'Building products while exploring new cities and workspaces.'
  },
  {
    id: 'u-corp-admin-2',
    name: 'David Park',
    email: 'david@startupx.io',
    role: 'corporate-admin',
    profileImageUrl: '/profile/david.jpg',
    company: 'StartupX',
    title: 'Co-Founder & CEO',
    bio: 'Building a global remote-first startup culture.'
  },
  {
    id: 'u-corp-emp-3',
    name: 'Lisa Wang',
    email: 'lisa@startupx.io',
    role: 'corporate-employee',
    profileImageUrl: '/profile/lisa.jpg',
    company: 'StartupX',
    title: 'Lead Designer',
    bio: 'Creating beautiful experiences while working from inspiring spaces.'
  }
];

export const employeeBookings: EmployeeBooking[] = [
  {
    id: 'booking-1',
    employeeId: 'u-corp-emp-1',
    companyId: 'company-1',
    spaceId: 'space-1',
    bookingType: 'Monthly Desk',
    startDate: '2024-07-01',
    endDate: '2024-07-31',
    creditsUsed: 850,
    status: 'active',
    approvedBy: 'u-corp-admin-1'
  },
  {
    id: 'booking-2',
    employeeId: 'u-corp-emp-2',
    companyId: 'company-1',
    spaceId: 'space-3',
    bookingType: 'Day Pass',
    startDate: '2024-07-15',
    endDate: '2024-07-19',
    creditsUsed: 250,
    status: 'completed'
  },
  {
    id: 'booking-3',
    employeeId: 'u-corp-emp-3',
    companyId: 'company-2',
    spaceId: 'space-7',
    bookingType: 'Day Pass',
    startDate: '2024-07-20',
    endDate: '2024-07-20',
    creditsUsed: 35,
    status: 'pending'
  }
];

export const corporateMetrics: CorporateDashboardMetrics[] = [
  {
    companyId: 'company-1',
    month: '2024-07',
    totalBookings: 45,
    activeEmployees: 32,
    creditsUsed: 3240,
    costSavings: 85000,
    popularLocations: ['San Francisco', 'New York', 'Austin'],
    employeeSatisfaction: 4.8
  },
  {
    companyId: 'company-2',
    month: '2024-07',
    totalBookings: 8,
    activeEmployees: 6,
    creditsUsed: 180,
    costSavings: 12000,
    popularLocations: ['Brooklyn', 'Austin'],
    employeeSatisfaction: 4.6
  }
];

// Dummy Matches for Carol (u3)
export const matches: Match[] = [
  { memberId: 'u3', targetUserId: 'u5', matchReason: 'You both love hosting community events.' },
  { memberId: 'u3', targetUserId: 'u1', matchReason: 'Complementary skills in tech and management.' }
];

// Dummy Chat Messages (Carol and Eve)
export const chatMessages: ChatMessage[] = [
  { conversationId: 'u3-u5', senderId: 'u3', message: 'Hi Eve! Excited to connect.', timestamp: '2025-07-16T09:00:00Z' },
  { conversationId: 'u3-u5', senderId: 'u5', message: 'Hi Carol! Welcome to WorkspacePro.', timestamp: '2025-07-16T09:01:00Z' },
  { conversationId: 'u3-u5', senderId: 'u3', message: 'Looking forward to the next event!', timestamp: '2025-07-16T09:02:00Z' }
];

// Helper Functions for Pricing Display
export const getSpacePricing = (spaceId: string) => {
  const spaceBookings = bookingProducts.filter(bp => bp.spaceId === spaceId && bp.isAvailable);
  
  if (spaceBookings.length === 0) return null;
  
  // Prioritize Day Pass for display if available, otherwise Monthly
  const dayPass = spaceBookings.find(bp => bp.type === 'Day Pass');
  const monthlyDesk = spaceBookings.find(bp => bp.type === 'Monthly Desk');
  const privateOffice = spaceBookings.find(bp => bp.type === 'Private Office');
  
  // Return the most relevant pricing option
  if (dayPass) {
    return {
      price: dayPass.price,
      type: 'day',
      label: '/day',
      available: spaceBookings.map(bp => bp.type)
    };
  } else if (monthlyDesk) {
    return {
      price: monthlyDesk.price,
      type: 'month',
      label: '/month',
      available: spaceBookings.map(bp => bp.type)
    };
  } else if (privateOffice) {
    return {
      price: privateOffice.price,
      type: 'month',
      label: '/month',
      available: spaceBookings.map(bp => bp.type)
    };
  }
  
  return null;
};

export const getAvailableBookingTypes = (spaceId: string) => {
  return bookingProducts
    .filter(bp => bp.spaceId === spaceId && bp.isAvailable)
    .map(bp => ({
      type: bp.type,
      price: bp.price,
      minDuration: bp.minDuration
    }));
};
