# SCC Rebrand Implementation Tasks

<!-- Generated from SCC-rebrand-architecture.md by Winston (Architect) -->

## Task Tracking Overview

This document breaks down the SCC rebrand architecture into actionable developer tasks organized by phase, priority, and technical area.

**Total Tasks**: 45
**Timeline**: 14 days
**Team Size**: 2-3 developers recommended

---

## Phase 1: Foundation (Days 1-2)
**Priority**: Critical
**Dependencies**: None

### Task 1.1: Create Brand Configuration Module
**Assigned to**: Developer 1
**Estimated Time**: 2 hours
**Files to Create**:
- `lib/constants/brand.ts`
- `lib/constants/colors.ts`
- `lib/types/brand.ts`

**Implementation**:
```typescript
// lib/types/brand.ts
export interface BrandConfig {
  name: string
  logo: string
  colors: {
    primary: string
    secondary: string
    success: string
  }
  ai: {
    name: string
    persona: string
  }
}

// lib/constants/brand.ts
export const SCC_BRAND: BrandConfig = {
  name: 'Strategic Claim Consultants',
  logo: '/images/scc_logo.png',
  colors: {
    primary: '#C8102E',
    secondary: '#707070',
    success: '#00A651'
  },
  ai: {
    name: 'SCOTT',
    persona: 'Strategic Claims Operations & Technical Tracker'
  }
}
```

**Acceptance Criteria**:
- [ ] Type definitions created
- [ ] Brand constants exported
- [ ] No TypeScript errors

### Task 1.2: Update Tailwind Configuration
**Assigned to**: Developer 1
**Estimated Time**: 1 hour
**Files to Modify**:
- `tailwind.config.ts`

**Changes**:
```typescript
// Remove stellar colors, add SCC colors
colors: {
  scc: {
    red: "#C8102E",
    "red-dark": "#A00D25",
    gray: "#707070",
    "gray-dark": "#2B2B2B",
    success: "#00A651"
  }
}
```

**Acceptance Criteria**:
- [ ] Stellar colors removed
- [ ] SCC colors added
- [ ] Build succeeds

### Task 1.3: Update Global CSS Variables
**Assigned to**: Developer 2
**Estimated Time**: 1 hour
**Files to Modify**:
- `app/globals.css`

**Changes**:
```css
:root {
  --primary: 348 72% 44%;        /* SCC Red */
  --primary-hover: 348 76% 35%;  /* Darker Red */
  --secondary: 0 0% 44%;         /* Gray */
  --success: 144 100% 32%;       /* Green */
}
```

**Acceptance Criteria**:
- [ ] CSS variables updated
- [ ] No stellar-orange references
- [ ] Colors render correctly

### Task 1.4: Add Montserrat Font
**Assigned to**: Developer 2
**Estimated Time**: 30 minutes
**Files to Modify**:
- `app/layout.tsx`

**Implementation**:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Acceptance Criteria**:
- [ ] Font loads successfully
- [ ] No FOUC (Flash of Unstyled Content)
- [ ] Fallback fonts work

### Task 1.5: Replace Logo Files
**Assigned to**: Developer 1
**Estimated Time**: 1 hour
**Files to Add/Update**:
- Add: `/public/images/scc_logo.png`
- Update: `/public/favicon.ico`

**Acceptance Criteria**:
- [ ] SCC logo displays correctly
- [ ] Favicon updated
- [ ] Logo responsive on all devices

---

## Phase 2: Global Updates (Days 3-4)
**Priority**: Critical
**Dependencies**: Phase 1

### Task 2.1: Global Stella → SCOTT Replacement
**Assigned to**: Developer 1
**Estimated Time**: 3 hours
**Script to Run**:
```bash
# Find all Stella references
grep -r "Stella" --include="*.tsx" --include="*.ts" --include="*.md"

# Replace with SCOTT
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/Stella/SCOTT/g' {} \;
```

**Files Expected to Change**: ~20-30 files

**Acceptance Criteria**:
- [ ] No "Stella" references remain
- [ ] All "SCOTT" references work
- [ ] No broken functionality

### Task 2.2: Update Color Class Names
**Assigned to**: Developer 2
**Estimated Time**: 4 hours
**Script to Run**:
```bash
# Update Tailwind classes
find . -name "*.tsx" -exec sed -i '' 's/bg-stellar-orange/bg-scc-red/g' {} \;
find . -name "*.tsx" -exec sed -i '' 's/text-stellar-orange/text-scc-red/g' {} \;
find . -name "*.tsx" -exec sed -i '' 's/border-stellar-orange/border-scc-red/g' {} \;
find . -name "*.tsx" -exec sed -i '' 's/hover:bg-stellar-orange/hover:bg-scc-red-dark/g' {} \;
```

