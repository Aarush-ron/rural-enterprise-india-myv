# Rural Enterprise India — Demo Portal

A static, multi-page prototype of the "Rural Enterprise India" architecture you shared,
styled in the minimal Government-of-India portal aesthetic (like india.gov.in).

## How to run it
No build step needed. Just open `index.html` in any modern browser — or, for the
smoothest experience (all pages use relative links), serve the folder locally:

```bash
cd rural-enterprise-india
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Pages included

| Page | File | Notes |
|---|---|---|
| Home | `index.html` | Matches the shared homepage screenshot |
| Financial Literacy | `financial-literacy.html` | Daily learning modules (buffer data) |
| Schemes & Benefits | `schemes-benefits.html` | Sample government schemes |
| Loans Facility | `loans-facility.html` | Loan products + live EMI calculator |
| Government Initiatives | `government-initiatives.html` | Sample national initiatives |
| Impact & Data | `impact-data.html` | KPIs, yearly chart, top states, stories |
| Login | `login.html` | Demo auth (any email/password) |
| Register | `register.html` | Creates a local demo profile |
| My Dashboard | `dashboard.html` | Profile, applications, Upcoming EMI |
| Find / Start a Business | `start-business.html` | **The full flow wizard** (see below) |

## The business → financing flow (`start-business.html`)

This single page implements the entire right-hand branch of your architecture diagram
as an interactive step-by-step wizard:

```
Find/Start Business → Location → Business Scale → Budget → Business Sectors
→ Business List → User Chooses Business → AI Business Analysis → Project Cost
→ Financing Router (≤ ₹1.40L / > ₹1.40L) → Existing Loans → EMI Engine
→ Moratorium Analysis → Financial Position → Repayment Capacity
→ Financing Summary → User Confirms → Loan Application → Document Submission
→ Loan Processing → Loan Granted → Profile Synchronization → User Dashboard
→ Upcoming EMI
```

All logic (EMI formula, FOIR/repayment-capacity check, financing router threshold,
moratorium impact) runs live in the browser — see `assets/js/wizard.js`.

## Data
All numbers, schemes, business listings, and success stories are **illustrative
buffer/sample data** for demonstration, defined centrally in `assets/js/data.js`
(`REI_DATA`), so it's easy to swap in real data later.

## Structure
```
rural-enterprise-india/
├── index.html, login.html, register.html, dashboard.html, ...
├── start-business.html         (the wizard shell)
└── assets/
    ├── css/style.css           (shared design system)
    └── js/
        ├── data.js             (buffer data + EMI/formatting helpers)
        ├── main.js             (header/account-menu/shared behaviour)
        └── wizard.js           (the full business→financing flow)
```

## Notes
- User accounts and loan applications are stored in the browser's `localStorage`
  (`reiUser`, `reiBusinessApp`) — this is a front-end demo with no real backend.
- No external images are used (to avoid third-party/copyright assets); visuals are
  built with inline SVG, emoji glyphs and CSS.
