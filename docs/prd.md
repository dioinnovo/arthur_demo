# Arthur Health AI-Assisted Care Coordination Enhancement Product Requirements Document (PRD)

## Goals and Background Context

### Goals
- Enable care coordinators to leverage AI-powered referral intelligence with provider recommendations based on specialty match, distance, ratings, and similar-patient outcomes
- Surface critical care gaps (overdue screenings, missed consultations, fall risks) proactively with VBC impact visibility
- Demonstrate personalized care pathway recommendations with cohort-based insights, evidence citations, and quality metric alignment (HEDIS/Star Ratings)
- Integrate healthcare and social determinants of health (SDOH) services into a unified referral workflow
- Provide real-time predictive analytics showing expected outcomes, time-to-recovery estimates, and risk implications for pathway decisions
- Transform existing care assessment carousel into an intelligent care coordination workflow engine

### Background Context

Arthur Health's platform currently demonstrates strong AI capabilities in policy analysis and authorization workflows, but the care coordination features lack the intelligence layer that differentiates Arthur from competitors. Care coordinators today work with isolated components—patient data, interventions, and assessments exist separately without AI-guided connections or outcome predictions.

The market opportunity is clear: healthcare providers are shifting to value-based care models where quality metrics (HEDIS, Star Ratings) directly impact reimbursement, yet most care coordination platforms don't surface VBC implications at the point of decision. By exposing Arthur's AI engine through enhanced UI components—particularly the care pathway carousel, referral modals, and gap detection alerts—we can demonstrate how cohort learning and predictive analytics operationalize evidence-based care while aligning clinical actions with value-based incentives. The initial implementation focuses on high-impact, demo-ready enhancements that reuse existing component patterns while establishing the foundation for future ML integration.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-06 | v1.0 | Initial PRD creation from brainstorming session results | PM Agent |

---

## Requirements

### Functional Requirements

**FR1:** The system shall display care pathway cards in a carousel interface showing VBC impact predictions (e.g., "If skipped: +7 days delay, +15% readmit risk") for each recommended intervention.

**FR2:** The system shall display cohort-based insights on pathway cards showing outcome data from similar patients (e.g., "In 1,248 similar cases, early PT reduced recovery time by 31%").

**FR3:** The system shall display evidence citations and clinical guideline references on each pathway card to support recommendation rationale.

**FR4:** The system shall display HEDIS and Star Rating quality metric impact badges on interventions that affect value-based care performance.

**FR5:** The system shall detect and display care gaps (overdue screenings, missed consultations, fall risks) as priority alert badges on patient list cards with gap count and VBC risk level indicators.

**FR6:** The system shall provide an AI-powered referral modal that displays provider recommendations with match confidence scores, specialty alignment rationale, distance, ratings, and predicted outcomes based on similar patient data.

**FR7:** The system shall support toggling between healthcare provider networks and integrated SDOH service networks (transportation, copay assistance, community resources) within the referral interface.

**FR8:** The system shall display a referral status tracking section in patient detail views showing active referrals with scheduling status, expected completion dates, and historical referral outcomes.

**FR9:** The system shall trigger the AI referral modal from pathway card action buttons (e.g., "Refer" button on PT re-engagement card).

**FR10:** The system shall display gap detection data for specific patients in the demo scenario (e.g., Margaret Thompson with PT follow-up overdue and imaging appropriateness gap).

### Non-Functional Requirements

**NFR1:** All enhanced UI components shall reuse existing component patterns (carousel, modal, badge) from the current codebase to minimize implementation effort and maintain design consistency.

**NFR2:** Mock data structures shall support all displayed AI insights (VBC predictions, cohort outcomes, provider recommendations) to enable demo functionality without requiring backend ML integration.

**NFR3:** The implementation shall be completable within a single demo preparation day (morning to late morning timeframe) for the 3 priority features.

**NFR4:** All care coordination enhancements shall follow HIPAA compliance patterns established in existing Arthur Health platform components.