**Acceptance Criteria**:
- [ ] All stellar color classes replaced
- [ ] Components render with new colors
- [ ] Hover states work correctly

### Task 2.3: Create Terminology Mapping
**Assigned to**: Developer 1
**Estimated Time**: 2 hours
**Files to Create**:
- `lib/constants/terminology.ts`

**Implementation**:
```typescript
export const TERM_MAP = {
  'homeowner': 'property owner',
  'home': 'property',
  'residential inspection': 'property assessment',
  'house': 'building',
  'rooms': 'areas',
  'family room': 'common area',
  'master bedroom': 'executive suite',
  'backyard': 'exterior grounds',
  'neighborhood': 'commercial district'
}
```

**Acceptance Criteria**:
- [ ] Complete term mapping created
- [ ] Utility function for replacements
- [ ] Applied throughout app

---

## Phase 3: Component Updates (Days 5-7)
**Priority**: High
**Dependencies**: Phase 2

### Task 3.1: Update Button Component
**Assigned to**: Developer 2
**Estimated Time**: 2 hours
**Files to Modify**:
- `components/ui/button.tsx`

**Changes**:
- Replace all color variants
- Update hover states
- Test all button types

**Acceptance Criteria**:
- [ ] Primary buttons use SCC red
- [ ] Secondary buttons use gray
- [ ] All variants tested

### Task 3.2: Update Sidebar Component
**Assigned to**: Developer 1
**Estimated Time**: 3 hours
**Files to Modify**:
- `components/Sidebar.tsx`

**Changes**:
- Replace logo reference
- Update active state colors
- Fix hover effects
- Update nav item colors

**Acceptance Criteria**:
- [ ] SCC logo displays
- [ ] Navigation uses new colors
- [ ] Active states correct
- [ ] Mobile responsive

### Task 3.3: Update Badge/Status Components
**Assigned to**: Developer 2
**Estimated Time**: 2 hours
**Files to Modify**:
- `components/ui/badge.tsx`
- `components/ui/status.tsx`

**Implementation**:
```typescript
const variants = {
  success: "bg-scc-success text-white",
  pending: "bg-scc-gray text-white",
  active: "bg-scc-red text-white",
  warning: "bg-yellow-500 text-white"
}
```

**Acceptance Criteria**:
- [ ] All status colors updated
- [ ] Consistent across app
- [ ] Readable contrast ratios

### Task 3.4: Update Card Components
**Assigned to**: Developer 1
**Estimated Time**: 2 hours
**Files to Modify**:
- `components/ui/card.tsx`
- Related card components

**Changes**:
- Update border colors
- Fix hover states
- Update header styles

**Acceptance Criteria**:
- [ ] Cards use new color scheme
- [ ] Borders consistent
- [ ] Shadows appropriate

### Task 3.5: Update Form Components
**Assigned to**: Developer 2
**Estimated Time**: 3 hours
**Files to Modify**:
- `components/ui/input.tsx`
- `components/ui/select.tsx`
- `components/ui/textarea.tsx`
- `components/ui/checkbox.tsx`

**Changes**:
- Update focus rings to SCC red
- Fix validation colors
- Update placeholder styles

**Acceptance Criteria**:
- [ ] Focus states use SCC red
- [ ] Error states consistent
- [ ] Success states use green

---

## Phase 4: Page Updates (Days 8-10)
**Priority**: High
**Dependencies**: Phase 3

### Task 4.1: Update Landing Page
**Assigned to**: Developer 1
**Estimated Time**: 3 hours
**Files to Modify**:
- `app/page.tsx`

**Changes**:
- Remove redirect spinner
- Add SCC branding
- Update hero section
- Fix CTA buttons

**Acceptance Criteria**:
- [ ] SCC branding prominent
- [ ] No Stellar references
- [ ] Commercial focus

### Task 4.2: Update Dashboard Home
**Assigned to**: Developer 2
**Estimated Time**: 4 hours
**Files to Modify**:
- `app/dashboard/page.tsx`

**Changes**:
- Update welcome message
- Change metrics card colors
- Update chart colors to red/gray
- Add "$2B+ Recovered" metric

**Acceptance Criteria**:
- [ ] Metrics use new colors
- [ ] Charts properly styled
- [ ] Key stats displayed

