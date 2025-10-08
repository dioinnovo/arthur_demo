# Care Coordination Workflow - PRD & Implementation Tracker

**Project:** Arthur Health Care Coordination Technical Showcase
**Version:** 1.0
**Last Updated:** October 2025
**Status:** 🟡 Planning → In Progress

---

## 📋 Table of Contents
1. [Executive Summary](#executive-summary)
2. [Epic Checklist & Progress](#epic-checklist--progress)
3. [Implementation Details](#implementation-details)
4. [Technical Architecture](#technical-architecture)
5. [Success Metrics](#success-metrics)

---

## Executive Summary

### 🎯 Problem Statement
The current Arthur Health demo has redundant pages (Care Coordination and Clinical Pathways pointing to wrong routes) and fails to showcase the advanced technical architecture that was built for SCC Adjusters:
- Speech-to-text documentation
- Multi-area carousel navigation
- AI-powered insights
- Professional report generation

The inspection workflow exists but uses property insurance terminology instead of healthcare care coordination concepts.

### 💡 Solution
Adapt the existing inspection workflow to create a comprehensive **Care Session Workflow** that demonstrates Arthur Health's care coordination capabilities with the full technical stack.

### 📊 Overall Progress
- **Total Epics:** 7
- **Total Story Points:** 32
- **Completed:** 0/32 (0%)
- **Status:** Ready to begin

---

## Epic Checklist & Progress

### Epic 1: Care Session Workflow Infrastructure ⏳
**Priority:** P0 (Critical) | **Points:** 8 | **Progress:** ☐☐☐☐☐☐☐☐ 0/8

#### 📝 User Stories
- [ ] As a care coordinator, I want to initiate a new care session for a patient
- [ ] As a care coordinator, I want to navigate between assessment categories using a carousel interface
- [ ] As a care coordinator, I want to see my progress across all assessment categories

#### ✅ Acceptance Criteria
- [ ] Create `/app/dashboard/care-sessions` directory structure
- [ ] Copy and rename inspection workflow files
- [ ] Update routing from inspection → care-sessions
- [ ] Create CareSessionCarousel component (rename from InspectionAreaCarousel)
- [ ] Update demo data to use healthcare terminology
- [ ] All existing features work with new naming

#### 🔧 Technical Tasks
- [ ] Create care session data structure in TypeScript
- [ ] Update route handlers for care-sessions
- [ ] Migrate localStorage keys from inspection to care-sessions
- [ ] Update TypeScript interfaces for healthcare context
- [ ] Test carousel navigation with new routes

---

### Epic 2: Healthcare Assessment Categories ⏳
**Priority:** P0 (Critical) | **Points:** 5 | **Progress:** ☐☐☐☐☐ 0/5

#### 📝 User Stories
- [ ] As a care coordinator, I want to document vital signs and measurements
- [ ] As a care coordinator, I want to review and update medications
- [ ] As a care coordinator, I want to assess symptoms and conditions

#### ✅ Acceptance Criteria
- [ ] Replace INSPECTION_AREAS with ASSESSMENT_CATEGORIES
- [ ] Define 7-10 healthcare assessment categories:
  - [ ] Vital Signs & Measurements
  - [ ] Medication Review & Reconciliation
  - [ ] Symptom Assessment
  - [ ] Care Plan Review
  - [ ] Patient Education & Engagement
  - [ ] Social Determinants of Health
  - [ ] Follow-up Coordination
  - [ ] Care Team Communication
- [ ] Each category has appropriate healthcare icon
- [ ] Category-specific prompts and fields configured

#### 🔧 Technical Tasks
- [ ] Define ASSESSMENT_CATEGORIES constant
- [ ] Map icons from lucide-react for each category
- [ ] Create category-specific field prompts
- [ ] Update carousel to use new categories
- [ ] Add category metadata (clinical focus, priority, etc.)

#### 📋 Categories Structure
```typescript
const ASSESSMENT_CATEGORIES = [
  {
    id: 'vitals-measurements',
    name: 'Vital Signs & Measurements',
    category: 'Clinical Assessment',
    icon: Activity,
    prompts: {
      findings: 'Document vital signs and measurements...',
      observations: 'Note any abnormal findings...',
      actions: 'Required interventions or follow-up...'
    }
  },
  // ... more categories
]
```

---

### Epic 3: Clinical Documentation Features ⏳
**Priority:** P0 (Critical) | **Points:** 3 | **Progress:** ☐☐☐ 0/3

#### 📝 User Stories
- [ ] As a care coordinator, I want to use speech-to-text to document clinical observations
- [ ] As a care coordinator, I want to upload patient photos/wound photos
- [ ] As a care coordinator, I want to review transcribed voice notes

#### ✅ Acceptance Criteria
- [ ] Voice recording works for clinical notes
- [ ] Transcription appears in "Clinical Observations" field
- [ ] Photo upload supports clinical categories:
  - [ ] Vital Signs Display
  - [ ] Wound Documentation
  - [ ] Medication Verification
  - [ ] Patient Education Materials
  - [ ] Care Environment Assessment
- [ ] Voice notes show transcript modal
- [ ] Copy transcript to clipboard works

#### 🔧 Technical Tasks
- [ ] Update PHOTO_CATEGORIES to healthcare terms
- [ ] Test voice recording in care session context
- [ ] Verify transcription field mapping
- [ ] Update modal text for clinical context
- [ ] Add healthcare-specific placeholder text

---

### Epic 4: AI-Powered Clinical Insights ⏳
**Priority:** P1 (High) | **Points:** 5 | **Progress:** ☐☐☐☐☐ 0/5

#### 📝 User Stories
- [ ] As a care coordinator, I want to receive AI-powered clinical insights
- [ ] As a care coordinator, I want to see risk alerts and warnings
- [ ] As a care coordinator, I want care optimization suggestions

#### ✅ Acceptance Criteria
- [ ] AI insights analyze clinical observations
- [ ] Three insight types implemented:
  - [ ] Clinical Suggestions (medication reconciliation, lab orders)
  - [ ] Risk Warnings (vital sign alerts, medication interactions)
  - [ ] Care Opportunities (preventive care, care gaps)
- [ ] Insights appear in real-time as documentation progresses
- [ ] Confidence scores displayed
- [ ] Insights are healthcare-relevant

#### 🔧 Technical Tasks
- [ ] Create healthcare-specific AI insight templates
- [ ] Update analyzeMedia function for clinical context
- [ ] Add vital signs threshold checks
- [ ] Implement medication interaction alerts
- [ ] Create care gap detection logic

#### 💡 Example Insights
```typescript
{
  type: 'warning',
  title: 'Elevated Blood Pressure Alert',
  description: 'BP 156/92 exceeds target range. Consider medication adjustment.',
  confidence: 94
}

{
  type: 'suggestion',
  title: 'Medication Reconciliation Needed',
  description: 'Patient reports not taking Lisinopril as prescribed.',
  confidence: 88
}
```

---

### Epic 5: Care Session Reports ⏳
**Priority:** P1 (High) | **Points:** 5 | **Progress:** ☐☐☐☐☐ 0/5

#### 📝 User Stories
- [ ] As a care coordinator, I want to generate a comprehensive care session report
- [ ] As a care coordinator, I want to download reports as PDF
- [ ] As a care coordinator, I want to see all completed assessment categories

#### ✅ Acceptance Criteria
- [ ] Care session review page shows all assessments
- [ ] PDF generation includes:
  - [ ] Patient demographics
  - [ ] Vital signs and measurements
  - [ ] Clinical observations from all categories
  - [ ] AI insights and recommendations
  - [ ] Care plan updates
  - [ ] Follow-up actions
  - [ ] Provider signatures/timestamps
- [ ] Professional healthcare report formatting
- [ ] Download as PDF works

#### 🔧 Technical Tasks
- [ ] Create care session report template
- [ ] Update PDF generator for healthcare format
- [ ] Add clinical data sections to report
- [ ] Implement signature/timestamp fields
- [ ] Test PDF generation with sample data

---

### Epic 6: Navigation & Information Architecture ⏳
**Priority:** P0 (Critical) | **Points:** 3 | **Progress:** ☐☐☐ 0/3

#### 📝 User Stories
- [ ] As a user, I want clear navigation that reflects Arthur Health's care coordination focus
- [ ] As a user, I want consistent terminology throughout the application

#### ✅ Acceptance Criteria
- [ ] Update Sidebar navigation:
  - [ ] Dashboard → /dashboard (keep)
  - [ ] Care Coordination → /dashboard/care-coordination (patient/case list)
  - [ ] Care Sessions → /dashboard/care-sessions (active workflow)
  - [ ] Referral Management → /dashboard/referrals (keep)
  - [ ] Arthur AI → /dashboard/assistant (keep)
  - [ ] Integrations → /dashboard/integrations (keep)
- [ ] Update mobile bottom navigation
- [ ] Update all breadcrumbs and page titles
- [ ] Remove or hide "Clinical Pathways" (redundant)

#### 🔧 Technical Tasks
- [ ] Update Sidebar.tsx menu items
- [ ] Update MobileBottomNav.tsx links
- [ ] Rename claims route to care-coordination
- [ ] Update page titles and headers
- [ ] Test all navigation paths

#### 📁 Route Structure
```
/dashboard - Analytics overview
/dashboard/care-coordination - Patient/case list
/dashboard/care-sessions - Active care session workflow
  /dashboard/care-sessions/new - Start new session
  /dashboard/care-sessions/[id]/category/[categoryId] - Assessment
  /dashboard/care-sessions/[id]/review - Session review
  /dashboard/care-sessions/[id]/report - Final report
/dashboard/referrals - Referral management
/dashboard/assistant - Arthur AI
/dashboard/integrations - System integrations
```

---

### Epic 7: Demo Data & Scenarios ⏳
**Priority:** P1 (High) | **Points:** 3 | **Progress:** ☐☐☐ 0/3

#### 📝 User Stories
- [ ] As a demo viewer, I want to see realistic care coordination scenarios
- [ ] As a demo viewer, I want to see completed care sessions

#### ✅ Acceptance Criteria
- [ ] Create 3 demo care sessions with full data:
  - [ ] Scenario 1: Diabetes management check-in (Margaret Thompson)
  - [ ] Scenario 2: Post-discharge follow-up (James Mitchell)
  - [ ] Scenario 3: Chronic care coordination visit (Robert Chen)
- [ ] Each session has:
  - [ ] Completed vitals
  - [ ] Voice note transcripts
  - [ ] Clinical photos
  - [ ] AI insights
  - [ ] Generated reports

#### 🔧 Technical Tasks
- [ ] Create demo patient data for 3 scenarios
- [ ] Generate clinical observation text
- [ ] Create mock voice transcripts
- [ ] Add clinical photos/screenshots
- [ ] Generate AI insights for each scenario
- [ ] Create completed session reports

#### 👥 Demo Scenarios

**1. Margaret Thompson - Diabetes Care Coordination**
- Type 2 Diabetes, Hypertension
- Medication reconciliation needed
- A1C test due
- Endocrinology referral

**2. James Mitchell - Post-Discharge Follow-up**
- CHF exacerbation
- Recent hospitalization
- Home health coordination
- Multiple medications

**3. Robert Chen - Chronic Care Management**
- COPD, Diabetes
- Care plan optimization
- Preventive care gaps
- Social determinants assessment

---

## Implementation Details

### 🏗️ Technical Architecture

**Core Stack:**
- Next.js 15.5.4 with App Router
- TypeScript for type safety
- Framer Motion for animations
- Speech-to-text API integration
- PDF generation with @pdfme/generator
- LocalStorage for demo persistence

**Key Components to Adapt:**
- `/app/dashboard/inspection/[id]/area/[areaId]/page.tsx` → Care session workflow
- `InspectionAreaCarousel` → `CareSessionCarousel`
- Inspection data structures → Care session data structures

**Files to Update:**
- `components/Sidebar.tsx` - Navigation
- `components/MobileBottomNav.tsx` - Mobile nav
- `app/dashboard/inspection/**` - Rename to care-sessions
- `lib/hooks/useInspectionData.ts` - Rename to useCareSessionData

### 📦 Dependencies
- ✅ Existing inspection workflow code (available)
- ✅ InspectionAreaCarousel component (needs adaptation)
- ✅ Voice recording infrastructure (working)
- ✅ PDF generation utilities (working)

### ⚠️ Risks & Mitigation
| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing demo | High | Thorough testing, feature flags |
| Speech-to-text API limits | Medium | Fallback to text input |
| Mobile responsiveness | Medium | Test on multiple devices |
| Demo data complexity | Low | Start with 1 scenario, expand |

---

## Success Metrics

### ✅ Must Have (P0)
- [ ] Care session workflow fully functional
- [ ] Speech-to-text documentation working
- [ ] Multi-category carousel navigation
- [ ] Healthcare-relevant terminology throughout
- [ ] Professional care session reports

### 🎯 Should Have (P1)
- [ ] AI clinical insights
- [ ] 3 complete demo scenarios
- [ ] PDF download functionality
- [ ] Mobile-optimized workflow

### 🌟 Nice to Have (P2)
- [ ] Care team collaboration features
- [ ] Real-time updates
- [ ] Advanced AI recommendations
- [ ] Integration previews

---

## 📅 Timeline & Milestones

### Phase 1: Infrastructure (Week 1)
- [ ] Epic 1: Care Session Workflow Infrastructure
- [ ] Epic 6: Navigation & Information Architecture

### Phase 2: Core Features (Week 2)
- [ ] Epic 2: Healthcare Assessment Categories
- [ ] Epic 3: Clinical Documentation Features

### Phase 3: Intelligence & Reporting (Week 3)
- [ ] Epic 4: AI-Powered Clinical Insights
- [ ] Epic 5: Care Session Reports

### Phase 4: Demo & Polish (Week 4)
- [ ] Epic 7: Demo Data & Scenarios
- [ ] Testing & refinement
- [ ] Documentation

---

## 🎬 Next Steps

**Immediate Actions:**
1. ✅ Create this tracking document
2. Start Epic 1 & 6 (Infrastructure & Navigation)
3. Create care-sessions directory structure
4. Update navigation components
5. Begin terminology updates

**Development Flow:**
1. Complete infrastructure setup (Epic 1, 6)
2. Implement healthcare categories (Epic 2)
3. Verify clinical documentation (Epic 3)
4. Add AI insights (Epic 4)
5. Build report generation (Epic 5)
6. Create demo scenarios (Epic 7)

---

## 📝 Notes & Decisions
- Keep original inspection workflow as backup
- Test thoroughly on mobile devices
- Ensure all terminology is healthcare-appropriate
- Get stakeholder feedback after each epic
- Document any breaking changes

---

**Last Updated:** January 2025
**Document Owner:** Product Team
**Review Frequency:** After each epic completion
