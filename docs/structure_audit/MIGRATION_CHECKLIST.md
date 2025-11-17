# Arthur Health - Next.js 16 Migration Checklist

**Document:** Step-by-step migration guide  
**Total Duration:** 11-16 hours  
**Recommended Schedule:** 2-3 days  
**Last Updated:** November 16, 2025

---

## Table of Contents

1. [Pre-Migration Checklist](#pre-migration-checklist)
2. [Phase 1: Add Special Files](#phase-1-add-special-files)
3. [Phase 2: Migrate to src/ Directory](#phase-2-migrate-to-src-directory)
4. [Phase 3: Implement Private Folders](#phase-3-implement-private-folders)
5. [Phase 4: Update Configurations](#phase-4-update-configurations)
6. [Phase 5: Update Imports & Test](#phase-5-update-imports--test)
7. [Testing Checklist](#testing-checklist)
8. [Troubleshooting](#troubleshooting)
9. [Rollback Plan](#rollback-plan)

---

## Pre-Migration Checklist

Before starting any migration, complete these preparation steps:

### Documentation & Communication
- [ ] Read STRUCTURE_AUDIT_REPORT.md completely
- [ ] Understand all five phases
- [ ] Plan time for uninterrupted work (at least 3-4 hours per phase)
- [ ] Inform team members if in shared environment
- [ ] Ensure you have write access to repository

### Backup & Safety
- [ ] Ensure all changes are committed to main branch
  ```bash
  git status  # Should show "working tree clean"
  ```
- [ ] Create a backup branch for the migration
  ```bash
  git branch migration-backup main
  git branch migration-working main
  git checkout migration-working
  ```
- [ ] Verify you can revert if needed
  ```bash
  git log --oneline | head -5  # See recent commits
  ```

### Local Environment
- [ ] npm packages are up to date
  ```bash
  npm install
  ```
- [ ] Development server starts without errors
  ```bash
  npm run dev
  # Wait for "Local: http://localhost:3000"
  # Then Ctrl+C to stop
  ```
- [ ] Build completes successfully
  ```bash
  npm run build
  ```

### IDE & Tools
- [ ] IDE (VSCode, etc) is open with the project
- [ ] TypeScript is properly configured
- [ ] ESLint works (optional but helpful)
- [ ] Terminal is ready for commands

---

## Phase 1: Add Special Files

**Duration:** 2-3 hours  
**Risk Level:** LOW  
**Dependency:** None (can be done before other changes)

### Why Phase 1 First?

Special files (error.tsx, loading.tsx, not-found.tsx) can be added before moving directories. This gives us early error boundary protection and can be committed separately.

### Step 1.1: Create Global Error Boundary

Create `/app/error.tsx`:

```typescript
// /app/error.tsx
'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service in production
    console.error('Application Error:', error)
  }, [error])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#fff',
    }}>
      <div style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
          Something went wrong!
        </h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
          We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.
        </p>
        <button
          onClick={() => reset()}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#0066CC',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
```

**Checklist for Step 1.1:**
- [ ] File created at `/app/error.tsx`
- [ ] File contains 'use client' directive
- [ ] Error and reset parameters accepted
- [ ] Basic UI rendered
- [ ] Commit with: `git add . && git commit -m "Add global error boundary"`

---

### Step 1.2: Create Global Not Found Page

Create `/app/not-found.tsx`:

```typescript
// /app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#fff',
    }}>
      <div style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
          404
        </h1>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
          Page Not Found
        </h2>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
          The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link href="/" style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#0066CC',
          color: 'white',
          borderRadius: '4px',
          textDecoration: 'none',
          display: 'inline-block',
        }}>
          Go Home
        </Link>
      </div>
    </div>
  )
}
```

**Checklist for Step 1.2:**
- [ ] File created at `/app/not-found.tsx`
- [ ] No 'use client' directive needed
- [ ] Returns 404 UI
- [ ] Link to home page included
- [ ] Commit with: `git add . && git commit -m "Add global 404 not found page"`

---

### Step 1.3: Add Dashboard Error Boundary

Create `/app/(app)/dashboard/error.tsx`:

```typescript
// /app/(app)/dashboard/error.tsx
'use client'

import { useEffect } from 'react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Dashboard Error:', error)
  }, [error])

  return (
    <div style={{
      padding: '40px 20px',
      textAlign: 'center',
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
        Dashboard Error
      </h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        {error.message || 'An unexpected error occurred in the dashboard.'}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0066CC',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Try Again
      </button>
    </div>
  )
}
```

**Checklist for Step 1.3:**
- [ ] File created at `/app/(app)/dashboard/error.tsx`
- [ ] Has 'use client' directive
- [ ] Handles dashboard-specific errors
- [ ] Commit with: `git add . && git commit -m "Add dashboard error boundary"`

---

### Step 1.4: Add Admin Error Boundary

Create `/app/(admin)/error.tsx`:

```typescript
// /app/(admin)/error.tsx
'use client'

import { useEffect } from 'react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Admin Error:', error)
  }, [error])

  return (
    <div style={{
      padding: '40px 20px',
      textAlign: 'center',
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
        Admin Error
      </h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        {error.message || 'An unexpected error occurred in the admin area.'}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0066CC',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Try Again
      </button>
    </div>
  )
}
```

**Checklist for Step 1.4:**
- [ ] File created at `/app/(admin)/error.tsx`
- [ ] Has 'use client' directive
- [ ] Commit with: `git add . && git commit -m "Add admin error boundary"`

---

### Step 1.5: Add Marketing Error Boundary

Create `/app/(marketing)/error.tsx`:

```typescript
// /app/(marketing)/error.tsx
'use client'

import { useEffect } from 'react'

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Marketing Error:', error)
  }, [error])

  return (
    <div style={{
      padding: '40px 20px',
      textAlign: 'center',
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
        Something Went Wrong
      </h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        We're sorry. Please try again.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0066CC',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Try Again
      </button>
    </div>
  )
}
```

**Checklist for Step 1.5:**
- [ ] File created at `/app/(marketing)/error.tsx`
- [ ] Commit with: `git add . && git commit -m "Add marketing error boundary"`

---

### Step 1.6: (Optional) Add Dashboard Loading State

Create `/app/(app)/dashboard/loading.tsx`:

```typescript
// /app/(app)/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #0066CC',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px',
        }} />
        <p style={{ color: '#666', fontSize: '16px' }}>Loading dashboard...</p>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
```

**Checklist for Step 1.6:**
- [ ] File created at `/app/(app)/dashboard/loading.tsx` (OPTIONAL)
- [ ] Commit with: `git add . && git commit -m "Add dashboard loading state"`

---

### Phase 1 Summary

**Files Added:**
- [ ] /app/error.tsx
- [ ] /app/not-found.tsx
- [ ] /app/(app)/dashboard/error.tsx
- [ ] /app/(admin)/error.tsx
- [ ] /app/(marketing)/error.tsx
- [ ] /app/(app)/dashboard/loading.tsx (optional)

**Total: 5-6 new files**

**Testing Phase 1:**
```bash
npm run dev
# Visit http://localhost:3000/nonexistent
# Should show custom 404 page

# Visit dashboard
# Should show loading state briefly, then dashboard

# Trigger an error in code
# Should show error boundary with "Try Again" button
```

**Commit Summary:**
```bash
git log --oneline | head -6
# Should show 5-6 commits about adding boundaries
```

---

## Phase 2: Migrate to src/ Directory

**Duration:** 3-4 hours  
**Risk Level:** MEDIUM (largest structural change)  
**Dependency:** Phase 1 (recommended but not required)

**WARNING:** This is the biggest structural change. Follow carefully. Commit frequently.

### Step 2.1: Create src/ Directory

```bash
# Create the src directory
mkdir -p /Users/diodelahoz/Projects/arthur_health/src

# Verify it was created
ls -la /Users/diodelahoz/Projects/arthur_health/src
```

**Checklist for Step 2.1:**
- [ ] Directory created at /src/
- [ ] Is empty (no files inside yet)

---

### Step 2.2: Move app/ Directory

This is the largest move. Be careful.

```bash
# VERIFY current state
ls -la /Users/diodelahoz/Projects/arthur_health/ | grep "^d"

# MOVE the directory
mv /Users/diodelahoz/Projects/arthur_health/app \
   /Users/diodelahoz/Projects/arthur_health/src/app

# VERIFY it moved correctly
ls -la /Users/diodelahoz/Projects/arthur_health/src/app/
ls -la /Users/diodelahoz/Projects/arthur_health/app/  # Should not exist
```

**Checklist for Step 2.2:**
- [ ] app/ directory moved from root to src/
- [ ] /src/app/ contains all expected files
- [ ] /app/ no longer exists at root
- [ ] Error/loading files still exist in /src/app/
- [ ] Commit with: `git add . && git commit -m "Move app directory to src/"`

---

### Step 2.3: Move components/ Directory

```bash
# MOVE the directory
mv /Users/diodelahoz/Projects/arthur_health/components \
   /Users/diodelahoz/Projects/arthur_health/src/components

# VERIFY
ls -la /Users/diodelahoz/Projects/arthur_health/src/components/
```

**Checklist for Step 2.3:**
- [ ] components/ moved to src/
- [ ] /src/components/ contains all files
- [ ] Commit with: `git add . && git commit -m "Move components directory to src/"`

---

### Step 2.4: Move lib/ Directory

```bash
# MOVE the directory
mv /Users/diodelahoz/Projects/arthur_health/lib \
   /Users/diodelahoz/Projects/arthur_health/src/lib

# VERIFY
ls -la /Users/diodelahoz/Projects/arthur_health/src/lib/
```

**Checklist for Step 2.4:**
- [ ] lib/ moved to src/
- [ ] Commit with: `git add . && git commit -m "Move lib directory to src/"`

---

### Step 2.5: Move hooks/ Directory

```bash
# MOVE the directory
mv /Users/diodelahoz/Projects/arthur_health/hooks \
   /Users/diodelahoz/Projects/arthur_health/src/hooks

# VERIFY
ls -la /Users/diodelahoz/Projects/arthur_health/src/hooks/
```

**Checklist for Step 2.5:**
- [ ] hooks/ moved to src/
- [ ] Commit with: `git add . && git commit -m "Move hooks directory to src/"`

---

### Step 2.6: Move contexts/ Directory

```bash
# MOVE the directory
mv /Users/diodelahoz/Projects/arthur_health/contexts \
   /Users/diodelahoz/Projects/arthur_health/src/contexts

# VERIFY
ls -la /Users/diodelahoz/Projects/arthur_health/src/contexts/
```

**Checklist for Step 2.6:**
- [ ] contexts/ moved to src/
- [ ] Commit with: `git add . && git commit -m "Move contexts directory to src/"`

---

### Step 2.7: Verify Directory Structure

After all moves, verify the structure:

```bash
# Should show src/ with all moved directories
ls -la /Users/diodelahoz/Projects/arthur_health/src/

# Should show:
# drwxr-xr-x  app/
# drwxr-xr-x  components/
# drwxr-xr-x  contexts/
# drwxr-xr-x  hooks/
# drwxr-xr-x  lib/
```

**Checklist for Step 2.7:**
- [ ] src/ contains: app/, components/, contexts/, hooks/, lib/
- [ ] Root no longer has these directories
- [ ] Root still has: public/, docs/, prisma/, etc. (untouched)

---

### Phase 2 Summary

**Directories Moved:**
- [ ] app/ → src/app/
- [ ] components/ → src/components/
- [ ] lib/ → src/lib/
- [ ] hooks/ → src/hooks/
- [ ] contexts/ → src/contexts/

**Root Structure After Phase 2:**
```
arthur-health/
├── src/              (NEW - contains all app code)
├── public/           (unchanged)
├── docs/             (unchanged)
├── prisma/           (unchanged)
├── experimental/     (unchanged)
├── scripts/          (unchanged)
├── tests/            (unchanged)
├── next.config.js    (unchanged - WILL FIX IN PHASE 4)
├── tsconfig.json     (unchanged - WILL FIX IN PHASE 4)
└── tailwind.config.ts (unchanged - WILL FIX IN PHASE 4)
```

---

## Phase 3: Implement Private Folders

**Duration:** 2-3 hours  
**Risk Level:** LOW  
**Dependency:** Phase 2 (src/ must exist)

### Step 3.1: Create Dashboard Private Components

```bash
# Create dashboard _components folder
mkdir -p /Users/diodelahoz/Projects/arthur_health/src/app/\(app\)/dashboard/_components

# Create assistant-specific folder
mkdir -p /Users/diodelahoz/Projects/arthur_health/src/app/\(app\)/dashboard/assistant/_components

# Create care-coordination-specific folder
mkdir -p /Users/diodelahoz/Projects/arthur_health/src/app/\(app\)/dashboard/care-coordination/_components

# Create claims-specific folder
mkdir -p /Users/diodelahoz/Projects/arthur_health/src/app/\(app\)/dashboard/claims/_components
```

**Checklist for Step 3.1:**
- [ ] dashboard/_components/ created
- [ ] assistant/_components/ created
- [ ] care-coordination/_components/ created
- [ ] claims/_components/ created
- [ ] Commit with: `git add . && git commit -m "Create dashboard feature-specific component folders"`

---

### Step 3.2: Create Admin Private Components

```bash
# Create admin _components folder
mkdir -p /Users/diodelahoz/Projects/arthur_health/src/app/\(admin\)/admin/_components
```

**Checklist for Step 3.2:**
- [ ] admin/_components/ created
- [ ] Commit with: `git add . && git commit -m "Create admin feature-specific component folder"`

---

### Step 3.3: Create Marketing Private Components

```bash
# Create marketing _components folder
mkdir -p /Users/diodelahoz/Projects/arthur_health/src/app/\(marketing\)/_components
```

**Checklist for Step 3.3:**
- [ ] (marketing)/_components/ created
- [ ] Commit with: `git add . && git commit -m "Create marketing feature-specific component folder"`

---

### Step 3.4: Move Dashboard-Specific Components

Move these feature-specific components to dashboard/_components/:

```bash
# Files to move (from src/components/ to src/app/(app)/dashboard/_components/)
mv /Users/diodelahoz/Projects/arthur_health/src/components/mobile-chat-interface.tsx \
   /Users/diodelahoz/Projects/arthur_health/src/app/\(app\)/dashboard/_components/

mv /Users/diodelahoz/Projects/arthur_health/src/components/virtual-assistant.tsx \
   /Users/diodelahoz/Projects/arthur_health/src/app/\(app\)/dashboard/_components/

mv /Users/diodelahoz/Projects/arthur_health/src/components/voice-debug-panel.tsx \
   /Users/diodelahoz/Projects/arthur_health/src/app/\(app\)/dashboard/_components/
```

**Files Moved:**
- [ ] mobile-chat-interface.tsx
- [ ] virtual-assistant.tsx
- [ ] voice-debug-panel.tsx

**Checklist for Step 3.4:**
- [ ] All 3 files moved to dashboard/_components/
- [ ] Commit with: `git add . && git commit -m "Move dashboard-specific components to private folder"`

---

### Step 3.5: Move Marketing-Specific Components

```bash
# Move roi-calculator to marketing components
mv /Users/diodelahoz/Projects/arthur_health/src/components/roi-calculator.tsx \
   /Users/diodelahoz/Projects/arthur_health/src/app/\(marketing\)/_components/
```

**Checklist for Step 3.5:**
- [ ] roi-calculator.tsx moved to (marketing)/_components/
- [ ] Commit with: `git add . && git commit -m "Move marketing-specific components to private folder"`

---

### Step 3.6: Verify Component Organization

After moves, verify structure:

```bash
# Should show only global components in src/components/
ls -la /Users/diodelahoz/Projects/arthur_health/src/components/

# Should NOT contain (already moved):
# - mobile-chat-interface.tsx
# - virtual-assistant.tsx
# - voice-debug-panel.tsx
# - roi-calculator.tsx

# Should contain:
# - Sidebar.tsx
# - MobileBottomNav.tsx
# - AddressAutocomplete.tsx
# - DisableGrammarly.tsx
# - ui/
# - assistant/ (feature folder for reusable assistant components)
# - care-coordination/ (feature folder)
# - etc.
```

**Checklist for Step 3.6:**
- [ ] src/components/ only has global components
- [ ] Feature-specific components moved to _components folders
- [ ] src/app/(app)/dashboard/_components/ has moved files
- [ ] src/app/(marketing)/_components/ has moved files

---

### Phase 3 Summary

**Folders Created:**
- [ ] src/app/(app)/dashboard/_components/
- [ ] src/app/(app)/dashboard/assistant/_components/
- [ ] src/app/(app)/dashboard/care-coordination/_components/
- [ ] src/app/(app)/dashboard/claims/_components/
- [ ] src/app/(admin)/admin/_components/
- [ ] src/app/(marketing)/_components/

**Files Moved:**
- [ ] mobile-chat-interface.tsx
- [ ] virtual-assistant.tsx
- [ ] voice-debug-panel.tsx
- [ ] roi-calculator.tsx

---

## Phase 4: Update Configurations

**Duration:** 1-2 hours  
**Risk Level:** LOW (but critical for next phase)  
**Dependency:** Phase 2 (src/ must exist)

### Step 4.1: Update TypeScript Configuration

Edit `/Users/diodelahoz/Projects/arthur_health/tsconfig.json`:

Find this section (around line 28):
```json
"paths": {
  "@/*": ["./*"]
}
```

Change to:
```json
"paths": {
  "@/*": ["./src/*"]
}
```

**Checklist for Step 4.1:**
- [ ] tsconfig.json updated
- [ ] Path changed from `"./"` to `"./src/*"`
- [ ] No other changes made to tsconfig.json
- [ ] Commit with: `git add tsconfig.json && git commit -m "Update TypeScript paths to point to src/"`

---

### Step 4.2: Update Tailwind Configuration

Edit `/Users/diodelahoz/Projects/arthur_health/tailwind.config.ts`:

Find this section (around line 4-7):
```typescript
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
```

Change to:
```typescript
const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
```

**Explanation of Changes:**
- Remove `'./pages/**/*'` - This directory doesn't exist in App Router
- Change `'./components/**/*'` to `'./src/components/**/*'` - Components now in src/
- Change `'./app/**/*'` to `'./src/app/**/*'` - App now in src/

**Checklist for Step 4.2:**
- [ ] tailwind.config.ts updated
- [ ] Lines 4-7 changed correctly
- [ ] No other changes made
- [ ] Commit with: `git add tailwind.config.ts && git commit -m "Update Tailwind content paths to point to src/"`

---

### Phase 4 Summary

**Files Updated:**
- [ ] tsconfig.json (1 change)
- [ ] tailwind.config.ts (3 changes)

**What Changed:**
- TypeScript path alias now points to src/
- Tailwind knows to look in src/ for class names
- Import paths will resolve correctly after Phase 5

---

## Phase 5: Update Imports & Test

**Duration:** 3-4 hours  
**Risk Level:** MEDIUM (testing is critical)  
**Dependency:** Phases 1-4 (all must be complete)

### Step 5.1: Update Component Imports

Components moved to private folders need import path updates in pages that use them.

**Example - Dashboard using mobile-chat-interface:**

Old import (from src/components/):
```typescript
import { MobileChatInterface } from '@/components/mobile-chat-interface'
```

New import (from private _components):
```typescript
import { MobileChatInterface } from '@/app/(app)/dashboard/_components/mobile-chat-interface'
// OR use relative import:
import { MobileChatInterface } from './_components/mobile-chat-interface'
```

**Find all files that import moved components:**
```bash
grep -r "from ['\"]@/components/mobile-chat-interface" /Users/diodelahoz/Projects/arthur_health/src/
grep -r "from ['\"]@/components/virtual-assistant" /Users/diodelahoz/Projects/arthur_health/src/
grep -r "from ['\"]@/components/voice-debug-panel" /Users/diodelahoz/Projects/arthur_health/src/
grep -r "from ['\"]@/components/roi-calculator" /Users/diodelahoz/Projects/arthur_health/src/
```

**Update each file found:**
- Replace the old @/ path with new @/app/... path
- Or use relative imports (simpler)

**Checklist for Step 5.1:**
- [ ] Find all imports of moved components
- [ ] Update each import
- [ ] Commit with: `git add . && git commit -m "Update imports for moved components"`

---

### Step 5.2: Verify Import Paths

Check that all imports are using @/ aliases:

```bash
# Look for problematic relative imports (more than 2 ../)
grep -r "\.\.\/" /Users/diodelahoz/Projects/arthur_health/src/components/ | grep -E "\.\.\/"

# Should show minimal relative imports
# @/ aliases preferred
```

**Checklist for Step 5.2:**
- [ ] No ../../../ relative imports (or very few)
- [ ] Imports using @/ alias preferred
- [ ] All paths resolve correctly

---

### Step 5.3: Build Test

```bash
cd /Users/diodelahoz/Projects/arthur_health

# Clean build cache
rm -rf .next

# Build the project
npm run build

# Should complete without errors
# Look for: "output" or "Build complete"
```

**If build fails:**
- Check error messages carefully
- Most likely: unresolved imports
- Fix imports and try again
- See TROUBLESHOOTING section if stuck

**Checklist for Step 5.3:**
- [ ] `npm run build` completes successfully
- [ ] No TypeScript errors
- [ ] No import errors
- [ ] Commit with: `git add . && git commit -m "Fix imports after migration"`

---

### Step 5.4: Development Server Test

```bash
cd /Users/diodelahoz/Projects/arthur_health

# Start dev server
npm run dev

# Wait for "ready - started server on" message
# Then test in browser
```

**Things to Test:**
- [ ] http://localhost:3000 loads (marketing/landing)
- [ ] http://localhost:3000/dashboard loads (or redirects if protected)
- [ ] http://localhost:3000/admin loads (or redirects)
- [ ] http://localhost:3000/nonexistent shows custom 404
- [ ] Error messages appear in console? (Should be none related to imports)
- [ ] Styles load correctly (Tailwind classes apply)
- [ ] No broken images or missing assets

**Checklist for Step 5.4:**
- [ ] Dev server starts without errors
- [ ] All test URLs load
- [ ] No console errors about imports
- [ ] Styling is correct
- [ ] Commit with: `git add . && git commit -m "Verify dev server works after migration"`

---

### Step 5.5: Route Testing

Test key routes to ensure error boundaries work:

```bash
# In browser, while dev server running:
```

**Test Cases:**

1. Visit marketing route
   - [ ] http://localhost:3000 loads marketing/landing
   - [ ] Navigation works
   - [ ] Styles apply

2. Visit dashboard
   - [ ] http://localhost:3000/dashboard loads
   - [ ] Loading state appears briefly (if you added loading.tsx)
   - [ ] No console errors

3. Visit non-existent page
   - [ ] http://localhost:3000/nonexistent shows custom 404
   - [ ] Has "Go Home" button
   - [ ] Not default Next.js 404

4. Test error boundary (optional - requires intentional error)
   - [ ] Trigger an error in dashboard
   - [ ] Should show error boundary from Step 1.3
   - [ ] "Try Again" button works

**Checklist for Step 5.5:**
- [ ] All routes load correctly
- [ ] Error boundaries work
- [ ] 404 page is custom
- [ ] No navigation issues

---

### Step 5.6: Final Verification

Run complete test suite:

```bash
# Run linting (if configured)
npm run lint  # If command exists

# Check TypeScript
npx tsc --noEmit

# Build again to verify
npm run build
```

**Checklist for Step 5.6:**
- [ ] No TypeScript errors
- [ ] Linting passes (if configured)
- [ ] Build succeeds
- [ ] All previous tests still pass
- [ ] Final commit: `git add . && git commit -m "Complete Phase 5: Migration successful"`

---

## Testing Checklist

After all phases, verify everything works:

### Build & Compilation
- [ ] `npm run build` succeeds
- [ ] `npx tsc --noEmit` passes
- [ ] No console errors during build
- [ ] No TypeScript errors

### Development Server
- [ ] `npm run dev` starts without errors
- [ ] Ready message appears
- [ ] No watch errors

### Routes
- [ ] Homepage loads
- [ ] Dashboard accessible/redirects properly
- [ ] Admin accessible/redirects properly
- [ ] Non-existent route shows custom 404
- [ ] All navigation works

### Error Handling
- [ ] Error boundary catches errors properly
- [ ] Custom 404 page displays
- [ ] Error messages are clear

### Imports & Module Resolution
- [ ] No unresolved import errors
- [ ] @/ aliases work correctly
- [ ] All components load
- [ ] No module not found errors

### Styling
- [ ] Tailwind styles apply correctly
- [ ] No unstyled content flash
- [ ] Colors correct
- [ ] Responsive design works

### File Structure
- [ ] src/ directory exists
- [ ] All directories in src/ (app, components, lib, hooks, contexts)
- [ ] No app/ at root (should be in src/)
- [ ] Private folders created (_components)
- [ ] Configuration files at root (untouched)

### Documentation
- [ ] CLAUDE.md updated to reflect new structure
- [ ] Comments added to error boundaries
- [ ] README reflects new organization (if applicable)

---

## Troubleshooting

### Issue: Build fails with "Module not found"

**Cause:** Import path is incorrect  
**Solution:**
1. Check the error message for which file/import failed
2. Verify file exists at the path
3. Verify path alias is correct: `@/*` → `./src/*`
4. Use relative import if @/ alias isn't working:
   ```typescript
   // Instead of:
   import { Button } from '@/components/ui/button'
   // Try:
   import { Button } from '../../../components/ui/button'
   ```

---

### Issue: Styles are missing (all classes disabled)

**Cause:** Tailwind content paths incorrect  
**Solution:**
1. Check tailwind.config.ts content paths
2. Should be `./src/**/*` NOT `./components/**/*`
3. Stop dev server (Ctrl+C)
4. Delete .next cache: `rm -rf .next`
5. Restart dev server: `npm run dev`

---

### Issue: TypeScript shows "@/" path errors

**Cause:** tsconfig.json not updated  
**Solution:**
1. Check tsconfig.json `paths` setting
2. Should be `"@/*": ["./src/*"]`
3. NOT `"@/*": ["./*"]`
4. Save file
5. IDE may require restart

---

### Issue: Error boundaries not working

**Cause:** 'use client' directive missing  
**Solution:**
1. Check error.tsx files have `'use client'` at top
2. Verify file is in correct location
3. Restart dev server

---

### Issue: Imports still broken after Phase 5

**Cause:** Some imports not updated  
**Solution:**
```bash
# Find all problematic imports
grep -r "from ['\"]@/" /Users/diodelahoz/Projects/arthur_health/src/ | grep -v src/components | grep -v src/lib | grep -v src/app/api

# Search for moved component imports
grep -r "mobile-chat-interface" /Users/diodelahoz/Projects/arthur_health/src/

# Check if file still exists
ls -la /Users/diodelahoz/Projects/arthur_health/src/components/mobile-chat-interface.tsx
# Should NOT exist (should be in _components/)
```

---

## Rollback Plan

If migration goes wrong, revert to backup branch:

```bash
# See current status
git status
git branch -a

# Rollback to before migration
git checkout migration-backup  # OR main if backup deleted

# Or reset to specific commit
git log --oneline | grep "migration\|src"
git reset --hard [commit-hash]
```

**Never panic - Git has the history.**

---

## Completion Checklist

When all phases are complete:

### Phase Completion
- [ ] Phase 1: Special files added (6 commits)
- [ ] Phase 2: Directories moved to src/ (5 commits)
- [ ] Phase 3: Private folders created and populated (4 commits)
- [ ] Phase 4: Configuration files updated (2 commits)
- [ ] Phase 5: Imports updated and tested (multiple commits)

### Verification
- [ ] Build succeeds
- [ ] Dev server works
- [ ] All routes accessible
- [ ] Error boundaries functional
- [ ] Styles load correctly
- [ ] No console errors

### Documentation
- [ ] CLAUDE.md updated with new structure
- [ ] Any team documentation updated
- [ ] README.md reflects new pattern (if applicable)

### Final Steps
- [ ] All changes committed
- [ ] Push to main (or create PR)
- [ ] Delete migration-working branch
- [ ] Keep migration-backup for reference

---

## Summary

**Total Time: 11-16 hours**

Phases:
1. Add Special Files (2-3 hrs) - **DONE FIRST**
2. Migrate to src/ (3-4 hrs) - **LARGEST CHANGE**
3. Private Folders (2-3 hrs) - **COMPONENT ORG**
4. Configurations (1-2 hrs) - **CRITICAL FIXES**
5. Imports & Test (3-4 hrs) - **VERIFICATION**

Follow in order. Test after each phase. Commit frequently.

---

**Questions?** Refer back to STRUCTURE_AUDIT_REPORT.md for why each step matters.

EOF
echo "Created MIGRATION_CHECKLIST.md"
