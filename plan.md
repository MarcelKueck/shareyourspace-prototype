# ShareYourSpace 2.0: Frontend Prototype Development Plan

**Objective:** To build a high-fidelity, interactive frontend prototype using Next.js, Tailwind CSS, and dummy data. The application will be fully responsive and deployable to Vercel.

**Guiding Principle:** Emulate the "Airbnb look and feel"—clean, spacious, photo-first, intuitive, and trustworthy.

**Strategic Focus:** The prototype now emphasizes our **four target group experiences** with dedicated pages and user journeys for Individual Professionals (`/members`), Workspace Hosts (`/hosts`), Enterprise Companies (`/enterprise`), and Platform Admins.

---

## ⭐ **NEW: Target Group Strategy Implementation**

The prototype is organized around four distinct user experiences:

1. **Individual Professionals** (`/members`) - Freelancers, remote workers, startup founders, digital nomads
2. **Workspace Hosts** (`/hosts`) - Corporate hosts and professional space providers  
3. **Enterprise Companies** (`/enterprise`) - **FLAGSHIP: WorkFlex Benefits Program**
4. **Platform Administration** - Marketplace oversight and management

Each target group has a dedicated landing page, tailored user journey, and specialized dashboard experience.

---

## Phase 0: Project Foundation & Setup

*(**Goal:** Initialize the project, install all necessary tools, and create the central dummy data file.)*

**Prompt 0.1: Project Initialization**
"Initialize a new Next.js project named `shareyourspace-prototype` in this directory. Use TypeScript, Tailwind CSS, and the App Router. Also, initialize a new Git repository for it."

**Prompt 0.2: Installing Dependencies**
"We need to add a few libraries to our project. Please install the following dependencies:
*   `zustand` for state management.
*   `framer-motion` for animations.
*   `recharts` for admin dashboard charts.
*   `lucide-react` for a high-quality icon library."

**Prompt 0.3: Folder Structure**
"Create a standard, organized folder structure inside the `app/` directory. The structure should be:
*   `components/` (for reusable UI components)
    *   `global/` (for sitewide components like Header, Footer)
    *   `ui/` (for small, generic components like custom buttons or cards)
    *   `pages/` (for components specific to a single page)
*   `lib/` (for helper functions and our dummy data)
*   `store/` (for our Zustand state management store)"

**Prompt 0.4: Tailwind CSS Configuration**
"Let's configure Tailwind CSS for a clean, Airbnb-like aesthetic. Open `tailwind.config.ts` and extend the theme. Add a custom font family (e.g., Inter), and define a primary brand color. For now, let's use a modern, trustworthy blue, but we can change it later. Also, ensure the JIT compiler is configured to scan all our component directories for class names."

**Prompt 0.5: Enhanced Dummy Data Structure (The "Brain" of the Prototype)**
"This is a critical step. Create a new file at `lib/dummy-data.ts`. In this file, define and export a comprehensive set of dummy data. The structure should include:
1.  An array of `User` objects. Each user needs an `id`, `name`, `email`, `role` (`corporate-host`, `pro-provider`, `member`, `sys-admin`, `hub-ambassador`, `corporate-admin`, `corporate-employee`), `profileImageUrl`, `company`, `title`, and `bio`. Create at least one of each role.
2.  An array of `Space` objects. Each space needs an `id`, `title`, `hostId` (linking to a User), `type` (`Corporate Hub` or `Pro Workspace`), `location`, `pricePerMonth`, `pricePerDay`, an array of `imageUrls`, an array of `amenities`, and a `description`.
3.  An array of `BookingProduct` objects for each space, detailing `type` (Day Pass, Monthly Desk), `price`, and `quantity`.
4.  An array of `Review` objects, each with a `spaceId`, `userId`, `rating`, and `comment`.
5.  An array of `Match` objects for a specific member, each with a `targetUserId` and a hardcoded `matchReason`.
6.  An array of `ChatMessage` objects for a specific conversation, creating a scripted dialogue.
7.  **NEW:** `Company` objects for the WorkFlex Benefits program with subscription plans, credit allowances, and settings.
8.  **NEW:** `EmployeeBooking` objects linking corporate employees to workspace bookings using company credits.
9.  **NEW:** `CorporateDashboardMetrics` objects showing usage analytics, cost savings, and employee satisfaction data."

