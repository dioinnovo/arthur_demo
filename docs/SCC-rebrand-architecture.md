# Brownfield Enhancement Architecture: SCC Dashboard Rebrand

<!-- Powered by BMAD™ Core -->

## Introduction

This document provides the technical architecture for rebranding the existing SCC Intelligence Platform to Strategic Claim Consultants (SCC). This is a brownfield enhancement focused on presentation layer modifications without altering core functionality.

### Scope Verification

**Enhancement Type**: Visual and content rebranding
**Impact Level**: Frontend only - no backend or data layer changes
**Risk Level**: Low - cosmetic and content changes only
**Timeline**: 14 days implementation

### Existing System Analysis

The current system is a modern Next.js 15.5.2 application with:
- **Frontend**: React 19, Tailwind CSS, shadcn/ui components
- **AI Integration**: AI SDK with multiple providers (Anthropic, OpenAI, Azure)
- **State Management**: React hooks, context API
- **Styling**: CSS-in-JS with Tailwind utility classes
- **Build Tools**: Next.js with Turbo support
- **Type Safety**: TypeScript throughout

## Enhancement Scope and Integration Strategy

### Integration Points

1. **Visual Layer** - CSS variables, Tailwind config, component styles
2. **Content Layer** - Text strings, labels, AI prompts
3. **Asset Layer** - Images, logos, icons
4. **Configuration Layer** - Theme settings, brand constants

### Non-Invasive Approach

The rebrand will be implemented through:
- **CSS Variable Overrides** - Centralized color management
- **Configuration Updates** - Tailwind and theme settings
- **Component Props** - Conditional rendering based on brand
- **String Constants** - Centralized terminology mapping

### Backward Compatibility

While this is a complete rebrand, the architecture supports:
- **Rollback Capability** - Git-based versioning for quick reversion
- **Feature Flags** (optional) - Toggle between brands if needed
- **Progressive Deployment** - Component-by-component updates

## Tech Stack

### Existing Technologies (No Changes)
```yaml
Frontend:
  Framework: Next.js 15.5.2
  UI Library: React 19.1.1
  Styling: Tailwind CSS 3.4.17
  Components: shadcn/ui (Radix UI)
  Animations: Framer Motion 12.23.14
  Charts: Recharts 3.2.0

AI/ML:
  SDK: AI SDK 5.0.39
  Providers: Anthropic, OpenAI, Azure
  Embeddings: ChromaDB

Build/Dev:
  TypeScript: 5.x
  Bundler: Next.js/Webpack
  Package Manager: npm
  Linting: ESLint
```

### New Additions
```yaml
Fonts:
  - Montserrat (Google Fonts CDN)

Assets:
  - SCC Logo (PNG format)
  - Commercial property images

Configuration:
  - Brand constants file
  - Theme overrides
```

## Component Architecture

### Refactoring Strategy

#### Level 1: Configuration Changes
```typescript
// tailwind.config.ts
const config: Config = {
  theme: {
    extend: {
      colors: {
        // Remove stellar colors
        // stellar: { orange: "#E74C3C", dark: "#2C3E50" },

        // Add SCC colors
        scc: {
          red: "#C8102E",
          "red-dark": "#A00D25",
          gray: "#707070",
          "gray-dark": "#2B2B2B",
          success: "#00A651"
        }
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      }
    }
  }
}
```

#### Level 2: CSS Variable Updates
```css
/* app/globals.css */
@layer base {
  :root {
    /* Core brand colors */
    --primary: 348 72% 44%;        /* SCC Red #C8102E */
    --primary-hover: 348 76% 35%;  /* Darker Red */
    --secondary: 0 0% 44%;         /* Gray #707070 */
    --success: 144 100% 32%;       /* Green #00A651 */

    /* Remove stellar-specific variables */
    /* --stellar-orange: ... */
  }
}
```

#### Level 3: Component Updates

**Button Component Migration**:
```typescript
// components/ui/button.tsx
// Before
className="bg-stellar-orange hover:bg-stellar-dark"

// After
className="bg-scc-red hover:bg-scc-red-dark"
```

**Status Badge Migration**:
```typescript
// components/ui/badge.tsx
const variants = {
  success: "bg-scc-success text-white",
  pending: "bg-scc-gray text-white",
  active: "bg-scc-red text-white"
}
```

