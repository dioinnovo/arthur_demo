# Arthur Health Platform Migration Guide

## Color System Migration

### Arthur Health Brand Colors

| Color Name | Hex Value | Usage |
|------------|-----------|--------|
| `arthur-primary` | #0066CC | Primary blue - CTAs, headers, key elements |
| `arthur-primary-hover` | #0052A3 | Darker blue for hover states |
| `arthur-secondary` | #00A3FF | Light blue - secondary elements |
| `arthur-tertiary` | #E6F2FF | Very light blue - backgrounds |
| `arthur-success` | #00A651 | Green - positive outcomes, care quality |
| `arthur-warning` | #F59E0B | Amber - care alerts |
| `arthur-error` | #DC2626 | Red - critical alerts |
| `arthur-care` | #4CAF50 | Green - care quality indicators |
| `arthur-risk` | #FF9800 | Orange - risk indicators |

### Healthcare-Specific UI Elements

| Component | Color Usage | Purpose |
|-----------|-------------|---------|
| Policy Status Badges | `arthur-success` / `arthur-warning` / `arthur-error` | Coverage status indicators |
| Provider Network Maps | `arthur-primary` / `arthur-secondary` | Network density visualization |
| Care Coordination Flow | `arthur-care` / `arthur-risk` | Care pathway status |
| Cost Analysis Charts | `arthur-primary` gradient | Financial metrics |
| AI Assistant Interface | `arthur-secondary` accent | Arthur AI interactions |

### Migration from Insurance Claims to Healthcare Context

| Old Context | New Context | Implementation |
|-------------|-------------|----------------|
| Claims Processing | Policy Analysis | Healthcare policy interpretation |
| Property Inspection | Provider Network Analysis | Network adequacy assessment |
| Damage Assessment | Coverage Gap Analysis | Identify missing benefits |
| Settlement Values | Treatment Cost Optimization | Cost-benefit analysis |
| Adjuster Workflow | Care Coordinator Workflow | Care pathway management |

### Key Files Updated

The following key files have been updated for Arthur Health:

1. **Documentation:**
   - README.md - Complete platform overview
   - CLAUDE.md - Development guidance
   - package.json - Project metadata

2. **Branding:**
   - lib/constants/brand.ts - Arthur Health brand configuration
   - lib/constants/colors.ts - Healthcare color palette

3. **Core Features:**
   - app/dashboard/assistant/ - Arthur AI Assistant
   - app/dashboard/care-coordination/ - Care pathway management
   - app/dashboard/compliance/ - HIPAA compliance tools
   - app/dashboard/referrals/ - Provider referral system

### Environment Variables

Update `.env.local` with Arthur Health specific variables:

```env
# Arthur Health API Integration
ARTHUR_API_ENDPOINT=https://api.arthur.health/v1
ARTHUR_API_KEY=your_api_key

# AI Services for Healthcare
ANTHROPIC_API_KEY=your_api_key  # For Arthur AI Assistant
OPENAI_API_KEY=your_api_key     # For embeddings

# Healthcare Database
DATABASE_URL="postgresql://user:password@localhost:5432/arthur_health"

# Application Mode
NEXT_PUBLIC_DEMO_MODE=true  # Set to false for production
NODE_ENV=development        # Set to production when deploying
```

### HIPAA Compliance Considerations

When migrating to production, ensure:

1. **Data Encryption:**
   - Enable TLS 1.2+ for all connections
   - Encrypt PHI at rest using AES-256
   - Use encrypted database connections

2. **Access Control:**
   - Implement role-based access control (RBAC)
   - Enable multi-factor authentication (MFA)
   - Maintain audit logs for all PHI access

3. **Infrastructure:**
   - Deploy on HIPAA-compliant hosting (AWS, Azure, GCP with BAA)
   - Configure security groups and network isolation
   - Implement backup and disaster recovery

### Next Steps

1. Complete AI integration with Arthur Health CareNexus API
2. Implement healthcare-specific workflows
3. Add provider directory integration
4. Set up compliance monitoring
5. Deploy to HIPAA-compliant infrastructure