# Source Tree - SCC Dashboard

## Project Structure

```
acc_adjusters/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes (future)
│   ├── admin/                    # Admin dashboard
│   │   ├── claims-center/       # Claims management
│   │   └── page.tsx             # Admin landing
│   ├── api/                      # API routes
│   │   ├── assistant/           # AI assistant endpoints
│   │   │   ├── test/           # Test endpoints
│   │   │   └── unified/        # Unified AI endpoint
│   │   └── claims/             # Claims API
│   │       └── [id]/
│   │           └── documents/  # Document handling
│   ├── claim-assessment/        # Claim assessment flow
│   ├── claims/                   # Public claims views
│   │   └── [id]/               # Individual claim
│   ├── dashboard/               # Main dashboard
│   │   ├── claims/             # Claims management
│   │   │   └── [id]/          # Claim details
│   │   ├── inspection/         # Inspection workflow
│   │   │   ├── [id]/
│   │   │   │   ├── area/
│   │   │   │   ├── areas/
│   │   │   │   ├── continue/
│   │   │   │   ├── report/
│   │   │   │   ├── review/
│   │   │   │   └── start/
│   │   │   └── new/
│   │   └── reports/            # Reports section
│   ├── demo/                    # Demo experience
│   ├── landing/                 # Landing page
│   ├── presentation/            # Presentation mode
│   ├── pricing/                 # Pricing page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
│
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── ai-processing-overlay.tsx
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── file-upload-modal.tsx
│   │   ├── inspection-area-carousel.tsx
│   │   ├── page-header.tsx
│   │   ├── property-area-swipe.tsx
│   │   ├── sources-modal.tsx
│   │   ├── sources-section.tsx
│   │   └── typewriter-message.tsx
│   ├── AddressAutocomplete.tsx  # Address input
│   ├── MobileBottomNav.tsx      # Mobile navigation
│   ├── Sidebar.tsx              # Desktop sidebar
│   ├── mobile-chat-interface.tsx # SCOTT chat mobile
│   └── roi-calculator.tsx       # ROI calculator
│
├── contexts/                     # React contexts
│   └── theme-provider.tsx       # Theme management
│
├── lib/                         # Utilities and configs
│   ├── ai/                     # AI integration
│   │   ├── prompts/           # AI prompts
│   │   │   └── qlik-quick-prompts.ts
│   │   ├── providers/         # AI providers
│   │   ├── utils/            # AI utilities
│   │   └── mock-policy-data.ts
│   ├── gcs/                    # Google Cloud Storage
│   └── utils/                  # General utilities
│
├── public/                      # Static assets
│   ├── images/                 # Images
│   │   ├── scc_logo.png      # SCC logo
│   │   └── cases/            # Case study images
│   └── presentation.html       # Presentation file
│
├── docs/                        # Documentation
│   ├── architecture/           # Architecture docs
│   │   ├── coding-standards.md
│   │   ├── tech-stack.md
│   │   └── source-tree.md
│   ├── stories/               # User stories
│   │   ├── 1.*.md            # Phase 1 stories
│   │   ├── 2.*.md            # Phase 2 stories
│   │   └── 3.*.md            # Phase 3 stories
│   ├── SCC-DASHBOARD-REBRAND-BRIEF.md
│   ├── SCC-rebrand-architecture.md
│   ├── SCC-Implementation-Tasks.md
│   └── prd.md                # Product Requirements
│
├── scripts/                     # Build/deployment scripts
├── .bmad-core/                 # BMAD methodology files
├── .claude/                    # Claude AI config
│   └── commands/              # Custom commands
│
└── Configuration Files
    ├── next.config.js          # Next.js config
    ├── tailwind.config.ts      # Tailwind config
    ├── tsconfig.json           # TypeScript config
    ├── package.json            # Dependencies
    └── postcss.config.js       # PostCSS config
```

## Key Directories

### `/app`
Next.js 15 App Router structure with file-based routing. Each folder represents a route.

### `/components`
Reusable React components. The `ui/` subdirectory contains shadcn/ui components.

### `/lib`
Business logic, utilities, and integrations. Keeps components clean and focused on presentation.

### `/docs`
Project documentation including architecture, stories, and requirements.

## File Naming Conventions

- **Pages**: `page.tsx` (Next.js convention)
- **Layouts**: `layout.tsx` (Next.js convention)
- **Components**: PascalCase (e.g., `ScottChat.tsx`)
- **Utilities**: camelCase (e.g., `formatCurrency.ts`)
- **Config**: kebab-case (e.g., `scc-config.ts`)
- **Types**: PascalCase (e.g., `ClaimTypes.ts`)

## Import Aliases

- `@/` - Root directory alias configured in tsconfig.json
- Example: `import { Button } from '@/components/ui/button'`

## Environment Files

- `.env.local` - Local development environment
- `.env.production` - Production environment
- `.env.example` - Template for required variables

## Build Output

- `.next/` - Next.js build output (gitignored)
- `out/` - Static export (if used)
- `node_modules/` - Dependencies (gitignored)