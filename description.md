## **ShareYourSpace 2.0: Prototype Application Specification**

**Version:** 1.2
**Document Purpose:** To provide a complete and detailed description of the ShareYourSpace 2.0 high-fidelity frontend prototype. This document serves as the primary context for AI-assisted development and as a comprehensive guide for human stakeholders. It outlines the project's vision, target user groups, core problems and solutions, and a systematic breakdown of every feature.

---

### **1. The Core Vision & Concept**

**ShareYourSpace 2.0 is the "Airbnb for the Modern Workforce."**

We are a marketplace platform designed to solve the problem of underutilized commercial space while simultaneously addressing the modern professional's need for flexibility and community. We transform static, empty desks into dynamic, revenue-generating assets for space providers and offer inspiring, community-driven workspaces for individuals and teams.

Our key differentiator is our focus on **curated community and flexible access**. We don't just list spaces; we empower providers to build thriving ecosystems and use intelligent matching to help members forge valuable professional connections.

**This document describes a frontend-only prototype.** All functionality is simulated on the client-side using a comprehensive dummy data file. The primary goal is to demonstrate a realistic, compelling, and beautiful user experience.

### **2. The Platform Ecosystem: User Groups**

Our marketplace is built around a clear set of user roles, each with distinct goals and motivations. **We now serve four primary target groups through dedicated experiences:**

#### **Target Group 1: Individual Professionals (Members)**
*Served through: `/members` page and member dashboard*

*   **The Freelancer/Consultant**
    *   **Who they are:** Independent professionals across various fields (design, development, consulting, writing)
    *   **Their Problem:** Working from home is isolating, cafes are unreliable, and traditional co-working is expensive with long commitments
    *   **Our Solution:** Flexible workspace access from 1 hour to 12 months, professional networking, no long-term commitments

*   **The Remote Worker**  
    *   **Who they are:** Employees of companies with distributed teams who need occasional professional workspace
    *   **Their Problem:** Need professional environment for important calls, meetings, and focused work periods
    *   **Our Solution:** On-demand access to premium workspaces when working from home isn't sufficient

*   **The Digital Nomad**
    *   **Who they are:** Location-independent professionals who travel while working
    *   **Their Problem:** Unreliable internet and workspace quality while traveling
    *   **Our Solution:** Vetted, professional spaces with guaranteed quality in every destination

*   **The Startup Founder**
    *   **Who they are:** Early-stage entrepreneurs building their companies
    *   **Their Problem:** Can't commit to expensive co-working spaces before knowing team size needs
    *   **Our Solution:** Scale workspace access as the startup grows, networking with other entrepreneurs

#### **Target Group 2: Workspace Hosts**
*Served through: `/hosts` page with dual focus*

*   **The Corporate Host**
    *   **Who they are:** A business (e.g., a tech company, a law firm) with extra desks in their active, operational office. They are on-site and part of the community.
    *   **Their Problem:** Empty desks are a sunk cost and create a sterile environment. They want to generate revenue while also building an innovative ecosystem that can create synergies with their own employees.
    *   **Our Solution:** We give them tools to monetize their space and an **A.I. Recruiting Agent** to find specific talent that aligns with their company's goals. Their listings are badged as **"Corporate Hubs."**

*   **The Professional Space Provider**
    *   **Who they are:** A landlord, property manager, or real estate investor managing a dedicated workspace property. Their primary motivation is financial return and efficient management.
    *   **Their Problem:** Maximizing occupancy, managing logistics, and marketing a property is complex. Empty spaces are pure financial losses.
    *   **Our Solution:** We provide powerful marketplace tools to manage pricing, availability, and bookings efficiently. Our **Hub Ambassador Program** solves the community management challenge, making their property more attractive. Their listings are badged as **"Pro Workspaces."**

#### **Target Group 3: Enterprise Companies** ⭐ **NEW FLAGSHIP OFFERING**
*Served through: `/enterprise` page and corporate dashboard*

*   **The Corporate Benefits Buyer**
    *   **Who they are:** HR leaders, People Operations, and C-suite executives at companies of all sizes (5 to 5000+ employees)
    *   **Their Problem:** Distributed teams need workspace flexibility, but managing individual bookings, expense reports, and procurement is administratively complex and expensive
    *   **Our Solution:** **WorkFlex Benefits Program** - workspace access as an employee benefit with three tiers:
        - **StartupFlex** ($20/employee/month): 25 credits, basic features for 5-50 employees  
        - **ScaleFlex** ($35/employee/month): 50 credits, priority booking, account management for 50-500 employees
        - **EnterpriseFlex** (Custom pricing): Unlimited access, SSO, white-label options for 500+ employees

*   **The Corporate Employee**
    *   **Who they are:** Employees of companies that offer WorkFlex benefits
    *   **Their Problem:** Need professional workspace while traveling, working remotely, or during office renovations
    *   **Our Solution:** Seamless booking using company credits - no personal payment, no expense reports, instant approval

#### **Platform Role**

*   **The ShareYourSpace Admin**
    *   **Who they are:** A member of the ShareYourSpace founding team.
    *   **Their Goal:** To oversee the health, growth, and quality of the entire marketplace, ensuring a safe and prosperous environment for all users.

---

### **3. Detailed Feature Breakdown**

This section details every component and screen of the prototype, **now organized around our four target group experiences.**

#### **Part 1: The Global Platform Experience**

