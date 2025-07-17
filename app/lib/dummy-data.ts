// lib/dummy-data.ts

export type UserRole = 'corporate-host' | 'pro-provider' | 'member' | 'sys-admin' | 'hub-ambassador';

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
  type: 'Day Pass' | 'Monthly Desk';
  price: number;
  quantity: number;
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
  }
];

// Dummy Spaces
export const spaces: Space[] = [
  {
    id: 's1',
    title: 'TechCorp Downtown Hub',
    hostId: 'u1',
    type: 'Corporate Hub',
    location: 'Downtown City',
    pricePerMonth: 600,
    pricePerDay: 30,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    amenities: ['WiFi', 'Coffee', 'Meeting Rooms', '24/7 Access'],
    description: 'A vibrant corporate hub in the heart of downtown.'
  },
  {
    id: 's2',
    title: 'WorkspacePro Loft',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Uptown',
    pricePerMonth: 500,
    pricePerDay: 25,
    imageUrls: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800'
    ],
    amenities: ['WiFi', 'Snacks', 'Phone Booths', 'Community Events'],
    description: 'A modern loft for creative professionals.'
  },
  {
    id: 's3',
    title: 'Innovation Lab',
    hostId: 'u1',
    type: 'Corporate Hub',
    location: 'Tech District',
    pricePerMonth: 800,
    pricePerDay: 40,
    imageUrls: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800'
    ],
    amenities: ['WiFi', 'Whiteboards', 'Printer', 'Standing Desks'],
    description: 'State-of-the-art workspace with cutting-edge technology.'
  },
  {
    id: 's4',
    title: 'Creative Commons',
    hostId: 'u2',
    type: 'Pro Workspace',
    location: 'Arts Quarter',
    pricePerMonth: 450,
    pricePerDay: 22,
    imageUrls: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'
    ],
    amenities: ['WiFi', 'Natural Light', 'Kitchen', 'Rooftop Access'],
    description: 'Inspiring workspace for creative minds and artists.'
  }
];

// Dummy Booking Products
export const bookingProducts: BookingProduct[] = [
  { spaceId: 's1', type: 'Day Pass', price: 30, quantity: 10 },
  { spaceId: 's1', type: 'Monthly Desk', price: 600, quantity: 5 },
  { spaceId: 's2', type: 'Day Pass', price: 25, quantity: 8 },
  { spaceId: 's2', type: 'Monthly Desk', price: 500, quantity: 4 }
];

// Dummy Reviews
export const reviews: Review[] = [
  { spaceId: 's1', userId: 'u3', rating: 5, comment: 'Amazing vibe and great coffee! The team at TechCorp was super welcoming and the workspace had everything I needed.' },
  { spaceId: 's1', userId: 'u5', rating: 4, comment: 'Great location downtown and excellent amenities. Perfect for client meetings.' },
  { spaceId: 's2', userId: 'u3', rating: 5, comment: 'Loved the community events and the creative atmosphere. Eve was an amazing host!' },
  { spaceId: 's2', userId: 'u1', rating: 4, comment: 'Beautiful loft space with lots of natural light. Great for focused work.' },
  { spaceId: 's3', userId: 'u3', rating: 5, comment: 'State-of-the-art technology and incredible workspace design. Highly recommend!' },
  { spaceId: 's4', userId: 'u5', rating: 4, comment: 'Perfect for creative work with inspiring surroundings and great community.' }
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
