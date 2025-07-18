## **ShareYourSpace 2.0: Prototype Application Specification**

**Version:** 1.2
**Document Purpose:** To provide a complete and detailed description of the ShareYourSpace 2.0 high-fidelity frontend prototype. This document serves as the primary context for AI-assisted development and as a comprehensive guide for human stakeholders. It outlines the project's vision, target user groups, core problems and solutions, and a systematic breakdown of every feature.

---

### **1. The Core Vision & Concept**

**ShareYourSpace 2.0 is the "Airbnb for the Modern Workforce."**

We are a marketplace platform designed to solve the problem of underutilized commercial space while simultaneously addressing the modern professional's need for flexibility and community. We transform static, empty desks into dynamic, revenue-generating assets for space providers and offer inspiring, community-driven workspaces for individuals and teams.

Our key differentiator is our focus on **curated community and flexible access**. We don't just list spaces; we empower providers to build thriving ecosystems and use intelligent matching to help members forge valuable professional connections.

**Corporate Workspace Benefits Program:** A major competitive advantage is our comprehensive corporate benefits system that allows companies to provide flexible workspace access to their employees globally. Similar to how companies provide LinkedIn Learning or gym memberships, ShareYourSpace Enterprise enables organizations to offer "workspace anywhere" benefits while maintaining spend controls and analytics.

**This document describes a frontend-only prototype.** All functionality is simulated on the client-side using a comprehensive dummy data file. The primary goal is to demonstrate a realistic, compelling, and beautiful user experience.

### **2. The Platform Ecosystem: User Groups**

Our marketplace is built around a clear set of user roles, each with distinct goals and motivations.

#### **Host Roles (The "Supply" Side)**

*   **The Corporate Host**
    *   **Who they are:** A business (e.g., a tech company, a law firm) with extra desks in their active, operational office. They are on-site and part of the community. Can also be a company that uses ShareYourSpace benefits for their employees while simultaneously hosting their unused space.
    *   **Their Problem:** Empty desks are a sunk cost and create a sterile environment. They want to generate revenue while also building an innovative ecosystem that can create synergies with their own employees. They may also need flexible workspace solutions for their own distributed teams.
    *   **Our Solution:** We give them tools to monetize their space and an **A.I. Recruiting Agent** to find specific talent that aligns with their company's goals. Their listings are badged as **"Corporate Hubs."** Corporate hosts receive benefits when booking other spaces (15% discount, priority access) and can convert hosting revenue into employee workspace credits.

*   **The Professional Space Provider**
    *   **Who they are:** A landlord, property manager, or real estate investor managing a dedicated workspace property. Their primary motivation is financial return and efficient management. May also be a large corporation with multiple office locations that wants to optimize space utilization.
    *   **Their Problem:** Maximizing occupancy, managing logistics, and marketing a property is complex. Empty spaces are pure financial losses. Large corporations also struggle with providing flexible workspace for distributed teams.
    *   **Our Solution:** We provide powerful marketplace tools to manage pricing, availability, and bookings efficiently. Our **Hub Ambassador Program** solves the community management challenge, making their property more attractive. Their listings are badged as **"Pro Workspaces."** Corporate providers can also utilize employee workspace benefits and cross-benefits from hosting.

#### **Member Roles (The "Demand" Side)**

*   **The Community Member**
    *   **Who they are:** The core user of the space. This includes startup founders, freelancers, remote employees, visiting professionals, and corporate employees with company workspace benefits.
    *   **Their Problem:** They need professional workspace with flexible terms (from a day to a year). They are often professionally isolated and crave meaningful connections that traditional co-working spaces fail to provide. Corporate employees need seamless access without payment friction.
    *   **Our Solution:** We offer a trusted marketplace to find beautiful workspaces for any duration. Our **Discovery & Matching Engine** helps them connect with valuable collaborators within their chosen space. Corporate employees enjoy zero-friction booking with company-covered expenses and allowance tracking.

#### **Corporate Workspace Users (New Category)**

