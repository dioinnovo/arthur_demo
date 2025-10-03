# Product Requirements Document: SCC Dashboard Rebrand

<!-- Powered by BMAD™ Core -->

## Goals and Background Context

### The Challenge

Strategic Claim Consultants (SCC) requires a complete rebranding of the existing SCC Intelligence Platform to align with their commercial property claims business. The current platform is branded for residential properties and needs transformation to serve SCC's B2B commercial market.

### Product Vision Statement

Transform the Stellar residential platform into a professional, enterprise-grade commercial property claims dashboard that embodies SCC's brand identity and expertise in large-loss commercial claims, showcasing their $2B+ in settlements recovered for clients.

### Goals

1. **Complete Brand Transformation** - Replace all Stellar branding elements with SCC identity
2. **Commercial Market Alignment** - Update terminology, property types, and workflows for commercial properties
3. **Professional B2B Experience** - Create an authoritative, enterprise-appropriate user experience
4. **AI Assistant Rebrand** - Transform "Stella" into "SCOTT" with commercial claims expertise
5. **Maintain Functionality** - Preserve all existing features while updating presentation layer
6. **Authentic Case Integration** - Use real SCC client success stories for demo data

### Non-Goals

- Adding new features or functionality
- Backend system changes
- Database schema modifications
- API integrations
- Market validation or user research

### Changelog

- **v1.0** (2025-09-25) - Initial PRD creation for SCC rebrand
- **v1.1** (2025-09-25) - Added real SCC client cases for demo data

## Requirements

### Functional Requirements

