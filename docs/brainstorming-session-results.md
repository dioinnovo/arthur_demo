# Brainstorming Session Results

**Session Date:** 2025-10-06
**Facilitator:** Business Analyst Mary
**Participant:** Product Team

---

## Executive Summary

**Topic:** AI-Assisted Care Coordination Enhancement - Referral Intelligence & Gap Detection

**Session Goals:** Focused ideation on UI improvements to demonstrate Arthur Health's end-to-end AI-assisted care coordination platform, with emphasis on:
- Referral management with AI provider recommendations
- Gap detection and VBC alignment
- Integrated healthcare + social services coordination
- Personalized care pathway visualization

**Techniques Used:**
- Gap Analysis & Audit
- "How Might We" Opportunity Framing
- User Journey Scenario Mapping
- Prioritization Matrix (Demo Impact vs. Implementation Effort)

**Total Ideas Generated:** 15 HMW questions, 8 UI enhancements, 5 touchpoints across care coordinator journey

### Key Themes Identified:

- **AI Personalization**: Care pathways must show "why this, why now" with cohort-based insights and evidence citations
- **Referral Intelligence**: Provider recommendations need distance, ratings, specialty match, and outcome predictions from similar patients
- **Gap-Driven Workflow**: Care gaps (overdue screenings, missed consults) should surface as priority cards with VBC impact warnings
- **Integrated Networks**: Single view combining healthcare providers and SDOH social services for holistic coordination
- **Predictive Analytics**: Show expected outcomes, time-to-recovery, and risk implications for each pathway decision
- **Caseload Observability**: Care coordinators need program implementation metrics and panel-level performance tracking

---

## Technique Sessions

### Gap Analysis & Audit - 20 minutes

**Description:** Systematic review of current care coordination implementation against Arthur Health's strategic requirements for end-to-end AI-assisted workflow

#### Ideas Generated:

1. Current carousel component exists but is isolated to care assessments, not integrated into care coordination workflow
2. No referral creation or tracking UI exists
3. No AI provider recommendation engine visible to users
4. Gap detection logic likely exists in backend but not surfaced in UI
5. No visual representation of cohort learning or similar-patient outcomes
6. Missing evidence citations and clinical guideline integration on pathway cards
7. No VBC impact predictions (delay warnings, readmit risk) shown to coordinators
8. Limited SDOH service visibility in care coordination flow
9. No program-level monitoring dashboard for caseload management
10. Pathway progression and timing not visualized

#### Insights Discovered:

- The carousel concept is clinically and operationally sound but needs data enrichment (VBC, cohort, evidence)
- Existing patient detail view has rich clinical data but lacks actionable next-steps guidance
- Claims/authorization flow shows AI capability but not connected to care coordination workflow
- Strong foundation exists; primary need is connecting components and exposing AI intelligence

#### Notable Connections:

- Care assessment carousel UI patterns can be reused for care pathway recommendations
- Authorization flow's AI policy analysis component similar to what's needed for provider recommendations
- Patient detail tabs could accommodate new referral tracking section using existing intervention card patterns

---

### "How Might We" Opportunity Framing - 15 minutes

**Description:** Translating identified gaps into actionable opportunity questions focused on UI/UX solutions

#### Ideas Generated:

**Referral Intelligence (Selected Focus):**
1. HMW create a referral flow showing AI-recommended providers with distance, ratings, and match rationale?
2. HMW visualize the integrated network of healthcare + social service providers in one view?
3. HMW show referral status tracking and outcomes from previous referrals?

**Gap Detection & VBC Alignment (Selected Focus):**
4. HMW surface care gaps (overdue screenings, missing consults, fall risks) as priority cards in the carousel?
5. HMW show the VBC impact of completing vs. skipping each pathway step?
6. HMW display HEDIS/Star Rating impact for each intervention?

**Personalized Pathways:**
7. HMW adapt the carousel to show personalized next-best-action cards for each patient's care journey?
8. HMW display similar-patient cohort insights directly on pathway cards?
9. HMW show evidence citations and clinical rationale on each recommended action?

**Predictive Analytics:**
10. HMW show expected time-to-improvement with confidence intervals for each intervention?
11. HMW display real-time pathway progress against predicted optimal timing?
12. HMW visualize how patient factors adjust card priority in real-time?

**Monitoring & Caseload:**
13. HMW create a dashboard showing program implementation metrics across coordinator's caseload?
14. HMW visualize which patients are on-track vs. at-risk across the entire panel?
15. HMW show aggregate outcomes and learning from completed care pathways?

