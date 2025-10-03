# Mandatory QA Checkpoints - SCC Rebrand Project

<!-- Powered by BMAD™ Core -->

## Purpose
These checkpoints MUST be verified before any story can be marked as complete. Dev agents claiming completion without meeting these requirements will have stories reverted to FAILED status.

## **Color Implementation Checkpoints**

### Visual Verification Required
1. **Take screenshot of SCOTT AI sphere/orb**
   - Must show SCC Red (#9A2824) - NOT Stellar Orange (#E74C3C)
   - Submit screenshot as evidence

2. **Take screenshot of chat interface**
   - User messages must use SCC Red (#9A2824)
   - Submit screenshot as evidence

3. **Code audit commands:**
   ```bash
   # MUST return 0 results - any results = FAILED
   grep -r "#E74C3C" components/
   grep -r "bg-.*orange" components/
   grep -r "text-.*orange" components/
   ```

### Mandatory File Checks
- [ ] `components/ui/siri-orb.tsx` - NO #E74C3C allowed
- [ ] `components/virtual-assistant.tsx` - NO #E74C3C allowed
- [ ] `components/MobileBottomNav.tsx` - NO #E74C3C allowed

## **Content Implementation Checkpoints**

### Demo Interface Verification
1. **Take screenshot of demo page**
   - Must show ONLY commercial property options
   - NO "residential" selections visible
   - Submit screenshot as evidence

2. **Code audit commands:**
   ```bash
   # MUST return 0 results - any results = FAILED
   grep -r "residential" app/demo/
   grep -r "home\|house\|dwelling\|family" app/demo/
   ```

### Real SCC Cases Integration
- [ ] Demo must use actual SCC case names (The Shrimp Boat, Cinnamon Shore, etc.)
- [ ] Settlement amounts must match https://strategicclaimconsultants.com/client-results/
- [ ] Property images must be commercial buildings (not houses)

## **Image Implementation Checkpoints**

### Property Image Verification
1. **Take screenshots of ALL property images in app**
   - Must show commercial buildings: restaurants, resorts, office towers
   - NO residential homes, houses, or family properties allowed
   - Submit screenshots as evidence

2. **Image audit commands:**
   ```bash
   # Check for residential image references
   find public/images -name "*home*" -o -name "*house*" -o -name "*residential*"
   ```

## **Theme System Checkpoints**

### Light/Dark Mode Testing
1. **Test theme toggle functionality**
   - Click light/dark mode button - must actually change theme
   - Submit before/after screenshots showing theme change
   - Button must be functional, not decorative

2. **Code audit for theme integration**
   ```bash
   # Root layout MUST include ThemeProvider
   grep -n "ThemeProvider" app/layout.tsx
   # Must return results - 0 results = FAILED
   ```

### Mandatory Theme Requirements
- [ ] `app/layout.tsx` must wrap app with ThemeProvider
- [ ] Theme toggle buttons must actually function
- [ ] Both light and dark themes must render properly

## **AI Personality Checkpoints**

### SCOTT AI Testing
1. **Test AI introduction**
   - Must say: "I'm SCOTT, Strategic Claims Operations & Technical Tracker"
   - NO mention of Stella or residential properties
   - Submit conversation screenshot

2. **Test commercial expertise**
   - Ask: "Help me with my office building damage claim"
   - Response must mention commercial property expertise
   - Submit conversation screenshot

## **FAILURE CONSEQUENCES**

### For Dev Agents:
- Stories marked as FAILED if checkpoints not met
- Must provide actual screenshots/evidence of implementation
- Cannot claim completion without passing ALL checkpoints

### For Scrum Master:
- Will audit random stories for compliance
- Will revert any stories that fail checkpoints
- Will document all failures in story Dev Agent Record

## **EVIDENCE REQUIREMENTS**

### Screenshot Evidence Required:
1. SCOTT AI sphere showing SCC Red color
2. Chat interface with SCC Red user messages
3. Demo page showing ONLY commercial options
4. Property images showing commercial buildings
5. AI conversation showing commercial expertise

### Code Evidence Required:
1. Run grep commands and show 0 results for old colors
2. Run grep commands and show 0 results for residential terms
3. Show actual file changes with SCC colors implemented

## **NO EXCEPTIONS POLICY**

- **Stories cannot be marked complete without evidence**
- **Screenshots are MANDATORY for visual components**
- **Code audits are MANDATORY for technical components**
- **False completion claims will result in story reversion**

---

**This document is binding for all SCC rebrand stories. Compliance is mandatory.**