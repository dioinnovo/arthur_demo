# SCC Dashboard Rebranding Implementation Brief

<!-- Focused rebranding guide for existing dashboard features only -->

## Executive Summary

Transform the Stellar-branded dashboard into an SCC-branded commercial property claims platform by updating visual identity, AI assistant naming, and property-related terminology throughout the existing application.

## Rebranding Scope

### 1. Visual Identity Changes

#### Color System Update
```css
/* REPLACE Stellar Colors */
--stellar-orange: #E74C3C → --scc-red: #C8102E
--stellar-dark: #2C3E50 → --scc-gray: #707070

/* Full Color Palette */
--primary: #C8102E        /* SCC Red */
--primary-hover: #A00D25  /* Darker Red */
--secondary: #707070      /* Professional Gray */
--text-primary: #2B2B2B   /* Dark Gray Text */
--background: #F5F5F5     /* Light Gray Background */
--success: #00A651        /* Green for metrics */
```

#### Logo Replacement
- **Current:** Stellar logo (orange)
- **New:** `/public/images/scc_logo.png` (red tower icon)
- **Locations to update:**
  - Sidebar logo
  - Login page
  - PDF reports header
  - Favicon
  - Mobile navigation

#### Typography
```css
/* Add to global styles */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

font-family: 'Montserrat', sans-serif;
```

### 2. AI Assistant Rebranding

#### Name Change
- **From:** Stella
- **To:** SCOTT (Strategic Claims Operations & Technical Tracker)

#### Files to Update:
- All components with "Stella" references
- Assistant greeting messages
- Help tooltips
- Loading messages
- Error messages

#### Personality Adjustment:
- **Current:** Friendly, approachable homeowner assistant
- **New:** Professional, authoritative commercial claims expert

### 3. Terminology Updates Throughout Dashboard

| Current Term | Replace With |
|-------------|--------------|
| "Homeowner" | "Property Owner" |
| "Home" | "Property" |
| "Residential Inspection" | "Property Assessment" |
| "House" | "Building" |
| "Rooms" | "Areas/Zones" |
| "Family Room" | "Common Area" |
| "Master Bedroom" | "Executive Suite" |
| "Backyard" | "Exterior Grounds" |
| "Neighborhood" | "Commercial District" |

### 4. Property Type Updates

#### Current Options:
- Single Family Home
- Townhouse
- Condo
- Mobile Home

#### New Options:
- Office Building
- Retail Space
- Industrial Facility
- Medical Center
- Educational Institution
- Mixed-Use Property

### 5. Dashboard Component Updates

#### Sidebar Navigation
- Update logo to SCC
- Change orange accent to red
- Update hover states

#### Page Headers
- Replace orange elements with red
- Update button colors
- Adjust icon colors

#### Cards & Widgets
- Update border accents
- Change progress bars to red
- Update status badges

#### Forms
- Update focus states to red
- Change submit button colors
- Update validation colors

### 6. Specific Page Updates

#### Landing Page (`app/page.tsx`)
- Remove redirect spinner
- Update to SCC branding

#### Dashboard Home (`app/dashboard/page.tsx`)
- Update welcome message
- Change metrics cards colors
- Update chart colors to red/gray

#### Claims Pages
- Update status colors
- Change action buttons
- Update timeline colors

#### Inspection/Assessment Pages
- Rename "Inspection" to "Assessment"
- Update property type options
- Change area names to commercial

#### Reports
- Update PDF template headers
- Change color scheme
- Add SCC logo

## Implementation Checklist

### Phase 1: Core Branding (Day 1-2)
- [ ] Replace logo file in `/public/images/`
- [ ] Update `tailwind.config.js` with SCC colors
- [ ] Update `app/globals.css` color variables
- [ ] Add Montserrat font import
- [ ] Update favicon

### Phase 2: Global Updates (Day 3-4)
- [ ] Find/Replace "Stella" → "SCOTT" globally
- [ ] Find/Replace "stellar-orange" → "scc-red" in all CSS
- [ ] Update all button components
- [ ] Update all status badges
- [ ] Fix hover states

