// lib/dummy-data.ts

export type UserRole = 'corporate-host' | 'pro-provider' | 'member' | 'corporate-employee' | 'corporate-admin' | 'corporate-executive' | 'sys-admin' | 'hub-ambassador';

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
  subscriptionPlan: 'Startup Pack' | 'Growth Pack' | 'Enterprise Pack' | 'Enterprise Unlimited';
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
  teamCapacity?: number;
  corporateHostBenefits?: {
    isVerifiedHost: boolean;
    offersEmployeeBenefits: boolean;
    crossBenefitsAvailable: boolean;
  };
}

export interface BookingProduct {
  spaceId: string;
  type: 'Hourly Pass' | 'Day Pass' | 'Monthly Desk' | 'Private Office' | 'Team Room';
  price: number;
  quantity: number;
  isAvailable: boolean;
  minDuration?: string; // e.g., '2 hours', '1 day', '1 week', '1 month'
  teamSize?: number; // for Team Room bookings
}

export interface CorporateBooking {
  id: string;
  spaceId: string;
  teamLeadId: string;
  teamMembers: string[]; // array of user IDs
  billingType: 'corporate' | 'mixed' | 'individual';
  coordinationDetails: {
    startDate: string;
    endDate: string;
    purpose: string;
    notes: string;
  };
  corporateCoverage: {
    companyId: string;
    coveredMembers: string[];
    totalCost: number;
    companyCoveredAmount: number;
  };
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

// Dummy Companies - German Market Focus
export const companies: Company[] = [
  {
    id: 'comp-1',
    name: 'SAP Deutschland',
    domain: 'sap.com',
    subscriptionPlan: 'Enterprise Pack',
    employeeCount: 250,
    monthlyAllowance: 1500,
    hostingRevenue: 12500,
    earnedCredits: 1250,
    isHost: true,
    crossBenefits: {
      hostDiscount: 15,
      priorityAccess: true,
      verifiedBadge: true
    }
  },
  {
    id: 'comp-2',
    name: 'Berlin Startup Hub',
    domain: 'berlinStartup.de',
    subscriptionPlan: 'Startup Pack',
    employeeCount: 15,
    monthlyAllowance: 100,
    hostingRevenue: 0,
    earnedCredits: 0,
    isHost: false,
    crossBenefits: {
      hostDiscount: 0,
      priorityAccess: false,
      verifiedBadge: false
    }
  },
  {
    id: 'comp-3',
    name: 'Siemens Digital',
    domain: 'siemens.com',
    subscriptionPlan: 'Growth Pack',
    employeeCount: 85,
    monthlyAllowance: 400,
    hostingRevenue: 6800,
    earnedCredits: 680,
    isHost: true,
    crossBenefits: {
      hostDiscount: 15,
      priorityAccess: true,
      verifiedBadge: true
    }
  },
  {
    id: 'comp-4',
    name: 'Deutsche Bank',
    domain: 'db.com',
    subscriptionPlan: 'Enterprise Unlimited',
    employeeCount: 500,
    monthlyAllowance: 2000,
    hostingRevenue: 0,
    earnedCredits: 0,
    isHost: false,
    crossBenefits: {
      hostDiscount: 0,
      priorityAccess: false,
      verifiedBadge: false
    }
  },
  {
    id: 'comp-5',
    name: 'Delivery Hero',
    domain: 'deliveryhero.com',
    subscriptionPlan: 'Growth Pack',
    employeeCount: 120,
    monthlyAllowance: 600,
    hostingRevenue: 3200,
    earnedCredits: 320,
    isHost: true,
    crossBenefits: {
      hostDiscount: 10,
      priorityAccess: true,
      verifiedBadge: true
    }
  },
  {
    id: 'comp-6',
    name: 'Rocket Internet',
    domain: 'rocket-internet.com',
    subscriptionPlan: 'Enterprise Pack',
    employeeCount: 180,
    monthlyAllowance: 900,
    hostingRevenue: 15000,
    earnedCredits: 1500,
    isHost: true,
    crossBenefits: {
      hostDiscount: 20,
      priorityAccess: true,
      verifiedBadge: true
    }
  }
];

// Dummy Users
export const users: User[] = [
  {
    id: 'u1',
    name: 'Alice Corporate',
    email: 'alice@techcorp.com',
    role: 'corporate-host',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b5e1b8dc?w=150&h=150&fit=crop&crop=face',
    company: 'TechCorp',
    companyId: 'comp-1',
    title: 'Office Manager',
    bio: 'Building a culture of innovation at TechCorp.',
    corporateBenefits: {
      hasAccess: true,
      allowanceRemaining: 800,
      monthlyAllowance: 1000,
      usedThisMonth: 200
    }
  },
  {
    id: 'u2',
    name: 'Bob Provider',
    email: 'bob@provider.com',
    role: 'pro-provider',
    profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    company: 'WorkspacePro',
    title: 'Property Manager',
    bio: 'Maximizing value for workspace owners.'
  },
  {
    id: 'u3',
    name: 'Carol Member',
    email: 'carol@startupx.io',
    role: 'corporate-employee',
    profileImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    company: 'StartupX',
    companyId: 'comp-2',
    title: 'Founder',
    bio: 'Connecting with innovators everywhere.',
    corporateBenefits: {
      hasAccess: true,
      allowanceRemaining: 75,
      monthlyAllowance: 100,
      usedThisMonth: 25
    }
  },
  {
    id: 'u4',
    name: 'Dave Admin',
    email: 'dave@sysadmin.com',
    role: 'sys-admin',
    profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    company: 'ShareYourSpace',
    title: 'Platform Admin',
    bio: 'Ensuring a safe and thriving marketplace.'
  },
  {
    id: 'u5',
    name: 'Eve Ambassador',
    email: 'eve@proworkspace.com',
    role: 'hub-ambassador',
    profileImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    company: 'WorkspacePro',
    title: 'Hub Ambassador',
    bio: 'Fostering community at WorkspacePro.'
  },
  {
    id: 'u6',
    name: 'Frank Corporate Admin',
    email: 'frank@sap.com',
    role: 'corporate-admin',
    profileImageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    company: 'SAP SE',
    companyId: 'comp-1',
    title: 'HR Director',
    bio: 'Managing workspace benefits for SAP employees.',
    corporateBenefits: {
      hasAccess: true,
      allowanceRemaining: 1200,
      monthlyAllowance: 1200,
      usedThisMonth: 0
    }
  },
  {
    id: 'u7',
    name: 'Grace Executive',
    email: 'grace@db.com',
    role: 'corporate-executive',
    profileImageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    company: 'Deutsche Bank',
    companyId: 'comp-4',
    title: 'VP Operations',
    bio: 'Strategic oversight of global workspace initiatives.',
    corporateBenefits: {
      hasAccess: true,
      allowanceRemaining: 2000,
      monthlyAllowance: 2000,
      usedThisMonth: 0
    }
  },
  {
    id: 'u8',
    name: 'Henry Remote',
    email: 'henry@rocket-internet.com',
    role: 'corporate-employee',
    profileImageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
    company: 'Rocket Internet',
    companyId: 'comp-2',
    title: 'Senior Developer',
    bio: 'Remote developer who loves flexible workspace options.',
    corporateBenefits: {
      hasAccess: true,
      allowanceRemaining: 320,
      monthlyAllowance: 400,
      usedThisMonth: 80
    }
  },
  {
    id: 'u9',
    name: 'Iris Freelancer',
    email: 'iris@freelancer.com',
    role: 'member',
    profileImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    company: 'Independent',
    title: 'UX Designer',
    bio: 'Independent designer seeking collaborative workspaces.'
  },
  {
    id: 'u10',
    name: 'Jack Team Lead',
    email: 'jack@siemens.com',
    role: 'corporate-employee',
    profileImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    company: 'Siemens Digital',
    companyId: 'comp-3',
    title: 'Product Manager',
    bio: 'Leading cross-functional teams and organizing offsites.',
    corporateBenefits: {
      hasAccess: true,
      allowanceRemaining: 450,
      monthlyAllowance: 600,
      usedThisMonth: 150
    }
  },
  {
    id: 'u11',
    name: 'Klaus Müller',
    email: 'klaus@n26.com',
    role: 'corporate-employee',
    profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    company: 'N26',
    companyId: 'comp-6',
    title: 'Senior Software Engineer',
    bio: 'Fintech developer passionate about workspace flexibility.',
    corporateBenefits: {
      hasAccess: true,
      allowanceRemaining: 200,
      monthlyAllowance: 280,
      usedThisMonth: 80
    }
  },
  {
    id: 'u12',
    name: 'Sabine Weber',
    email: 'sabine@deliveryhero.com',
    role: 'corporate-employee',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
    company: 'Delivery Hero',
    companyId: 'comp-5',
    title: 'Product Designer',
    bio: 'Creating user experiences for food delivery platforms.',
    corporateBenefits: {
      hasAccess: true,
      allowanceRemaining: 150,
      monthlyAllowance: 300,
      usedThisMonth: 150
    }
  },
  {
    id: 'u13',
    name: 'Stefan Hoffmann',
    email: 'stefan@autoscout24.com',
    role: 'corporate-employee',
    profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    company: 'AutoScout24',
    companyId: 'comp-7',
    title: 'Data Scientist',
    bio: 'Analyzing automotive market trends and user behavior.',
    corporateBenefits: {
      hasAccess: true,
      allowanceRemaining: 120,
      monthlyAllowance: 180,
      usedThisMonth: 60
    }
  },
  {
    id: 'u14',
    name: 'Lisa Schmidt',
    email: 'lisa@berlinstartup.de',
    role: 'corporate-employee',
    profileImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    company: 'Berlin Startup Hub',
    companyId: 'comp-8',
    title: 'Community Manager',
    bio: 'Building connections in Berlin startup ecosystem.',
    corporateBenefits: {
      hasAccess: true,
      allowanceRemaining: 40,
      monthlyAllowance: 85,
      usedThisMonth: 45
    }
  }
];

// Dummy Spaces - German Market Focus
export const spaces: Space[] = [
  // CORPORATE HUBS
  {
    id: 'space-1',
    title: 'SAP Innovation Hub Berlin',
    hostId: 'u1',
    type: 'Corporate Hub',
    location: 'Berlin Mitte, Deutschland',
    pricePerMonth: 720,
    pricePerDay: 38,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    ],
    amenities: ['Schnelles WLAN', 'Kaffee-Lounge', 'Besprechungsräume', '24/7 Zugang', 'Parkplatz', 'Fitnessraum'],
    description: 'Modernes Tech-Hub in Berlin Mitte mit innovativen Einrichtungen und lebendiger Startup-Szene.',
    teamCapacity: 25,
    corporateHostBenefits: {
      isVerifiedHost: true,
      offersEmployeeBenefits: true,
      crossBenefitsAvailable: true
    }
  },
  {
    id: 'space-2',
    title: 'Rocket Internet Campus',
    hostId: 'u1',
    type: 'Corporate Hub',
    location: 'Berlin Kreuzberg, Deutschland',
    pricePerMonth: 650,
    pricePerDay: 35,
    imageUrls: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'
    ],
    amenities: ['Highspeed Internet', 'Event Space', 'Mentoring', 'Tech Talks', 'Küche', 'Schließfächer'],
    description: 'Rockets Community Hub für Entwickler und Unternehmer mit erstklassigen Mentoring-Programmen.',
    teamCapacity: 20,
    corporateHostBenefits: {
      isVerifiedHost: true,
      offersEmployeeBenefits: true,
      crossBenefitsAvailable: true
    }
  },
  {
    id: 'space-3',
    title: 'Siemens Digital Factory',
    hostId: 'u1',
    type: 'Corporate Hub',
    location: 'München, Deutschland',
    pricePerMonth: 780,
    pricePerDay: 42,
    imageUrls: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'
    ],
    amenities: ['Glasfaser Internet', 'Massage Räume', 'Ruhezonen', 'Gourmet Café', 'Fahrradverleih', 'Meditationsraum'],
    description: 'Erleben Sie Siemens innovative Arbeitskultur in diesem Premium-Campus-Workspace mit erstklassigen Annehmlichkeiten.',
    teamCapacity: 30,
    corporateHostBenefits: {
      isVerifiedHost: true,
      offersEmployeeBenefits: true,
      crossBenefitsAvailable: true
    }
  },
  {
    id: 'space-4',
    title: 'N26 Fintech Hub',
    hostId: 'u1',
    type: 'Corporate Hub',
    location: 'Berlin Friedrichshain, Deutschland',
    pricePerMonth: 580,
    pricePerDay: 32,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    ],
    amenities: ['WiFi', 'Fintech Labs', 'Product Labs', 'Mentoring', 'Demo Days', 'Networking Events'],
    description: 'Schließen Sie sich N26s Fintech-Accelerator-Umgebung an mit Zugang zu Banking-Services und Branchenexperten.',
    corporateHostBenefits: {
      isVerifiedHost: true,
      offersEmployeeBenefits: true,
      crossBenefitsAvailable: true
    }
  },
  {
    id: 'space-5',
    title: 'Delivery Hero Tech Campus',
    hostId: 'u1',
    type: 'Corporate Hub',
    location: 'Berlin Prenzlauer Berg, Deutschland',
    pricePerMonth: 690,
    pricePerDay: 37,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'
    ],
    amenities: ['WiFi', 'Food Tech Labs', 'Delivery Platform Access', 'Customer Labs', 'Dachterrasse'],
    description: 'Lernen und wachsen Sie mit Delivery Hero Ecosystem-Partnern in diesem kollaborativen Berliner Workspace.',
    corporateHostBenefits: {
      isVerifiedHost: true,
      offersEmployeeBenefits: true,
      crossBenefitsAvailable: true
    }
  },
  {
    id: 'space-6',
    title: 'AutoScout24 Automotive Hub',
    hostId: 'u1',
    type: 'Corporate Hub',
    location: 'München Maxvorstadt, Deutschland',
    pricePerMonth: 620,
    pricePerDay: 34,
    imageUrls: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'
    ],
    amenities: ['WiFi', 'Automotive Lab', 'Test Drive Access', 'Research Library', 'Innovation Räume'],
    description: 'Innovations-Labor für Automobilindustrie mit Zugang zu AutoScout24 Technologien und Marktdaten.',
    corporateHostBenefits: {
      isVerifiedHost: true,
      offersEmployeeBenefits: true,
      crossBenefitsAvailable: true
    }
  },

  // PRO WORKSPACES
  {
    id: 'space-7',
    title: 'Kreativloft Hackescher Markt',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Berlin Mitte, Deutschland',
    pricePerMonth: 420,
    pricePerDay: 24,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'
    ],
    amenities: ['WiFi', 'Natürliches Licht', 'Ateliers', 'Ausstellungsraum', 'Dunkelkammer'],
    description: 'Inspirierender Loft-Raum perfekt für Designer, Künstler und Kreative in trendigem Berlin-Mitte.'
  },
  {
    id: 'space-8',
    title: 'Produktivraum Hamburg',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Hamburg Speicherstadt, Deutschland',
    pricePerMonth: 360,
    pricePerDay: 21,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800'
    ],
    amenities: ['WiFi', 'Stehpulte', 'Telefonkabinen', 'Wellness Raum', 'Gesunde Snacks'],
    description: 'Fokus-optimierter Arbeitsplatz für maximale Produktivität mit wellness-orientierten Annehmlichkeiten.'
  },
  {
    id: 'space-9',
    title: 'Digital Nomad Hub Köln',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Köln Ehrenfeld, Deutschland',
    pricePerMonth: 480,
    pricePerDay: 26,
    imageUrls: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800'
    ],
    amenities: ['WiFi', 'Rheinblick', 'Travel Desk Support', '24/7 Zugang', 'Coworking Events'],
    description: 'Arbeitsplatz mit Rheinblick perfekt für Remote Worker und Digital Nomads mit globaler Community.'
  },
  {
    id: 'space-10',
    title: 'Executive Suites Frankfurt',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Frankfurt Westend, Deutschland',
    pricePerMonth: 650,
    pricePerDay: 36,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    ],
    amenities: ['WiFi', 'Concierge Service', 'Private Büros', 'Business Lounge', 'Valet Parking'],
    description: 'Professioneller Executive Arbeitsplatz in Frankfurt Westend mit Premium Business Services.'
  },
  {
    id: 'space-11',
    title: 'Tech Valley Dresden',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Dresden Neustadt, Deutschland',
    pricePerMonth: 520,
    pricePerDay: 29,
    imageUrls: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'
    ],
    amenities: ['WiFi', 'Venture Capital Network', 'Pitch Practice Rooms', 'Legal Clinic', 'Demo Days'],
    description: 'Strategischer Arbeitsplatz in Dresdens Silicon Saxony mit Verbindungen zu VCs und Tech-Leadern.'
  },
  {
    id: 'space-12',
    title: 'Green Workspace Freiburg',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Freiburg Vauban, Deutschland',
    pricePerMonth: 390,
    pricePerDay: 22,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    ],
    amenities: ['WiFi', 'Grüne Wände', 'Bio-Kaffee', 'Fahrradstellplatz', 'Solar betrieben', 'Kompostierung'],
    description: 'Umweltfreundlicher Arbeitsplatz mit nachhaltigen Praktiken und biophilem Design im grünen Freiburg.'
  },

  // BUDGET-FRIENDLY OPTIONS
  {
    id: 'space-13',
    title: 'Startup Garage Leipzig',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Leipzig Plagwitz, Deutschland',
    pricePerMonth: 260,
    pricePerDay: 16,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    ],
    amenities: ['WiFi', 'Maker Space', '3D Drucker', 'Workshop Tools', 'Gemeinschaftsküche'],
    description: 'Günstiger Maker Space für Unternehmer und Kreative in Leipzig Plagwitz.'
  },
  {
    id: 'space-14',
    title: 'Student Co-Working Hannover',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Hannover Linden, Deutschland',
    pricePerMonth: 230,
    pricePerDay: 14,
    imageUrls: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'
    ],
    amenities: ['WiFi', 'Lerngruppen', 'Nachhilfe', 'Gaming Bereich', 'Musikübungsräume'],
    description: 'Günstiger Arbeitsplatz in Universitätsnähe mit junger Unternehmer-Community und Lernressourcen.'
  },
  {
    id: 'space-15',
    title: 'Community Workshop Stuttgart',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Stuttgart Ost, Deutschland',
    pricePerMonth: 300,
    pricePerDay: 18,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    ],
    amenities: ['WiFi', 'Workshop Space', 'Tool Library', 'Community Events', 'Flexible Desks'],
    description: 'Kollaborativer Community-Raum perfekt für Freelancer und kleine Unternehmen mit Budget-Fokus.'
  }
];

