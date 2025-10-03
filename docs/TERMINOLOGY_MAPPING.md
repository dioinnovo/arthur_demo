# SCC Rebrand Terminology Mapping

## Brand Terminology Changes

### Primary Brand Names
- **Stellar** → **Strategic Claim Consultants (SCC)**
- **Stellar Intelligence** → **SCC Intelligence Platform**
- **Stellar Adjusting** → **Strategic Claim Consultants**

### AI Assistant
- **Stella** → **SCOTT**
  - Full name: Strategic Claims Operations & Technical Tracker
  - Role: Commercial Property Claims Expert
  - Focus: Commercial property claims analysis and settlement maximization

### Color System
- **stellar-orange** → **scc-red** (#C8102E)
- **stellar-dark** → **scc-gray-dark** (#2B2B2B)
- **stellar-light** → **scc-gray** (#707070)
- **stellar-success** → **scc-green** (#00A651)

### Logo & Assets
- **stellar_logo.png** → **scc_logo.png**
- **stellar-icon** → **scc-icon**
- **stellar-brand** → **scc-brand**

### API Routes
- **/api/stella-claims** → **/api/scotty-claims**
- **/api/stella-leads** → **/api/scotty-leads**

### Function Names
- **buildStellaClaimsPrompt** → **buildScottyClaimsPrompt**
- **getStellaClaimsQuickAction** → **getScottyClaimsQuickAction**
- **buildStellaLeadsPrompt** → **buildScottyLeadsPrompt**
- **getStellaLeadsQuickAction** → **getScottyLeadsQuickAction**

### Constants & Variables
- **STELLA_CLAIMS_PROMPT** → **SCOTT_CLAIMS_PROMPT**
- **STELLA_CLAIMS_QUICK_ACTIONS** → **SCOTT_CLAIMS_QUICK_ACTIONS**
- **STELLA_LEADS_PROMPT** → **SCOTT_LEADS_PROMPT**
- **STELLA_LEADS_QUICK_ACTIONS** → **SCOTT_LEADS_QUICK_ACTIONS**

### CSS Classes (Tailwind)
- **text-stellar-orange** → **text-scc-red**
- **bg-stellar-orange** → **bg-scc-red**
- **border-stellar-orange** → **border-scc-red**
- **hover:bg-stellar-dark** → **hover:bg-scc-gray-dark**
- **focus:ring-stellar-orange** → **focus:ring-scc-red**

### CSS Variables
- **--stellar-primary** → **--primary** (SCC Red)
- **--stellar-secondary** → **--secondary** (SCC Gray)
- **--stellar-accent** → **--accent** (SCC Green)

### Documentation Files
- **STELLA_DEMO_SCRIPT.md** → **SCOTT_DEMO_SCRIPT.md**
- **STELLA_AGENTS_LIBRARY.md** → **SCOTT_AGENTS_LIBRARY.md**
- **stella-claims-prompt.ts** → **scotty-claims-prompt.ts**
- **stella-leads-prompt.ts** → **scotty-leads-prompt.ts**

## Marketing & Messaging

### Company Positioning
- **Old**: "AI-Powered Claims Intelligence for Public Adjusters"
- **New**: "AI-Powered Commercial Property Claims Intelligence"

### Target Audience
- **Old**: Public adjusters handling all property types
- **New**: Commercial property owners and their representatives

### Value Proposition
- **Old**: "We Find Money Your Insurance Company Hopes You'll Never Discover"
- **New**: "Maximizing Commercial Property Claims Through Strategic Intelligence"

### Service Focus
- **Old**: General property claims (residential and commercial)
- **New**: Specialized commercial property claims expertise

## Technical Implementation Notes

### File Renaming Completed
1. Prompt files renamed from stella-* to scott-*
2. API route folders renamed from stella-* to scott-*
3. Documentation files renamed to reflect SCOTT branding

### Import Updates Completed
1. All TypeScript imports updated to new file names
2. All function imports updated to new function names
3. All constant imports updated to new constant names

### Testing Verification
- ✅ Build compiles successfully
- ✅ No TypeScript errors
- ✅ All imports resolved
- ✅ Color system applied correctly
- ✅ Font system (Montserrat) implemented

## Migration Checklist

### Phase 1: Core Branding ✅
- [x] Update brand configuration
- [x] Replace color system
- [x] Implement new typography
- [x] Replace logo assets

### Phase 2: AI Assistant ✅
- [x] Rename Stella to SCOTT
- [x] Update all prompts
- [x] Update API routes
- [x] Update function names

### Phase 3: Documentation ✅
- [x] Rename documentation files
- [x] Create terminology mapping
- [x] Update story status

### Phase 4: Testing ✅
- [x] Verify build compilation
- [x] Fix TypeScript errors
- [x] Test API endpoints
- [x] Validate UI components

## Notes for Developers

When working on this codebase:
1. Use SCC brand colors exclusively (no stellar references)
2. Refer to the AI as SCOTT, not Stella
3. Focus messaging on commercial property expertise
4. Use Strategic Claim Consultants as the company name
5. Apply Montserrat font family consistently

## Residential to Commercial Property Terminology

### Property Types
| Residential Term | Commercial Term | Context/Notes |
|-----------------|-----------------|---------------|
| Home/House | Commercial Property | General property reference |
| Residence | Business Property | Legal/formal context |
| Dwelling | Structure/Building | Physical structure |
| Single-family home | Standalone commercial building | Building type |
| Apartment/Condo | Office Suite/Retail Space | Individual units |
| Townhouse | Mixed-use property | Multi-unit buildings |
| Bedroom | Office/Suite | Individual spaces |
| Living Room | Lobby/Reception Area | Common areas |
| Kitchen | Break Room/Cafeteria | Food service areas |
| Garage | Loading Dock/Parking Structure | Vehicle/shipping areas |
| Basement | Lower Level/Storage Area | Below-grade space |
| Attic | Upper Storage/Mechanical Room | Top floor space |

### Insurance Coverage Terms
| Residential Term | Commercial Term | Context/Notes |
|-----------------|-----------------|---------------|
| Homeowners Policy | Commercial Property Policy | Main coverage |
| Personal Property | Business Personal Property | Movable items |
| Loss of Use | Business Interruption | Income loss coverage |
| Additional Living Expenses | Extra Expense Coverage | Additional costs |
| Dwelling Coverage | Building Coverage | Structure protection |
| Other Structures | Additional Structures | Secondary buildings |
| Personal Liability | Commercial General Liability | Liability coverage |
| Medical Payments | Medical Expense Coverage | Medical costs |
| Replacement Cost | Replacement Cost Value | Valuation method |
| Actual Cash Value | Actual Cash Value | Depreciated value |

### Damage and Claim Types
| Residential Term | Commercial Term | Context/Notes |
|-----------------|-----------------|---------------|
| House fire | Commercial fire loss | Fire damage |
| Water damage | Commercial water loss | Water-related damage |
| Household items | Business equipment/inventory | Contents |
| Personal belongings | Business property | Movable property |
| Storm damage | CAT (catastrophe) loss | Weather events |
| Theft/Burglary | Commercial theft/burglary | Crime losses |
| Vandalism | Commercial vandalism | Intentional damage |
| Tree damage | Landscaping/exterior damage | Outside damage |
| Fence damage | Perimeter security damage | Boundary structures |

### Stakeholder Terms
| Residential Term | Commercial Term | Context/Notes |
|-----------------|-----------------|---------------|
| Homeowner | Property Owner/Business Owner | Owner |
| Resident/Occupant | Tenant/Lessee | Occupier |
| Family | Business/Company/Organization | Entity |
| Neighbor | Adjacent property/business | Nearby properties |
| Guest | Customer/Client/Visitor | Non-employees |
| Household member | Employee/Staff member | Regular occupants |
| Mortgage company | Commercial lender | Financial institution |
| HOA | Property management company | Management entity |

### Commercial-Specific Terms (No Residential Equivalent)
| Term | Definition |
|------|------------|
| Business Interruption | Coverage for lost income during closure |
| Ordinance or Law | Coverage for code upgrade requirements |
| Coinsurance | Penalty for underinsurance on commercial policies |
| Blanket Coverage | Single limit covering multiple locations/items |
| Gross Earnings | Business income calculation method |
| Extra Expense | Costs to minimize business interruption |
| Valuable Papers | Coverage for important documents |
| Accounts Receivable | Coverage for uncollectable receivables |
| Debris Removal | Coverage for cleanup costs |
| Preservation of Property | Coverage during emergency relocation |
| CAT Loss | Catastrophic event claim ($1M+) |
| Large Loss | Significant commercial claim ($100K+) |
| Time Element Coverage | Time-based loss coverage |
| Soft Costs | Delayed opening expenses |

### Industry Acronyms
| Acronym | Full Term | Context |
|---------|-----------|---------|
| BPP | Business Personal Property | Contents coverage |
| BI | Business Interruption | Income loss |
| CGL | Commercial General Liability | Liability coverage |
| CPP | Commercial Package Policy | Bundled coverage |
| RCV | Replacement Cost Value | Valuation method |
| ACV | Actual Cash Value | Depreciated value |
| O&L | Ordinance and Law | Code compliance |
| EE | Extra Expense | Additional costs |
| CAT | Catastrophe | Major event |
| TPA | Third Party Administrator | Claims handler |
| SIR | Self-Insured Retention | Deductible equivalent |
| XS | Excess | Coverage above primary |

## Story Completion Status

### Story 2.1: Global Stella to SCOTT Replacement ✅
- Replaced 708+ references
- Updated all text content
- Renamed all files and functions
- Updated AI prompts

### Story 2.2: Replace Stellar Color References ✅
- Replaced all color references
- Updated Tailwind configuration
- Fixed PO-identified gaps

### Story 2.3: Create Terminology Mapping ✅
- Created comprehensive mapping document
- Documented all changes
- Provided migration checklist