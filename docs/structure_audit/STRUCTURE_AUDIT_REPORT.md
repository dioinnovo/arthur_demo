# Arthur Health - Next.js 16 Structure Audit Report

**Audit Date:** November 16, 2025  
**Project:** arthur_health (Healthcare Intelligence Platform)  
**Current Version:** Next.js 15.5.2  
**Target Standard:** Next.js 16 with Stellar Framework pattern  
**Compliance Score:** 42%

---

## Table of Contents

1. [Current Structure](#current-structure)
2. [Best Practice Structure](#best-practice-structure)
3. [Section-by-Section Comparison](#section-by-section-comparison)
4. [Detailed Findings](#detailed-findings)
5. [Specific Violations](#specific-violations)
6. [Recommendations](#recommendations)

---

## Current Structure

```
arthur-health/ (ROOT)
├── app/                          # APP ROUTER (SHOULD BE IN src/)
│   ├── (admin)/
│   │   └── admin/
│   │       └── claims-center/
│   ├── (app)/
│   │   └── dashboard/            # Layout exists but no error/loading
│   │       ├── assistant/
│   │       ├── care-coordination/
│   │       ├── care-sessions/
│   │       ├── claims/
│   │       ├── compliance/
│   │       ├── integrations/
│   │       ├── patients/
│   │       ├── referrals/
│   │       └── reports/
│   ├── (marketing)/
│   │   └── demo/
│   ├── _dev/                     # GOOD: Private dev routes
│   │   ├── claim-assessment/
│   │   ├── inspection/
│   │   ├── presentation-test/
│   │   ├── prompt-demo/
│   │   ├── test-sources/
│   │   └── tinder-swipe-demo/
│   ├── api/
│   │   ├── admin/
│   │   ├── assistant/
│   │   ├── chat/
│   │   ├── claims/
│   │   ├── enrichment/
│   │   ├── orchestrate/
│   │   ├── realtime/
│   │   └── scotty-*/ (2 directories)
│   ├── layout.tsx                # ROOT LAYOUT (GOOD)
│   └── (no error.tsx, no not-found.tsx - MISSING)
│
├── components/                   # AT ROOT (SHOULD BE IN src/components/)
│   ├── AddressAutocomplete.tsx   # MIXED: Global and feature-specific
│   ├── DisableGrammarly.tsx
│   ├── MobileBottomNav.tsx
│   ├── Sidebar.tsx
│   ├── mobile-chat-interface.tsx # FEATURE-SPECIFIC (should be in _components)
│   ├── virtual-assistant.tsx     # FEATURE-SPECIFIC (should be in _components)
│   ├── roi-calculator.tsx        # FEATURE-SPECIFIC (should be in _components)
│   ├── voice-debug-panel.tsx     # FEATURE-SPECIFIC (should be in _components)
│   ├── assistant/                # Feature folder (good organization)
│   │   └── *.tsx
│   ├── care-coordination/
│   ├── claims/
│   ├── dashboard/
│   ├── layout/
│   ├── patient/
│   └── ui/                       # GOOD: shadcn/ui components
│
├── lib/                          # AT ROOT (SHOULD BE IN src/lib/)
│   ├── agents/
│   ├── ai/
│   ├── constants/
│   ├── data/
│   ├── db/
│   ├── email/
│   ├── gcs/
│   ├── knowledge/
│   ├── langchain/
│   ├── orchestrator/
│   ├── pdf/
│   ├── realtime/
│   ├── types/
│   ├── utils/
│   └── voice/
│
├── hooks/                        # AT ROOT (SHOULD BE IN src/hooks/)
├── contexts/                     # AT ROOT (SHOULD BE IN src/contexts/)
│   ├── SidebarContext.tsx        # GOOD: Properly used
│   └── theme-provider.tsx
│
├── public/                       # CORRECT: At root
├── docs/                         # CORRECT: At root
├── prisma/                       # CORRECT: At root
│
├── Configuration Files (GOOD - at root):
│   ├── tsconfig.json             # ISSUE: Paths point to "./*" not "./src/*"
│   ├── tailwind.config.ts        # ISSUE: Content paths incorrect
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   ├── .env.local
│   └── vercel.json
│
└── Other Directories:
    ├── experimental/             # External code, OK at root
    ├── scripts/
    ├── tests/
    └── synapse/
```

---

## Best Practice Structure

```
arthur-health/ (ROOT)
├── src/                          # APPLICATION SOURCE CODE (NEW)
│   ├── app/                      # Next.js App Router
│   │   ├── (admin)/             # Route group
│   │   │   ├── admin/
│   │   │   │   ├── claims-center/
│   │   │   │   └── page.tsx
│   │   │   ├── _components/     # REQUIRED: Admin-specific components
│   │   │   ├── error.tsx         # REQUIRED: Admin error boundary
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (app)/               # Route group
│   │   │   ├── dashboard/
│   │   │   │   ├── assistant/
│   │   │   │   ├── care-coordination/
│   │   │   │   ├── care-sessions/
│   │   │   │   ├── claims/
│   │   │   │   ├── compliance/
│   │   │   │   ├── integrations/
│   │   │   │   ├── patients/
│   │   │   │   ├── referrals/
│   │   │   │   ├── reports/
│   │   │   │   ├── _components/     # REQUIRED: Dashboard-specific
│   │   │   │   ├── error.tsx        # REQUIRED: Dashboard error
│   │   │   │   ├── loading.tsx      # REQUIRED: Dashboard loading
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── _components/     # REQUIRED: App-wide features
│   │   │   ├── error.tsx         # REQUIRED: App error boundary
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (marketing)/         # Route group
│   │   │   ├── demo/
│   │   │   ├── _components/     # REQUIRED: Marketing-specific
│   │   │   ├── error.tsx         # REQUIRED: Marketing error
│   │   │   └── layout.tsx
│   │   │
│   │   ├── _dev/                # GOOD: Private dev routes (keep as-is)
│   │   │   ├── claim-assessment/
│   │   │   ├── inspection/
│   │   │   ├── presentation-test/
│   │   │   ├── prompt-demo/
│   │   │   ├── test-sources/
│   │   │   └── tinder-swipe-demo/
│   │   │
│   │   ├── api/                 # GOOD: API routes organization
│   │   │   ├── admin/
│   │   │   ├── assistant/
│   │   │   ├── chat/
│   │   │   ├── claims/
│   │   │   ├── enrichment/
│   │   │   ├── orchestrate/
│   │   │   ├── realtime/
│   │   │   └── scotty-*/
│   │   │
│   │   ├── error.tsx            # REQUIRED: Global error boundary
│   │   ├── not-found.tsx         # REQUIRED: Global 404 page
│   │   ├── loading.tsx           # OPTIONAL: Global loading state
│   │   ├── layout.tsx            # GOOD: Root layout
│   │   ├── page.tsx             # GOOD: Root page
│   │   ├── globals.css          # GOOD: Global styles
│   │   └── README.md            # GOOD: Route documentation
│   │
│   ├── components/              # GLOBAL SHARED COMPONENTS (MOVED)
│   │   ├── ui/                  # GOOD: shadcn/ui components
│   │   │   └── *.tsx
│   │   ├── Sidebar.tsx          # Global layout component
│   │   ├── MobileBottomNav.tsx  # Global layout component
│   │   ├── AddressAutocomplete.tsx
│   │   ├── DisableGrammarly.tsx
│   │   └── README.md            # Document organization
│   │
│   ├── lib/                     # UTILITIES & BUSINESS LOGIC (MOVED)
│   │   ├── agents/
│   │   ├── ai/
│   │   ├── constants/
│   │   ├── data/
│   │   ├── db/
│   │   ├── email/
│   │   ├── gcs/
│   │   ├── knowledge/
│   │   ├── langchain/
│   │   ├── orchestrator/
│   │   ├── pdf/
│   │   ├── realtime/
│   │   ├── types/
│   │   ├── utils/
│   │   └── voice/
│   │
│   ├── contexts/                # REACT CONTEXTS (MOVED)
│   │   ├── SidebarContext.tsx
│   │   └── theme-provider.tsx
│   │
│   └── hooks/                   # CUSTOM HOOKS (MOVED)
│
├── public/                      # STATIC ASSETS (UNCHANGED)
├── docs/                        # DOCUMENTATION (UNCHANGED)
│   └── structure_audit/         # NEW: Audit documentation
├── prisma/                      # DATABASE SCHEMA (UNCHANGED)
│
├── Configuration Files (UNCHANGED - at root):
│   ├── tsconfig.json            # UPDATE: paths to "./src/*"
│   ├── tailwind.config.ts       # UPDATE: content to "./src/**/*"
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   ├── .env.local
│   └── vercel.json
│
└── Other Directories (UNCHANGED):
    ├── experimental/
    ├── scripts/
    ├── tests/
    └── synapse/
```

---

## Section-by-Section Comparison

### 1. Root Directory Structure

**CURRENT STATE:**
```
❌ app/ (at root)
❌ components/ (at root)
❌ lib/ (at root)
❌ hooks/ (at root)
❌ contexts/ (at root)
✓ Configuration files at root
✓ public/ at root
✓ docs/ at root
```

**REQUIRED STATE:**
```
✓ src/app/
✓ src/components/
✓ src/lib/
✓ src/hooks/
✓ src/contexts/
✓ Configuration files at root
✓ public/ at root
✓ docs/ at root
```

**IMPACT:** Moving 5 directories, updating 2 config files

---

### 2. Route Groups

**CURRENT STATE:**
```
✓ (admin) - Correctly implements route group
✓ (app) - Correctly implements route group
✓ (marketing) - Correctly implements route group
✓ _dev - Private folder for dev routes
```

**REQUIRED STATE:**
```
✓ (admin) - Keep as-is
✓ (app) - Keep as-is
✓ (marketing) - Keep as-is
✓ _dev - Keep as-is
```

**NOTES:** Route group usage is CORRECT. No changes needed here.

---

### 3. Special Files (Critical Gap)

**CURRENT STATE:**
```
✓ /app/layout.tsx (root layout exists)
✗ /app/error.tsx (MISSING - CRITICAL)
✗ /app/not-found.tsx (MISSING - CRITICAL)
✗ /app/(app)/dashboard/error.tsx (MISSING - CRITICAL)
✗ /app/(app)/dashboard/loading.tsx (MISSING)
✗ /app/(admin)/error.tsx (MISSING)
✗ /app/(marketing)/error.tsx (MISSING)
```

**REQUIRED STATE:**
```
✓ /src/app/layout.tsx
✓ /src/app/error.tsx (REQUIRED)
✓ /src/app/not-found.tsx (REQUIRED)
✓ /src/app/(app)/dashboard/error.tsx (REQUIRED)
✓ /src/app/(app)/dashboard/loading.tsx (RECOMMENDED)
✓ /src/app/(admin)/error.tsx (REQUIRED)
✓ /src/app/(marketing)/error.tsx (REQUIRED)
```

**IMPACT:** Add 6-7 files, implement error boundaries and loading states

---

### 4. Component Organization

**CURRENT STATE:**
```
components/ (at root)
├── ui/                          ✓ Good: shadcn/ui
├── Sidebar.tsx                  ✓ Global layout
├── MobileBottomNav.tsx          ✓ Global layout
├── AddressAutocomplete.tsx      ✓ Reusable
├── DisableGrammarly.tsx         ✓ Reusable
├── mobile-chat-interface.tsx    ✗ Feature-specific (dashboard)
├── virtual-assistant.tsx        ✗ Feature-specific (dashboard)
├── roi-calculator.tsx           ✗ Feature-specific (marketing)
├── voice-debug-panel.tsx        ✗ Feature-specific (dashboard)
├── assistant/                   ✓ Feature folder
├── care-coordination/           ✓ Feature folder
├── claims/                      ✓ Feature folder
├── dashboard/                   ✓ Feature folder
├── layout/                      ✓ Feature folder
└── patient/                     ✓ Feature folder

PROBLEM: Mix of global and feature-specific at same level
```

**REQUIRED STATE:**
```
src/components/
├── ui/                          # shadcn/ui (20+ components)
├── Sidebar.tsx                  # Global layout
├── MobileBottomNav.tsx          # Global layout
├── AddressAutocomplete.tsx      # Global/reusable
├── DisableGrammarly.tsx         # Global/reusable
└── README.md                    # Document organization

src/app/(app)/dashboard/_components/
├── mobile-chat-interface.tsx
├── virtual-assistant.tsx
└── voice-debug-panel.tsx

src/app/(marketing)/_components/
├── roi-calculator.tsx
└── (other marketing-specific components)

src/app/(admin)/admin/_components/
└── (admin-specific components)

src/app/(app)/dashboard/assistant/_components/
└── (assistant-specific components)

src/app/(app)/dashboard/care-coordination/_components/
└── (care-coordination-specific components)

src/app/(app)/dashboard/claims/_components/
└── (claims-specific components)
```

**IMPACT:** Reorganize 15+ components into proper locations

---

### 5. TypeScript Configuration

**CURRENT tsconfig.json:**
```json
{
  "paths": {
    "@/*": ["./*"]  // WRONG: Points to root
  }
}
```

**PROBLEM:**
- Imports will break after moving to src/
- Current imports like `@/lib/utils` won't resolve
- `@/components/ui/button` expects at root

**REQUIRED:**
```json
{
  "paths": {
    "@/*": ["./src/*"]  // CORRECT: Points to src/
  }
}
```

**FILE:** /tsconfig.json (line ~28)

---

### 6. Tailwind Configuration

**CURRENT tailwind.config.ts:**
```typescript
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',      // WRONG: No pages/ in App Router
    './components/**/*.{js,ts,jsx,tsx,mdx}', // WRONG: Will be in src/
    './app/**/*.{js,ts,jsx,tsx,mdx}',        // WRONG: Will be in src/
  ],
  // ...
}
```

**PROBLEM:**
- './pages/**/*' doesn't exist (using App Router, not Pages Router)
- Paths don't include 'src/' so styles will be purged after migration
- Tailwind won't find components to analyze

**REQUIRED:**
```typescript
const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ...
}
```

**FILE:** /tailwind.config.ts (lines 4-7)

---

### 7. Private Folders Usage

**CURRENT STATE:**
```
✓ app/_dev/              # Good: Private dev routes
✗ No feature-specific _components
✗ No admin _components
✗ No marketing _components
```

**REQUIRED STATE:**
```
✓ src/app/_dev/         # Keep as-is
✓ src/app/(app)/dashboard/_components/
✓ src/app/(app)/dashboard/assistant/_components/
✓ src/app/(app)/dashboard/care-coordination/_components/
✓ src/app/(app)/dashboard/claims/_components/
✓ src/app/(admin)/admin/_components/
✓ src/app/(marketing)/_components/
```

**IMPACT:** Create 6-7 new private folders and move components

---

### 8. API Route Organization

**CURRENT STATE:**
```
app/api/
├── admin/           ✓ Good grouping
├── assistant/       ✓ Good grouping
├── chat/           ✓ Good grouping
├── claims/         ✓ Good grouping
├── enrichment/     ✓ Good grouping
├── orchestrate/    ✓ Good grouping
├── realtime/       ✓ Good grouping
└── scotty-*/       ✓ Good grouping

ASSESSMENT: Well-organized
```

**REQUIRED STATE:**
```
src/app/api/        # Same structure, just move into src/
├── admin/
├── assistant/
├── chat/
├── claims/
├── enrichment/
├── orchestrate/
├── realtime/
└── scotty-*/
```

**NOTES:** API organization is fine. No changes to structure needed, just move into src/.

---

## Detailed Findings

### Finding 1: Critical - Missing src/ Directory Pattern

**Location:** Project root  
**Severity:** CRITICAL  
**Files Affected:** app/, components/, lib/, hooks/, contexts/

**Current Problem:**
All application code is at the root level, which violates Next.js architectural standards and the Stellar Framework pattern.

**Current Layout:**
```
arthur-health/
├── app/
├── components/
├── lib/
├── hooks/
├── contexts/
└── (config files)
```

**Best Practice:**
```
arthur-health/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   └── contexts/
└── (config files)
```

**Why It Matters:**
- Industry standard for Next.js projects
- Separates application code from configuration
- Makes import paths cleaner and more organized
- Aligns with Stellar Framework standard
- Easier to navigate projects
- Better IDE organization

**Solution:**
Create src/ directory and move all five directories into it. Update configuration files afterward.

---

### Finding 2: Critical - Missing Error Boundaries

**Location:** app/ directory  
**Severity:** CRITICAL  
**Missing Files:**
- error.tsx (multiple levels)
- not-found.tsx (global)

**Current Problem:**
There are NO error boundary files in the entire app directory. This means:
- Errors bubble up to the page instead of showing error UI
- Custom 404 pages are impossible
- No graceful error handling
- Poor user experience during errors

**What's Missing:**
```
/app/error.tsx              (Global - doesn't exist)
/app/(app)/error.tsx        (App routes - doesn't exist)
/app/(admin)/error.tsx      (Admin routes - doesn't exist)
/app/(marketing)/error.tsx  (Marketing routes - doesn't exist)
/app/not-found.tsx          (404 page - doesn't exist)
/app/(app)/dashboard/error.tsx         (Dashboard - doesn't exist)
/app/(app)/dashboard/loading.tsx       (Loading state - doesn't exist)
```

**Why It Matters:**
- Error boundaries provide graceful error handling
- Loading states improve perceived performance
- Custom 404 pages are professional
- Required for production-grade applications

**Solution:**
Add 7-8 special files at strategic levels. See MIGRATION_CHECKLIST.md for exact implementations.

---

### Finding 3: Critical - Incorrect TypeScript Paths

**Location:** tsconfig.json (line ~28)  
**Severity:** CRITICAL  
**Current Configuration:**
```json
"paths": {
  "@/*": ["./*"]
}
```

**Problem:**
The path alias points to root `"./"` instead of `"./src/*"`. This means:
- After moving to src/, imports like `@/lib/utils` won't resolve
- TypeScript will show errors
- Build will fail
- All imports need updating

**Example Issue:**
```typescript
// Current (works)
import { Button } from '@/components/ui/button'
// After src/ migration without config update (BREAKS)
// Because @/* points to root, not src/

// After config update (works again)
// Because @/* now points to src/
```

**Solution:**
Update tsconfig.json line 28 from `"./*"` to `"./src/*"`

**Time to Fix:** 10 minutes

---

### Finding 4: Critical - Tailwind Content Paths Incorrect

**Location:** tailwind.config.ts (lines 4-7)  
**Severity:** CRITICAL

**Current Configuration:**
```typescript
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',      // WRONG
    './components/**/*.{js,ts,jsx,tsx,mdx}', // WRONG
    './app/**/*.{js,ts,jsx,tsx,mdx}',        // WRONG
  ],
}
```

**Problems:**
1. `./pages/**/*` - This directory doesn't exist (using App Router, not Pages Router)
2. `./components/**/*` - Will be at `./src/components/**/*` after migration
3. `./app/**/*` - Will be at `./src/app/**/*` after migration
4. Without correct paths, Tailwind will purge all styles after migration

**What Happens After Migration:**
- Tailwind scans `./components/` (empty or at wrong location)
- Tailwind scans `./app/` (empty or at wrong location)
- Tailwind finds NO class names to keep
- ALL styles get purged
- Website becomes unstyled (broken)

**Solution:**
Update tailwind.config.ts lines 4-7 to:
```typescript
const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

**Time to Fix:** 15 minutes

---

### Finding 5: High - Component Organization Broken

**Location:** /components/ directory  
**Severity:** HIGH

**Current Problem:**
Components are mixed at the root level. Global components, feature-specific components, and organized subfolders are all together:

```
components/
├── ui/                          (Organized in folder - GOOD)
├── assistant/                   (Organized in folder - GOOD)
├── care-coordination/           (Organized in folder - GOOD)
├── claims/                      (Organized in folder - GOOD)
├── dashboard/                   (Organized in folder - GOOD)
├── layout/                      (Organized in folder - GOOD)
├── patient/                     (Organized in folder - GOOD)
├── AddressAutocomplete.tsx      (Loose file - CONFUSING)
├── DisableGrammarly.tsx         (Loose file - CONFUSING)
├── MobileBottomNav.tsx          (Loose file - CONFUSING)
├── Sidebar.tsx                  (Loose file - CONFUSING)
├── mobile-chat-interface.tsx    (Feature-specific at root - WRONG)
├── roi-calculator.tsx           (Feature-specific at root - WRONG)
├── virtual-assistant.tsx        (Feature-specific at root - WRONG)
└── voice-debug-panel.tsx        (Feature-specific at root - WRONG)
```

**Problems:**
- Can't tell which components are global vs feature-specific
- Feature-specific components mixed with global ones
- Hard to find where a component should go
- Violates two-tier component system
- Makes code harder to maintain

**Solution:**
Three-part reorganization:

1. **Global components in src/components/**
   - Keep: Sidebar.tsx, MobileBottomNav.tsx, AddressAutocomplete.tsx, DisableGrammarly.tsx
   - Organize: ui/, and other global folders
   
2. **Dashboard-specific in src/app/(app)/dashboard/_components/**
   - Move: mobile-chat-interface.tsx
   - Move: virtual-assistant.tsx
   - Move: voice-debug-panel.tsx
   
3. **Marketing-specific in src/app/(marketing)/_components/**
   - Move: roi-calculator.tsx

**Time to Fix:** 3-4 hours (mostly moving files and updating imports)

---

### Finding 6: High - No Private Component Folders

**Location:** Feature route groups  
**Severity:** HIGH

**Current Problem:**
No private `_components` folders exist at the feature level. All feature-specific components are either:
1. At root in /components/ (wrong location)
2. In subfolders of /components/ (partially organized)

**Missing Private Folders:**
```
MISSING: /app/(app)/dashboard/_components/
MISSING: /app/(app)/dashboard/assistant/_components/
MISSING: /app/(app)/dashboard/care-coordination/_components/
MISSING: /app/(app)/dashboard/claims/_components/
MISSING: /app/(admin)/admin/_components/
MISSING: /app/(marketing)/_components/
```

**Why It Matters:**
- Private folders keep feature-specific code near the feature
- Prevents accidental imports from other features
- Makes components discoverable in their context
- Aligns with Next.js best practices
- Improves code organization

**Solution:**
Create private folders for each major feature section and move components there.

**Time to Fix:** 2-3 hours

---

### Finding 7: High - Missing Route-Level Error Boundaries

**Location:** Route groups (admin, app, marketing)  
**Severity:** HIGH

**Current Problem:**
Dashboard has a layout.tsx but no error.tsx. Admin and marketing route groups have no error boundaries.

**Missing Files:**
- /app/(app)/dashboard/error.tsx
- /app/(admin)/error.tsx
- /app/(marketing)/error.tsx

**Consequence:**
If an error occurs in any of these sections, it bubbles up to the root error.tsx (which doesn't exist) and causes the entire page to break.

**Solution:**
Add error.tsx files at each route group level. See MIGRATION_CHECKLIST.md for implementation.

**Time to Fix:** 1-2 hours

---

## Specific Violations with Examples

### Violation 1: App at Root Instead of src/

**Current:**
```
/arthur-health/app/
```

**Should Be:**
```
/arthur-health/src/app/
```

**File Example:**
- Current: `/app/layout.tsx`
- Target: `/src/app/layout.tsx`

**Files Affected:** 100+ files (entire app directory)

---

### Violation 2: Components at Root Instead of src/

**Current:**
```
/arthur-health/components/
├── ui/
├── Sidebar.tsx
├── virtual-assistant.tsx (WRONG LOCATION)
├── mobile-chat-interface.tsx (WRONG LOCATION)
└── ...
```

**Should Be:**
```
/arthur-health/src/components/
├── ui/
├── Sidebar.tsx
└── global-only components

/arthur-health/src/app/(app)/dashboard/_components/
├── virtual-assistant.tsx
├── mobile-chat-interface.tsx
└── ...
```

---

### Violation 3: TypeScript Path Alias

**Current tsconfig.json:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Problem:** Points to root, will break after src/ migration

**Should Be:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### Violation 4: Tailwind Content Paths

**Current tailwind.config.ts (lines 4-7):**
```typescript
content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',      // WRONG: No pages/ directory
  './components/**/*.{js,ts,jsx,tsx,mdx}', // WRONG: Will be in src/
  './app/**/*.{js,ts,jsx,tsx,mdx}',        // WRONG: Will be in src/
],
```

**Should Be:**
```typescript
content: [
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
],
```

---

### Violation 5: Missing error.tsx

**Current:** No error boundaries anywhere

**Should Have:**
```
/src/app/error.tsx                         (Global)
/src/app/(app)/dashboard/error.tsx         (Dashboard)
/src/app/(admin)/error.tsx                 (Admin)
/src/app/(marketing)/error.tsx             (Marketing)
```

**Example Implementation:**
```typescript
// /src/app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

---

### Violation 6: Missing not-found.tsx

**Current:** No custom 404 page

**Should Have:**
```
/src/app/not-found.tsx
```

**Example Implementation:**
```typescript
// /src/app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  )
}
```

---

## Recommendations

### Immediate (Critical Path)

1. **Create src/ directory structure** (3-4 hours)
   - Create /src/ folder
   - Move app/, components/, lib/, hooks/, contexts/ into src/
   - This is the biggest change, but must be done first

2. **Update configuration files** (10-15 minutes)
   - Update tsconfig.json: `"@/*": ["./src/*"]`
   - Update tailwind.config.ts content paths

3. **Add special error/loading files** (2-3 hours)
   - error.tsx at: root, dashboard, admin, marketing
   - not-found.tsx at: root
   - loading.tsx at: dashboard (optional)

4. **Create private _components folders** (2-3 hours)
   - dashboard/_components/
   - admin/_components/
   - marketing/_components/

5. **Update imports** (3-4 hours)
   - All imports using @/ should work unchanged
   - Some relative imports may need adjustment
   - Run tests to verify

---

### Phase Planning

**Phase 1 (2-3 hours): Add Special Files**
- Add error.tsx files
- Add not-found.tsx
- Add loading.tsx
- Can be done before moving directories

**Phase 2 (3-4 hours): Migrate to src/**
- Create src/ directory
- Move directories
- Major structural change

**Phase 3 (1-2 hours): Update Configurations**
- Update tsconfig.json
- Update tailwind.config.ts
- Critical for imports to work

**Phase 4 (2-3 hours): Create Private Folders**
- Create _components folders
- Move feature-specific components
- Reorganize code

**Phase 5 (3-4 hours): Update Imports & Test**
- Verify all imports work
- Run full test suite
- Check all routes
- Fix any remaining issues

---

### Testing Checklist

After each phase, verify:
- [ ] Build completes without errors
- [ ] TypeScript compiles without errors
- [ ] All routes are accessible
- [ ] Styles load correctly (Tailwind)
- [ ] No console errors
- [ ] Error boundaries work (try visiting /nonexistent)
- [ ] Loading states work (check dashboard)

---

### Risk Mitigation

**Highest Risk Areas:**
1. Moving directories (could break imports)
2. Updating configuration files (wrong paths break everything)

**Mitigation:**
- Do in git with frequent commits
- Test after each phase
- Use git branch for safe experimentation
- Have rollback plan ready

---

### Success Criteria

After migration is complete:

```
✓ src/ directory exists with all app code
✓ Root config files only (no app code at root)
✓ error.tsx at: root, dashboard, admin, marketing
✓ not-found.tsx at root
✓ loading.tsx at dashboard
✓ _components folders for all features
✓ Components organized into global vs feature-specific
✓ TypeScript path alias: "@/*": ["./src/*"]
✓ Tailwind content paths point to src/
✓ All imports use @/ alias
✓ No ../../../ relative imports
✓ Build succeeds
✓ Tests pass
✓ All routes work
✓ Error boundaries working
```

---

## Conclusion

The arthur_health project has a good foundation with proper route groups and API organization, but lacks the architectural pattern of the src/ directory and error boundary implementation. The 5-phase migration will bring it into compliance with the Next.js 16 standards and Stellar Framework pattern.

**Total Effort:** 11-16 hours  
**Complexity:** Medium (straightforward but requires careful execution)  
**Risk:** Medium (mitigated by git and testing)  
**Timeline:** 2-4 days

See **MIGRATION_CHECKLIST.md** for detailed step-by-step instructions.