#### Insights Discovered:

- Questions naturally cluster into workflow stages (detection → recommendation → action → monitoring)
- Referral intelligence and gap detection are highest priority for demonstrating differentiation
- Many HMW questions share UI patterns (cards, badges, modals) that can be reused

---

### User Journey Scenario Mapping - 25 minutes

**Description:** Walking through care coordinator's workflow for low-back pain case (James Mitchell) to identify specific UI touchpoints where enhancements appear

#### Ideas Generated:

**Journey Stage 1: Patient Selection & Assessment**
1. Gap Detection Alert on patient list cards
2. Enhanced carousel entry point in patient detail view

**Journey Stage 2: Pathway Navigation & Prioritization**
3. AI-Prioritized pathway cards with VBC impact, cohort wisdom, evidence citations
4. HEDIS/Star Rating impact badges on interventions

**Journey Stage 3: Referral Creation & Provider Selection**
5. AI Referral Modal triggered from pathway card action
6. Provider recommendation with 94% confidence, match rationale, similar-patient outcomes
7. Integrated Network View toggle (healthcare + social services)

**Journey Stage 4: Monitoring & Status Tracking**
8. Referral Status Dashboard showing active/historical referrals and outcomes
9. Pathway Progress Tracker with timeline vs. optimal comparison

**Journey Stage 5: Caseload Management**
10. Program Implementation Metrics dashboard for coordinator performance

#### Insights Discovered:

- Care coordinator touches 5 distinct UI areas in single patient workflow
- Most impactful enhancements cluster in Stages 2-3 (pathway navigation and referral)
- Journey naturally demonstrates Arthur's differentiation: personalized → intelligent → integrated → predictive
- Demo can follow linear patient flow for compelling narrative

#### Notable Connections:

- Gap alerts on patient list (Stage 1) create entry point to enhanced carousel (Stage 2)
- Pathway cards (Stage 2) trigger referral modal (Stage 3), creating seamless flow
- Referral tracking (Stage 4) feeds back into caseload metrics (Stage 5), showing learning loop

---

### Prioritization Matrix - 15 minutes

**Description:** Categorizing UI enhancements by demo impact and implementation effort to determine "Mock Today" vs. "Build Later"

#### Ideas Generated:

**TIER 1: Mock Today (Pre-Demo Quick Wins)**
1. Enhanced Pathway Cards - VBC impact, cohort wisdom, evidence, HEDIS badges
2. Gap Detection Alerts on patient cards
3. AI Referral Modal with provider recommendations and rationale
4. Referral Status Tracker in patient detail

**TIER 2: Build Later (Post-Demo Development)**
5. Pathway Progress Visualizer (complex timeline visualization)
6. Caseload Dashboard (requires aggregated analytics)
7. Real-time Cohort Learning Engine (ML integration)

#### Insights Discovered:

- 4 high-impact enhancements are mockable with existing component patterns
- Carousel component is highly reusable for pathway cards
- Modal patterns from existing UI can accelerate referral modal development
- Most "Build Later" items require backend infrastructure, not just UI

---

## Idea Categorization

### Immediate Opportunities
*Ideas ready to implement now for today's demo*

1. **Enhanced Pathway Cards with VBC + Cohort Intelligence**
   - Description: Augment existing carousel cards with VBC impact warnings ("If skipped: +7 days delay"), cohort wisdom ("In 1,248 cases, early PT cut recovery 31%"), evidence citations, and HEDIS/Star badges
   - Why immediate: Existing CareAssessmentCarousel component accepts these fields via interface extension; minimal code changes
   - Resources needed: Mock data structure additions, 4 new card sections (30 min implementation)

2. **Gap Detection Alert Badges on Patient List**
   - Description: Visual indicators on patient cards showing critical care gaps with count and VBC risk level
   - Why immediate: Patient card component exists, just add conditional badge rendering
   - Resources needed: Add `careGaps` array to patient mock data, simple badge component (15 min implementation)

3. **AI Referral Modal with Provider Recommendations**
   - Description: Modal showing AI-ranked providers with match confidence, specialty alignment, distance/ratings, similar-patient outcomes, and integrated SDOH services
   - Why immediate: Can reuse existing modal patterns, create new component with mock provider data
   - Resources needed: New modal component, mock referral data structure (45 min implementation)

4. **Referral Status Tracker**
   - Description: Section in patient detail showing active referrals with scheduling, expected completion, and historical referral outcomes
   - Why immediate: Similar pattern to existing intervention cards, straightforward addition to patient detail tabs
   - Resources needed: New status card component, referral mock data (30 min implementation)