**NFR5:** UI components shall maintain accessibility standards consistent with healthcare application requirements (WCAG 2.1 AA minimum).

**NFR6:** The system shall display AI confidence scores and match rationale to build clinician trust and demonstrate explainable AI capabilities.

---

## User Interface Design Goals

### Overall UX Vision

Arthur Health's care coordination interface should feel like an intelligent clinical partner that surfaces the right information at the right moment in the care coordinator's workflow. The experience must balance clinical sophistication (showing evidence, cohorts, predictions) with operational simplicity—coordinators should grasp VBC implications and AI recommendations at a glance without cognitive overload. The design paradigm is "ambient intelligence": AI insights are embedded contextually within familiar workflows rather than requiring separate dashboards or reports. Visual hierarchy emphasizes actionability: gaps demand attention, pathways guide decisions, and referrals execute seamlessly.

### Key Interaction Paradigms

- **Progressive Disclosure**: Pathway cards show essential data (VBC impact, confidence) at a glance, with expandable sections for evidence citations and cohort details
- **Contextual AI Guidance**: AI recommendations appear inline where decisions are made (referral modal triggered from pathway card action button)
- **Visual Prioritization**: Color-coded badges and risk indicators (orange for gaps, green for on-track) guide attention to high-priority patients and interventions
- **Seamless Workflow Integration**: Each UI component connects to the next (gap alert → patient detail → pathway carousel → referral modal → status tracker) without context switching
- **Explainable Intelligence**: All AI outputs include rationale displays (match confidence, cohort sample size, evidence source) to build trust

### Core Screens and Views

1. **Patient List with Gap Detection** - Care coordinator's caseload view showing patient cards with gap alert badges
2. **Patient Detail View** - Comprehensive patient record with tabs for demographics, interventions, care pathways, referral tracking
3. **Care Pathway Carousel** - AI-prioritized recommendation cards with VBC impact, cohort insights, evidence, and action buttons
4. **AI Referral Modal** - Provider recommendation interface with specialty match, distance/ratings, similar-patient outcomes, and integrated SDOH services toggle
5. **Referral Status Tracker** - Section within patient detail showing active referrals, scheduling status, and historical outcomes

### Accessibility: WCAG 2.1 AA

Healthcare applications must meet WCAG 2.1 AA compliance for accessibility, ensuring care coordinators with diverse abilities can use the platform effectively. This includes keyboard navigation, screen reader compatibility, sufficient color contrast, and clear focus indicators.

### Branding