**Prompt 0.6: Global State Management (Zustand)**
"Create a new file at `store/authStore.ts`. Set up a Zustand store to handle our simulated authentication. The store should contain:
*   `isAuthenticated`: a boolean.
*   `currentUser`: a `User` object or `null`.
*   A `login` function that takes a user `email`, finds the corresponding user in our `dummy-data.ts` file, and sets `isAuthenticated` to true and `currentUser` to that user object.
*   A `logout` function that resets the store to its initial state."

---

## Phase 1: Global Components & Public Pages

*(**Goal:** Build the main public-facing parts of the application to establish the visual identity.)*

**Prompt 1.1: Header and Footer**
"Create two new components: `Header.tsx` and `Footer.tsx` inside `app/components/global/`.
*   **Header:** It should be clean and sticky, with the logo on the left. On the right, include 'List Your Space' and a user profile icon button that will later trigger the login modal.
*   **Footer:** A simple, multi-column footer with dummy links for 'Company', 'Explore', and 'Support'.
*   Now, integrate both into the main `app/layout.tsx` so they appear on every page."

**Prompt 1.2: The Homepage (Feature G-1)**
"Let's build the homepage at `app/page.tsx`.
1.  Create a visually stunning hero section with a full-width background image/video and the central search bar on top.
2.  Below the hero, create a `DiscoverySection` component that takes a title (e.g., "Explore Corporate Hubs") and a list of spaces from our dummy data, and renders them in a horizontally scrolling carousel of `SpaceCard` components.
3.  Use this `DiscoverySection` component three times on the homepage for different categories of spaces."

**Prompt 1.3: The Reusable Space Card Component**
"Create a new component `app/components/ui/SpaceCard.tsx`. This card is crucial for the Airbnb feel. It should display:
1.  A high-quality image with a subtle 'heart' icon for wishlisting.
2.  The space title and location in clean typography.
3.  The price per month.
4.  A dummy star rating."

**Prompt 1.4: The Space Listing Page (Feature G-3)**
"Create a dynamic page at `app/spaces/[id]/page.tsx`.
1.  Fetch the space data from `dummy-data.ts` based on the `id` from the URL.
2.  The top of the page should be a beautiful, responsive photo gallery.
3.  Below the gallery, create a two-column layout.
4.  **Left Column:** Display the listing title, host information (differentiating between Corporate Host and Pro Workspace with its Hub Ambassador), description, amenities, and dummy reviews.
5.  **Right Column (Desktop):** Create a sticky `BookingWidget.tsx` component. This widget should let the user select a booking type (Day Pass/Monthly), show the calculated price, and have a 'Book Now' button."

**Prompt 1.5: The Login/Signup Modal (Feature G-4)**
"Create a reusable `AuthModal.tsx` component.
1.  When the user profile icon in the header is clicked, this modal should appear.
2.  It should have tabs for 'Log In' and 'Sign Up'.
3.  The 'Log In' tab has fields for email and password. When a user logs in with a dummy email, it should call the `authStore.login()` function and close the modal.
4.  The 'Sign Up' flow should be simulated, eventually leading to a login action."

---

## Phase 2: The "Community Member" Authenticated Journey

*(**Goal:** Build the complete, seamless experience for a logged-in freelancer or startup member.)*

**Prompt 2.1: Member Dashboard Layout**
"Create a new layout for authenticated users. It should include a sidebar navigation with icons for 'Dashboard', 'Discover', 'Messages', and 'My Account'. This layout should wrap all pages under a new `/member` route group."

