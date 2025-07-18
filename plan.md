# ShareYourSpace 2.0: Frontend Prototype Development Plan

**Objective:** To build a high-fidelity, interactive frontend prototype using Next.js, Tailwind CSS, and dummy data. The application will be fully responsive and deployable to Vercel.

**Guiding Principle:** Emulate the "Airbnb look and feel"—clean, spacious, photo-first, intuitive, and trustworthy.

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

**Prompt 0.5: Dummy Data Structure (The "Brain" of the Prototype)**
"This is a critical step. Create a new file at `lib/dummy-data.ts`. In this file, define and export a comprehensive set of dummy data. The structure should include:
1.  An array of `User` objects. Each user needs an `id`, `name`, `email`, `role` (`corporate-host`, `pro-provider`, `member`, `corporate-employee`, `corporate-admin`, `corporate-executive`, `sys-admin`, `hub-ambassador`), `profileImageUrl`, `company`, `companyId`, `title`, `bio`, `corporateBenefits`, and `allowanceRemaining`. Create at least one of each role including corporate employees from different company sizes.
2.  An array of `Space` objects. Each space needs an `id`, `title`, `hostId` (linking to a User), `type` (`Corporate Hub` or `Pro Workspace`), `location`, `pricePerMonth`, `pricePerDay`, an array of `imageUrls`, an array of `amenities`, `description`, `teamCapacity`, and `corporateHostBenefits` (for cross-benefits).
3.  An array of `Company` objects with `id`, `name`, `domain`, `subscriptionPlan`, `employeeCount`, `monthlyAllowance`, `hostingRevenue`, `earnedCredits`, `isHost`, and `crossBenefits`.
4.  An array of `BookingProduct` objects for each space, detailing `type` (Day Pass, Monthly Desk, Team Room), `price`, `quantity`, and `teamSize`.
5.  An array of `CorporateBooking` objects for team bookings with `id`, `spaceId`, `teamLeadId`, `teamMembers`, `billingType` (corporate/mixed), and `coordinationDetails`.
6.  An array of `Review` objects, each with a `spaceId`, `userId`, `rating`, and `comment`.
7.  An array of `Match` objects for a specific member, each with a `targetUserId` and a hardcoded `matchReason`.
8.  An array of `ChatMessage` objects for a specific conversation, creating a scripted dialogue."

**Prompt 0.6: Global State Management (Zustand)**
"Create a new file at `store/authStore.ts`. Set up a Zustand store to handle our simulated authentication. The store should contain:
*   `isAuthenticated`: a boolean.
*   `currentUser`: a `User` object or `null`.
*   `corporateAllowance`: tracking remaining corporate workspace credits.
*   `isTeamBooking`: boolean for team booking mode.
*   `selectedCompany`: for corporate admin switching between company accounts.
*   A `login` function that takes a user `email`, finds the corresponding user in our `dummy-data.ts` file, sets `isAuthenticated` to true and `currentUser` to that user object, and loads corporate benefits if applicable.
*   A `logout` function that resets the store to its initial state.
*   Corporate-specific functions: `updateCorporateAllowance`, `enableTeamBooking`, `switchCompany` for corporate admin users."

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
3.  Use this `DiscoverySection` component three times on the homepage for different categories of spaces.
4.  Add a 'Corporate Solutions' section highlighting workspace benefits for different company sizes (startups, mid-size, enterprise) with value propositions and 'Host & Use' dual-role messaging."

**Prompt 1.3: The Reusable Space Card Component**
"Create a new component `app/components/ui/SpaceCard.tsx`. This card is crucial for the Airbnb feel. It should display:
1.  A high-quality image with a subtle 'heart' icon for wishlisting.
2.  The space title and location in clean typography.
3.  The price per month and team capacity indicators.
4.  A dummy star rating.
5.  Corporate badges ('Verified Corporate Host', 'Team Workspace Available') and cross-benefits indicators where applicable."

**Prompt 1.4: The Space Listing Page (Feature G-3)**
"Create a dynamic page at `app/spaces/[id]/page.tsx`.
1.  Fetch the space data from `dummy-data.ts` based on the `id` from the URL.
2.  The top of the page should be a beautiful, responsive photo gallery.
3.  Below the gallery, create a two-column layout.
4.  **Left Column:** Display the listing title, host information (differentiating between Corporate Host and Pro Workspace with its Hub Ambassador), description, amenities, team capacity, and dummy reviews.
5.  **Right Column (Desktop):** Create a sticky `BookingWidget.tsx` component. This widget should let the user select a booking type (Day Pass/Monthly/Team Room), show team size options, display corporate coverage indicators ('Covered by [Company]'), show the calculated price, and have a 'Book Now' or 'Book for Team' button. Include cross-benefits display for corporate host employees."