### Phase 3: Component Updates (Day 5-7)
- [ ] Update Sidebar component
- [ ] Update PageHeader component
- [ ] Update all Card components
- [ ] Update Form components
- [ ] Update Modal components

### Phase 4: Page-Specific Updates (Day 8-10)
- [ ] Landing page
- [ ] Dashboard home
- [ ] Claims list page
- [ ] Claim detail pages
- [ ] Assessment pages
- [ ] Reports pages

### Phase 5: Content Updates (Day 11-12)
- [ ] Update all property types
- [ ] Change residential terms to commercial
- [ ] Update demo data
- [ ] Update help text
- [ ] Update error messages

## File Change Matrix

### Critical Files to Modify

#### Configuration Files
```
tailwind.config.js       - Color theme update
next.config.js          - Site metadata
package.json            - App name/description
.env.local              - App name variables
```

#### Style Files
```
app/globals.css         - Color variables, fonts
components/**/*.css     - Component-specific styles
```

#### Component Files
```
components/Sidebar.tsx          - Logo, colors
components/MobileBottomNav.tsx  - Mobile branding
components/ui/button.tsx        - Button colors
components/ui/badge.tsx         - Status colors
components/ui/card.tsx          - Border colors
components/PageHeader.tsx       - Header styling
```

#### Page Files
```
app/page.tsx                    - Landing redirect
app/dashboard/page.tsx          - Dashboard home
app/dashboard/claims/*.tsx     - All claims pages
app/dashboard/inspection/*.tsx - Assessment pages
app/dashboard/reports/*.tsx    - Report pages
```

#### Data Files
```
lib/mock-data.ts               - Demo properties
lib/property-types.ts          - Property options
lib/inspection-areas.ts        - Area definitions
```

## Quick Start Commands

```bash
# 1. Global find/replace
grep -r "Stella" --include="*.tsx" --include="*.ts"
grep -r "stellar-orange" --include="*.css" --include="*.tsx"
grep -r "residential" --include="*.tsx" --include="*.ts"

# 2. Update colors in Tailwind
sed -i '' 's/stellar-orange/scc-red/g' tailwind.config.js
sed -i '' 's/#E74C3C/#C8102E/g' app/globals.css

# 3. Update component classes
find . -name "*.tsx" -exec sed -i '' 's/bg-stellar-orange/bg-scc-red/g' {} \;
find . -name "*.tsx" -exec sed -i '' 's/text-stellar-orange/text-scc-red/g' {} \;
find . -name "*.tsx" -exec sed -i '' 's/border-stellar-orange/border-scc-red/g' {} \;
```

## Testing Checklist

### Visual Verification
- [ ] Logo appears correctly on all pages
- [ ] No orange colors remain
- [ ] Red theme consistent throughout
- [ ] Fonts loading properly
- [ ] Hover states working

### Content Verification
- [ ] No "Stella" references remain
- [ ] All "SCOTT" references working
- [ ] Property types are commercial
- [ ] Terminology is B2B appropriate
- [ ] Demo data shows commercial properties

### Functional Testing
- [ ] Navigation works
- [ ] Forms submit properly
- [ ] AI assistant responds as SCOTT
- [ ] Reports generate with new branding
- [ ] Mobile view branded correctly

## Notes for PM

This rebranding focuses ONLY on updating the existing dashboard features to feel proprietary to SCC. No new features or market validation needed - just making the current app look and feel like it was built specifically for Strategic Claim Consultants' commercial property division.

**Key Success Criteria:**
1. Complete visual transformation to SCC brand
2. All references updated from residential to commercial
3. Professional B2B tone throughout
4. No Stellar branding elements remain

**Not Included:**
- New features or functionality
- Market research or validation
- Backend changes
- Database modifications
- API integrations

---

*Document prepared by: Mary (Business Analyst)*
*Date: 2025-09-25*
*Status: Ready for Implementation*