### Future Innovations
*Ideas requiring development/research*

1. **Interactive Pathway Progress Timeline**
   - Description: Visual timeline showing current position vs. optimal pathway timing, with predicted outcomes and deviation alerts
   - Development needed: D3.js or similar visualization library integration, complex timeline calculation logic
   - Timeline estimate: 2-3 weeks post-demo

2. **Caseload Analytics Dashboard**
   - Description: Coordinator-level metrics showing panel performance, gap closure rates, referral completion, VBC quality scores, and priority patient lists
   - Development needed: Backend aggregation APIs, real-time metrics calculation, dashboard framework
   - Timeline estimate: 4-6 weeks post-demo

3. **Real-time Cohort Learning Engine Integration**
   - Description: Live similarity search against patient database to surface outcomes from near-neighbor cases with dynamic pathway adjustments
   - Development needed: ML model deployment, vector similarity API, patient embedding pipeline
   - Timeline estimate: 8-12 weeks (requires data science collaboration)

### Moonshots
*Ambitious, transformative concepts*

1. **Predictive Care Pathway Optimizer**
   - Description: AI that continuously reorders pathway cards based on emerging patient data (new labs, vitals, behaviors) and adjusts predicted outcomes in real-time
   - Transformative potential: Shifts from static protocols to dynamic, adaptive care that learns from every interaction; ultimate manifestation of "learning health system"
   - Challenges to overcome: Real-time data streaming, model inference latency, clinical validation of AI-adjusted pathways, regulatory approval for automated care recommendations

2. **Federated Multi-Network Care Orchestration**
   - Description: Arthur coordinates care across multiple health systems, payer networks, and community organizations with unified patient view and cross-network referral optimization
   - Transformative potential: Breaks down care silos; patient's care team spans institutions seamlessly; reduces duplicative services; maximizes resource utilization
   - Challenges to overcome: Multi-party data sharing agreements, interoperability standards, care attribution complexity, competitive dynamics between networks

### Insights & Learnings
*Key realizations from the session*

- **The Carousel as Care Pathway Manifestation**: The carousel UI is not just a navigation pattern but the visual operationalization of data-driven care pathways; each card represents a pathway step with embedded clinical logic, predicted outcomes, and quality guardrails

- **AI Explainability as Differentiation**: Simply having AI recommendations is table stakes; showing the "why" (match rationale, cohort outcomes, evidence citations) is what builds clinician trust and demonstrates Arthur's clinical sophistication

- **SDOH Integration Bridges Value Gap**: Most platforms treat medical and social determinants separately; Arthur's integrated network view (healthcare + social services in one referral flow) directly addresses the gap that drives poor outcomes and excess costs

- **VBC Guardrails Operationalize Quality**: Showing "if skipped: +7 days, +15% readmit risk" isn't fear-mongering; it's making invisible quality implications visible at the point of decision, aligning clinical actions with value-based incentives

- **Cohort Learning Creates Moat**: The "1,248 similar cases" insight is Arthur's sustainable differentiation; competitors can build AI, but Arthur's accumulating outcome data from integrated delivery creates network effects that compound over time

- **Monitoring Completes the Loop**: Care coordination platforms often stop at task assignment; Arthur's program implementation metrics and caseload observability close the loop, enabling continuous improvement and demonstrating measurable value to payers/systems

---

## Action Planning

### Top 3 Priority Ideas

#### #1 Priority: Enhanced Pathway Cards with VBC + Cohort Intelligence

- **Rationale:** Highest demo impact with lowest implementation effort; transforms existing carousel from generic assessments to intelligent care recommendations; directly demonstrates Arthur's core differentiation (AI personalization, cohort learning, evidence-based)
- **Next steps:**
  1. Extend `CareAssessment` interface with `vbcImpact`, `cohortInsight`, `evidenceCitation`, `hedisStarImpact` fields
  2. Update `care-assessment-carousel.tsx` to render new card sections
  3. Add low-back pain scenario mock data with VBC warnings, cohort outcomes, evidence citations
  4. Test carousel rendering with enhanced cards
- **Resources needed:** 1 frontend developer, 30 minutes, access to care-assessment-carousel component
- **Timeline:** Complete before today's demo (morning session)

#### #2 Priority: AI Referral Modal with Provider Recommendations

