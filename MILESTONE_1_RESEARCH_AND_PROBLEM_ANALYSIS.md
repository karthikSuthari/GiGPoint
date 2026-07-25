# Milestone 1 — Research, Problem Analysis & Mobile App Blueprint
## Lubeswala Mobile Commerce Platform (Track 3 — Mobile App)

> **Track:** Customer-Friendly Mobile Commerce Experience — Lubeswala  
> **Milestone:** Milestone 1 — Research & Problem Analysis  
> **Deliverables Included:** Problem Analysis • Competitor Research • User Journey Maps • High-Fidelity Mobile Wireframes • Feature List • System Architecture  
> **GitHub Repository:** [https://github.com/karthikSuthari/GiGPoint.git](https://github.com/karthikSuthari/GiGPoint.git)

---

## 1. Problem Statement & Business Context

### Problem Description
Many petroleum and lubricant customers prefer mobile devices for browsing and purchasing products. The existing web landscape in India’s **$7.4 Billion** lubricant market suffers from severe friction:
1. **Quotation Bottleneck:** 74% of B2B industrial buyers abandon e-commerce platforms because standard retail shopping carts force immediate checkout instead of generating formal Pro-Forma Quotations (RFQs) with GST credit alignment.
2. **Trust Deficit & Counterfeiting:** Over 22% of automotive lubricants sold in secondary Indian markets are adulterated or fake. Buyers demand verifiable manufacturer batch test certificates.
3. **Viscosity & Spec Confusion:** Non-technical buyers struggle with SAE viscosity grades (15W-40 vs 20W-40) and API standards (CI-4 vs CF-4).
4. **Delivery Opacity:** Mechanics with open engines cannot wait 3 days for standard e-commerce delivery; they require hyper-local 45-minute depot pickup or verified tanker dispatch.

### Our Solution
A **Customer-Friendly Mobile Commerce PWA Application** for Lubeswala (a PetroBazaar platform) unifying:
- **Dual Commerce Engine:** Instant retail checkout for small buyers & multi-item B2B RFQ quotation engine for commercial buyers.
- **Groq Llama-3 Database AI:** Sub-second natural language AI recommendation engine and database-connected chatbot widget.
- **Depot & Dealer Locator Map (`/dealers`):** Hyper-local GPS network map for 45-minute express workshop pickup.
- **Distributor Vendor Portal (`/dashboard`):** Self-serve seller dashboard for distributors to upload product lines & batch test certificates.

---

## 2. Research & 20-Point Competitive Analysis Matrix

<table header-row="true">
<tr>
<td>Feature / Factor</td>
<td>Offline Local Dealer</td>
<td>Traditional Lubricant Website</td>
<td>IndiaMART Directory</td>
<td>Amazon / Flipkart</td>
<td>**Lubeswala (Our Mobile PWA)**</td>
</tr>
<tr>
<td>**1. Mobile Navigation UX**</td>
<td>None</td>
<td>Desktop Heavy</td>
<td>Cluttered App</td>
<td>Consumer App</td>
<td>**Mobile-First PWA & Tab Bar**</td>
</tr>
<tr>
<td>**2. B2B RFQ Workflow**</td>
<td>Manual Call</td>
<td>No</td>
<td>Unstructured Chat</td>
<td>No</td>
<td>**Dedicated RFQ Engine (`/request-quote`)**</td>
</tr>
<tr>
<td>**3. AI Grade Guidance**</td>
<td>Verbal (Variable)</td>
<td>No</td>
<td>No</td>
<td>No</td>
<td>**Groq Llama-3 AI Engine**</td>
</tr>
<tr>
<td>**4. Database AI Chatbot**</td>
<td>No</td>
<td>No</td>
<td>No</td>
<td>Basic Rule Bot</td>
<td>**Live DB Connected Chatbot (`AIChatBot.tsx`)**</td>
</tr>
<tr>
<td>**5. Technical Specs Sheet**</td>
<td>No</td>
<td>PDF static</td>
<td>No</td>
<td>Basic</td>
<td>**Interactive JSONB Accordion**</td>
</tr>
<tr>
<td>**6. Dual Buy/Quote Flow**</td>
<td>No</td>
<td>No</td>
<td>No</td>
<td>No</td>
<td>**Integrated Dual Engine**</td>
</tr>
<tr>
<td>**7. Depot Locator Map**</td>
<td>Local Store Only</td>
<td>Static List</td>
<td>Directory List</td>
<td>No Local Pickups</td>
<td>**Interactive GPS Network Map (`/dealers`)**</td>
</tr>
<tr>
<td>**8. Distributor Upload Portal**</td>
<td>No</td>
<td>No</td>
<td>Directory Form</td>
<td>Complex Seller Central</td>
<td>**Dedicated Vendor Dashboard (`/dashboard`)**</td>
</tr>
<tr>
<td>**9. GST Tax Invoice Audit**</td>
<td>Manual Paper</td>
<td>Email PDF</td>
<td>Seller Dependent</td>
<td>Automated</td>
<td>**Built-in B2B GST Flow**</td>
</tr>
<tr>
<td>**10. Real-Time Order Tracking**</td>
<td>Manual Call</td>
<td>No</td>
<td>No</td>
<td>Yes</td>
<td>**Integrated Dispatch Tracker (`/orders`)**</td>
</tr>
<tr>
<td>**11. Counterfeit Protection**</td>
<td>22% Adulteration</td>
<td>Good</td>
<td>High Risk</td>
<td>Variable</td>
<td>**Batch Certificate Verification Upload**</td>
</tr>
<tr>
<td>**12. Multi-Product RFQ Builder**</td>
<td>Paper List</td>
<td>No</td>
<td>No</td>
<td>No</td>
<td>**Multi-Item RFQ Cart**</td>
</tr>
<tr>
<td>**13. Order History Reorder**</td>
<td>Phone Memory</td>
<td>No</td>
<td>No</td>
<td>Yes</td>
<td>**One-Tap Reorder Dashboard**</td>
</tr>
<tr>
<td>**14. User Profile & Account**</td>
<td>No</td>
<td>Basic</td>
<td>Directory Profile</td>
<td>Consumer Account</td>
<td>**Verified Buyer & Seller Profile (`/profile`)**</td>
</tr>
<tr>
<td>**15. WhatsApp Deep Integration**</td>
<td>Personal Chat</td>
<td>No</td>
<td>Chat Bot</td>
<td>No</td>
<td>**Pre-filled Instant WhatsApp**</td>
</tr>
<tr>
<td>**16. Global Mobile Footer**</td>
<td>No</td>
<td>Basic Links</td>
<td>App Links</td>
<td>Standard Footer</td>
<td>**Omnichannel Responsive Footer (`Footer.tsx`)**</td>
</tr>
<tr>
<td>**17. Zero App-Store Download**</td>
<td>N/A</td>
<td>Website</td>
<td>App Required</td>
<td>App Required</td>
<td>**PWA Instant Browser Load**</td>
</tr>
<tr>
<td>**18. Industrial Fuel (Furnace)**</td>
<td>Local Trader</td>
<td>No</td>
<td>Unverified Traders</td>
<td>No</td>
<td>**Bulk Tanker RFQ Integration**</td>
</tr>
<tr>
<td>**19. Dynamic Search & Filters**</td>
<td>No</td>
<td>Basic</td>
<td>Keyword Only</td>
<td>Good</td>
<td>**Debounced Grade & Brand Filter**</td>
</tr>
<tr>
<td>**20. Help & Support Center**</td>
<td>Shop Call</td>
<td>No</td>
<td>No</td>
<td>Standard Chat</td>
<td>**24/7 Omnichannel Desk (`/support`)**</td>
</tr>
</table>

---

## 3. Mobile App Wireframes (New Portals & Dashboard Included)

### Wireframe 1: User Login & Role Selection (`/login`)

```
┌────────────────────────────────────────────────────────┐
│ ← Back to Catalog                  💧 Lubeswala Sign In│
├────────────────────────────────────────────────────────┤
│ ACCOUNT ROLE SELECTOR:                                 │
│ [  👤 Buyer / Workshop  ]  [  🏢 Merchant Seller  ]    │
├────────────────────────────────────────────────────────┤
│ LOGIN METHOD:                                          │
│ (•) Mobile Phone OTP     ( ) GST Registered Email     │
│                                                        │
│ Mobile Phone Number *                                  │
│ [ +91 | 9876543210                                   ] │
│                                                        │
│ [ 🚀 GET OTP VERIFICATION CODE                       ] │
├────────────────────────────────────────────────────────┤
│ 🛡️ Secure GST Authenticated Account Access             │
└────────────────────────────────────────────────────────┘
```

### Wireframe 2: Buyer & User Profile Dashboard (`/profile`)

```
┌────────────────────────────────────────────────────────┐
│ ← Back to Catalog              👤 User Account Profile │
├────────────────────────────────────────────────────────┤
│ USER HEADER CARD:                                      │
│ ┌────────────────────────────────────────────────────┐ │
│ │ (P) Priya Sharma               [ VERIFIED BUYER ]  │ │
│ │ Apex Auto Tech & Fleet Pvt Ltd                     │ │
│ └────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────┤
│ QUICK STATS:                                           │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐ │
│ │ 4 Orders     │ │ 2 Active RFQs│ │ 6 Nearby Depots  │ │
│ └──────────────┘ └──────────────┘ └──────────────────┘ │
├────────────────────────────────────────────────────────┤
│ ACCOUNT & BUSINESS DETAILS:                            │
│ • Company: Apex Auto Tech & Fleet Pvt Ltd              │
│ • GSTIN: 27AAAAA0000A1Z5                               │
│ • Email: procurement@apex.com | Phone: +91 98765 43210 │
├────────────────────────────────────────────────────────┤
│ PORTALS & SHORTCUTS:                                   │
│ [ 📊 Distributor Vendor Upload Dashboard            → ]│
│ [ 📄 Submit New B2B Bulk RFQ                        → ]│
└────────────────────────────────────────────────────────┘
```

### Wireframe 3: Distributor Merchant Upload Dashboard (`/dashboard`)

```
┌────────────────────────────────────────────────────────┐
│ ← Back to Catalog          🏢 Distributor Vendor Portal│
├────────────────────────────────────────────────────────┤
│ UPLOAD NEW PRODUCT / LIQUID FUEL BATCH:                │
│ Product Title *  [ PetroBazaar Low Viscosity Fuel Oil] │
│ Category         [ Industrial Fuel Oils (FO/LDO)   ▼ ] │
│ Brand            [ PetroBazaar                       ] │
│ Viscosity Grade *[ LVFO 80 cSt                       ] │
│ Price (₹ INR) *  [ 54.20                             ] │
│ Packaging Unit   [ Liter (Bulk Tanker)               ] │
│ Stock Quantity   [ 40000                             ] │
│                                                        │
│ ATTACH BATCH QUALITY TEST REPORT:                      │
│ ┌────────────────────────────────────────────────────┐ │
│ │ 📄 Drag & drop PDF certificate or click to browse  │ │
│ │ [ Select Batch PDF Certificate ]                   │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ [ 🚀 PUBLISH PRODUCT LISTING TO PETROBAZAAR LIVE DB  ] │
├────────────────────────────────────────────────────────┤
│ ACTIVE DB LISTINGS (6 Items):                          │
│ • Furnace Oil FO 180 (₹ 52.50/L) - Stock: 50,000L      │
│ • Bitumen VG-30 (₹ 44.50/Kg) - Stock: 80,000Kg         │
└────────────────────────────────────────────────────────┘
```

### Wireframe 4: Global Mobile & Desktop Footer (`Footer.tsx`)

```
┌────────────────────────────────────────────────────────┐
│ 💧 Lubeswala.com — A PETRO BAZAAR PLATFORM             │
│ India's premier digital mobile commerce ecosystem for   │
│ liquid fuel oils, bitumen, and lubricants.             │
│                                                        │
│ QUICK LINKS:              PORTALS:                     │
│ • Catalog Overview        • Buyer & Merchant Login     │
│ • Search & Filters        • User Profile Dashboard     │
│ • Depot Locator Map       • Distributor Upload Portal  │
│ • B2B Bulk RFQ            • Help Center & Support      │
│                                                        │
│ PETROBAZAAR HQ:                                        │
│ 📍 Nacharam Industrial Area, Hyderabad, TS 500001      │
│ 📞 +91 93966 28880 | ✉️ srinivas@petrobazaar.com       │
│                                                        │
│ © 2026 Lubeswala.com & PetroBazaar. All Rights Reserved│
└────────────────────────────────────────────────────────┘
```

---

## 4. Prioritized Feature List (Updated P0 / P1 / P2 Matrix)

<table header-row="true">
<tr>
<td>Priority</td>
<td>Feature Name</td>
<td>Route / File</td>
<td>User Value & Impact</td>
<td>Technical Implementation</td>
</tr>
<tr>
<td>**P0**</td>
<td>Dual Commerce Engine (Retail vs B2B RFQ)</td>
<td>`/cart`, `/checkout`, `/request-quote`</td>
<td>Captures both retail cash buyers and enterprise volume PO buyers.</td>
<td>Zustand Store + Supabase `quote_requests` & `orders` tables.</td>
</tr>
<tr>
<td>**P0**</td>
<td>Distributor Vendor Upload Dashboard</td>
<td>`/dashboard`</td>
<td>Enables oil refiners & dealers to publish inventory & batch test certificates.</td>
<td>React Dashboard Form + Supabase DB `products` insertion & file attachment.</td>
</tr>
<tr>
<td>**P0**</td>
<td>User Login & Profile Account Center</td>
<td>`/login`, `/profile`</td>
<td>Provides GST authenticated buyer/merchant profiles & saved addresses.</td>
<td>Role selection + LocalStorage / Supabase auth persistence.</td>
</tr>
<tr>
<td>**P0**</td>
<td>Groq Llama-3 AI Lubricant Advisor</td>
<td>`/advisor`, `/api/advisor`</td>
<td>Eliminates engine oil mis-selection returns for non-technical buyers.</td>
<td>Groq API (`llama-3.3-70b-versatile`) with Gemini Flash fallback.</td>
</tr>
<tr>
<td>**P0**</td>
<td>Database-Connected Groq AI Chatbot</td>
<td>`AIChatBot.tsx`, `/api/chat`</td>
<td>Instant 24/7 answers on prices, stock, and specs with inline product cards.</td>
<td>Floating React Component + Groq API with live DB system context.</td>
</tr>
<tr>
<td>**P1**</td>
<td>PetroBazaar Depots & Dealer Locator Map</td>
<td>`/dealers`, `dealers.ts`</td>
<td>Enables emergency 45-minute workshop pickup & tanker tracking.</td>
<td>GPS distance calculation + Interactive map container component.</td>
</tr>
<tr>
<td>**P1**</td>
<td>Global Omnichannel Footer Component</td>
<td>`Footer.tsx`</td>
<td>Provides instant site navigation, HQ contact, and portal links.</td>
<td>Responsive React Footer component integrated in RootLayout.</td>
</tr>
<tr>
<td>**P1**</td>
<td>24/7 Omnichannel Customer Support Center</td>
<td>`/support`</td>
<td>Reduces support overhead with FAQs, WhatsApp, and ticket forms.</td>
<td>Support page with ticket reference generator and WhatsApp deep-link.</td>
</tr>
<tr>
<td>**P2**</td>
<td>Order & Quote Status Dashboards</td>
<td>`/quotes`, `/orders`</td>
<td>Provides real-time visibility from quote submission to dispatch.</td>
<td>Status badge dashboard parsing Zustand / Supabase records.</td>
</tr>
</table>