**Prompt 1.5: The Login/Signup Modal (Feature G-4)**
"Create a reusable `AuthModal.tsx` component.
1.  When the user profile icon in the header is clicked, this modal should appear.
2.  It should have tabs for 'Log In' and 'Sign Up'.
3.  The 'Log In' tab has fields for email and password. When a user logs in with a dummy email, it should call the `authStore.login()` function and close the modal.
4.  The 'Sign Up' flow should be simulated with corporate email detection (@company.com domains) and intelligent routing to appropriate user types (Member, Corporate Host, Pro Provider, Corporate Employee).
5.  Include guided setup flows for corporate accounts wanting to provide employee benefits, host unused space, or both.
6.  Auto-redirect corporate employees to benefits dashboard after signup with corporate email recognition."

---

## Phase 2: The "Community Member" & Corporate Employee Authenticated Journey

*(**Goal:** Build the complete, seamless experience for logged-in members, including freelancers, startup members, and corporate employees with workspace benefits.)*

**Prompt 2.1: Member Dashboard Layout**
"Create a new layout for authenticated users. It should include a sidebar navigation with icons for 'Dashboard', 'Discover', 'Messages', 'Team Bookings' (for corporate employees), and 'My Account'. This layout should wrap all pages under a new `/member` route group. For corporate employees, add corporate benefits status indicators and 'Book for Team' quick actions."

**Prompt 2.2: The Member Dashboard Page (Feature M-1)**
"Create the main dashboard page at `app/member/dashboard/page.tsx`.
1.  It should pull the `currentUser` from the `authStore` to display a personalized welcome message.
2.  Display a prominent 'Booking Status' widget.
3.  The main feature should be a horizontally scrolling module titled 'Discover New Connections', which renders a list of `MatchCard` components based on dummy data.
4.  For corporate employees, add corporate benefits widgets showing allowance status, usage tracking, company-covered booking history, and cross-benefits if their company is also a host (earned credits, discounts)."

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

**Prompt 2.5: Team Booking Interface (Feature CE-2)**
"Create a new page at `app/member/team-bookings/page.tsx` for corporate employees.
1.  Implement an Airbnb-style group booking interface with team member invitation system.
2.  Support mixed billing coordination (corporate coverage for employees, individual payment for external collaborators).
3.  Include team workspace filtering based on capacity requirements.
4.  Add shared itinerary and coordination tools for team planning.
5.  Show clear billing breakdown with 'Covered by [Company]' indicators for corporate portions."

---

## Phase 3: The "Host" & Corporate Admin Authenticated Experience

*(**Goal:** Build the tailored dashboards and tools for both types of hosts, plus corporate admin capabilities for companies managing employee workspace benefits.)*

**Prompt 3.1: The Host Dashboard Shell**
"Create a new route group at `/host`. The main page, `/host/dashboard/page.tsx`, should be a smart component. It should check the `currentUser.role` from the `authStore`.
*   If the role is `corporate-host`, render a `<CorporateHostDashboard />` component.
*   If the role is `pro-provider`, render a `<ProfessionalProviderDashboard />` component.
*   If the role is `corporate-admin` or `corporate-executive`, render a `<CorporateAdminDashboard />` component with tabbed interface: 'Overview', 'Space Provider' (if also hosting), 'Employee Benefits', 'Account Settings'."

**Prompt 3.2: The Corporate Host Dashboard (Feature H-2)**
"Create the `CorporateHostDashboard.tsx` component.
1.  It should focus on 'Community & Synergy' widgets.
2.  The hero feature is the 'AI Recruiting Agent'. This is a text area where the user can type. Clicking 'Search' will show a loading animation and then display a pre-defined list of dummy user results, demonstrating the feature.
3.  Add dual-role features: employee workspace usage analytics, hosting revenue → employee credits conversion, cross-benefits earned (host discounts, priority access), and 'Manage Employee Benefits' quick access panel."

**Prompt 3.3: The Professional Provider Dashboard (Feature H-3)**
"Create the `ProfessionalProviderDashboard.tsx` component.
1.  It should focus on 'Business Performance' widgets like Occupancy and Revenue.
2.  If the dummy data indicates multiple properties, show a 'Portfolio View'.
3.  Include a module for the 'AI Anchor Tenant Finder' and a simple section showing the profile of their assigned 'Hub Ambassador'."

**Prompt 3.4: Common Host Tools (Feature H-1)**
"Create a new page at `/host/listings/page.tsx`.
1.  This page should display a list of the host's properties from the dummy data.
2.  Include a prominent section for the 'Availability & Pricing Engine', a UI that clearly shows the different booking products (Day Pass, Team Room, etc.) and allows for (simulated) editing of price and quantity."

**Prompt 3.5: Corporate Admin Management Pages (Features CA-2, CA-3, CA-4)**
"Create corporate admin management pages:
1.  `/host/employees/page.tsx` - Employee benefits management with allowance settings, bulk onboarding, usage tracking, and spend controls with auto-approval limits.
2.  `/host/analytics/page.tsx` - Usage analytics showing employee booking patterns, space utilization, cost analysis, and cross-benefits reporting (hosting revenue, earned credits, host discounts).
3.  `/host/team-bookings/page.tsx` - Manage and coordinate team workspace bookings with approval workflows and coordination tools.
4.  `/host/policies/page.tsx` - Location restrictions, approval workflows, and corporate policy enforcement settings."