### Component Dependency Tree

```
Root Components
├── Layout (app/layout.tsx)
│   ├── Sidebar (logo, nav colors)
│   ├── MobileBottomNav (mobile branding)
│   └── ThemeProvider (color system)
├── Dashboard Pages
│   ├── PageHeader (branding elements)
│   ├── Cards (border/accent colors)
│   └── Charts (data viz colors)
└── AI Assistant
    ├── ChatInterface (SCOTT branding)
    ├── MessageBubbles (color styling)
    └── SystemPrompts (personality)
```

## Data Models and Schema Changes

### No Database Changes Required

The rebrand is frontend-only. However, we need to update:

### Mock Data Transformation
```typescript
// lib/mock-data/properties.ts
export const demoProperties = [
  {
    id: 'CLM-2024-001',
    name: 'The Shrimp Boat Restaurant',
    type: 'Restaurant/Hospitality', // was 'Single Family Home'
    location: 'Panama City Beach, FL',
    initialOffer: 0,
    finalSettlement: 1945000,
    damageType: 'Hurricane Michael',
    // ... real SCC case data
  }
]
```

### Terminology Mapping
```typescript
// lib/constants/terminology.ts
export const TERM_MAP = {
  'homeowner': 'property owner',
  'home': 'property',
  'residential inspection': 'property assessment',
  'house': 'building',
  'rooms': 'areas',
  'master bedroom': 'executive suite',
  // ... complete mapping
}
```

## API Design and Integration

### No API Changes

The rebrand requires no API modifications. However, AI prompts need updating:

### AI Assistant Configuration
```typescript
// lib/ai/system-prompts.ts
export const SCOTT_SYSTEM_PROMPT = `
You are SCOTT (Strategic Claims Operations & Technical Tracker),
a professional commercial property claims expert for Strategic Claim Consultants.

Your expertise includes:
- Commercial property damage assessment
- Large-loss claim management
- Business interruption calculations
- Hurricane and catastrophe claims
- Settlement maximization strategies

Tone: Professional, authoritative, results-focused
Context: SCC has recovered $2B+ in settlements with 300+ years collective experience
`;
```

### External Integrations

No changes to existing integrations:
- Google Maps API (unchanged)
- Cloud Storage (unchanged)
- Email services (template updates only)

## Source Tree

### File Organization Strategy

```
/app
├── globals.css                 [UPDATE: Color variables, fonts]
├── layout.tsx                  [UPDATE: Metadata, font imports]
├── page.tsx                    [UPDATE: Landing page branding]
└── dashboard/
    ├── page.tsx               [UPDATE: Dashboard branding]
    ├── claims/                [UPDATE: Claims UI colors]
    ├── inspection/            [RENAME: to /assessment]
    └── reports/               [UPDATE: Report templates]

/components
├── ui/
│   ├── button.tsx            [UPDATE: Color classes]
│   ├── badge.tsx             [UPDATE: Status colors]
│   ├── card.tsx              [UPDATE: Border colors]
│   └── ...                   [UPDATE: All UI components]
├── Sidebar.tsx               [UPDATE: Logo, colors]
├── MobileBottomNav.tsx       [UPDATE: Mobile branding]
└── ai/
    ├── ChatInterface.tsx     [UPDATE: SCOTT branding]
    └── AssistantAvatar.tsx   [NEW: SCOTT avatar]

/lib
├── constants/
│   ├── brand.ts              [NEW: Brand configuration]
│   ├── terminology.ts        [NEW: Term mapping]
│   └── colors.ts             [NEW: Color constants]
├── ai/
│   └── prompts.ts           [UPDATE: SCOTT prompts]
└── mock-data/
    └── properties.ts        [UPDATE: Commercial cases]

/public
├── images/
│   ├── scc_logo.png         [NEW: SCC logo]
│   ├── properties/          [NEW: Commercial images]
│   └── favicon.ico          [UPDATE: SCC favicon]
└── fonts/                   [Optional: Self-hosted fonts]

/styles
└── theme/
    ├── scc-theme.css        [NEW: Brand overrides]
    └── animations.css       [KEEP: Existing animations]
```

## Infrastructure and Deployment Integration

### Build Configuration