**Prompt 2.2: The Member Dashboard Page (Feature M-1)**
"Create the main dashboard page at `app/member/dashboard/page.tsx`.
1.  It should pull the `currentUser` from the `authStore` to display a personalized welcome message.
2.  Display a prominent 'Booking Status' widget.
3.  The main feature should be a horizontally scrolling module titled 'Discover New Connections', which renders a list of `MatchCard` components based on dummy data."

**Prompt 2.3: The Reusable Match Card Component (Feature M-2a)**
"Create a new component `app/components/ui/MatchCard.tsx`. This card should display:
1.  The user's profile picture, name, and role.
2.  The hardcoded `matchReason` from our dummy data, styled as a prominent quote to highlight it.
3.  A 'Connect' button that, when clicked, changes its own state to 'Request Sent' (client-side only)."

**Prompt 2.4: The High-Fidelity Chat Simulation (Feature M-3)**
"Create a new page at `app/member/messages/page.tsx`.
1.  Implement a two-panel layout. The left panel lists all of the user's 'connections' from the dummy data.
2.  Clicking a connection opens the conversation in the right panel.
3.  The right panel should display the scripted conversation from `dummy-data.ts` in a beautiful chat bubble interface.
4.  Include a text input at the bottom. Typing and sending a message should add it to the chat UI instantly."

---

## Phase 3: The "Host" Authenticated Experience

*(**Goal:** Build the tailored dashboards and tools for both types of hosts.)*

**Prompt 3.1: The Host Dashboard Shell**
"Create a new route group at `/host`. The main page, `/host/dashboard/page.tsx`, should be a smart component. It should check the `currentUser.role` from the `authStore`.
*   If the role is `corporate-host`, render a `<CorporateHostDashboard />` component.
*   If the role is `pro-provider`, render a `<ProfessionalProviderDashboard />` component."

**Prompt 3.2: The Corporate Host Dashboard (Feature H-2)**
"Create the `CorporateHostDashboard.tsx` component.
1.  It should focus on 'Community & Synergy' widgets.
2.  The hero feature is the 'AI Recruiting Agent'. This is a text area where the user can type. Clicking 'Search' will show a loading animation and then display a pre-defined list of dummy user results, demonstrating the feature."

**Prompt 3.3: The Professional Provider Dashboard (Feature H-3)**
"Create the `ProfessionalProviderDashboard.tsx` component.
1.  It should focus on 'Business Performance' widgets like Occupancy and Revenue.
2.  If the dummy data indicates multiple properties, show a 'Portfolio View'.
3.  Include a module for the 'AI Anchor Tenant Finder' and a simple section showing the profile of their assigned 'Hub Ambassador'."

**Prompt 3.4: Common Host Tools (Feature H-1)**
"Create a new page at `/host/listings/page.tsx`.
1.  This page should display a list of the host's properties from the dummy data.
2.  Include a prominent section for the 'Availability & Pricing Engine', a UI that clearly shows the different booking products (Day Pass, etc.) and allows for (simulated) editing of price and quantity."

---

## 🚀 **NEW Phase 4: Target Group Experiences**

*(**Goal:** Create dedicated pages and user journeys for each of our four target groups.)*

**Prompt 4.1: Individual Professionals Page (`/members`)**
"Create a comprehensive `/members/page.tsx` that showcases our value proposition for individual professionals:
1. Hero section with member type selector (Freelancers, Remote Workers, Startup Founders, Digital Nomads)
2. Dynamic content that adapts based on selected member type
3. Benefits showcase (Premium Amenities, Professional Network, Flexible Booking, Vetted Community)
4. Featured workspace previews with pricing
5. Membership plan comparison (Explorer, Professional, Executive)
6. Strong call-to-action to join the community"

**Prompt 4.2: Workspace Hosts Page (`/hosts`)**
"Create a dynamic `/hosts/page.tsx` that serves both Corporate Hosts and Professional Space Providers:
1. Hero section with host type toggle (Corporate Host vs Professional Provider)
2. Dynamic benefits section that changes based on selected host type
3. Success stories showcasing real revenue examples
4. 'How It Works' process explanation
5. Feature comparison between host types
6. Dual call-to-action for both host types"