---

## Phase 4: The "Platform Admin" View

*(**Goal:** Demonstrate the oversight capabilities for the ShareYourSpace team.)*

**Prompt 4.1: The Admin Dashboard**
"Create a new route group `/admin`. The main page at `/admin/dashboard/page.tsx` should be protected, only rendering if the `currentUser.role` is `sys-admin`.
1.  The dashboard should feature large, clear charts using the `recharts` library, visualizing the KPI data from `dummy-data.ts`.
2.  Include widgets that compare the performance of 'Corporate Hubs' vs. 'Pro Workspaces'.
3.  Add corporate subscription analytics, revenue tracking from corporate accounts, dual-role company performance metrics, and cross-benefits system health monitoring."

**Prompt 4.2: Admin Management Tables**
"Create pages under `/admin` for 'Users', 'Listings', and 'Corporate Accounts'. Each page should display a clean, searchable table of all the corresponding items from our dummy data, with buttons for simulated actions like 'Verify' or 'Feature'. Add corporate-specific management: corporate accounts with subscription status, employee benefits usage monitoring, cross-benefits system auditing, and team booking coordination tools."

---

## Phase 5: Finalization & Deployment

*(**Goal:** Polish the application and get it live on the web.)*

**Prompt 5.1: Responsiveness Check**
"Let's go through every page and component we've built (`HomePage`, `ListingPage`, `Dashboard`, `CorporateAdminDashboard`, `TeamBookingInterface`, etc.) and ensure they are fully responsive. Use Tailwind's responsive breakpoints (`sm`, `md`, `lg`) to adjust layouts for mobile, tablet, and desktop. The mobile experience should be as clean and usable as the desktop one. Pay special attention to corporate dashboard tabbed interfaces, team booking coordination flows, and corporate admin tools."

**Prompt 5.2: Adding Motion & Polish**
"Now, let's use `framer-motion` to add subtle, professional animations to elevate the user experience.
1.  Animate the appearance of cards in the `DiscoverySection` and `MatchCard` grids using a staggered fade-in effect.
2.  Add a smooth transition effect to page changes.
3.  Animate the opening and closing of modals.
4.  Add corporate-specific animations: corporate benefits allowance progress animations, team booking coordination flow transitions, cross-benefits earning celebrations (hosting revenue → credits), and corporate dashboard switching animations."

**Prompt 5.3: Deployment to Vercel**
"This project is ready for deployment.
1.  Push the entire project to a new GitHub repository.
2.  Log in to Vercel and create a new project, importing from that GitHub repository.
3.  Vercel should automatically detect that it's a Next.js project and configure the build settings correctly.
4.  Deploy the project. Once it's live, provide me with the final URL."

---

## Phase 6: Corporate Integration & Testing

*(**Goal:** Validate corporate features and ensure seamless integration with existing functionality.)*

**Prompt 6.1: Corporate User Journey Testing**
"Test complete corporate user journeys to ensure all features work cohesively:
1.  Corporate employee signup → benefits recognition → team booking → workspace usage flow
2.  Company setup → dual-role configuration (hosting + employee benefits) → cross-benefits earning and redemption
3.  Mixed team booking coordination across different company types and individual users
4.  Corporate admin permission boundaries and access controls validation
5.  Cross-benefits calculations and display accuracy throughout the platform"

**Prompt 6.2: Corporate Feature Integration Validation**
"Validate that corporate features integrate seamlessly with existing platform functionality:
1.  Ensure corporate data flows correctly through all user interfaces without breaking existing features
2.  Test that corporate authentication and benefits don't interfere with regular member experiences  
3.  Verify that corporate admin tools maintain proper access controls and data isolation
4.  Confirm that team booking billing coordination works accurately for mixed group scenarios
5.  Validate that corporate dashboard switching and role-based UI adaptation works smoothly"

---

## Phase 7: Corporate Documentation & Marketing Materials

*(**Goal:** Create comprehensive documentation and marketing materials for corporate features.)*

**Prompt 7.1: Corporate Sales & Marketing Materials**
"Create corporate-focused marketing materials within the application:
1.  Enhanced corporate landing pages with ROI calculators and subscription tier comparisons
2.  Case study templates showing dual-role company benefits and cross-benefits examples
3.  'Workspace Anywhere' job listing integration examples and employee benefit showcase
4.  Corporate onboarding video walkthroughs and feature demonstration materials"

**Prompt 7.2: Corporate Feature Documentation**
"Document corporate features for different stakeholder groups:
1.  Corporate admin user guides covering employee benefits management, allowance settings, and policy controls
2.  Employee onboarding guides for corporate workspace benefits and team booking coordination
3.  Cross-benefits system explanation with optimization tips for dual-role companies
4.  Integration roadmap documentation for future HR system connections and advanced features"