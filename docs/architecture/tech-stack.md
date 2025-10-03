# Technology Stack - SCC Dashboard

## Core Framework
- **Next.js 15.5.2**: React framework with App Router
- **React 19.1.1**: UI library
- **TypeScript 5.x**: Type safety

## Styling
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **CSS Custom Properties**: For theming (HSL format for shadcn/ui)
- **Framer Motion 11.0**: Animations and transitions
- **shadcn/ui**: Component library built on Radix UI

## UI Components
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **React Hook Form**: Form handling
- **Recharts**: Data visualization

## AI Integration
- **AI SDK (Vercel)**: Multi-provider AI integration
- **Anthropic Claude**: Primary AI provider
- **OpenAI**: Secondary provider
- **Google Gemini**: Tertiary provider

## Data & State
- **Zustand**: State management (if needed)
- **React Query/TanStack Query**: Server state management
- **Zod**: Schema validation

## Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks (if configured)

## File Upload & Processing
- **React Dropzone**: File uploads
- **PDF.js**: PDF processing
- **@pdfme/generator**: PDF generation

## Authentication (Planned)
- **NextAuth.js**: Authentication solution
- **JWT**: Token management

## Database (Future)
- **Prisma**: ORM
- **PostgreSQL**: Database

## Deployment
- **Vercel**: Preferred deployment platform
- **Docker**: Containerization (optional)

## Testing (Recommended)
- **Jest**: Unit testing
- **React Testing Library**: Component testing
- **Playwright**: E2E testing

## Package Manager
- **npm**: Primary package manager

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive

## Key Dependencies
```json
{
  "next": "15.5.2",
  "react": "19.1.1",
  "react-dom": "19.1.1",
  "typescript": "^5",
  "tailwindcss": "^3.4.17",
  "@radix-ui/react-*": "latest",
  "framer-motion": "^11.0",
  "ai": "latest",
  "@ai-sdk/anthropic": "latest",
  "lucide-react": "latest",
  "recharts": "latest",
  "@pdfme/generator": "latest",
  "zod": "latest"
}
```

## Environment Variables
```env
# AI Providers
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=

# App Config
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_DEMO_MODE=true
```

## Performance Targets
- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Bundle size: Optimized with dynamic imports

## Security Considerations
- Input validation with Zod
- XSS protection (React default)
- CSRF protection (Next.js built-in)
- Secure headers configuration
- API rate limiting (planned)