// Comprehensive Booking Products
export const bookingProducts: BookingProduct[] = [
  // Corporate Hubs - Premium options with hourly rates
  { spaceId: 'space-1', type: 'Hourly Pass', price: 8, quantity: 25, isAvailable: true, minDuration: '2 hours' },
  { spaceId: 'space-1', type: 'Day Pass', price: 45, quantity: 15, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-1', type: 'Monthly Desk', price: 850, quantity: 8, isAvailable: true, minDuration: '1 month' },
  { spaceId: 'space-1', type: 'Private Office', price: 1200, quantity: 3, isAvailable: true, minDuration: '1 month' },
  { spaceId: 'space-1', type: 'Team Room', price: 50, quantity: 2, isAvailable: true, minDuration: '2 hours', teamSize: 8 },
  
  { spaceId: 'space-2', type: 'Hourly Pass', price: 7, quantity: 30, isAvailable: true, minDuration: '2 hours' },
  { spaceId: 'space-2', type: 'Day Pass', price: 40, quantity: 12, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-2', type: 'Monthly Desk', price: 750, quantity: 10, isAvailable: true, minDuration: '1 month' },
  { spaceId: 'space-2', type: 'Team Room', price: 45, quantity: 1, isAvailable: true, minDuration: '2 hours', teamSize: 6 },
  
  { spaceId: 'space-3', type: 'Hourly Pass', price: 9, quantity: 20, isAvailable: true, minDuration: '2 hours' },
  { spaceId: 'space-3', type: 'Day Pass', price: 50, quantity: 10, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-3', type: 'Monthly Desk', price: 950, quantity: 6, isAvailable: true, minDuration: '1 month' },
  { spaceId: 'space-3', type: 'Private Office', price: 1500, quantity: 2, isAvailable: true, minDuration: '1 month' },
  { spaceId: 'space-3', type: 'Team Room', price: 60, quantity: 3, isAvailable: true, minDuration: '2 hours', teamSize: 10 },
  
  { spaceId: 'space-4', type: 'Hourly Pass', price: 6, quantity: 35, isAvailable: true, minDuration: '2 hours' },
  { spaceId: 'space-4', type: 'Day Pass', price: 35, quantity: 20, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-4', type: 'Monthly Desk', price: 650, quantity: 15, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-5', type: 'Hourly Pass', price: 7.5, quantity: 25, isAvailable: true, minDuration: '2 hours' },
  { spaceId: 'space-5', type: 'Day Pass', price: 42, quantity: 12, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-5', type: 'Monthly Desk', price: 800, quantity: 8, isAvailable: true, minDuration: '1 month' },
  { spaceId: 'space-5', type: 'Private Office', price: 1300, quantity: 4, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-6', type: 'Hourly Pass', price: 6.5, quantity: 30, isAvailable: true, minDuration: '2 hours' },
  { spaceId: 'space-6', type: 'Day Pass', price: 38, quantity: 8, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-6', type: 'Monthly Desk', price: 720, quantity: 6, isAvailable: true, minDuration: '1 month' },
  
  // Pro Workspaces - Flexible options with hourly rates
  { spaceId: 'space-7', type: 'Hourly Pass', price: 4, quantity: 40, isAvailable: true, minDuration: '2 hours' },
  { spaceId: 'space-7', type: 'Day Pass', price: 25, quantity: 25, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-7', type: 'Monthly Desk', price: 450, quantity: 12, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-8', type: 'Hourly Pass', price: 3.5, quantity: 45, isAvailable: true, minDuration: '2 hours' },
  { spaceId: 'space-8', type: 'Day Pass', price: 22, quantity: 30, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-8', type: 'Monthly Desk', price: 380, quantity: 15, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-9', type: 'Hourly Pass', price: 4.5, quantity: 35, isAvailable: true, minDuration: '2 hours' },
  { spaceId: 'space-9', type: 'Day Pass', price: 28, quantity: 20, isAvailable: true, minDuration: '1 day' },
  { spaceId: 'space-9', type: 'Monthly Desk', price: 520, quantity: 10, isAvailable: true, minDuration: '1 month' },
  
  { spaceId: 'space-10', type: 'Hourly Pass', price: 6, quantity: 25, isAvailable: true, minDuration: '2 hours' },
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
  { spaceId: 'space-1', userId: 'u3', rating: 5, comment: 'Fantastisches Tech-Hub mit unglaublichen Networking-Möglichkeiten!' },
  { spaceId: 'space-1', userId: 'u5', rating: 4, comment: 'Tolle Einrichtungen und sehr professionelle Atmosphäre.' },
  { spaceId: 'space-2', userId: 'u3', rating: 5, comment: 'Rocket Internet Campus ist fantastisch für Lernen und Wachstum.' },
  { spaceId: 'space-3', userId: 'u3', rating: 5, comment: 'Siemens Digital Factory hat alle Erwartungen übertroffen!' },
  { spaceId: 'space-4', userId: 'u5', rating: 4, comment: 'Berlin Vibe ist perfekt für Fintech-Startup-Kultur.' },
  { spaceId: 'space-5', userId: 'u3', rating: 4, comment: 'Delivery Hero Trainingsmöglichkeiten sind unbezahlbar.' },
  { spaceId: 'space-6', userId: 'u5', rating: 5, comment: 'AutoScout24 Lab-Zugang ist ein Game Changer für meine Projekte.' },
  { spaceId: 'space-7', userId: 'u3', rating: 5, comment: 'Hackescher Markt Loft hat so inspirierende kreative Energie!' },
  { spaceId: 'space-8', userId: 'u5', rating: 4, comment: 'Perfekt für fokussiertes Arbeiten mit tollen Wellness-Angeboten.' },
  { spaceId: 'space-9', userId: 'u3', rating: 5, comment: 'Rheinblick macht Remote Work wie Urlaub!' },
  { spaceId: 'space-10', userId: 'u5', rating: 4, comment: 'Executive Suites sind perfekt für Kundentermine.' },
  { spaceId: 'space-11', userId: 'u3', rating: 5, comment: 'VC-Verbindungen haben geholfen, mein Startup zu skalieren!' },
  { spaceId: 'space-12', userId: 'u5', rating: 4, comment: 'Liebe den umweltfreundlichen Ansatz und Fahrradstellplätze.' },
  { spaceId: 'space-13', userId: 'u3', rating: 4, comment: 'Tolles Preis-Leistungs-Verhältnis mit fantastischem Maker Space!' },
  { spaceId: 'space-14', userId: 'u5', rating: 3, comment: 'Perfekt für Studenten und junge Unternehmer.' },
  { spaceId: 'space-15', userId: 'u3', rating: 4, comment: 'Community Workshop hat tollen kollaborativen Geist.' }
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

// Corporate Team Bookings
export const corporateBookings: CorporateBooking[] = [
  {
    id: 'booking-1',
    spaceId: 'space-1',
    teamLeadId: 'u10',
    teamMembers: ['u10', 'u8', 'u9'], // Jack (TechCorp), Henry (InnovateLabs), Iris (Freelancer)
    billingType: 'mixed',
    coordinationDetails: {
      startDate: '2025-07-25',
      endDate: '2025-07-27',
      purpose: 'Cross-company collaboration sprint',
      notes: 'Joint project between TechCorp and InnovateLabs with external UX consultant'
    },
    corporateCoverage: {
      companyId: 'comp-1',
      coveredMembers: ['u10'],
      totalCost: 600,
      companyCoveredAmount: 200
    }
  },
  {
    id: 'booking-2',
    spaceId: 'space-3',
    teamLeadId: 'u3',
    teamMembers: ['u3', 'u8'],
    billingType: 'corporate',
    coordinationDetails: {
      startDate: '2025-08-01',
      endDate: '2025-08-03',
      purpose: 'StartupX team offsite planning session',
      notes: 'Strategic planning and team building activities'
    },
    corporateCoverage: {
      companyId: 'comp-2',
      coveredMembers: ['u3'],
      totalCost: 500,
      companyCoveredAmount: 250
    }
  }
];

// Helper Functions for Corporate Features
export const getCompanyByDomain = (email: string): Company | null => {
  const domain = email.split('@')[1];
  return companies.find(company => company.domain === domain) || null;
};

// Popular search suggestions for homepage
export const popularSearches = [
  'Hourly Pass in Berlin',
  'Corporate Hubs in Berlin',
  'Day Pass in Frankfurt',
  'Monthly Desks in Hamburg',
  'Private Offices in Köln'
];

// Trusted company logos for homepage
export const trustedCompanies = [
  'SAP',
  'Siemens', 
  'Deutsche Bank',
  'Rocket Internet'
];

// Demo account information for AuthModal
export const demoAccounts = [
  { email: 'alice@sap.com', role: 'Corporate Host' },
  { email: 'bob@provider.com', role: 'Pro Provider' },
  { email: 'carol@berlinstartup.de', role: 'Corporate Employee' },
  { email: 'dave@sysadmin.com', role: 'Platform Admin' },
  { email: 'frank@sap.com', role: 'Corporate Admin' },
  { email: 'grace@db.com', role: 'Corporate Executive' },
  { email: 'henry@rocket-internet.com', role: 'Corporate Employee' },
  { email: 'iris@freelancer.com', role: 'Independent Member' }
];

// Corporate statistics for homepage
export const corporateStats = {
  partnerCompanies: '250+',
  teamBookings: '800K+', 
  costSavings: '78%',
  globalCities: '25+'
};

export const getUserCorporateBenefits = (userId: string) => {
  const user = users.find(u => u.id === userId);
  return user?.corporateBenefits || null;
};

export const getCompanyById = (companyId: string): Company | null => {
  return companies.find(company => company.id === companyId) || null;
};

export const isUserCorporateEmployee = (userId: string): boolean => {
  const user = users.find(u => u.id === userId);
  return user?.role === 'corporate-employee' || user?.role === 'corporate-admin' || user?.role === 'corporate-executive';
};

export const getTeamBookingsByUser = (userId: string): CorporateBooking[] => {
  return corporateBookings.filter(booking => 
    booking.teamLeadId === userId || booking.teamMembers.includes(userId)
  );
};

export const getSpaceTeamCapacity = (spaceId: string): number => {
  const space = spaces.find(s => s.id === spaceId);
  return space?.teamCapacity || 1;
};

export const hasHostBenefits = (spaceId: string): boolean => {
  const space = spaces.find(s => s.id === spaceId);
  return space?.corporateHostBenefits?.crossBenefitsAvailable || false;
};
