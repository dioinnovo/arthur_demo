# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Arthur Health Intelligence Platform is a Next.js 15.5.2 application for AI-powered healthcare policy analysis and care coordination. It demonstrates how AI can help healthcare providers understand patient policies, identify coverage gaps, optimize treatment costs, and streamline care coordination through the Arthur AI Assistant.

## Development Commands

### Running the Application
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 15.5.2 with App Router
- **UI**: React 18.2, Tailwind CSS 3.3, shadcn/ui components
- **State Management**: React hooks, Zustand (to be added)
- **Animations**: Framer Motion 11.0
- **AI Integration**: AI SDK (Vercel), ChromaDB for vectors
- **PDF Generation**: @pdfme/generator
- **Data Visualization**: Recharts
- **Healthcare APIs**: Arthur Health CareNexus platform integration

### Project Structure
```
arthur-health/
├── app/                     # Next.js App Router
│   ├── (auth)/             # Authentication routes
│   ├── dashboard/          # Protected dashboard routes
│   │   ├── assistant/      # Arthur AI Assistant interface
│   │   ├── care-coordination/ # Care pathway management
│   │   ├── compliance/     # HIPAA compliance monitoring
│   │   ├── referrals/      # Provider referral management
│   │   └── reports/        # Analytics and insights
│   ├── api/                # API routes
│   ├── demo/               # Interactive demo page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── policy/            # Policy analysis components
│   ├── dashboard/         # Dashboard components
│   └── layout/            # Layout components
├── lib/
│   ├── ai/                # AI service integrations
│   ├── arthur/            # Arthur Health API integration
│   ├── db/                # Database utilities
│   ├── utils/             # Helper functions
│   └── hooks/             # Custom React hooks
├── public/
│   └── images/            # Static images
└── .env.local             # Environment variables
```

### Key Features

1. **Landing Page** (`app/page.tsx`)
   - Hero section with Arthur Health value proposition
   - Healthcare provider benefits showcase
   - AI-powered policy analysis features
   - CareNexus platform integration highlights

2. **Policy Analysis Dashboard** (`app/dashboard/assistant/page.tsx`)
   - Real-time policy interpretation
   - Coverage gap identification
   - Prior authorization automation
   - Treatment cost optimization

3. **Care Coordination** (`app/dashboard/care-coordination/page.tsx`)
   - Intelligent referral management
   - Provider network optimization
   - Care pathway tracking
   - Performance analytics

4. **Interactive Demo** (`app/demo/page.tsx`)
   - Policy upload and analysis wizard
   - Simulated Arthur AI processing
   - Real-time coverage insights
   - Cost optimization recommendations

5. **AI Integration**
   - Arthur AI Assistant for policy queries
   - NLP for policy document analysis
   - Predictive analytics for treatment outcomes
   - Real-time provider network insights

### Environment Variables

Key environment variables in `.env.local`:
- `ANTHROPIC_API_KEY` - Claude API access for Arthur AI
- `OPENAI_API_KEY` - OpenAI API for embeddings
- `ARTHUR_API_ENDPOINT` - Arthur Health API endpoint
- `ARTHUR_API_KEY` - Arthur Health API authentication
- `NEXT_PUBLIC_DEMO_MODE` - Enable demo mode
- `DATABASE_URL` - PostgreSQL connection string

### Design System

- **Colors**:
  - Primary: Arthur Health Blue (#0066CC)
  - Secondary: Healthcare Green (#00A86B)
  - Accent: Trust Purple (#6B46C1)
- **Components**: Using shadcn/ui with healthcare-focused customizations
- **Animations**: Framer Motion for smooth, professional transitions
- **Accessibility**: WCAG 2.1 AA compliant for healthcare requirements

### Demo Mode

The application includes a demo mode (`NEXT_PUBLIC_DEMO_MODE=true`) that:
- Uses mock healthcare policy data
- Simulates Arthur AI analysis
- Shows sample provider networks
- Demonstrates cost optimization scenarios
- Highlights care coordination workflows

### Healthcare Compliance

- **HIPAA Compliance**: All PHI handling follows HIPAA guidelines
- **Data Encryption**: End-to-end encryption for sensitive data
- **Audit Logging**: Comprehensive audit trail for all actions
- **Access Control**: Role-based access control (RBAC)
- **Security**: SOC 2 Type II compliance ready

### Next Steps

To complete the full implementation:
1. Integrate Arthur Health CareNexus API
2. Implement HIPAA-compliant authentication
3. Set up real-time policy analysis engine
4. Add provider network data integration
5. Implement prior authorization workflows
6. Set up care coordination dashboards
7. Add compliance monitoring tools
8. Deploy on HIPAA-compliant infrastructure