**Package.json Updates**:
```json
{
  "name": "scc-claims-platform",  // was "stellar-intelligence-platform"
  "description": "Strategic Claim Consultants Commercial Claims Platform"
}
```

**Environment Variables**:
```bash
# .env.local
NEXT_PUBLIC_APP_NAME="SCC Claims Platform"
NEXT_PUBLIC_BRAND="SCC"
NEXT_PUBLIC_PRIMARY_COLOR="#C8102E"
```

### Deployment Strategy

1. **Development Branch**
   ```bash
   git checkout -b feature/scc-rebrand
   ```

2. **Incremental Deployment**
   - Phase 1: Core branding (colors, logo)
   - Phase 2: Component updates
   - Phase 3: Content migration
   - Phase 4: AI assistant rebrand
   - Phase 5: Demo data update

3. **Verification Points**
   - Visual regression testing after each phase
   - Cross-browser testing
   - Mobile responsive validation

### Performance Considerations

- **Bundle Size**: Minimal increase (~50KB for fonts)
- **Load Time**: Use font-display: swap for Montserrat
- **Image Optimization**: Next.js Image component for all assets
- **CSS**: No increase in stylesheet size (replacement only)

## Coding Standards

### CSS/Styling Guidelines

1. **Use Design Tokens**
   ```css
   /* Good */
   color: var(--scc-red);

   /* Avoid */
   color: #C8102E;
   ```

2. **Tailwind Classes**
   ```tsx
   // Good
   className="bg-scc-red hover:bg-scc-red-dark"

   // Avoid
   className="bg-[#C8102E] hover:bg-[#A00D25]"
   ```

3. **Component Patterns**
   ```tsx
   // Centralized brand config
   import { BRAND } from '@/lib/constants/brand'

   function Logo() {
     return <img src={BRAND.logo} alt={BRAND.name} />
   }
   ```

### TypeScript Patterns

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
```

### Naming Conventions

- **Files**: Keep existing names where possible
- **Components**: No renames unless brand-specific
- **Variables**: Use `scc` prefix for new brand items
- **Classes**: Use `scc-` prefix in CSS

## Testing Strategy

### Visual Regression Testing

```javascript
// tests/visual/brand-compliance.test.js
describe('SCC Brand Compliance', () => {
  it('should not contain Stellar orange color', async () => {
    const page = await browser.newPage()
    await page.goto('http://localhost:3000')
    const hasOrange = await page.evaluate(() => {
      return document.body.innerHTML.includes('#E74C3C')
    })
    expect(hasOrange).toBe(false)
  })

  it('should display SCC logo', async () => {
    const logo = await page.$('img[alt="SCC"]')
    expect(logo).toBeTruthy()
  })
})
```

### Content Validation

```javascript
// tests/content/terminology.test.js
const FORBIDDEN_TERMS = ['Stella', 'homeowner', 'residential']
const REQUIRED_TERMS = ['SCOTT', 'commercial', 'property owner']

describe('Content Compliance', () => {
  FORBIDDEN_TERMS.forEach(term => {
    it(`should not contain "${term}"`, async () => {
      const content = await getPageContent('/')
      expect(content).not.toContain(term)
    })
  })
})
```

### Component Testing

```typescript
// components/ui/button.test.tsx
describe('Button Component', () => {
  it('uses SCC red color for primary variant', () => {
    const { container } = render(<Button variant="primary">Test</Button>)
    const button = container.querySelector('button')
    expect(button).toHaveClass('bg-scc-red')
  })
})
```

### Integration Testing

- Test AI assistant responds as SCOTT
- Verify reports generate with SCC branding
- Validate form submissions with commercial data
- Check responsive design on mobile devices

## Security Integration

### No Security Impact

The rebrand introduces no security vulnerabilities:
- No new dependencies with known vulnerabilities
- No changes to authentication/authorization
- No modifications to data handling
- No external API additions

### Content Security Policy

Update CSP for Google Fonts:
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "font-src 'self' fonts.googleapis.com fonts.gstatic.com;"
  }
]
```

## Performance Optimization

### Font Loading Strategy

```html
<!-- app/layout.tsx -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/images/scc_logo.png"
  alt="SCC"
  width={200}
  height={50}
  priority // for above-fold images
/>
```

### CSS Optimization