*   **Remote Corporate Employees**
    *   **Who they are:** Employees of companies (startups to enterprises) who work remotely and need occasional professional workspace.
    *   **Their Problem:** Need professional workspace for client meetings, focus work, or team collaboration without personal expense or administrative hassle.
    *   **Our Solution:** Company-provided workspace benefits with automatic billing, allowance tracking, and seamless booking experience.

*   **Corporate Teams & Mixed Groups**
    *   **Who they are:** Project teams, departments, or cross-company collaborations needing group workspace for offsites, sprints, or temporary expansion.
    *   **Their Problem:** Coordinating team workspace, managing mixed billing (corporate + individual), and finding spaces that accommodate full teams.
    *   **Our Solution:** Enhanced team booking system similar to Airbnb groups, with flexible billing options and team coordination tools.

*   **The Hub Ambassador**
    *   **Who they are:** A trusted, long-term Community Member in a "Pro Workspace."
    *   **Their Role:** In exchange for benefits (e.g., a free desk), they act as the on-site community leader, welcoming new members and fostering a vibrant atmosphere. They are the human face of the Pro Workspace.

#### **Platform Role**

*   **The ShareYourSpace Admin**
    *   **Who they are:** A member of the ShareYourSpace founding team.
    *   **Their Goal:** To oversee the health, growth, and quality of the entire marketplace, ensuring a safe and prosperous environment for all users.

#### **Corporate Admin Roles (New)**

*   **Corporate Admin**
    *   **Who they are:** HR managers, office managers, or finance personnel managing their company's workspace program.
    *   **Their Goal:** Provide flexible workspace benefits to employees while maintaining spend controls, usage visibility, and policy compliance.

*   **Corporate Executive**
    *   **Who they are:** C-level executives or senior managers overseeing company workspace strategy.
    *   **Their Goal:** Strategic oversight of workspace costs, employee satisfaction, and potential revenue from space hosting.

---

### **3. Corporate Workspace Benefits Program**

**Core Concept:** Similar to how companies provide LinkedIn Learning licenses, gym memberships, or meal vouchers, ShareYourSpace Enterprise enables organizations to offer "workspace anywhere" benefits to their employees.

#### **Subscription Models**

**Both Usage-Based and Subscription Options Available:**

*   **Usage-Based Plans:** Pay only for actual bookings with optional bulk credit packages at discounted rates
*   **Subscription Tiers:**
    *   **Startup Pack:** €299/month - Up to 25 employees, 100 workspace days/month
    *   **Growth Pack:** €899/month - Up to 100 employees, 400 workspace days/month  
    *   **Enterprise Pack:** €2499/month - Unlimited employees, 1500 workspace days/month
    *   **Enterprise Unlimited:** Custom pricing - Unlimited access + premium support

#### **Dual-Role Corporate Strategy**

**Key Innovation:** Many corporations can be BOTH space providers (hosts) AND space users, especially mid-size and enterprise companies.

**Cross-Benefits System (Airbnb-Inspired):**
*   **Host Credits:** Corporate hosts earn 10% of hosting revenue as employee workspace credits
*   **Preferred Rates:** Corporate hosts receive 15% discount when booking other spaces
*   **Priority Access:** Corporate hosts get priority booking during high-demand periods
*   **Community Status:** "Verified Corporate Host" badge provides credibility and trust

#### **Employee Experience**
*   **Zero-friction booking:** Employees book with company email, no payment required
*   **Automatic benefits recognition:** Domain-based authentication (@company.com)
*   **Personal allowance tracking:** Clear visibility of remaining corporate credits
*   **Team coordination:** Enhanced team booking similar to Airbnb group bookings

#### **Corporate Admin Features**
*   **Unified Dashboard:** Separate sections for "Space Provider" (hosting) and "Employee Benefits" (workspace program)
*   **Simple Controls:** Monthly spending limits, auto-approval thresholds, optional location restrictions
*   **Usage Analytics:** Employee booking patterns, space utilization, and cost analysis
*   **Bulk Management:** Employee onboarding, allowance adjustments, and policy settings