### Task 4.3: Update Claims Pages
**Assigned to**: Developer 1
**Estimated Time**: 4 hours
**Files to Modify**:
- `app/dashboard/claims/*.tsx`

**Changes**:
- Update status colors
- Change action buttons
- Update timeline colors
- Fix data tables

**Acceptance Criteria**:
- [ ] All claims pages updated
- [ ] Status indicators correct
- [ ] Actions use new colors

### Task 4.4: Rename Inspection to Assessment
**Assigned to**: Developer 2
**Estimated Time**: 3 hours
**Changes**:
```bash
# Rename folder
mv app/dashboard/inspection app/dashboard/assessment

# Update all imports and references
find . -type f -exec sed -i '' 's/inspection/assessment/g' {} \;
find . -type f -exec sed -i '' 's/Inspection/Assessment/g' {} \;
```

**Acceptance Criteria**:
- [ ] All routes work
- [ ] No broken imports
- [ ] Navigation updated

### Task 4.5: Update Report Pages
**Assigned to**: Developer 1
**Estimated Time**: 3 hours
**Files to Modify**:
- `app/dashboard/reports/*.tsx`
- Report templates

**Changes**:
- Update PDF headers with SCC logo
- Change color scheme
- Update report styling

**Acceptance Criteria**:
- [ ] Reports show SCC branding
- [ ] PDFs generate correctly
- [ ] Print styles work

---

## Phase 5: AI & Content Updates (Days 11-12)
**Priority**: Medium
**Dependencies**: Phase 4

### Task 5.1: Update AI System Prompts
**Assigned to**: Developer 2
**Estimated Time**: 3 hours
**Files to Modify**:
- `lib/ai/prompts.ts`
- `lib/ai/system-prompts.ts`

**Implementation**:
```typescript
export const SCOTT_SYSTEM_PROMPT = `
You are SCOTT (Strategic Claims Operations & Technical Tracker),
a professional commercial property claims expert for Strategic Claim Consultants.

Your expertise includes:
- Commercial property damage assessment
- Large-loss claim management
- Business interruption calculations
- Hurricane and catastrophe claims
- Settlement maximization strategies

Context: SCC has recovered $2B+ in settlements
`;
```

**Acceptance Criteria**:
- [ ] SCOTT personality defined
- [ ] Commercial focus clear
- [ ] Professional tone

### Task 5.2: Update Property Types
**Assigned to**: Developer 1
**Estimated Time**: 2 hours
**Files to Modify**:
- `lib/constants/property-types.ts`

**New Types**:
```typescript
export const PROPERTY_TYPES = [
  'Office Building',
  'Retail Space',
  'Industrial Facility',
  'Medical Center',
  'Educational Institution',
  'Mixed-Use Property',
  'Resort/Hospitality'
]
```

**Acceptance Criteria**:
- [ ] All forms updated
- [ ] Dropdowns work
- [ ] Data saves correctly

### Task 5.3: Implement Real Case Studies
**Assigned to**: Developer 2
**Estimated Time**: 4 hours
**Files to Modify**:
- `lib/mock-data/properties.ts`
- Demo data files

**Real Cases to Add**:
1. The Shrimp Boat - $1.9M settlement
2. Cinnamon Shore - $9.7M settlement
3. Land's End - $15.7M settlement
4. Ocean Towers - Active case

**Acceptance Criteria**:
- [ ] Real cases displayed
- [ ] Settlement amounts accurate
- [ ] Timelines correct

### Task 5.4: Add Commercial Property Images
**Assigned to**: Developer 1
**Estimated Time**: 2 hours
**Files to Add**:
- `/public/images/properties/*.jpg`

**Image Categories**:
- Office buildings
- Retail spaces
- Industrial facilities
- Medical centers
- Restaurants/hospitality

**Acceptance Criteria**:
- [ ] Images optimized
- [ ] Proper alt text
- [ ] Responsive display

### Task 5.5: Update Help & Documentation
**Assigned to**: Developer 2
**Estimated Time**: 3 hours
**Files to Update**:
- Help text throughout app
- Tooltips
- Error messages
- Loading messages

**Acceptance Criteria**:
- [ ] Commercial terminology used
- [ ] SCOTT referenced
- [ ] Professional tone

---

## Phase 6: Testing & Validation (Days 13-14)
**Priority**: Critical
**Dependencies**: All phases

### Task 6.1: Visual Regression Testing
**Assigned to**: Both Developers
**Estimated Time**: 4 hours
**Tools**: Puppeteer/Playwright

