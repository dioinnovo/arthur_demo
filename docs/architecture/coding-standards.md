# Coding Standards - SCC Dashboard

## Overview
These are the coding standards for the SCC Dashboard rebrand project. Follow these patterns consistently.

## Technology Stack
- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript 5.x
- **UI Library**: React 19.1.1
- **Styling**: Tailwind CSS 3.4.17 with CSS custom properties
- **Components**: shadcn/ui with Radix UI primitives
- **State**: React hooks (useState, useReducer, useContext)

## Code Style Guidelines

### TypeScript
- Use TypeScript strict mode
- Prefer interfaces over types for object shapes
- Export types/interfaces from the file where they're primarily used
- Use explicit return types for functions

### React Components
- Use functional components with hooks
- Use `'use client'` directive only when needed
- Keep components small and focused (single responsibility)
- Place components in logical folders within `components/`

### File Naming
- Components: PascalCase (e.g., `ScottChat.tsx`)
- Utilities: camelCase (e.g., `formatCurrency.ts`)
- Config/Constants: kebab-case (e.g., `scc-config.ts`)
- Types/Interfaces: PascalCase with descriptive names

### Imports
- Use absolute imports with `@/` prefix
- Group imports: React, Next, third-party, local components, utils, types
- Keep imports organized and remove unused ones

### Tailwind CSS
- Use Tailwind utility classes as primary styling method
- Use `cn()` utility for conditional classes
- Keep custom CSS minimal (only in globals.css)
- Use SCC brand colors: `scc-red`, `scc-gray`, `scc-success`

### Component Structure
```typescript
'use client' // Only if needed

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ComponentProps } from '@/types'

interface MyComponentProps {
  // Props definition
}

export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // Hooks first
  const [state, setState] = useState()

  // Event handlers
  const handleClick = () => {
    // Logic
  }

  // Render
  return (
    <div className={cn('base-classes', conditional && 'conditional-classes')}>
      {/* Content */}
    </div>
  )
}
```

### API Routes
- Use Next.js App Router conventions
- Place in `app/api/` directory
- Return proper status codes
- Handle errors gracefully

### Error Handling
- Use try-catch blocks for async operations
- Provide meaningful error messages
- Log errors appropriately
- Show user-friendly error states

### Performance
- Use dynamic imports for large components
- Implement proper loading states
- Optimize images with Next.js Image component
- Use React.memo() for expensive components when needed

## SCC Brand Requirements
- Primary Color: SCC Red (#C8102E)
- Secondary Color: SCC Gray (#707070)
- Success Color: SCC Green (#00A651)
- Font: Montserrat
- AI Assistant: SCOTT (not Stella)
- Focus: Commercial property (not residential)

## Testing Approach
- Test critical user paths
- Ensure brand consistency
- Validate form inputs
- Check responsive design
- Test dark/light modes

## Accessibility
- Use semantic HTML
- Include proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios
- Provide alt text for images

## Git Conventions
- Clear, descriptive commit messages
- Feature branches from main
- Test before committing
- No console.logs in production code