*   **[G-1] Homepage:** The main entry point with target group navigation. Features a hero section with central search, and dedicated sections showcasing different user paths (Members, Hosts, Enterprise).
*   **[G-2] Search Results Page:** A split-screen view with an interactive map on the right and a filterable list of `SpaceCard` components on the left. Filters include Booking Type, Host Type, Price, and Amenities.
*   **[G-3] Space Listing Page:** The "product page" for a space.
    *   **Visuals:** A beautiful, Airbnb-style photo gallery is the hero element.
    *   **Information Hierarchy:** Clearly displays the space title, location, and host information. Differentiates between a **"Corporate Hub"** (showing the host company's brand) and a **"Pro Workspace"** (showing the provider's brand alongside the on-site **Hub Ambassador's** profile).
    *   **Booking Widget:** A sticky component allowing users to select a booking type (Day Pass, Monthly Desk, etc.), see the price, and simulate a booking. **For corporate employees, shows company credit integration.**
    *   **Details:** Includes tabs for a full description, amenities, and (dummy) reviews.
*   **[G-4] Onboarding Flow:** A simulated, modal-based system for login and signup. The signup flow intelligently directs users down the correct path (Member, Corporate Host, Pro Provider, or Corporate Employee).

#### **Part 2: Individual Professional Experience (`/members`)**

*   **[M-1] Members Landing Page:** Dedicated page showcasing different professional types (freelancers, remote workers, startup founders, digital nomads) with tailored messaging for each.
*   **[M-2] Personalized Dashboard:** The member's welcome screen. It leads with the **"Discover Connections"** module and includes a clear widget showing their current booking status and on-site contact (either the Host or the Hub Ambassador).
*   **[M-3] Discovery & Matching Engine:** The core member feature. A visually engaging grid or carousel of `MatchCard` components. Each card displays another member's profile and, crucially, a hardcoded **"Match Reason"** that explains the suggested connection (e.g., "Complementary skills").
*   **[M-4] Connection & Chat Simulation:** A seamless flow from clicking "Connect" on a Match Card to opening a high-fidelity, simulated chat interface. The chat history is pre-scripted to demonstrate a story of successful collaboration.
*   **[M-5] Account Management:** Includes sections for viewing booking history, (simulating) profile edits, and accessing the Referral Program page with a unique code and tracker for earned rewards.

#### **Part 3: Host Experience (`/hosts`)**

*   **[H-1] Hosts Landing Page:** Dynamic page that adapts based on host type selection (Corporate Host vs Professional Provider) with tailored benefits, success stories, and onboarding flows.
*   **[H-2] The Tailored Host Dashboard:** The dashboard's UI and widgets adapt to the host's role.
    *   **Corporate Host View:** Focuses on community health and synergy. Features the **"A.I. Recruiting Agent"** to find talent that can collaborate with their own team.
    *   **Professional Provider View:** Focuses on business metrics like Occupancy and Revenue. Features the **"A.I. Anchor Tenant Finder"** to attract stable, long-term members.
*   **[H-3] The Listings & Pricing Manager:** A unified, intuitive tool for *all* hosts. This is where they manage their space's photos, descriptions, and, most importantly, define their **"Booking Products"**—setting the price and quantity for Day Passes, Monthly Desks, etc.
*   **[H-4] The Host Inbox & Earnings:** A unified inbox for all member communications and a clean dashboard showing a breakdown of (dummy) earnings.

#### **Part 4: Enterprise Experience (`/enterprise`)** ⭐ **NEW FLAGSHIP FEATURE**

*   **[E-1] Enterprise Landing Page:** Comprehensive page showcasing WorkFlex Benefits program with three-tier pricing (StartupFlex, ScaleFlex, EnterpriseFlex), ROI calculators, and enterprise-focused messaging.
*   **[E-2] Corporate Onboarding Modal:** Multi-step onboarding flow for companies including company information, admin setup, plan selection, and policy configuration.
*   **[E-3] Corporate Dashboard:** Enterprise admin interface showing:
    *   **Usage Analytics:** Employee adoption rates, credit utilization, popular locations
    *   **Cost Management:** Real-time spending, budget alerts, cost savings vs traditional office
    *   **Employee Management:** Active users, booking approvals, policy enforcement
    *   **ROI Tracking:** Comprehensive metrics demonstrating value of the program
*   **[E-4] Employee Booking Widget:** Specialized booking interface for corporate employees showing:
    *   **Company Credit Integration:** Booking using company credits instead of personal payment
    *   **Policy Compliance:** Automatic enforcement of company booking policies
    *   **Approval Workflows:** Integration with company approval processes
    *   **Zero-Friction Experience:** No expense reports or personal financial burden

#### **Part 5: The Platform Admin Journey**

*   **[SYS-1] The Marketplace Health Dashboard:** A "God's-eye view" of the entire platform. Features `recharts`-powered visualizations of KPIs, including a breakdown of revenue and growth by Host Type ("Corporate Hubs" vs. "Pro Workspaces") **and new Corporate Benefits revenue streams.**
*   **[SYS-2] Central Management Modules:** A series of clean, powerful tables for managing all users, listings, **corporate accounts,** and the **Hub Ambassador Program**. Includes simulated actions like "Feature Listing," "Assign Ambassador," and **"Manage Corporate Plans."**
*   **[SYS-3] Trust & Safety Queues:** UI mockups of a moderation queue for user reports and a feedback inbox, demonstrating the platform's commitment to quality and safety.

---

### **4. The "Brain" of the Prototype: Dummy Data Specification**

All interactivity is driven by a single, well-structured file located at `lib/dummy-data.ts`. This file exports all necessary data structures, including:

*   **`users`:** An array of user objects with `id`, `name`, `email`, `role`, `profileImageUrl`, etc.
*   **`spaces`:** An array of space objects with `id`, `title`, `hostId`, `type`, `imageUrls`, `amenities`, etc.
*   **`bookingProducts`:** A mapping of space IDs to an array of their available booking products.
*   **`reviews`, `matches`, `chatMessages`:** Arrays of objects that link users and spaces together to create realistic-looking content for the prototype.