**Prompt 4.3: Enterprise Landing Page (`/enterprise`)** ⭐ **FLAGSHIP FEATURE**
"Create a comprehensive `/enterprise/page.tsx` showcasing our WorkFlex Benefits program:
1. Hero section with compelling enterprise messaging and statistics
2. Benefits showcase (Zero Employee Friction, Complete Cost Control, Enterprise Security, Global Access)
3. Use case scenarios (Distributed Teams, Business Travel, Project Teams, Talent Acquisition)
4. Three-tier pricing display (StartupFlex, ScaleFlex, EnterpriseFlex)
5. Success metrics and testimonials
6. Strong enterprise-focused call-to-action with trial offers"

**Prompt 4.4: Corporate Onboarding Flow**
"Create `CorporateOnboardingModal.tsx` component for enterprise customer onboarding:
1. Multi-step wizard (Company Info, Admin Contact, Plan Selection, Policy Configuration)
2. Plan comparison with features and pricing
3. Policy configuration (auto-approval, booking duration limits, allowed categories)
4. Professional, enterprise-grade UI design
5. Integration with dummy corporate data"

**Prompt 4.5: Corporate Dashboard & Employee Experience**
"Create `CorporateDashboard.tsx` and `EmployeeBookingWidget.tsx`:
1. Corporate admin dashboard with usage analytics, cost tracking, employee management
2. Employee booking widget with company credit integration
3. Policy enforcement and approval workflows
4. Credit utilization tracking and budget alerts
5. Real-time usage metrics and ROI calculations"

**Prompt 4.6: Homepage Navigation Update**
"Update the homepage to include target group navigation:
1. Add navigation links in Header.tsx for /members, /hosts, /enterprise
2. Replace corporate benefits section with target group quick access cards
3. Each card should have distinct messaging and call-to-action for its target group
4. Emphasize the enterprise offering as the flagship feature"

---

## 🔄 **Updated Phase 5: Platform Admin & Data Enhancement**

*(**Goal:** Polish the application, enhance data management, and get it live on the web.)*

**Prompt 5.1: Admin Dashboard Enhancements**
"Revamp the admin dashboard at `/admin/dashboard/page.tsx`:
1.  Incorporate new KPI charts and tables for user and listing statistics.
2.  Add date range filtering and export options for reports.
3.  Implement a notification system for admin alerts (e.g., new user sign-ups, listing approvals)."

**Prompt 5.2: Admin Management Tables**
"Create pages under `/admin` for 'Users' and 'Listings'. Each page should display a clean, searchable table of all the corresponding items from our dummy data, with buttons for simulated actions like 'Verify' or 'Feature'."

**Prompt 5.3: Corporate Data Integration**
"Integrate dummy corporate data for enterprise features:
1.  Pre-fill corporate onboarding flow with sample data for demonstration.
2.  Populate corporate dashboard with usage analytics and employee data."

**Prompt 5.4: Responsiveness Check**
"Let's go through every page and component we've built (`HomePage`, `ListingPage`, `Dashboard`, etc.) and ensure they are fully responsive. Use Tailwind's responsive breakpoints (`sm`, `md`, `lg`) to adjust layouts for mobile, tablet, and desktop. The mobile experience should be as clean and usable as the desktop one."

**Prompt 5.5: Adding Motion & Polish**
"Now, let's use `framer-motion` to add subtle, professional animations to elevate the user experience.
1.  Animate the appearance of cards in the `DiscoverySection` and `MatchCard` grids using a staggered fade-in effect.
2.  Add a smooth transition effect to page changes.
3.  Animate the opening and closing of modals."

**Prompt 5.6: Deployment to Vercel**
"This project is ready for deployment.
1.  Push the entire project to a new GitHub repository.
2.  Log in to Vercel and create a new project, importing from that GitHub repository.
3.  Vercel should automatically detect that it's a Next.js project and configure the build settings correctly.
4.  Deploy the project. Once it's live, provide me with the final URL."