- **Rationale:** Fills the most critical gap (referral management); showcases AI provider matching with rationale; demonstrates integrated network (healthcare + SDOH); creates "wow moment" when coordinator sees 94% confidence recommendation with similar-patient outcomes
- **Next steps:**
  1. Create `components/care-coordination/referral-modal.tsx` component
  2. Build `AIProviderRecommendations` sub-component with match rationale display
  3. Build `IntegratedNetworkView` toggle for healthcare + social services
  4. Create mock data structure with Boston Spine provider, SDOH services (transportation, copay assistance)
  5. Wire modal trigger to pathway card "Refer" button
- **Resources needed:** 1 frontend developer, 45 minutes, modal UI patterns from existing codebase
- **Timeline:** Complete before today's demo (late morning)

#### #3 Priority: Gap Detection Alert Badges on Patient List

- **Rationale:** Entry point to the enhanced workflow; proactive gap surfacing aligns with Arthur's value proposition; simple visual enhancement with strong narrative impact ("See how Arthur automatically detects Margaret's 2 critical gaps")
- **Next steps:**
  1. Add `careGaps` array to patient mock data structure
  2. Create conditional badge component for patient cards
  3. Add gap data for Margaret Thompson (PT follow-up overdue, imaging appropriateness gap)
  4. Style badge with orange warning color, gap count, VBC risk indicator
- **Resources needed:** 1 frontend developer, 15 minutes, patient card component access
- **Timeline:** Complete before today's demo (early morning, foundational)

---

## Reflection & Follow-up

### What Worked Well

- Systematic gap analysis provided clear baseline of what exists vs. what's needed
- HMW framing converted gaps into actionable UI opportunities
- User journey mapping grounded abstract ideas in concrete workflow touchpoints
- Prioritization matrix created realistic demo scope (mock today vs. build later)
- Low-back pain clinical scenario provided authentic narrative thread through demo

### Areas for Further Exploration

- **Deep-dive on Pathway Timing Logic**: How does Arthur determine "optimal" pathway timing? What clinical evidence drives the "Day 10 vs Day 14" comparisons? Need clinical validation process definition
- **Referral Outcome Attribution**: When a referral completes, how do we capture outcome data and attribute it to the pathway? Need closed-loop data collection workflow
- **Multi-Condition Pathway Conflicts**: James has low-back pain, diabetes, hypertension - how do multiple pathways interact when they recommend conflicting actions? Need conflict resolution logic
- **Care Coordinator Workflow Integration**: How does this fit into coordinator's daily routine? Do we have workflow studies showing when/how they use the system? Need ethnographic research
- **Payer Reporting Requirements**: VBC metrics are powerful, but do they map to actual payer quality contracts? Need payer contract analysis to ensure alignment

### Recommended Follow-up Techniques

- **Wizard of Oz Testing**: After demo, conduct sessions where analyst plays "AI engine" to test coordinator reactions to recommendations; validates explainability sufficiency
- **Assumption Mapping**: Document all clinical/business assumptions embedded in pathway cards (e.g., "PT re-engagement reduces recovery by 9-14 days"); identify which need evidence validation
- **Journey Mapping - Coordinator Panel View**: Today focused on single patient; next session should map coordinator's caseload management workflow across 30-50 patients
- **Stakeholder Perspective Taking**: Run session from payer, health system executive, and patient perspectives to stress-test value proposition from each angle

### Questions That Emerged

- How do we handle pathway recommendations when evidence is conflicting or low-quality? (e.g., emerging treatments without robust cohort data)
- What's the coordinator override process when AI recommendation doesn't match clinical judgment? How is that feedback captured for model improvement?
- How do we present uncertainty in outcome predictions? (confidence intervals, ranges vs. point estimates)
- What happens when recommended in-network provider has no availability? Does AI re-rank alternatives in real-time?
- How do we balance personalization (individual patient factors) with standardization (evidence-based protocols)? Where's the boundary?
- How granular should SDOH service integration be? Just referral suggestions or active coordination/scheduling?
- What's the minimum viable data set for cohort matching? 100 cases? 1,000? How do we communicate sample size limitations?

### Next Session Planning

- **Suggested topics:**
  1. "Build Later" items detailed design (Pathway Progress Timeline, Caseload Dashboard)
  2. Backend API requirements for real-time cohort learning
  3. Clinical validation process for AI recommendations
  4. Payer contract alignment and VBC metric mapping
- **Recommended timeframe:** 1 week post-demo (after client feedback incorporated)
- **Preparation needed:**
  - Gather demo feedback and client questions
  - Technical feasibility assessment for ML integration
  - Clinical team input on evidence validation requirements
  - Review payer contracts for quality metric alignment

---

*Session facilitated using the BMAD-METHOD™ brainstorming framework*
