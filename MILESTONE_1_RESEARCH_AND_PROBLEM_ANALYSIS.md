# Milestone 1 — Research, Problem Analysis & Mobile App Blueprint
## Lubeswala Mobile Commerce Platform (Track 3 — Mobile App)

> **Track:** Customer-Friendly Mobile Commerce Experience — Lubeswala  
> **Milestone:** Milestone 1 — Research & Problem Analysis  
> **Deliverables Included:** Problem Analysis • Competitor Research • User Journey Maps • High-Fidelity Mobile Wireframes • Feature List • System Architecture  
> **GitHub Repository:** [https://github.com/karthikSuthari/GiGPoint.git](https://github.com/karthikSuthari/GiGPoint.git)  
> **Stitch Wireframes Project:** [https://stitch.withgoogle.com/projects/18272671758283868801](https://stitch.withgoogle.com/projects/18272671758283868801)  
> **Notion Hub:** [https://app.notion.com/p/GiGPoint-3a8df2de257981c6b7fbfffde99120ae](https://app.notion.com/p/GiGPoint-3a8df2de257981c6b7fbfffde99120ae)  
> **Google Doc Submission:** [https://docs.google.com/document/d/1mACEtcA-iSOktLkWGenGm0GoxpjLdWQVBhcEXpwqiw4/edit](https://docs.google.com/document/d/1mACEtcA-iSOktLkWGenGm0GoxpjLdWQVBhcEXpwqiw4/edit)

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
- **StitchMCP Interactive Wireframes:** [https://stitch.withgoogle.com/projects/18272671758283868801](https://stitch.withgoogle.com/projects/18272671758283868801)
- **Real-Time Live Crude Price Ticker (`CrudeTicker.tsx`):** Header strip streaming Brent Crude ($78.45/bbl), WTI ($74.20/bbl), Furnace Oil (FO 180), LDO, and Bitumen VG-30 benchmark price telemetry.
- **GPS Tanker Live Location Tracker (`/tracking`):** Moving GPS map telemetry for liquid fuel bowser trucks (`TS-08-PETRO-4920`) with seal integrity validation.
- **Dual Commerce Engine:** Instant retail checkout for small buyers & multi-item B2B RFQ quotation engine for commercial buyers.
- **Groq Llama-3 Database AI:** Sub-second natural language AI recommendation engine and database-connected chatbot widget.
- **Depot & Dealer Locator Map (`/dealers`):** Hyper-local GPS network map for 45-minute express workshop pickup.
- **Distributor Vendor Portal (`/dashboard`):** Self-serve seller dashboard for distributors to upload product lines & batch test certificates.
- **25 SKU Catalog Depth:** Complete SKU depth across 1L, 3.5L, 4L, 5L, 15L, 18kg, 200L drums, and 10,000L bulk tankers.