**Test Script**:
```javascript
// Check for Stellar orange
const hasOrange = await page.evaluate(() => {
  return document.body.innerHTML.includes('#E74C3C')
})
expect(hasOrange).toBe(false)

// Check for SCC logo
const logo = await page.$('img[alt="SCC"]')
expect(logo).toBeTruthy()
```

**Acceptance Criteria**:
- [ ] No Stellar colors found
- [ ] SCC branding consistent
- [ ] All pages checked

### Task 6.2: Content Validation
**Assigned to**: Developer 1
**Estimated Time**: 3 hours
**Validation Checklist**:
- [ ] No "Stella" references
- [ ] All "SCOTT" references correct
- [ ] Commercial terminology throughout
- [ ] Property types updated
- [ ] Demo data accurate

### Task 6.3: Cross-Browser Testing
**Assigned to**: Developer 2
**Estimated Time**: 3 hours
**Browsers to Test**:
- Chrome (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari
- Mobile Chrome

**Acceptance Criteria**:
- [ ] Consistent rendering
- [ ] Fonts load correctly
- [ ] Colors accurate
- [ ] Responsive design works

### Task 6.4: Performance Testing
**Assigned to**: Developer 1
**Estimated Time**: 2 hours
**Metrics to Check**:
- Page load time < 3s
- Font loading optimized
- Image sizes appropriate
- No memory leaks

**Acceptance Criteria**:
- [ ] Performance unchanged
- [ ] No degradation
- [ ] Lighthouse scores good

### Task 6.5: UAT Preparation
**Assigned to**: Both Developers
**Estimated Time**: 2 hours
**Deliverables**:
- Test scenarios document
- Known issues list
- Rollback plan
- Demo script

**Acceptance Criteria**:
- [ ] Documentation complete
- [ ] Stakeholders briefed
- [ ] Rollback tested

---

## Critical Path Tasks

These tasks must be completed in order:

1. **Task 1.2**: Update Tailwind Configuration
2. **Task 1.3**: Update Global CSS Variables
3. **Task 2.2**: Update Color Class Names
4. **Task 3.1**: Update Button Component
5. **Task 4.1**: Update Landing Page

---

## Risk Mitigation Tasks

### Backup Task: Create Feature Flag System
**Optional - Only if needed**
**Estimated Time**: 4 hours

```typescript
// lib/features/brand.ts
export const getBrand = () => {
  return process.env.NEXT_PUBLIC_BRAND || 'scc'
}

export const brandConfig = getBrand() === 'scc' ? sccConfig : stellarConfig
```

### Rollback Task: Git Reversion Script
**Prepared but not executed**
```bash
#!/bin/bash
# rollback.sh
git revert --no-commit HEAD~5..HEAD
git commit -m "Revert SCC rebrand"
git push origin main
```

---

## Task Assignment Summary

### Developer 1 (Senior)
- 22 tasks
- ~45 hours work
- Focus: Core branding, components, claims

### Developer 2
- 23 tasks
- ~43 hours work
- Focus: CSS, forms, AI updates

---

## Daily Standup Topics

### Day 1-2
- Foundation setup complete?
- Any blockers with colors?
- Font loading issues?

### Day 3-4
- Global replacements done?
- Any missed Stella references?
- Color classes updated?

### Day 5-7
- Component updates progress?
- Any design questions?
- Consistency check?

### Day 8-10
- Page updates complete?
- Navigation working?
- Reports generating?

### Day 11-12
- AI prompts updated?
- Demo data ready?
- Content reviewed?

### Day 13-14
- Testing results?
- Any critical bugs?
- Ready for UAT?

---

## Success Metrics

1. **Zero Stellar References**: 0 found in codebase
2. **Color Compliance**: 100% using SCC palette
3. **Performance**: <3s page loads maintained
4. **Testing Coverage**: All pages validated
5. **Timeline**: Completed within 14 days

---

## Handoff Checklist

### For QA Team
- [ ] Test scenarios provided
- [ ] Regression test suite updated
- [ ] Visual comparison baseline set
- [ ] Bug tracking configured

### For Design Team
- [ ] Color implementation reviewed
- [ ] Typography approved
- [ ] Logo placement verified
- [ ] Commercial images approved

### For Product Team
- [ ] Demo ready for stakeholders
- [ ] Documentation updated
- [ ] Training materials prepared
- [ ] Success metrics defined

---

*Task breakdown generated: 2025-09-25*
*Total tasks: 45*
*Estimated effort: 88 person-hours*
*Recommended team: 2-3 developers*

---

**Next Action**: Assign tasks in project management system and begin Phase 1 implementation.