#### **Team Booking for Mixed Groups**
*   **Enhanced coordination:** Support for corporate + freelancer + cross-company teams
*   **Flexible billing:** Corporate coverage for employees, individual payment for external collaborators
*   **Capacity matching:** Auto-filter spaces based on full team size requirements
*   **Collaboration tools:** Shared itineraries, group coordination features

#### **Global Strategy with German Focus**
*   **Space Agent Program:** Automated AI-powered outreach to potential space providers globally
*   **German Market Priority:** Concentrated marketing and localization for the German market as primary launch territory
*   **Expansion Template:** Use German market success as model for European expansion

---

### **4. Detailed Feature Breakdown**

This section details every component and screen of the prototype.

#### **Part 1: The Global Platform Experience**

*   **[G-1] Homepage:** The main entry point. Clean, spacious, and photo-first. Features a hero section with a central search bar ("Location," "Duration") and visually-driven sections below showcasing different types of spaces.
*   **[G-2] Search Results Page:** A split-screen view with an interactive map on the right and a filterable list of `SpaceCard` components on the left. Filters include Booking Type, Host Type, Price, and Amenities.
*   **[G-3] Space Listing Page:** The "product page" for a space.
    *   **Visuals:** A beautiful, Airbnb-style photo gallery is the hero element.
    *   **Information Hierarchy:** Clearly displays the space title, location, and host information. Differentiates between a **"Corporate Hub"** (showing the host company's brand) and a **"Pro Workspace"** (showing the provider's brand alongside the on-site **Hub Ambassador's** profile).
    *   **Booking Widget:** A sticky component allowing users to select a booking type (Day Pass, Monthly Desk, etc.), see the price, and simulate a booking.
    *   **Details:** Includes tabs for a full description, amenities, and (dummy) reviews.
*   **[G-4] Onboarding Flow:** A simulated, modal-based system for login and signup. The signup flow intelligently directs users down the correct path (Member, Corporate Host, or Pro Provider). Enhanced with corporate email detection and automatic benefits recognition for company employees.

#### **Part 1a: Corporate Solutions Integration**

*   **[G-5] Corporate Landing Section:** Homepage section highlighting corporate workspace benefits with value propositions for different company sizes (startups, mid-size, enterprise).
*   **[G-6] Corporate Account Setup:** Guided setup flow for companies wanting to provide employee workspace benefits, host unused space, or both.
*   **[G-7] Corporate Pricing & Plans:** Clear presentation of subscription tiers and cross-benefits for companies engaging as both hosts and users.

#### **Part 2: The Community Member Journey**

*   **[M-1] Personalized Dashboard:** The member's welcome screen. It leads with the **"Discover Connections"** module and includes a clear widget showing their current booking status and on-site contact (either the Host or the Hub Ambassador).
*   **[M-2] Discovery & Matching Engine:** The core member feature. A visually engaging grid or carousel of `MatchCard` components. Each card displays another member's profile and, crucially, a hardcoded **"Match Reason"** that explains the suggested connection (e.g., "Complementary skills").
*   **[M-3] Connection & Chat Simulation:** A seamless flow from clicking "Connect" on a Match Card to opening a high-fidelity, simulated chat interface. The chat history is pre-scripted to demonstrate a story of successful collaboration.
*   **[M-4] Account Management:** Includes sections for viewing booking history, (simulating) profile edits, and accessing the Referral Program page with a unique code and tracker for earned rewards.

#### **Part 2a: Corporate Employee Experience**

*   **[CE-1] Corporate Benefits Dashboard:** Enhanced member dashboard showing corporate allowance status, usage tracking, and company-covered booking history.
*   **[CE-2] Team Booking Interface:** Airbnb-style group booking system for corporate teams, mixed corporate/freelancer groups, and cross-company collaborations.
*   **[CE-3] Zero-Friction Booking:** Streamlined booking flow with automatic corporate billing and "Covered by [Company]" indicators.

#### **Part 3: The Host Journey (Corporate & Professional)**

*   **[H-1] The Tailored Host Dashboard:** The dashboard's UI and widgets adapt to the host's role.
    *   **Corporate Host View:** Focuses on community health and synergy. Features the **"A.I. Recruiting Agent"** to find talent that can collaborate with their own team.
    *   **Professional Provider View:** Focuses on business metrics like Occupancy and Revenue. Features the **"A.I. Anchor Tenant Finder"** to attract stable, long-term members.
*   **[H-2] The Listings & Pricing Manager:** A unified, intuitive tool for *all* hosts. This is where they manage their space's photos, descriptions, and, most importantly, define their **"Booking Products"**—setting the price and quantity for Day Passes, Monthly Desks, etc.
*   **[H-3] The Host Inbox & Earnings:** A unified inbox for all member communications and a clean dashboard showing a breakdown of (dummy) earnings.

#### **Part 3a: Corporate Admin Experience**

*   **[CA-1] Unified Corporate Dashboard:** Smart dashboard with separate sections for "Space Provider" (hosting) and "Employee Benefits" (workspace program management).
*   **[CA-2] Employee Benefits Management:** Tools for setting allowances, managing employee access, tracking usage, and controlling spending with auto-approval limits.
*   **[CA-3] Cross-Benefits Tracking:** Analytics showing hosting revenue, earned employee credits, and savings from host discounts when booking other spaces.
*   **[CA-4] Team & Policy Management:** Bulk employee onboarding, location restrictions, approval workflows, and corporate policy enforcement.

#### **Part 4: The Platform Admin Journey**

*   **[SYS-1] The Marketplace Health Dashboard:** A "God's-eye view" of the entire platform. Features `recharts`-powered visualizations of KPIs, including a breakdown of revenue and growth by Host Type ("Corporate Hubs" vs. "Pro Workspaces").
*   **[SYS-2] Central Management Modules:** A series of clean, powerful tables for managing all users, listings, and the **Hub Ambassador Program**. Includes simulated actions like "Feature Listing" and "Assign Ambassador."
*   **[SYS-3] Trust & Safety Queues:** UI mockups of a moderation queue for user reports and a feedback inbox, demonstrating the platform's commitment to quality and safety.

---

### **5. The "Brain" of the Prototype: Dummy Data Specification**

All interactivity is driven by a single, well-structured file located at `lib/dummy-data.ts`. This file exports all necessary data structures, including:

*   **`users`:** An array of user objects with `id`, `name`, `email`, `role`, `profileImageUrl`, `company`, `corporateBenefits`, etc.
*   **`spaces`:** An array of space objects with `id`, `title`, `hostId`, `type`, `imageUrls`, `amenities`, `teamCapacity`, etc.
*   **`companies`:** An array of company objects with workspace benefit plans, employee allowances, hosting revenue, and cross-benefits tracking.
*   **`corporateBookings`:** Team bookings and corporate-covered individual bookings with billing details.
*   **`bookingProducts`:** A mapping of space IDs to an array of their available booking products.
*   **`reviews`, `matches`, `chatMessages`:** Arrays of objects that link users and spaces together to create realistic-looking content for the prototype.

---

### **6. Future Features & Integrations (Not MVP)**

*   **HR System Integrations:** Slack, Microsoft Teams, BambooHR, Workday integration for seamless employee onboarding
*   **Advanced Analytics:** Detailed workforce mobility insights, space utilization optimization, and predictive booking patterns  
*   **API Access:** Custom integrations for enterprise clients and white-label solutions
*   **Global Compliance:** GDPR, SOX compliance features for enterprise clients
*   **Advanced Space Agent:** Machine learning optimization for automated provider outreach and market expansion
*   **Dynamic Pricing:** AI-powered pricing optimization for hosts based on demand patterns
*   **Localization Tools:** Multi-language support and local payment methods for international expansion