Arthur Health platform uses healthcare-focused professional styling with primary Arthur Health Blue (#0066CC), Healthcare Green (#00A86B) for positive outcomes, and Trust Purple (#6B46C1) for accents. Warning states (gaps, VBC risks) use orange tones. The design system emphasizes clarity and trust—clinical data must be readable, AI confidence must be visually distinct, and interactive elements must feel precise and reliable. Existing shadcn/ui components with healthcare customizations provide the foundation; new components should match this established visual language.

### Target Device and Platforms: Web Responsive

Primary target is desktop/laptop web browsers used by care coordinators in clinical settings, with responsive design supporting tablet use for on-the-go coordination. Mobile phone optimization is not prioritized for this release as coordinators typically work from workstations with larger screens when managing complex care pathways and referral decisions.

---

## Technical Assumptions

### Repository Structure: Monorepo

The Arthur Health platform is structured as a single Next.js monorepo with the App Router pattern. All frontend components, API routes, and shared utilities reside within the same codebase for simplified development and deployment.

### Service Architecture

**Monolithic Next.js Application with API Routes**

The platform uses Next.js 15.5.2 with App Router as a monolithic application architecture. Backend functionality is implemented through Next.js API routes rather than separate microservices. This approach provides:
- Simplified deployment and development workflow for demo-ready features
- Co-location of frontend components and their supporting APIs
- Reduced infrastructure complexity for MVP phase
- Future migration path to microservices if scaling demands require it

**Key Technical Stack:**
- **Frontend Framework:** Next.js 15.5.2 with App Router, React 18.2
- **UI Components:** shadcn/ui with Tailwind CSS 3.3, Framer Motion 11.0 for animations
- **State Management:** React hooks (current), Zustand for complex state (planned addition)
- **Data Visualization:** Recharts for analytics displays
- **AI Integration:** Vercel AI SDK, ChromaDB for vector operations (future ML integration)
- **TypeScript:** Full type safety across application
- **Component Patterns:** Existing carousel, modal, badge components to be extended

### Testing Requirements

**Unit + Integration Testing with Manual Demo Validation**

Given the demo-focused timeline and brownfield enhancement nature, testing strategy prioritizes:
- **Component Unit Tests:** Jest + React Testing Library for new UI components (pathway cards, referral modal, gap badges)
- **Integration Tests:** Verify component interactions and data flow through mock data structures
- **Manual QA:** Demo scenario walkthroughs with stakeholder validation before client presentation
- **Accessibility Testing:** Automated a11y checks (axe-core) for WCAG 2.1 AA compliance
- **No E2E Required:** For initial demo implementation; can be added post-demo for production readiness

**Testing Convenience:**
- Mock data structures should support easy scenario switching (different patients, gap types, referral outcomes)
- Component Storybook stories for isolated testing and design review

### Additional Technical Assumptions and Requests

- **Mock Data Architecture:** Create TypeScript interfaces for `CareGap`, `CohortInsight`, `VBCImpact`, `ProviderRecommendation`, `ReferralStatus` to ensure type safety across enhanced components
- **Component Extension Pattern:** Extend existing `CareAssessment` interface rather than creating new carousel component; maintains consistency and reduces duplication
- **API Route Stubs:** Create placeholder API routes (`/api/care-gaps`, `/api/referrals`, `/api/provider-recommendations`) that return mock data; allows frontend development to proceed independently and establishes contract for future backend implementation
- **Environment Variables:** Use `NEXT_PUBLIC_DEMO_MODE=true` flag to conditionally render enhanced features and mock data (already established pattern per CLAUDE.md)
- **Git Workflow:** Feature branch for care coordination enhancements; target completion and merge before demo presentation
- **Performance:** Carousel rendering with enhanced cards must maintain smooth animations (Framer Motion); monitor component re-renders if Zustand state management is introduced

---

## Epic List

**Epic 1: AI-Powered Care Gap Detection & Pathway Intelligence**
Implement proactive care gap detection on patient lists and enhance the care pathway carousel with VBC impact predictions, cohort-based insights, evidence citations, and quality metric alignment to guide care coordinator decision-making.

**Epic 2: Intelligent Referral Management & Tracking**
Enable AI-powered provider recommendations with integrated healthcare and SDOH service networks, and implement referral status tracking to close the loop on care coordination actions.

---

## Epic 1: AI-Powered Care Gap Detection & Pathway Intelligence

**Epic Goal:** Enable care coordinators to proactively identify high-priority patients through intelligent gap detection and make evidence-based care pathway decisions informed by VBC impact predictions, cohort outcomes, clinical evidence, and quality metric alignment. This epic transforms reactive care coordination into AI-guided prioritization and decision support.

### Story 1.1: Care Gap Detection Alerts on Patient List

**As a** care coordinator,
**I want** to see visual alerts on patient list cards indicating critical care gaps with their count and VBC risk level,
**so that** I can immediately identify which patients need urgent attention and prioritize my caseload based on quality and outcome risk.

#### Acceptance Criteria

1. Patient list cards display a gap alert badge when `careGaps` array contains one or more gap items
2. Gap badge shows the count of critical gaps (e.g., "2 Gaps") and a VBC risk level indicator (color-coded: orange for medium-high risk)
3. Badge is visually prominent but does not obscure other patient card information (positioned top-right or as overlay)
4. TypeScript interface `CareGap` is defined with fields: `id`, `type`, `description`, `daysOverdue`, `vbcRiskLevel`, `impactDescription`
5. Patient data model is extended to include optional `careGaps: CareGap[]` property
6. Gap badge component is keyboard accessible and screen-reader compatible (WCAG 2.1 AA)
7. Clicking/focusing gap badge provides brief tooltip or expansion showing gap details without navigating away from patient list
8. Demo data includes Margaret Thompson patient record with 2 care gaps: "PT follow-up overdue (14 days)" and "Imaging appropriateness review needed"

---

### Story 1.2: AI-Enhanced Care Pathway Carousel with Intelligence Displays

**As a** care coordinator,
**I want** to view care pathway recommendation cards enriched with VBC impact predictions, cohort-based outcome insights, evidence citations, and HEDIS/Star rating badges,
**so that** I can understand the clinical rationale, quality implications, and expected outcomes for each intervention before making coordination decisions.

#### Acceptance Criteria

1. `CareAssessment` TypeScript interface is extended with new optional fields:
   - `vbcImpact`: object with `delayDays`, `readmitRiskIncrease`, `costImpact`, `description`
   - `cohortInsight`: object with `sampleSize`, `outcomeImprovement`, `description`, `confidenceLevel`
   - `evidenceCitation`: object with `source`, `guideline`, `strengthOfRecommendation`, `citationUrl`
   - `hedisStarImpact`: object with `measure`, `impactLevel`, `description`
2. Care pathway carousel component renders VBC impact section when `vbcImpact` data is present, displaying warning-styled content (e.g., "If skipped: +7 days delay, +15% readmit risk")
3. Carousel cards render cohort insight section when `cohortInsight` data is present, displaying supportive evidence (e.g., "In 1,248 similar cases, early PT reduced recovery time by 31%")
4. Carousel cards render evidence citation section when `evidenceCitation` data is present, with expandable/collapsible detail and clickable citation link
5. HEDIS/Star rating impact badges are displayed on cards when `hedisStarImpact` data is present, using distinct visual treatment (badge or pill component with quality metric icon)
6. Enhanced card sections maintain visual hierarchy: primary action remains prominent, AI insights provide supporting context without overwhelming the interface
7. All new sections are responsive and maintain readability on tablet-sized screens
8. Framer Motion animations continue to function smoothly with enhanced card content (no performance degradation)

---

### Story 1.3: Demo Scenario Data Population for Low-Back Pain Pathway

**As a** demo presenter,
**I want** realistic mock data for James Mitchell's low-back pain care pathway with all AI intelligence fields populated,
**so that** I can demonstrate the full capability of gap detection and pathway intelligence in a clinically authentic scenario.

#### Acceptance Criteria

1. James Mitchell patient record exists in mock data with demographics, conditions (low-back pain, diabetes, hypertension), and care gaps
2. Low-back pain care pathway includes minimum 4 pathway cards with complete AI intelligence data:
   - **Card 1: PT Re-engagement** with VBC impact ("If delayed: +9-14 days recovery"), cohort insight ("1,248 cases, 31% improvement"), evidence citation (clinical guideline), HEDIS impact (not applicable)
   - **Card 2: Imaging Appropriateness Review** with VBC impact ("Unnecessary imaging: +$850 cost, no outcome benefit"), cohort insight ("892 cases avoided unnecessary MRI"), evidence citation (Choosing Wisely guideline), HEDIS Star impact (Overuse measure)
   - **Card 3: Pain Management Consultation** with relevant AI intelligence data
   - **Card 4: Functional Assessment Follow-up** with relevant AI intelligence data
3. Margaret Thompson patient record includes 2 populated care gaps matching gap detection acceptance criteria from Story 1.1
4. Mock data structure uses TypeScript interfaces defined in Stories 1.1 and 1.2 for type safety
5. Demo scenario data is isolated in a dedicated mock data file (e.g., `lib/demo/care-coordination-demo-data.ts`) for easy updates and scenario switching
6. Comments in mock data file explain clinical rationale for each AI insight to support demo narrative preparation
7. All VBC predictions, cohort outcomes, and evidence citations use realistic clinical values (not placeholder text) to withstand scrutiny during client presentation

---

## Epic 2: Intelligent Referral Management & Tracking

**Epic Goal:** Empower care coordinators to execute AI-guided referral decisions seamlessly by providing intelligent provider recommendations with match rationale and similar-patient outcomes, integrating healthcare and SDOH service networks, and enabling referral status tracking to close the loop on care coordination actions. This epic transforms pathway recommendations into actionable workflows with outcome visibility.

### Story 2.1: AI Referral Modal with Provider Recommendations

**As a** care coordinator,
**I want** to access an AI-powered referral modal showing ranked provider recommendations with match confidence, specialty alignment, distance/ratings, and predicted outcomes based on similar patients,
**so that** I can quickly select the best provider for my patient's needs with confidence in the AI's rationale and expected results.

#### Acceptance Criteria

1. TypeScript interface `ProviderRecommendation` is defined with fields: `providerId`, `name`, `specialty`, `distance`, `rating`, `matchConfidence`, `matchRationale`, `similarPatientOutcomes`, `contactInfo`, `acceptingNewPatients`, `networkStatus`
2. TypeScript interface `SimilarPatientOutcome` is defined with fields: `sampleSize`, `outcomeMetric`, `averageResult`, `timeframe`
3. Referral modal component (`ReferralModal.tsx`) is created using existing modal patterns from codebase (reuse shadcn/ui Dialog or similar)
4. Modal displays AI-ranked provider list (top 3-5 providers) ordered by match confidence score
5. Each provider card in modal shows:
   - Provider name, specialty, and distance
   - Star rating and "accepting new patients" status
   - Match confidence score displayed prominently (e.g., "94% match confidence")
   - Match rationale explanation (e.g., "Specializes in conservative low-back pain management, excellent outcomes with diabetic patients")
   - Similar patient outcomes section (e.g., "In 87 similar cases: avg. 18 days to functional recovery")
6. Modal is accessible (keyboard navigation, screen reader support, focus management) per WCAG 2.1 AA
7. Modal includes "Create Referral" primary action button and "Cancel" secondary action
8. API route stub `/api/provider-recommendations` is created returning mock provider data based on request parameters (patient condition, location, insurance)
9. Modal supports loading state while fetching recommendations and error state if fetch fails

---

### Story 2.2: Integrated Network View for Healthcare and SDOH Services

**As a** care coordinator,
**I want** to toggle between healthcare provider networks and integrated SDOH service networks within the referral modal,
**so that** I can address both medical and social determinant needs in a unified workflow and coordinate holistic care for my patients.

#### Acceptance Criteria

1. TypeScript interface `SDOHService` is defined with fields: `serviceId`, `organizationName`, `serviceType`, `description`, `distance`, `contactInfo`, `eligibilityRequirements`, `availability`
2. Referral modal includes a toggle control (tabs or segmented button) with options: "Healthcare Providers" and "Social Services"
3. When "Social Services" is selected, modal displays SDOH service recommendations filtered by patient need (e.g., transportation, copay assistance, nutritional support, housing)
4. SDOH service cards display:
   - Organization name and service type
   - Brief description of services
   - Distance/location and contact information
   - Eligibility requirements and current availability
5. Toggle state persists during modal session but resets to "Healthcare Providers" when modal reopens
6. Both provider and SDOH service views use consistent card layout patterns for visual coherence
7. API route stub `/api/sdoh-services` is created returning mock SDOH service data based on request parameters (patient location, identified needs)
8. Modal maintains accessibility when toggling between views (focus management, screen reader announcements)
9. Demo data includes relevant SDOH services for James Mitchell scenario: transportation assistance (for PT appointments), copay assistance program, chronic pain support group

---

### Story 2.3: Referral Status Tracking in Patient Detail View

**As a** care coordinator,
**I want** to view a referral status tracking section within patient detail showing active referrals, scheduling progress, expected completion dates, and historical referral outcomes,
**so that** I can monitor whether referrals are being completed and learn from past referral effectiveness to inform future decisions.

#### Acceptance Criteria

1. TypeScript interface `ReferralStatus` is defined with fields: `referralId`, `providerName`, `specialty`, `referralDate`, `status`, `schedulingStatus`, `appointmentDate`, `expectedCompletionDate`, `outcome`, `notes`
2. TypeScript enum `ReferralStatusType` is defined with values: `PENDING`, `SCHEDULED`, `COMPLETED`, `CANCELLED`, `OVERDUE`
3. Patient detail view includes new "Referrals" tab or section (following existing tab pattern in patient detail component)
4. Referral tracking section displays two subsections: "Active Referrals" and "Referral History"
5. Active referrals display status cards showing:
   - Provider name and specialty
   - Referral date and current status (with status badge: pending/scheduled/overdue)
   - Appointment date (if scheduled) or "Awaiting scheduling" indicator
   - Expected completion date with visual indicator if overdue
6. Referral history displays completed/cancelled referrals with:
   - Provider name, specialty, and referral date
   - Outcome summary (if available)
   - Time from referral to completion
7. Referral status section uses existing intervention card patterns for consistency with current patient detail UI
8. API route stub `/api/referrals` is created supporting GET request for patient referrals (returns mock data)
9. Demo data includes referral history for James Mitchell: completed PT referral (6 months ago, successful outcome) and active PT re-engagement referral (scheduled for next week)

---

### Story 2.4: Pathway Card to Referral Modal Integration and Demo Flow

**As a** care coordinator,
**I want** pathway card action buttons to trigger the AI referral modal with context-appropriate provider recommendations,
**so that** I can seamlessly progress from identifying care needs to executing referrals without switching screens or losing context.

#### Acceptance Criteria

1. Pathway cards in carousel include "Refer" or "Create Referral" action button for interventions that require provider referrals
2. Clicking "Refer" button opens the referral modal with:
   - Pre-populated patient context (patient ID, condition, intervention type)
   - Provider recommendations filtered by intervention specialty needs (e.g., PT re-engagement card triggers PT provider recommendations)
   - Modal title reflects the intervention (e.g., "Create Referral: Physical Therapy Re-engagement")
3. Modal receives pathway card context as props or via state management to ensure recommendations are relevant
4. Successfully creating a referral (clicking "Create Referral" button in modal):
   - Shows success confirmation message
   - Closes modal and returns to patient detail view
   - Updates referral status tracking section to show new active referral
5. Demo scenario workflow is complete end-to-end:
   - Margaret Thompson patient card shows 2 care gaps → Click patient → Patient detail loads
   - Care pathway carousel displays James Mitchell low-back pain pathway → PT Re-engagement card visible with AI intelligence
   - Click "Refer" on PT card → Referral modal opens with Boston Spine Center as 94% confidence match
   - Toggle to "Social Services" → Transportation assistance and copay support appear
   - Click "Create Referral" → Success, referral appears in status tracker
6. Integration maintains performance (no lag when opening modal or switching toggle views)
7. All TypeScript props and interfaces are properly typed across component boundaries (pathway card → modal → status tracker)

---

## Checklist Results Report

**PRD Validation: READY FOR ARCHITECT**

- **Overall Completeness**: 78% (Good)
- **MVP Scope**: Just Right - Well-scoped for demo context
- **Readiness**: Ready for architecture and UX design phases
- **Critical Gaps**: Missing measurable success metrics and stakeholder alignment (non-blocking for design phase)

**Key Strengths:**
- Comprehensive functional requirements with testable acceptance criteria
- Well-sequenced epic and story structure (logical dependencies)
- Clear technical constraints and brownfield context
- Detailed UX vision with interaction paradigms

**Recommendations for Production:**
- Add quantifiable success metrics and demo validation criteria
- Document stakeholder approval workflow
- Create production operational requirements appendix (monitoring, alerting)
- Add user journey diagram for 5-touchpoint workflow visualization

For detailed validation report, see PM checklist execution notes.

---

## Next Steps

### UX Expert Prompt

**Task:** Create detailed UI/UX specifications for AI-Assisted Care Coordination Enhancement

**Context:** This is a brownfield enhancement to the existing Arthur Health platform. Review `docs/prd.md` for complete requirements, then design the following:

**Deliverables Needed:**
1. **User Journey Diagram** - Visualize the 5-touchpoint workflow: gap alert → patient detail → pathway carousel → referral modal → status tracker
2. **Component Specifications** for:
   - Gap alert badge (patient list cards)
   - Enhanced pathway cards with VBC/cohort/evidence sections
   - AI referral modal with provider recommendations and SDOH toggle
   - Referral status tracking section
3. **Interaction Details**:
   - Progressive disclosure patterns for evidence citations and cohort details
   - Modal state management (open/close, toggle between providers/SDOH)
   - Status badge color coding and accessibility
4. **Accessibility Validation** - Ensure WCAG 2.1 AA compliance across all new components

**Design Constraints:**
- Reuse existing shadcn/ui component patterns (carousel, modal, badge)
- Follow Arthur Health brand colors: Blue (#0066CC), Green (#00A86B), Purple (#6B46C1), orange for warnings
- Maintain consistency with existing patient detail and intervention card patterns
- Target: Desktop/laptop primary, tablet responsive

**Key Question to Resolve:** What's the best progressive disclosure pattern for pathway cards - accordions, popovers, or expandable sections?

### Architect Prompt

**Task:** Design technical architecture for AI-Assisted Care Coordination Enhancement implementation

**Context:** Review `docs/prd.md` for complete requirements. This is a brownfield enhancement to an existing Next.js 15.5.2 application with demo-focused scope (3-hour implementation target).

**Key Architectural Decisions Required:**

1. **State Management Strategy**
   - How does patient/intervention context flow from pathway card to referral modal to status tracker?
   - Recommendation: Evaluate React Context vs. Zustand vs. props drilling
   - Consider: Modal needs patient ID, condition, intervention type from pathway card

2. **Component Extension Approach**
   - Current `CareAssessment` interface needs 4 new optional fields (vbcImpact, cohortInsight, evidenceCitation, hedisStarImpact)
   - Question: What's the safest way to extend without breaking existing carousel uses?
   - Recommendation: Audit all current CareAssessment usages first

3. **Modal Component Selection**
   - Multiple modals exist in codebase - which pattern should referral modal reuse?
   - Constraint: Must support loading states, error states, and complex content (provider cards, toggle, SDOH services)

4. **TypeScript Interface Architecture**
   - Define: CareGap, VBCImpact, CohortInsight, EvidenceCitation, HEDISStarImpact, ProviderRecommendation, SDOHService, ReferralStatus
   - Question: Where do these live? New `lib/types/care-coordination.ts` or extend existing types?

5. **API Route Stub Design**
   - Create: `/api/care-gaps`, `/api/referrals`, `/api/provider-recommendations`, `/api/sdoh-services`
   - Establish clear contracts for future ML integration
   - Mock data structure and response formats

**Deliverables:**
1. Technical design document covering state management, component architecture, and API contracts
2. TypeScript interface definitions for all new data structures
3. Component hierarchy and data flow diagram
4. Implementation sequence recommendation (which stories can be parallelized?)
5. Risk assessment: Identify technical complexity hot spots (Story 2.4 integration, carousel extension)

**Technical Constraints:**
- Must complete in 3-3.5 hours (demo deadline)
- Reuse existing components (shadcn/ui Dialog, existing carousel component)
- Maintain Framer Motion animation performance
- TypeScript strict mode compliance
- WCAG 2.1 AA accessibility standards

**Success Criteria:** Architect should provide sufficient detail for a developer to implement Epic 1 Story 1.1 without additional clarification.
