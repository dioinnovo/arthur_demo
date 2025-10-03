import { BrandConfig } from '../types/brand'
import { ARTHUR_PRIMARY, ARTHUR_SECONDARY, ARTHUR_SUCCESS } from './colors'

export const ARTHUR_BRAND: BrandConfig = {
  name: 'Arthur Health',
  logo: '/images/arthur_health_logo.png',
  colors: {
    primary: ARTHUR_PRIMARY, // #0066CC - Primary blue for CTAs and key elements
    secondary: ARTHUR_SECONDARY, // #00A3FF - Light blue for secondary elements
    success: ARTHUR_SUCCESS // #00A651 - Green for positive outcomes
  },
  ai: {
    name: 'ARTHUR',
    persona: 'Artificial Resource for Thoughtful Healthcare Understanding & Response - Your intelligent care coordination assistant specializing in value-based care management, patient journey optimization, clinical workflows, and care quality improvement. Leverages data-driven insights to enhance care delivery and reduce costs.'
  }
}

// Legacy compatibility export
export const SCC_BRAND = ARTHUR_BRAND