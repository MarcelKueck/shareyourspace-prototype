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

Our marketplace is built around a clear set of user roles, each with distinct goals and motivations.

#### **Host Roles (The "Supply" Side)**

*   **The Corporate Host**
    *   **Who they are:** A business (e.g., a tech company, a law firm) with extra desks in their active, operational office. They are on-site and part of the community.
    *   **Their Problem:** Empty desks are a sunk cost and create a sterile environment. They want to generate revenue while also building an innovative ecosystem that can create synergies with their own employees.
    *   **Our Solution:** We give them tools to monetize their space and an **A.I. Recruiting Agent** to find specific talent that aligns with their company's goals. Their listings are badged as **"Corporate Hubs."**

*   **The Professional Space Provider**
    *   **Who they are:** A landlord, property manager, or real estate investor managing a dedicated workspace property. Their primary motivation is financial return and efficient management.
    *   **Their Problem:** Maximizing occupancy, managing logistics, and marketing a property is complex. Empty spaces are pure financial losses.
    *   **Our Solution:** We provide powerful marketplace tools to manage pricing, availability, and bookings efficiently. Our **Hub Ambassador Program** solves the community management challenge, making their property more attractive. Their listings are badged as **"Pro Workspaces."**

#### **Member Roles (The "Demand" Side)**

*   **The Community Member**
    *   **Who they are:** The core user of the space. This includes startup founders, freelancers, remote employees, and visiting professionals.
    *   **Their Problem:** They need professional workspace with flexible terms (from a day to a year). They are often professionally isolated and crave meaningful connections that traditional co-working spaces fail to provide.
    *   **Our Solution:** We offer a trusted marketplace to find beautiful workspaces for any duration. Our **Discovery & Matching Engine** helps them connect with valuable collaborators within their chosen space.

*   **The Hub Ambassador**
    *   **Who they are:** A trusted, long-term Community Member in a "Pro Workspace."
    *   **Their Role:** In exchange for benefits (e.g., a free desk), they act as the on-site community leader, welcoming new members and fostering a vibrant atmosphere. They are the human face of the Pro Workspace.

#### **Platform Role**

*   **The ShareYourSpace Admin**
    *   **Who they are:** A member of the ShareYourSpace founding team.
    *   **Their Goal:** To oversee the health, growth, and quality of the entire marketplace, ensuring a safe and prosperous environment for all users.

---

### **3. Detailed Feature Breakdown**

This section details every component and screen of the prototype.

#### **Part 1: The Global Platform Experience**

*   **[G-1] Homepage:** The main entry point. Clean, spacious, and photo-first. Features a hero section with a central search bar ("Location," "Duration") and visually-driven sections below showcasing different types of spaces.
*   **[G-2] Search Results Page:** A split-screen view with an interactive map on the right and a filterable list of `SpaceCard` components on the left. Filters include Booking Type, Host Type, Price, and Amenities.
*   **[G-3] Space Listing Page:** The "product page" for a space.
    *   **Visuals:** A beautiful, Airbnb-style photo gallery is the hero element.
    *   **Information Hierarchy:** Clearly displays the space title, location, and host information. Differentiates between a **"Corporate Hub"** (showing the host company's brand) and a **"Pro Workspace"** (showing the provider's brand alongside the on-site **Hub Ambassador's** profile).
    *   **Booking Widget:** A sticky component allowing users to select a booking type (Day Pass, Monthly Desk, etc.), see the price, and simulate a booking.
    *   **Details:** Includes tabs for a full description, amenities, and (dummy) reviews.
*   **[G-4] Onboarding Flow:** A simulated, modal-based system for login and signup. The signup flow intelligently directs users down the correct path (Member, Corporate Host, or Pro Provider).

#### **Part 2: The Community Member Journey**

*   **[M-1] Personalized Dashboard:** The member's welcome screen. It leads with the **"Discover Connections"** module and includes a clear widget showing their current booking status and on-site contact (either the Host or the Hub Ambassador).
*   **[M-2] Discovery & Matching Engine:** The core member feature. A visually engaging grid or carousel of `MatchCard` components. Each card displays another member's profile and, crucially, a hardcoded **"Match Reason"** that explains the suggested connection (e.g., "Complementary skills").
*   **[M-3] Connection & Chat Simulation:** A seamless flow from clicking "Connect" on a Match Card to opening a high-fidelity, simulated chat interface. The chat history is pre-scripted to demonstrate a story of successful collaboration.
*   **[M-4] Account Management:** Includes sections for viewing booking history, (simulating) profile edits, and accessing the Referral Program page with a unique code and tracker for earned rewards.

#### **Part 3: The Host Journey (Corporate & Professional)**

*   **[H-1] The Tailored Host Dashboard:** The dashboard's UI and widgets adapt to the host's role.
    *   **Corporate Host View:** Focuses on community health and synergy. Features the **"A.I. Recruiting Agent"** to find talent that can collaborate with their own team.
    *   **Professional Provider View:** Focuses on business metrics like Occupancy and Revenue. Features the **"A.I. Anchor Tenant Finder"** to attract stable, long-term members.
*   **[H-2] The Listings & Pricing Manager:** A unified, intuitive tool for *all* hosts. This is where they manage their space's photos, descriptions, and, most importantly, define their **"Booking Products"**—setting the price and quantity for Day Passes, Monthly Desks, etc.
*   **[H-3] The Host Inbox & Earnings:** A unified inbox for all member communications and a clean dashboard showing a breakdown of (dummy) earnings.

#### **Part 4: The Platform Admin Journey**

*   **[SYS-1] The Marketplace Health Dashboard:** A "God's-eye view" of the entire platform. Features `recharts`-powered visualizations of KPIs, including a breakdown of revenue and growth by Host Type ("Corporate Hubs" vs. "Pro Workspaces").
*   **[SYS-2] Central Management Modules:** A series of clean, powerful tables for managing all users, listings, and the **Hub Ambassador Program**. Includes simulated actions like "Feature Listing" and "Assign Ambassador."
*   **[SYS-3] Trust & Safety Queues:** UI mockups of a moderation queue for user reports and a feedback inbox, demonstrating the platform's commitment to quality and safety.

---

### **4. The "Brain" of the Prototype: Dummy Data Specification**

All interactivity is driven by a single, well-structured file located at `lib/dummy-data.ts`. This file exports all necessary data structures, including:

*   **`users`:** An array of user objects with `id`, `name`, `email`, `role`, `profileImageUrl`, etc.
*   **`spaces`:** An array of space objects with `id`, `title`, `hostId`, `type`, `imageUrls`, `amenities`, etc.
*   **`bookingProducts`:** A mapping of space IDs to an array of their available booking products.
*   **`reviews`, `matches`, `chatMessages`:** Arrays of objects that link users and spaces together to create realistic-looking content for the prototype.