**FR-001: Visual Identity System**
- Replace Stellar orange (#E74C3C) with SCC red (#C8102E) throughout application
- Update secondary colors to professional gray palette (#707070)
- Implement SCC logo in all brand touchpoints
- Add Montserrat font family as primary typography

**FR-002: AI Assistant Transformation**
- Rename "Stella" to "SCOTT" (Strategic Claims Operations & Technical Tracker)
- Update all assistant references, messages, and prompts
- Adjust personality from friendly residential to professional commercial
- Train on commercial property terminology and large-loss claims
- Maintain all existing AI functionality

**FR-003: Property Type System**
- Replace residential property types with commercial options
- Support: Office Building, Retail Space, Industrial Facility, Medical Center, Educational Institution, Mixed-Use, Resort/Hospitality
- Update all property selection interfaces
- Modify demo data to reflect commercial properties

**FR-004: Terminology Updates**
- Replace residential terms with commercial equivalents throughout
- Update navigation labels, form fields, and content
- Ensure B2B appropriate language in all user-facing text
- Include industry-specific terms (CAT claims, business interruption, etc.)
- Maintain consistency across all pages and components

**FR-005: Component Rebranding**
- Update all UI components with new color scheme
- Replace logo in sidebar, mobile nav, and reports
- Update button, badge, and status indicator colors
- Modify hover states and focus indicators

**FR-006: Page-Specific Updates**
- Rebrand landing page with SCC identity
- Update dashboard home with commercial focus
- Transform inspection pages to assessment pages
- Modify claims pages for commercial context
- Update report generation with SCC branding

**FR-007: Real Case Study Integration**
- Replace generic demo data with actual SCC client cases
- Include real settlement amounts and timelines
- Use authentic property types from SCC portfolio
- Maintain client confidentiality while showcasing results

### Non-Functional Requirements

**NFR-001: Brand Consistency**
- Zero Stellar branding elements remaining
- 100% color scheme adherence to SCC palette
- Consistent typography across all interfaces
- Real case studies properly attributed

**NFR-002: Performance**
- No performance degradation from rebranding
- Page load times remain under 3 seconds
- Smooth transitions and animations

**NFR-003: Responsive Design**
- Maintain mobile responsiveness
- Ensure branding consistency across device sizes
- Preserve accessibility standards

**NFR-004: Browser Compatibility**
- Support latest 2 versions of Chrome, Safari, Edge
- Maintain functionality on iOS/Android browsers
- Consistent rendering across platforms

**NFR-005: Code Quality**
- Clean, maintainable CSS modifications
- No duplicate style definitions
- Proper component encapsulation

## Demo Data Specification

### Real SCC Client Cases for Demo

Replace all residential demo properties with the following actual SCC commercial cases:

#### Case 1: The Shrimp Boat - Hurricane Michael
- **Property Type**: Restaurant/Hospitality
- **Location**: Panama City Beach, FL
- **Initial Offer**: $0 (claim denied)
- **SCC Settlement**: $1,945,000
- **Timeline**: 9 months to rebuild
- **Damage Type**: Hurricane/Wind/Water
- **Status**: Successfully Settled
- **Description**: Coastal restaurant devastated by Category 5 hurricane, initially denied coverage

#### Case 2: Cinnamon Shore - Hurricane Harvey
- **Property Type**: Resort/Mixed-Use Development
- **Location**: Port Aransas, TX
- **Initial Offer**: $145,000
- **SCC Settlement**: $9,700,000
- **Timeline**: 12 months to rebuild
- **Damage Type**: Hurricane/Flood/Wind
- **Status**: Successfully Settled
- **Description**: Luxury coastal resort community with extensive property damage

#### Case 3: Land's End - Hurricane Sally
- **Property Type**: Residential Tower/Condominium
- **Location**: Orange Beach, AL
- **Initial Offer**: Not specified
- **SCC Settlement**: $15,700,000
- **Timeline**: Ongoing assessment
- **Damage Type**: Roof/Exterior/Water/Wind
- **Status**: Successfully Settled
- **Description**: High-rise condominium with multiple layers of structural damage

#### Case 4: Ocean Towers - Hurricane Michael
- **Property Type**: Commercial Tower
- **Location**: Panama City Beach, FL
- **Initial Offer**: $3,100,000
- **SCC Settlement**: In Progress
- **Timeline**: Active claim
- **Damage Type**: Hurricane/Structural
- **Status**: In Negotiation
- **Description**: Commercial high-rise with extensive facade and structural damage

#### Additional Demo Properties (Based on SCC expertise):
- Medical Center in Atlanta (Water damage - $2.5M settlement)
- University Campus Building (Fire damage - $4.2M settlement)
- Office Complex (Tornado damage - $6.8M settlement)
- Industrial Warehouse (Flood damage - $3.7M settlement)

### Demo Data Implementation Requirements

**Image Assets**:
- Use professional commercial property stock photos
- Categories: Hospitality, Office, Medical, Educational, Industrial
- Damage documentation photos (water, wind, fire, structural)
- Before/after restoration images

**Property Details**:
- Include business impact metrics (days closed, revenue loss)
- Add commercial-specific data fields (square footage, occupancy, business type)
- Show settlement progression timeline
- Display initial offer vs. final settlement comparison

## UI Design Goals

### UX Vision

Create a professional, authoritative interface that instills confidence in commercial property stakeholders while showcasing SCC's proven track record of maximizing settlements.

### Design Principles

1. **Professional Authority** - Convey expertise and trustworthiness
2. **Results-Driven** - Highlight settlement successes and case wins
3. **Enterprise Clarity** - Clear, uncluttered interface for business users
4. **Brand Cohesion** - Consistent SCC identity throughout
5. **Efficiency First** - Streamlined workflows for busy professionals

### Core Screens

1. **Dashboard Home**
   - SCC branded header with logo
   - Key metrics: "$2B+ Recovered", "300+ Years Experience"
   - Commercial property claim statistics
   - Red/gray color scheme with success green for settlements
   - Recent case victories carousel

2. **Property Assessment**
   - Commercial property type selector (matching real cases)
   - Business impact assessment tools
   - Professional damage documentation
   - Settlement projection calculator
   - SCC branded progress indicators

3. **Claims Management**
   - Real case study examples as templates
   - Initial offer vs. final settlement tracker
   - Timeline showing SCC intervention impact
   - Commercial claim workflows
   - Enterprise-appropriate status indicators

4. **SCOTT AI Assistant**
   - Professional avatar/branding
   - Trained on SCC's actual case victories
   - Commercial claims expertise
   - Hurricane/CAT claim specialization
   - Business interruption calculations

5. **Success Stories Section**
   - Showcase real SCC victories
   - Before/after settlement comparisons
   - Client testimonial placeholders
   - Settlement timeline visualizations

### Interaction Paradigms

- **Color Psychology**: Red conveys urgency and importance for claims
- **Success Indicators**: Green for settlement wins and positive outcomes
- **Typography**: Montserrat for professional, modern appearance
- **Iconography**: Business-focused icons replacing residential imagery
- **Data Visualization**: Charts showing settlement increases and timelines

### Accessibility

- Maintain WCAG 2.1 AA compliance
- Ensure sufficient color contrast with new palette
- Preserve keyboard navigation
- Update screen reader labels for commercial context

### Branding Guidelines

- **Primary Color**: #C8102E (SCC Red)
- **Secondary Color**: #707070 (Professional Gray)
- **Success Color**: #00A651 (Settlement Green)
- **Typography**: Montserrat (weights: 400, 500, 600, 700)
- **Logo Usage**: SCC tower icon with proper spacing
- **Tone**: Professional, authoritative, results-focused
- **Messaging**: Emphasize "$2B+ recovered" and expertise

## Technical Assumptions

### Technology Stack
- Next.js 15.5.2 (no changes)
- React 18.2 (no changes)
- Tailwind CSS (configuration updates only)
- Existing AI SDK (prompt updates only)

### Repository Structure
- Maintain current monorepo structure
- CSS and component updates only
- No architectural changes

### Service Architecture
- Frontend-only changes
- No backend modifications
- No API changes
- No database updates

### Development Approach
- In-place component updates
- Global find/replace operations
- CSS variable modifications
- Configuration file updates
- Demo data replacement with real cases

### Testing Requirements
- Visual regression testing for brand consistency
- Cross-browser testing for styling
- Mobile responsive testing
- Content verification for terminology
- Demo data accuracy validation
- Functionality preservation testing

## Epic List

### Epic 1: Core Brand Identity
Transform fundamental branding elements including colors, typography, and logos across the application.

### Epic 2: AI Assistant Rebrand
Convert Stella to SCOTT with updated personality, messaging, and commercial expertise.

### Epic 3: Property System Transformation
Update all property-related functionality from residential to commercial focus using real SCC cases.

### Epic 4: Component Library Updates
Rebrand all shared UI components with SCC visual identity.

### Epic 5: Page-Specific Rebranding
Update individual pages and features with commercial focus and SCC branding.

### Epic 6: Demo Data Integration
Replace generic data with real SCC client success stories and case studies.

## Epic Details

### Epic 1: Core Brand Identity

**Objective**: Establish SCC visual identity foundation

#### User Stories

**Story 1.1: Configure Color System**
- **As a** developer
- **I want to** update all color configurations
- **So that** the application uses SCC brand colors
- **Acceptance Criteria**:
  - [ ] Tailwind config updated with SCC colors
  - [ ] CSS variables replaced in globals.css
  - [ ] All orange references removed
  - [ ] Success green (#00A651) added for settlements
  - [ ] Color consistency verified

**Story 1.2: Implement Typography**
- **As a** developer
- **I want to** add Montserrat font family
- **So that** text matches SCC brand guidelines
- **Acceptance Criteria**:
  - [ ] Google Fonts import added
  - [ ] Font family applied globally
  - [ ] Font weights configured
  - [ ] Fallback fonts defined

**Story 1.3: Replace Logo Assets**
- **As a** developer
- **I want to** update all logo instances
- **So that** SCC branding is visible
- **Acceptance Criteria**:
  - [ ] SCC logo file placed in public/images
  - [ ] Favicon updated
  - [ ] All logo references updated
  - [ ] Logo sizing preserved

### Epic 2: AI Assistant Rebrand

**Objective**: Transform Stella into SCOTT for commercial claims

#### User Stories

**Story 2.1: Rename AI Assistant**
- **As a** developer
- **I want to** replace all Stella references with SCOTT
- **So that** the AI has commercial branding
- **Acceptance Criteria**:
  - [ ] Global find/replace completed
  - [ ] Component names updated
  - [ ] Variable names changed
  - [ ] No Stella references remain

**Story 2.2: Update AI Personality**
- **As a** developer
- **I want to** adjust AI prompts and responses
- **So that** SCOTT acts as a commercial expert
- **Acceptance Criteria**:
  - [ ] System prompts updated with commercial focus
  - [ ] Response templates include settlement expertise
  - [ ] Professional tone implemented
  - [ ] Hurricane/CAT claim knowledge added
  - [ ] Business interruption calculations included

**Story 2.3: Rebrand AI Interface**
- **As a** developer
- **I want to** update AI chat interface
- **So that** it reflects SCC branding
- **Acceptance Criteria**:
  - [ ] Chat colors updated to red/gray
  - [ ] SCOTT branding visible
  - [ ] Professional styling applied
  - [ ] Loading states updated

### Epic 3: Property System Transformation

**Objective**: Convert residential focus to commercial properties using real cases

#### User Stories

**Story 3.1: Update Property Types**
- **As a** developer
- **I want to** replace residential property options
- **So that** users can select commercial properties
- **Acceptance Criteria**:
  - [ ] Property types match SCC portfolio
  - [ ] Include: Restaurant, Resort, Office Tower, Medical Center
  - [ ] Form selectors modified
  - [ ] Demo data uses real case properties

**Story 3.2: Update Property Terminology**
- **As a** developer
- **I want to** replace residential terms
- **So that** language is commercial-appropriate
- **Acceptance Criteria**:
  - [ ] Term mapping implemented
  - [ ] All UI text updated
  - [ ] Navigation labels changed
  - [ ] Help text modified
  - [ ] Settlement terminology added

**Story 3.3: Transform Area Definitions**
- **As a** developer
- **I want to** update property areas
- **So that** they reflect commercial spaces
- **Acceptance Criteria**:
  - [ ] Area names updated for commercial
  - [ ] Categories reorganized
  - [ ] Damage types from real cases
  - [ ] Business impact areas added

### Epic 4: Component Library Updates

**Objective**: Apply SCC branding to all shared components

#### User Stories

**Story 4.1: Update Navigation Components**
- **As a** developer
- **I want to** rebrand sidebar and mobile nav
- **So that** navigation reflects SCC identity
- **Acceptance Criteria**:
  - [ ] Sidebar colors updated
  - [ ] Mobile nav rebranded
  - [ ] Logo placement correct
  - [ ] Success metrics highlighted
  - [ ] Hover states updated

**Story 4.2: Rebrand Form Components**
- **As a** developer
- **I want to** update all form elements
- **So that** inputs use SCC colors
- **Acceptance Criteria**:
  - [ ] Input focus states red
  - [ ] Button colors updated
  - [ ] Validation colors changed
  - [ ] Select dropdowns styled
  - [ ] Settlement amount fields formatted

**Story 4.3: Update Card Components**
- **As a** developer
- **I want to** rebrand all card elements
- **So that** content blocks match SCC style
- **Acceptance Criteria**:
  - [ ] Border colors updated
  - [ ] Header styles changed
  - [ ] Action buttons rebranded
  - [ ] Shadow styles consistent
  - [ ] Success indicators green

### Epic 5: Page-Specific Rebranding

**Objective**: Update individual pages with SCC branding

#### User Stories

**Story 5.1: Rebrand Dashboard Pages**
- **As a** developer
- **I want to** update dashboard home and subpages
- **So that** main interface is SCC branded
- **Acceptance Criteria**:
  - [ ] Dashboard shows "$2B+ Recovered"
  - [ ] Metrics cards rebranded
  - [ ] Charts use red/gray/green
  - [ ] Recent victories displayed
  - [ ] Commercial focus throughout

**Story 5.2: Transform Claims Pages**
- **As a** developer
- **I want to** rebrand claims management
- **So that** claims workflow is commercial-focused
- **Acceptance Criteria**:
  - [ ] Claims list shows real cases
  - [ ] Detail pages rebranded
  - [ ] Settlement comparisons shown
  - [ ] Status indicators updated
  - [ ] Commercial terminology used

**Story 5.3: Update Assessment Pages**
- **As a** developer
- **I want to** rebrand inspection as assessment
- **So that** it reflects commercial context
- **Acceptance Criteria**:
  - [ ] Page titles updated
  - [ ] Navigation renamed
  - [ ] Content commercial-focused
  - [ ] Damage types from real cases
  - [ ] Business impact sections added

### Epic 6: Demo Data Integration

**Objective**: Replace generic data with real SCC success stories

#### User Stories

**Story 6.1: Implement Real Case Studies**
- **As a** developer
- **I want to** add actual SCC client victories
- **So that** demos showcase real results
- **Acceptance Criteria**:
  - [ ] Shrimp Boat case implemented
  - [ ] Cinnamon Shore case added
  - [ ] Land's End case included
  - [ ] Ocean Towers case shown
  - [ ] Settlement amounts accurate

**Story 6.2: Create Settlement Visualizations**
- **As a** developer
- **I want to** show settlement progression
- **So that** SCC's impact is clear
- **Acceptance Criteria**:
  - [ ] Initial offer vs. final charts
  - [ ] Timeline visualizations
  - [ ] Success rate metrics
  - [ ] Recovery amount displays
  - [ ] Before/after comparisons

**Story 6.3: Add Commercial Property Images**
- **As a** developer
- **I want to** replace residential images
- **So that** visuals match commercial focus
- **Acceptance Criteria**:
  - [ ] Restaurant/hospitality images
  - [ ] Office tower photos
  - [ ] Resort property visuals
  - [ ] Damage documentation images
  - [ ] Professional quality maintained

## Implementation Sequence

### Phase 1: Foundation (Days 1-2)
1. Story 1.1: Configure Color System
2. Story 1.2: Implement Typography
3. Story 1.3: Replace Logo Assets

### Phase 2: Global Changes (Days 3-4)
1. Story 2.1: Rename AI Assistant
2. Story 3.2: Update Property Terminology

### Phase 3: Components (Days 5-7)
1. Story 4.1: Update Navigation Components
2. Story 4.2: Rebrand Form Components
3. Story 4.3: Update Card Components

### Phase 4: Features (Days 8-10)
1. Story 3.1: Update Property Types
2. Story 3.3: Transform Area Definitions
3. Story 2.2: Update AI Personality
4. Story 2.3: Rebrand AI Interface

### Phase 5: Pages (Days 11-12)
1. Story 5.1: Rebrand Dashboard Pages
2. Story 5.2: Transform Claims Pages
3. Story 5.3: Update Assessment Pages

### Phase 6: Demo Data (Days 13-14)
1. Story 6.1: Implement Real Case Studies
2. Story 6.2: Create Settlement Visualizations
3. Story 6.3: Add Commercial Property Images

## Testing Strategy

### Visual Testing
- Screenshot comparison before/after
- Cross-browser visual consistency
- Mobile responsive verification
- Print output testing
- Image quality validation

### Content Testing
- Search for Stellar references
- Verify SCOTT naming throughout
- Check commercial terminology
- Validate demo data accuracy
- Verify settlement amounts

### Functional Testing
- All features remain operational
- Forms submit correctly
- AI responds appropriately
- Reports generate properly
- Calculations accurate

### Performance Testing
- Page load times unchanged
- Animation performance
- Asset loading optimization
- Mobile performance
- Image optimization

## Success Metrics

1. **Brand Compliance**: 0 Stellar elements remaining
2. **Visual Consistency**: 100% components using SCC colors
3. **Content Accuracy**: All terminology commercially appropriate
4. **Case Study Integration**: Real SCC victories properly displayed
5. **Settlement Showcase**: $2B+ in recoveries prominently featured
6. **Functionality**: 100% features operational post-rebrand
7. **Timeline**: Completed within 14-day window

## Risk Mitigation

### Risk 1: Incomplete Rebranding
- **Mitigation**: Automated search scripts to find missed elements
- **Validation**: Manual review checklist
- **Backup**: Component-by-component audit

### Risk 2: Functionality Breakage
- **Mitigation**: Comprehensive testing suite
- **Validation**: User acceptance testing
- **Backup**: Rollback plan prepared

### Risk 3: Performance Impact
- **Mitigation**: Performance benchmarking
- **Validation**: Load testing
- **Backup**: Image optimization pipeline

### Risk 4: Data Sensitivity
- **Mitigation**: Anonymize client details as needed
- **Validation**: Legal review of case studies
- **Backup**: Generic commercial examples ready

## Next Steps

### For Development Team
1. Review PRD and clarify any questions
2. Set up development branch for rebrand
3. Gather commercial property images
4. Begin Phase 1 implementation
5. Daily progress updates

### For QA Team
1. Prepare test cases based on acceptance criteria
2. Set up visual regression testing
3. Create content verification scripts
4. Validate settlement calculations
5. Plan UAT sessions

### For Stakeholders
1. Review brand guidelines accuracy
2. Approve case study usage
3. Validate commercial terminology
4. Verify settlement amounts
5. Sign off on SCOTT naming

### For Content Team
1. Source commercial property images
2. Prepare case study descriptions
3. Write SCOTT AI prompts
4. Create success story narratives
5. Update help documentation

---

*Document prepared by: John (Product Manager)*
*Date: 2025-09-25*
*Version: 1.1*
*Status: Ready for Development*

## Addendum: Real Case Implementation Details

### The Shrimp Boat Implementation
```javascript
{
  id: 'CLM-2024-001',
  name: 'The Shrimp Boat Restaurant',
  type: 'Restaurant/Hospitality',
  location: 'Panama City Beach, FL',
  status: 'Settled - Victory',
  initialOffer: 0,
  finalSettlement: 1945000,
  timeline: '9 months',
  damageType: 'Hurricane Michael - CAT 5',
  description: 'Complete devastation from Category 5 hurricane. Insurance initially denied all coverage. SCC intervention resulted in full recovery and rebuild.',
  image: '/images/properties/restaurant-hurricane.jpg'
}
```

### Cinnamon Shore Implementation
```javascript
{
  id: 'CLM-2024-002',
  name: 'Cinnamon Shore Resort',
  type: 'Resort/Mixed-Use',
  location: 'Port Aransas, TX',
  status: 'Settled - Victory',
  initialOffer: 145000,
  finalSettlement: 9700000,
  timeline: '12 months',
  damageType: 'Hurricane Harvey',
  description: 'Luxury coastal resort with extensive damage. Initial offer was 1.5% of actual damages. SCC secured 67x increase in settlement.',
  image: '/images/properties/resort-coastal.jpg'
}
```

### Land's End Implementation
```javascript
{
  id: 'CLM-2024-003',
  name: "Land's End Condominiums",
  type: 'Residential Tower',
  location: 'Orange Beach, AL',
  status: 'Settled - Victory',
  initialOffer: null,
  finalSettlement: 15700000,
  timeline: 'Complex multi-phase',
  damageType: 'Hurricane Sally',
  description: 'High-rise with catastrophic damage to roof, exterior, and water intrusion throughout. Largest condo settlement in region.',
  image: '/images/properties/condo-tower.jpg'
}
```

### Ocean Towers Implementation
```javascript
{
  id: 'CLM-2024-004',
  name: 'Ocean Towers Commercial',
  type: 'Commercial Tower',
  location: 'Panama City Beach, FL',
  status: 'In Progress',
  initialOffer: 3100000,
  finalSettlement: 'TBD',
  timeline: 'Active negotiation',
  damageType: 'Hurricane Michael',
  description: 'Commercial high-rise with structural damage. Initial offer under review, expecting significant increase based on SCC assessment.',
  image: '/images/properties/office-tower.jpg'
}
```