```css
/* Remove unused Stellar classes */
.stellar-orange { /* DELETE */ }
.stellar-dark { /* DELETE */ }

/* Add new SCC utilities */
@layer utilities {
  .scc-gradient {
    background: linear-gradient(135deg, var(--scc-red) 0%, var(--scc-red-dark) 100%);
  }
}
```

## Migration Checklist

### Pre-Migration
- [ ] Backup current production
- [ ] Create feature branch
- [ ] Set up visual regression baseline
- [ ] Document current color usage

### Phase 1: Foundation (Days 1-2)
- [ ] Update Tailwind config
- [ ] Modify CSS variables
- [ ] Add Montserrat font
- [ ] Replace logo files

### Phase 2: Components (Days 3-5)
- [ ] Update UI components
- [ ] Modify navigation elements
- [ ] Adjust form styling
- [ ] Update status indicators

### Phase 3: Pages (Days 6-8)
- [ ] Rebrand dashboard
- [ ] Update claims pages
- [ ] Transform assessment pages
- [ ] Modify reports

### Phase 4: Content (Days 9-11)
- [ ] Update all text content
- [ ] Replace property types
- [ ] Implement terminology mapping
- [ ] Update help text

### Phase 5: AI & Data (Days 12-13)
- [ ] Rebrand AI assistant
- [ ] Update system prompts
- [ ] Replace demo data
- [ ] Add real case studies

### Phase 6: Testing (Day 14)
- [ ] Visual regression testing
- [ ] Cross-browser validation
- [ ] Mobile testing
- [ ] Performance verification

### Post-Migration
- [ ] Production deployment
- [ ] Monitor for issues
- [ ] Gather feedback
- [ ] Document changes

## Rollback Strategy

If issues arise:

1. **Immediate Rollback**
   ```bash
   git revert --no-commit HEAD~5..HEAD
   git commit -m "Revert SCC rebrand"
   ```

2. **Partial Rollback**
   - Keep infrastructure changes
   - Revert only visual changes
   - Maintain improved architecture

3. **Feature Flag Option**
   ```typescript
   const BRAND = process.env.NEXT_PUBLIC_BRAND || 'stellar'
   const brandConfig = BRAND === 'scc' ? sccConfig : stellarConfig
   ```

## Next Steps

### For Development Team

1. **Review this architecture document**
2. **Set up development environment**
   ```bash
   git checkout -b feature/scc-rebrand
   npm install
   npm run dev
   ```
3. **Begin Phase 1 implementation**
4. **Daily progress sync meetings**

### For Design Team

1. **Provide commercial property images**
2. **Review color implementations**
3. **Validate typography choices**
4. **Approve SCOTT avatar design**

### For QA Team

1. **Set up visual regression tests**
2. **Prepare test scenarios**
3. **Configure cross-browser testing**
4. **Plan UAT sessions**

### For DevOps Team

1. **Prepare staging environment**
2. **Set up deployment pipeline**
3. **Configure monitoring**
4. **Plan rollback procedures**

## Risk Mitigation

### Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Incomplete color replacement | High | Automated CSS scanning |
| Broken responsive design | Medium | Mobile-first testing |
| Performance degradation | Low | Performance budgets |
| Cache issues | Low | Cache busting strategy |

### Business Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Brand confusion | High | Complete QA process |
| Missing content | Medium | Content audit checklist |
| SEO impact | Low | Maintain URL structure |

## Success Criteria

1. **Zero Stellar branding elements remain**
2. **100% SCC color compliance**
3. **All pages load in <3 seconds**
4. **Mobile responsive at all breakpoints**
5. **SCOTT AI functioning correctly**
6. **Real case studies integrated**
7. **No functionality regression**
8. **Successful UAT sign-off**

## Conclusion

This brownfield architecture provides a low-risk, high-impact transformation of the Stellar platform to SCC branding. By focusing on the presentation layer and maintaining all core functionality, we ensure a smooth transition with minimal technical debt and maximum brand impact.

The architecture prioritizes:
- **Non-invasive changes** - Frontend only modifications
- **Maintainability** - Clean, organized code structure
- **Performance** - No degradation in user experience
- **Flexibility** - Easy to extend or modify
- **Reliability** - Comprehensive testing strategy

---

*Document prepared by: Winston (Architect)*
*Date: 2025-09-25*
*Version: 1.0*
*Status: Ready for Implementation*