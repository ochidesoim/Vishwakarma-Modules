# Phase 1: PRD - FINAL VERSION
## VISHWAKARMA Technical Configuration System - UPGRADE SPECIFICATION

---

## 1. CORE PHILOSOPHY (REFINED FOR INVESTOR/RECRUITER AUDIENCE)

**What is this product?**
A high-fidelity space station configuration tool that proves technical competency through accurate systems engineering, financial modeling, and operational planning. This is a **credibility demonstration** that answers: *"Can this team execute on complex aerospace projects?"*

**Target Audience (Priority Order):**
1. **Aerospace Investors:** Need to see financial rigor + technical validity
2. **Aerospace Recruiters/Engineers:** Need to see you understand real constraints
3. **Competition Judges:** Need to see depth beyond surface-level demos

**Success Criteria:**
- **Investor perspective:** "These numbers are defensible. The business model is sound."
- **Engineer perspective:** "The physics is correct. They've done the math."
- **Recruiter perspective:** "This person can build production-grade tools."

**Critical Insight:**
Since specs are **not validated with sources**, we must be transparent about this. The tool's value is in demonstrating **methodology and rigor**, not claiming absolute accuracy. We'll add clear disclaimers and frame it as a "capability demonstration" rather than a "production tool."

---

## 2. UPGRADE REQUIREMENTS (FULL PATH - 3 WEEKS)

### **WEEK 1: TIER 1 - CREDIBILITY FOUNDATION**

#### **U-01: Enhanced Financial Modeling Dashboard**

**Current State:** Basic CAPEX + monthly revenue display  
**Upgrade To:**

**A. Advanced Metrics Panel**
```
FINANCIAL ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total CAPEX:        $1.2B
Monthly Revenue:    $1.85M
Annual Revenue:     $22.2M
Break-Even:         54 months (4.5 years)

10-Year NPV:        $87.3M (@ 10% discount)
IRR:                18.7%
Payback Period:     4.5 years
ROI (10yr):         247%
```

**B. Cash Flow Timeline (Recharts Line Chart)**
- X-axis: Months 0-120 (10 years)
- Y-axis: Cumulative cash flow
- Show: Initial investment dip → break-even crossover → profit accumulation
- Annotations: "Break-even Month 54", "NPV positive Month 68"

**C. Sensitivity Analysis (Interactive Sliders)**
```
SENSITIVITY ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Launch Cost Multiplier:  [0.5x ←—●—→ 2x]
Revenue Achievement:     [50% ←—●—→ 150%]
Discount Rate:          [5% ←—●—→ 15%]
Operating Costs:        [0.5x ←—●—→ 2x]

Impact on NPV: $87.3M → $124.6M (+43%)
Impact on IRR: 18.7% → 24.3% (+5.6pp)
```

**D. Scenario Comparison Table**
| Scenario | NPV (10yr) | IRR | Break-Even |
|----------|-----------|-----|------------|
| Base Case | $87.3M | 18.7% | 54 mo |
| Optimistic (-20% costs) | $142.8M | 26.4% | 42 mo |
| Pessimistic (-30% revenue) | $31.5M | 11.2% | 78 mo |

**Why This Matters:**
- **Investors:** NPV/IRR are standard VC metrics. Shows you speak their language.
- **Engineers:** Sensitivity analysis shows you understand uncertainty.

---

#### **U-02: Mission Timeline & Deployment Planner**

**Current State:** Static configuration only  
**Upgrade To:**

**A. Sequential Deployment Visualization**
```
MISSION TIMELINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Month 0  [▓▓▓▓▓▓] Hub Launch
         └─ Cost: $500M | Mass: 25,000 kg

Month 3  [▓▓▓▓▓▓] Zero-G Lab Launch
         └─ Cost: $270M | Mass: 12,000 kg
         └─ Station Mass: 37,000 kg

Month 6  [░░░░░░] Lab Operational
         └─ Revenue: +$300K/mo

Month 9  [▓▓▓▓▓▓] Manufacturing Fab Launch
         └─ Cost: $330M | Mass: 15,000 kg

Month 12 [░░░░░░] Fab Operational
         └─ Revenue: +$500K/mo (now $800K/mo total)
```

**B. Launch Window Constraints**
- Show orbital mechanics impact: "Next launch window: 14 days"
- Inclination display: "51.6° (ISS-compatible)"
- Note: "Launch windows every 3 months for cost efficiency"

**C. Cumulative Revenue Graph**
- Stacked area chart showing revenue ramp as modules come online
- Overlay CAPEX spending to show cash burn → cash positive transition

**D. Station-Keeping Requirements**
```
ORBITAL MAINTENANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Propellant Usage:  200 kg/month
Reboost Frequency: Every 30-45 days
10-Year Fuel Cost:  24,000 kg → $4.8M
```

**Why This Matters:**
- **Investors:** Shows you understand operational costs beyond CAPEX.
- **Engineers:** Orbital mechanics mentions prove you're not hand-waving physics.

---

#### **U-03: Constraint Validation Hardening + Methodology Transparency**

**Current State:** Basic constraint checks exist  
**Upgrade To:**

**A. Peak vs. Continuous Power Distinction**
```
POWER BUDGET (ENHANCED)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Continuous Load:  38.2 kW / 60 kW  [●●●●●●○○○○] 64%
Peak Load:        67.5 kW / 75 kW  [●●●●●●●●●○] 90%
Battery Reserve:  300 kWh (4.5hr at peak load)

⚠️ Peak load at 90% - limited margin for expansion
✅ Battery capacity sufficient for eclipse periods
```

**B. Cascading Failure Warnings**
- Before removing module: "This will disable 3 dependent modules. Proceed?"
- List affected modules with explanation: "Manufacturing Fab requires crew → requires airlock"

**C. "Why Blocked?" Tooltips**
```
[Module: Data Center] [INSTALL BLOCKED]

❌ Thermal capacity exceeded
   Current: 68 kW | Available: 80 kW
   This module needs: 25 kW
   
   → Add Power Station (+40 kW cooling)
   → Remove Manufacturing Fab (-20 kW load)
```

**D. ⚠️ CRITICAL: Methodology & Assumptions Disclaimer**

Add prominent "About This Model" page:

```
METHODOLOGY & ASSUMPTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ DISCLAIMER: This tool is a CAPABILITY DEMONSTRATION,
not a production planning system. Specifications are 
based on publicly available data, engineering estimates,
and conceptual design assumptions.

MODULE SPECIFICATIONS:
• Masses: Scaled from ISS module data (±20% accuracy)
• Power: Based on comparable terrestrial systems
• Costs: Extrapolated from SpaceX/NASA pricing
• Revenue: Market estimates (high uncertainty)

SOURCES & REFERENCES:
• ISS specs: NASA Technical Reports
• Launch costs: SpaceX Falcon 9 User Guide
• Orbital mechanics: Curtis "Orbital Mechanics for 
  Engineering Students"
• Thermal/power: SMAD (Space Mission Analysis & Design)

KNOWN LIMITATIONS:
• Does not model component failures
• Simplified thermal analysis (no transient effects)
• Revenue estimates have ±50% uncertainty
• Does not account for regulatory/insurance costs

PURPOSE: Demonstrate systems engineering methodology
and technical competency, not provide production specs.
```

**Why This Matters:**
- **Investors:** Honesty about uncertainty builds trust. Shows maturity.
- **Engineers:** Acknowledging limitations = you know what you don't know.
- **Legal:** Protects against claims of misleading investors.

---

#### **U-04: Export & Shareability**

**Current State:** No export functionality  
**Upgrade To:**

**A. PDF Technical Report (jsPDF)**

Generate multi-page document:
```
PAGE 1: Configuration Summary
- 3D/2D diagram of station
- Module list with specs
- Systems status (power, thermal, mass, crew, data)

PAGE 2: Financial Analysis
- NPV, IRR, payback period
- Cash flow chart
- Sensitivity analysis results

PAGE 3: Mission Timeline
- Deployment sequence
- Launch costs breakdown
- Revenue ramp projection

PAGE 4: Constraint Validation
- All systems checks (pass/fail)
- Warnings and recommendations

PAGE 5: Methodology & Disclaimers
- Sources, assumptions, limitations
```

**B. JSON Configuration Export**
```json
{
  "version": "1.0",
  "timestamp": "2026-01-14T10:30:00Z",
  "configuration": {
    "hub": { /* specs */ },
    "bays": {
      "1": null,
      "2": { "type": "zero_g_lab", "status": "active" },
      /* ... */
    },
    "calculated": {
      "total_power": 45.2,
      "npv_10yr": 87300000,
      /* ... */
    }
  }
}
```

**C. Shareable URL (Base64 Compressed)**
```
https://vishwakarma.app/?config=eyJiYXlzIjp7IjIiOiJ6ZXJvX2...

Limitations:
• URL length max: 2048 characters
• If config too large, prompt: "Configuration too complex 
  for URL sharing. Download JSON instead."
```

**D. CSV Export (For Spreadsheet Analysis)**
```csv
Module,Mass,Power_Cont,Power_Peak,Thermal,Revenue,CAPEX
Zero-G Lab,12000,8,15,12,300000,270000000
Manufacturing,15000,12,25,20,500000,330000000
```

**Why This Matters:**
- **Investors:** PDF report = take it to partners, board meetings.
- **Recruiters:** Shows you can build full-featured tools, not just toys.

---

### **WEEK 2: TIER 2 - DIFFERENTIATION**

#### **U-05: 3D Visualization (Three.js)**

**A. Simplified Geometric Model**
- Hub: Central sphere (not detailed, just shape)
- Modules: Color-coded boxes attached to hub
- Solar panels: Simple rectangles extending from hub
- Background: Starfield + Earth in distance

**B. Camera Controls**
- Orbit: Click + drag to rotate
- Zoom: Scroll wheel
- Pan: Right-click + drag
- Reset: Double-click

**C. Center-of-Mass Indicator**
- Yellow sphere showing CoM location
- Red cone pointing from hub center to CoM
- Distance label: "CoM offset: 1.3m (OK)"
- Changes color: Green <1m, Yellow 1-2m, Red >2m

**D. Interactive Highlighting**
- Hover on 2D grid → 3D module glows
- Click on 3D module → Opens detail panel
- Sync between 2D and 3D views

**E. Scale Reference**
- Tiny astronaut figure next to module (for scale)
- Optional grid lines (10m spacing)

**Why This Matters:**
- **Wow Factor:** First 10 seconds of demo = instant credibility
- **Engineers:** Visual CoM validation shows you understand balance

---

#### **U-06: Comparison Mode**

**A. Configuration Slots (3 max)**
```
CONFIGURATION COMPARISON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Config A: Research] [Config B: Manufacturing] [Config C: Balanced]

                      A          B          C
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total CAPEX          $1.2B      $1.5B      $1.8B
Monthly Revenue      $800K      $1.5M      $1.2M
Break-Even           72 mo      48 mo      60 mo
10yr NPV             $45M       $112M      $78M
IRR                  14%        21%        17%

Power Utilization    68%        89%        76%
Thermal Margin       35%        12%        24%
Mass                 87,000kg   124,000kg  105,000kg
```

**B. Visual Diff**
- Green highlight: Better than average
- Red highlight: Worse than average
- Neutral: Average

**C. Trade-Off Analysis**
```
Config A vs Config B:
✅ B has +$67M higher NPV
✅ B breaks even 24 months sooner
❌ B has only 12% thermal margin (risky)
❌ B costs $300M more upfront

Recommendation: Config B IF you can secure funding.
                Config A for conservative approach.
```

**Why This Matters:**
- **Investors:** Shows you can evaluate trade-offs, not just one solution.
- **Engineers:** Demonstrates design iteration thinking.

---

#### **U-07: Configuration Optimization Assistant**

**A. Optimization Modes**
```
OPTIMIZATION ASSISTANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Maximize Revenue] [Minimize Cost] [Balance Risk]

Currently analyzing: "Maximize Revenue"

Suggestions:
1. Replace Bay 4 (Hydroponics) with Data Center
   Impact: +$100K/mo revenue, +$10M CAPEX
   
2. Add Power Station to Bay 7
   Impact: Enables 2 more data centers (+$300K/mo)
   
3. Remove Crew Airlock (no crewed ops needed)
   Impact: -$150M CAPEX, -$50K/mo OPEX

Projected Result:
Revenue: $1.85M → $2.25M/mo (+22%)
NPV:     $87M → $126M (+45%)

[Apply Changes] [Revert]
```

**B. Algorithm Explanation**
- Show step-by-step logic: "Removed lowest ROI module first"
- Display assumptions: "Prioritizing NPV over break-even speed"
- Allow user override: "Keep this module locked"

**C. Constraint-Aware**
- Never suggest configurations that violate physics
- Show warning: "Cannot add 3rd Data Center - thermal limit"

**Why This Matters:**
- **Investors:** Shows algorithmic thinking, not just manual configuration.
- **Engineers:** Proves you can automate design decisions.

---

#### **U-08: Operational Risk Modeling**

**A. Solar Degradation Simulation**
```
10-YEAR POWER AVAILABILITY PROJECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Year 0:  60.0 kW available | 45.2 kW used (75%) ✅
Year 2:  57.0 kW available | 45.2 kW used (79%) ✅
Year 5:  52.5 kW available | 45.2 kW used (86%) ⚠️
Year 10: 45.8 kW available | 45.2 kW used (99%) ❌

⚠️ WARNING: By Year 10, power margin drops to 1%.
   Recommend adding Power Station by Year 5.
```

**B. Component Failure Scenarios**
```
FAILURE MODE ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scenario: Data Center #1 Failure

Immediate Impact:
• Revenue: $1.85M → $1.70M/mo (-8%)
• Power freed: 20 kW
• Thermal freed: 25 kW

Recovery Options:
1. Operate at reduced capacity (-$150K/mo)
2. Launch replacement module ($210M, 3 months)
3. Repurpose spare hardware (if available)

Risk Rating: MEDIUM (triple redundancy mitigates)
```

**C. MTBF (Mean Time Between Failures)**
```
MODULE RELIABILITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Zero-G Lab:      MTBF 60 months  (High reliability)
Manufacturing:   MTBF 36 months  (Moderate - moving parts)
Data Center:     MTBF 48 months  (Moderate)
Power Station:   MTBF 120 months (Very high - solar)

Expected failures over 10 years: 2.3 modules
Recommended spares budget: $150M (contingency)
```

**D. Redundancy Analysis**
```
SINGLE POINT OF FAILURE CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Power: 2x sources (hub solar + power station)
❌ Crew Airlock: Only 1 installed (SPOF)
✅ Data: 3x redundant data centers
⚠️ Cooling: 1 failure → thermal overload

Risk Score: 6.5/10 (Moderate)
Recommendation: Add backup airlock for crew safety
```

**Why This Matters:**
- **Investors:** Shows you understand operational risk = OPEX forecasting.
- **Engineers:** Proves you think beyond "happy path" scenarios.

---

### **WEEK 3: TIER 3 - POLISH & TESTING**

#### **U-09: Advanced Analytics Dashboard**

**A. Sankey Diagram (Power Flow)**
```
Solar Arrays (60kW) ━━━━┳━━━> Zero-G Lab (8kW)
                        ┣━━━> Manufacturing (12kW)
                        ┣━━━> Data Centers (20kW)
                        ┣━━━> Life Support (5kW)
                        ┗━━━> Battery (15kW stored)
```

**B. Thermal Heatmap**
- Color-coded modules by heat generation
- Red = Data Center (25kW), Orange = Manufacturing (20kW), etc.

**C. Crew Time Allocation**
- Pie chart: 40% Lab work, 30% Manufacturing, 20% Maintenance, 10% Downtime

**D. Data Throughput Diagram**
- Uplink/downlink bandwidth usage per module

---

#### **U-10: UI/UX Micro-Improvements**

**A. Smooth Animations**
- Module installation: Fade in + scale up (300ms)
- Constraint violations: Shake animation (200ms)
- Success states: Glow pulse (green, 1s)

**B. Loading States**
- Even if instant, show spinner for 200ms: "Calculating NPV..."
- Progress bar for PDF generation

**C. Keyboard Shortcuts**
```
1-9:  Select bay
Esc:  Deselect / Close panel
Cmd+E: Export PDF
Cmd+S: Save to localStorage
Cmd+Z: Undo last action
```

**D. Sound Effects (Toggleable)**
- Subtle beep on constraint violation
- Success chime on valid installation
- Warning tone on critical error

---

#### **U-11: Educational Mode (Optional)**

**A. Tooltip Explanations**
```
[Thermal Budget] ℹ️

Space is a vacuum - can't use air cooling!
Heat must be radiated away using large radiators.
If thermal capacity exceeded → equipment overheats
→ emergency shutdown → mission failure.
```

**B. Tutorial Overlay (First Visit)**
- Step-by-step guide: "Try installing a module"
- Highlight interactive elements
- Skip button for experienced users

**C. "Learn More" Links**
- Link to NASA ISS specs
- Link to SpaceX Falcon 9 user guide
- Link to SMAD textbook references

---

## 3. ANTI-FEATURES (Updated)

All original anti-features remain, plus:

**AF-10: No Speculative Revenue Claims**
- All revenue numbers labeled as "estimates"
- Sensitivity ranges shown (±50%)
- No guarantees or promises

**AF-11: No Hidden Complexity**
- All calculations explainable
- "Show Math" button reveals formulas
- No magic numbers without justification

**AF-12: No Fake Precision**
- Don't show "$87,342,891.47" → use "$87.3M"
- Acknowledge uncertainty: "±20%"

---

## 4. EDGE CASES (Comprehensive Test Plan)

**WEEK 3 TESTING CHECKLIST:**

### **Configuration Edge Cases**
- [ ] EC-01: Install module without airlock (blocked)
- [ ] EC-02: Remove power station → cascading failure
- [ ] EC-03: Thermal overload (installation blocked)
- [ ] EC-04: Mass imbalance (warn but allow)
- [ ] EC-05: Empty configuration (show hub-only)
- [ ] EC-06: Install 9 identical modules
- [ ] EC-07: Rapid install/remove (state consistency)

### **Financial Edge Cases**
- [ ] EC-08: Zero revenue configuration (NPV = negative)
- [ ] EC-09: Extreme sensitivity slider values (2x cost, 50% revenue)
- [ ] EC-10: Break-even never reached (show "Never" not "Infinity months")

### **Export Edge Cases**
- [ ] EC-11: PDF generation with 0 modules
- [ ] EC-12: PDF generation with all 9 modules
- [ ] EC-13: URL encoding with max complexity
- [ ] EC-14: URL decoding with corrupted data
- [ ] EC-15: JSON export/import round-trip

### **3D Visualization Edge Cases**
- [ ] EC-16: Empty station (show hub only)
- [ ] EC-17: All bays filled (no overlapping geometry)
- [ ] EC-18: Extreme CoM offset (visual indicator works)
- [ ] EC-19: Browser tab backgrounding (animation resume)

### **Comparison Mode Edge Cases**
- [ ] EC-20: Compare 3 identical configs
- [ ] EC-21: Compare vastly different configs
- [ ] EC-22: Delete config while comparing

### **Browser/Performance Edge Cases**
- [ ] EC-23: localStorage full (fallback to session)
- [ ] EC-24: localStorage disabled (warn user)
- [ ] EC-25: Slow network (loading states)
- [ ] EC-26: Small screen (responsive layout)
- [ ] EC-27: Print page (PDF export instead)

---

## 5. CONSTRAINTS (Final)

**Timeline:**
- **Week 1:** Tier 1 (U-01 through U-04) → Deploy v1.1
- **Week 2:** Tier 2 (U-05 through U-08) → Deploy v1.2
- **Week 3:** Tier 3 + Testing → Deploy v2.0 (production)

**Technical:**
- React + TypeScript (type safety for complex state)
- Three.js for 3D (r128 - available in artifacts)
- Recharts for graphs
- jsPDF for reports
- No backend (pure client-side)
- Bundle size target: <3 MB (aggressive optimization)

**Design:**
- Maintain existing aesthetic (dark mode, cyan/orange, monospace)
- Add subtle animations (not distracting)
- Focus on data density (investors scan quickly)

---

## 6. FINAL CRITIQUE: RISKS & MITIGATION

### **RISK 1: Scope Creep (HIGH)**
**Issue:** 3 weeks for 11 major features + polish is aggressive.

**Mitigation:**
- Each tier is independently deployable
- If Week 2 runs late, ship Tier 1 only
- Prioritize ruthlessly: Financial modeling > 3D viz

**Contingency:** If falling behind, cut Tier 3 entirely. U-01 through U-08 is sufficient to impress.

---

### **RISK 2: Unvalidated Specs Undermine Credibility (MEDIUM)**
**Issue:** If investor asks "Where did you get these numbers?" and you say "We guessed," credibility collapses.

**Mitigation:**
- **Mandatory:** Add "Methodology & Assumptions" page (U-03D)
- Frame as "capability demonstration" not "production tool"
- Provide ranges/error bars (Revenue: $300K ±50%/mo)
- Link to sources even if specs are extrapolated

**Contingency:** If challenged, pivot to: "This demonstrates our engineering process. We'd conduct detailed market research before finalizing specs."

---

### **RISK 3: Over-Optimization Loses Human Touch (LOW)**
**Issue:** Too much automation (optimization assistant) might make investors think "Why do we need you if the tool does everything?"

**Mitigation:**
- Frame optimization as "decision support" not "autopilot"
- Always show reasoning: "Here's WHY we suggest this"
- Allow user override: "Lock this module (don't optimize it)"
- Emphasize: Tool assists engineers, doesn't replace them

---

## 7. SUCCESS METRICS (Measurable)

**For Investors:**
- ✅ Can generate PDF report in <30 seconds
- ✅ NPV/IRR calculations match Excel validation
- ✅ "Methodology" page answers skepticism proactively

**For Recruiters:**
- ✅ 3D visualization loads in <2 seconds
- ✅ All edge cases handled gracefully (no crashes)
- ✅ Code is production-quality (TypeScript, tests, documentation)

**For Competition:**
- ✅ Tool runs smoothly during live demo (no lag)
- ✅ Export PDF feature = judges take report with them
- ✅ Comparison mode = shows design iteration thinking

**Minimum Bar to "Win":**
- Investor meeting secured: Tool used in pitch deck
- Recruiter interest: "Can you walk us through how you built this?"
- Competition: Top 3 finish (or "Best Technical Demo" award)

---

## 8. APPROVAL CHECKPOINT

**This PRD defines:**
- ✅ Full 3-week upgrade path (Tiers 1-3)
- ✅ Investor/recruiter focus (financial rigor + technical depth)
- ✅ Transparency about unvalidated specs (methodology page)
- ✅ Comprehensive testing plan (27 edge cases)
- ✅ Risk mitigation strategies (scope creep, credibility, automation)

# Phase 2: App Flow Document (User Journey)
## VISHWAKARMA Technical Configuration System - USER FLOWS

---

## FLOW STRUCTURE NOTATION

```
[STATE] → User Action → {System Response} → [NEW STATE]

✅ Success Path
⚠️ Warning Path
❌ Error Path
🔄 Loop/Iteration
```

---

## MASTER FLOW: APPLICATION LIFECYCLE

```
[ENTRY POINT]
    ↓
[First-Time User] → Load app → {Check localStorage}
    ↓                              ↓
    No saved data              Has saved config
    ↓                              ↓
{Show welcome modal}          {Load last config}
    ↓                              ↓
[Empty Configuration]         [Loaded Configuration]
    ↓                              ↓
    └──────────────┬───────────────┘
                   ↓
         [MAIN INTERFACE]
```

---

## FLOW 1: FIRST-TIME USER ONBOARDING

### **F1.1: Initial Load**

```
[Browser: Landing Page]
    ↓
User opens https://vishwakarma.app
    ↓
{System checks localStorage}
    ↓
    ├─ Found: "visited_before" = true → SKIP to F1.3
    │
    └─ Not found → CONTINUE
         ↓
{Display Welcome Modal}
    ↓
┌─────────────────────────────────────┐
│  VISHWAKARMA v2.0                   │
│  Technical Configuration System      │
│                                      │
│  [Start Tutorial] [Skip to App]     │
│                                      │
│  ⚠️ DISCLAIMER: Capability demo     │
│     See Methodology for details     │
└─────────────────────────────────────┘
    ↓
User choice:
    ├─ [Start Tutorial] → F1.2
    └─ [Skip to App] → F1.3
```

### **F1.2: Tutorial Mode (Optional)**

```
[Tutorial: Step 1]
    ↓
{Highlight module palette}
{Overlay: "Select a module to begin"}
    ↓
User clicks module → {Highlight grid bays}
    ↓
{Overlay: "Click a bay to install"}
    ↓
User clicks Bay 5 → {Install module}
    ↓
{Highlight systems status panel}
{Overlay: "Watch constraints update in real-time"}
    ↓
[Tutorial: Step 2]
    ↓
{Highlight detail panel}
{Overlay: "Click modules for details"}
    ↓
User clicks installed module → {Open detail panel}
    ↓
{Overlay: "Install more modules or export config"}
    ↓
[Tutorial Complete] → {Set localStorage: "visited_before" = true}
    ↓
[Main Interface - Empty Config]
```

### **F1.3: Main Interface Loaded**

```
[Main Interface]
    ↓
{Render 3-column layout}
    ├─ Left: Station View (2D grid + 3D view)
    ├─ Center: Systems Status Dashboard
    └─ Right: Module Palette
    ↓
{Display Hub-Only State}
    ├─ Power: 60 kW available, 0 kW used
    ├─ Thermal: 80 kW capacity, 0 kW used
    ├─ Mass: 25,000 kg
    ├─ Crew: 0/10
    ├─ Revenue: $0/month
    └─ ⚠️ Warning: "No modules installed"
    ↓
[IDLE STATE - Awaiting User Action]
    ↓
User can:
    ├─ F2: Install Module
    ├─ F3: Load Preset
    ├─ F4: Import Configuration
    └─ F9: View Methodology
```

---

## FLOW 2: MODULE INSTALLATION (Core Interaction)

### **F2.1: Module Selection**

```
[Idle State]
    ↓
User clicks module in palette (e.g., "Zero-G Lab")
    ↓
{Module enters "selected" state}
    ├─ Module card highlights (cyan border)
    ├─ Cursor changes to "grab" icon
    └─ Grid bays show availability indicators:
        ├─ ✅ Green: Can install
        ├─ ⚠️ Yellow: Can install with warnings
        └─ ❌ Red: Cannot install (constraint violated)
    ↓
[Module Selected - Hovering]
```

### **F2.2: Bay Preview (Hover State)**

```
[Module Selected]
    ↓
User hovers over Bay 5
    ↓
{Real-time constraint preview}
    ├─ Calculate hypothetical totals:
    │   ├─ Power: 45.2 kW → 53.2 kW
    │   ├─ Thermal: 62.5 kW → 74.5 kW
    │   ├─ Mass: 98,400 kg → 110,400 kg
    │   └─ Crew: 5 → 7
    │
    ├─ Check constraints:
    │   ├─ Power: 53.2 < 60 ✅
    │   ├─ Thermal: 74.5 < 80 ✅
    │   ├─ Mass: 110,400 < 200,000 ✅
    │   ├─ Crew: 7 < 10 ✅
    │   └─ Dependencies: Needs airlock ⚠️
    │
    └─ Display preview tooltip:
        ┌─────────────────────────────┐
        │ Installing Zero-G Lab       │
        │ ✅ Power: OK (+8 kW)        │
        │ ✅ Thermal: OK (+12 kW)     │
        │ ✅ Mass: OK (+12,000 kg)    │
        │ ⚠️ Requires Crew Airlock    │
        │                             │
        │ [Click to Install]          │
        └─────────────────────────────┘
    ↓
User decision:
    ├─ Clicks bay → F2.3 (Install)
    ├─ Hovers different bay → Recalculate preview
    ├─ Clicks elsewhere → F2.4 (Cancel)
    └─ Presses Esc → F2.4 (Cancel)
```

### **F2.3: Installation Execution**

```
[Bay Clicked]
    ↓
{Validate constraints (final check)}
    ↓
    ├─ All constraints OK → CONTINUE
    │
    └─ Constraint violated → F2.5 (Block Installation)
    ↓
{Check for warnings (non-blocking)}
    ↓
    ├─ No warnings → CONTINUE to commit
    │
    └─ Has warnings → {Show warning modal}
         ↓
    ┌─────────────────────────────────┐
    │ ⚠️ WARNING                      │
    │                                  │
    │ This module requires:            │
    │ • Crew Airlock (not installed)   │
    │                                  │
    │ Install anyway? Module will be   │
    │ non-operational until airlock    │
    │ is added.                        │
    │                                  │
    │ [Cancel] [Install Anyway]        │
    └─────────────────────────────────┘
         ↓
    User choice:
         ├─ Cancel → F2.4
         └─ Install Anyway → CONTINUE
    ↓
{Commit installation}
    ├─ Update state: bays[5] = {type: "zero_g_lab", status: "active"}
    ├─ Recalculate all metrics
    ├─ Update systems dashboard
    ├─ Animate module appearance (fade in + scale)
    ├─ Update 3D visualization
    └─ Save to localStorage
    ↓
{Display success feedback}
    ├─ Toast notification: "Zero-G Lab installed in Bay 5"
    ├─ Module glows green (1s)
    └─ Systems status updates with smooth animations
    ↓
[Module Installed - Idle State]
    ↓
User can:
    ├─ Install more modules (F2)
    ├─ View module details (F5)
    ├─ Remove module (F6)
    └─ Export configuration (F7)
```

### **F2.4: Cancel Installation**

```
[Module Selected]
    ↓
User clicks outside grid OR presses Esc
    ↓
{Deselect module}
    ├─ Remove cyan border
    ├─ Reset cursor
    ├─ Clear bay availability indicators
    └─ Hide preview tooltips
    ↓
[Idle State]
```

### **F2.5: Installation Blocked**

```
[Bay Clicked - Constraint Violated]
    ↓
{Block installation}
    ↓
{Show error modal}
    ↓
┌─────────────────────────────────┐
│ ❌ INSTALLATION BLOCKED          │
│                                  │
│ Thermal capacity exceeded        │
│ Current: 68 kW / 80 kW          │
│ This module: +25 kW              │
│ Result: 93 kW (OVER LIMIT)       │
│                                  │
│ Solutions:                       │
│ • Add Power Station (+40 kW)     │
│ • Remove Manufacturing Fab       │
│   (-20 kW)                       │
│                                  │
│ [OK]                            │
└─────────────────────────────────┘
    ↓
User clicks OK
    ↓
{Modal closes}
{Module remains selected}
    ↓
[Module Selected - Can Try Different Bay]
    ↓
User can:
    ├─ Try different bay (loop to F2.2)
    ├─ Follow suggestions (install Power Station first)
    └─ Cancel selection (F2.4)
```

---

## FLOW 3: CONFIGURATION PRESETS

### **F3.1: Load Preset**

```
[Idle State or Any Configuration]
    ↓
User clicks "Presets" button
    ↓
{Show preset modal}
    ↓
┌──────────────────────────────────────┐
│ CONFIGURATION PRESETS                │
│                                       │
│ [Research Station]                   │
│  Focus: Labs + crew support          │
│  Revenue: $800K/mo                   │
│  CAPEX: $1.2B                        │
│                                       │
│ [Manufacturing Hub]                  │
│  Focus: Production + minimal crew    │
│  Revenue: $1.5M/mo                   │
│  CAPEX: $1.5B                        │
│                                       │
│ [Data Fortress]                      │
│  Focus: Computing + cooling          │
│  Revenue: $1.2M/mo                   │
│  CAPEX: $1.4B                        │
│                                       │
│ [Satellite Servicing]                │
│  Focus: Repair + crew operations     │
│  Revenue: Variable (per mission)     │
│  CAPEX: $1.6B                        │
│                                       │
│ [Balanced Commercial]                │
│  Focus: Mixed revenue streams        │
│  Revenue: $1.8M/mo                   │
│  CAPEX: $1.8B                        │
│                                       │
│ [Cancel]                             │
└──────────────────────────────────────┘
    ↓
User selects preset (e.g., "Research Station")
    ↓
    ├─ Current config is empty → F3.2 (Load directly)
    │
    └─ Current config has modules → F3.3 (Confirm overwrite)
```

### **F3.2: Load Preset (Empty Config)**

```
[Preset Selected - Empty Config]
    ↓
{Load preset configuration}
    ├─ Clear current state
    ├─ Install modules per preset:
    │   Bay 2: Zero-G Lab
    │   Bay 4: Health Care
    │   Bay 5: Crew Airlock
    │   Bay 6: Hydroponics
    │   Bay 8: Cargo Bay
    ├─ Recalculate all metrics
    ├─ Animate module installations (sequential, 100ms delay each)
    └─ Update 3D view
    ↓
{Display preset info panel}
    ↓
┌──────────────────────────────────────┐
│ ✅ Research Station Loaded           │
│                                       │
│ Design Rationale:                    │
│ Optimized for scientific research    │
│ with full crew support. Includes     │
│ life support, medical, and sample    │
│ return capabilities.                 │
│                                       │
│ [Dismiss]                            │
└──────────────────────────────────────┘
    ↓
[Configuration Loaded - Idle State]
```

### **F3.3: Overwrite Confirmation**

```
[Preset Selected - Has Current Config]
    ↓
{Show overwrite warning}
    ↓
┌──────────────────────────────────────┐
│ ⚠️ OVERWRITE CURRENT CONFIG?         │
│                                       │
│ Loading this preset will replace     │
│ your current configuration.          │
│                                       │
│ Current: 5 modules, $1.85M/mo        │
│ Preset:  5 modules, $800K/mo         │
│                                       │
│ [Cancel] [Overwrite]                 │
└──────────────────────────────────────┘
    ↓
User choice:
    ├─ Cancel → {Close modal} → [Idle State]
    │
    └─ Overwrite → F3.2 (Load preset)
```

---

## FLOW 4: FINANCIAL ANALYSIS

### **F4.1: View Financial Dashboard**

```
[Any Configuration State]
    ↓
{Financial metrics always visible in systems panel}
    ├─ Monthly Revenue: $1.85M
    ├─ Total CAPEX: $1.2B
    ├─ Break-Even: 54 months
    └─ 10yr NPV: $87.3M
    ↓
User clicks "Financial Analysis" tab/button
    ↓
{Expand financial detail panel}
    ↓
[Financial Dashboard Open]
    ├─ Cash Flow Timeline (Recharts graph)
    ├─ Sensitivity Analysis Sliders
    ├─ Scenario Comparison Table
    └─ Key Metrics Summary
    ↓
User can:
    ├─ F4.2: Adjust Sensitivity Sliders
    ├─ F4.3: View Scenario Comparisons
    └─ F4.4: Export Financial Report
```

### **F4.2: Sensitivity Analysis**

```
[Financial Dashboard Open]
    ↓
User adjusts "Launch Cost Multiplier" slider
    ↓
{Real-time recalculation}
    ├─ Launch costs: $500M → $750M (+50%)
    ├─ Total CAPEX: $1.2B → $1.45B
    ├─ Break-even: 54 mo → 78 mo
    ├─ NPV: $87.3M → $51.8M (-41%)
    └─ IRR: 18.7% → 13.2%
    ↓
{Update all affected displays}
    ├─ Cash flow graph redraws (animated)
    ├─ Metrics update with highlighting (orange = worse)
    └─ Show delta: "NPV: $87.3M → $51.8M (-$35.5M)"
    ↓
[Sensitivity Active]
    ↓
User can:
    ├─ Adjust more sliders (revenue, discount rate, OPEX)
    ├─ Reset to base case (button)
    └─ Export sensitivity report (F7)
```

### **F4.3: Scenario Comparison**

```
[Financial Dashboard Open]
    ↓
{Display pre-calculated scenarios}
    ├─ Base Case (current config)
    ├─ Optimistic (-20% costs, +10% revenue)
    └─ Pessimistic (+30% costs, -30% revenue)
    ↓
{Side-by-side table}
    ↓
┌─────────────────────────────────────────────┐
│           Base    Optimistic  Pessimistic   │
│ NPV       $87M      $142M        $31M       │
│ IRR       18.7%     26.4%        11.2%      │
│ Breakeven 54mo      42mo         78mo       │
│                                              │
│ [Highlight Trade-Offs]                      │
└─────────────────────────────────────────────┘
    ↓
User clicks "Highlight Trade-Offs"
    ↓
{Show analysis}
    ↓
┌─────────────────────────────────────────────┐
│ Optimistic Scenario:                        │
│ ✅ +$55M NPV upside                         │
│ ✅ 12 month faster break-even               │
│ ❌ Requires cost controls (risk)            │
│                                              │
│ Pessimistic Scenario:                       │
│ ❌ -$56M NPV downside                       │
│ ❌ 24 month slower break-even               │
│ ⚠️ Still profitable long-term               │
└─────────────────────────────────────────────┘
```

---

## FLOW 5: MODULE DETAIL VIEW

### **F5.1: Open Detail Panel**

```
[Idle State - Module Installed]
    ↓
User clicks installed module (2D grid OR 3D view)
    ↓
{Open detail panel (slide in from right)}
    ↓
┌──────────────────────────────────────┐
│ 🔬 ZERO-G LABORATORY                 │
│ Bay 5 | Status: ACTIVE               │
├──────────────────────────────────────┤
│ SPECIFICATIONS                       │
│ Mass:    12,000 kg                   │
│ Power:   8 kW (cont) / 15 kW (peak)  │
│ Thermal: 12 kW rejection required    │
│ Crew:    2 scientists                │
│ Volume:  45 m³ pressurized           │
│ Data:    50 Mbps downlink            │
├──────────────────────────────────────┤
│ ECONOMICS                            │
│ CAPEX:   $270M (dev + launch)        │
│ Revenue: $300K/month base            │
│ OPEX:    $50K/month                  │
│ ROI:     98% annual                  │
│ Payback: 90 months                   │
├──────────────────────────────────────┤
│ REQUIREMENTS                         │
│ ✅ Power available (8/60 kW)         │
│ ✅ Thermal capacity (12/80 kW)       │
│ ⚠️ Requires crew airlock             │
│ ✅ Structural capacity OK            │
├──────────────────────────────────────┤
│ [Remove Module] [Export Details]    │
│ [Close]                              │
└──────────────────────────────────────┘
    ↓
[Detail Panel Open]
    ↓
User can:
    ├─ F5.2: View different module (click another)
    ├─ F6: Remove module
    ├─ Export module specs (CSV)
    └─ Close panel
```

### **F5.2: Switch Module Detail**

```
[Detail Panel Open - Lab Selected]
    ↓
User clicks different module (e.g., Manufacturing Fab)
    ↓
{Animate panel transition}
    ├─ Fade out Lab details (200ms)
    ├─ Load Manufacturing details
    └─ Fade in Manufacturing details (200ms)
    ↓
[Detail Panel Open - Manufacturing Selected]
```

---

## FLOW 6: MODULE REMOVAL

### **F6.1: Remove Module**

```
[Detail Panel Open OR Right-Click Module]
    ↓
User clicks "Remove Module" button
    ↓
{Check for dependencies}
    ↓
    ├─ No dependents → F6.2 (Simple removal)
    │
    └─ Has dependents → F6.3 (Cascading warning)
```

### **F6.2: Simple Removal**

```
[Remove Requested - No Dependencies]
    ↓
{Show confirmation}
    ↓
┌──────────────────────────────────────┐
│ Remove Zero-G Laboratory?            │
│                                       │
│ Impact:                              │
│ • Revenue: $1.85M → $1.55M/mo        │
│ • Power freed: 8 kW                  │
│ • Crew freed: 2 slots                │
│                                       │
│ [Cancel] [Remove]                    │
└──────────────────────────────────────┘
    ↓
User choice:
    ├─ Cancel → {Close modal} → [Detail Panel Open]
    │
    └─ Remove → CONTINUE
         ↓
{Execute removal}
    ├─ Update state: bays[5] = null
    ├─ Recalculate all metrics
    ├─ Animate module disappearance (fade out + scale down)
    ├─ Update 3D view
    ├─ Close detail panel
    └─ Save to localStorage
         ↓
{Display feedback}
    └─ Toast: "Zero-G Lab removed from Bay 5"
         ↓
[Module Removed - Idle State]
```

### **F6.3: Cascading Removal Warning**

```
[Remove Requested - Has Dependencies]
Example: Removing Crew Airlock affects Lab + Manufacturing
    ↓
{Show cascading warning}
    ↓
┌──────────────────────────────────────┐
│ ⚠️ CASCADING IMPACT                  │
│                                       │
│ Removing Crew Airlock will disable:  │
│ • Zero-G Laboratory (needs crew)     │
│ • Manufacturing Fab (needs crew)     │
│ • Health Care Module (needs crew)    │
│                                       │
│ These modules will become             │
│ non-operational until airlock is     │
│ reinstalled.                         │
│                                       │
│ Affected revenue: -$1.1M/month       │
│                                       │
│ [Cancel] [Remove Anyway]             │
└──────────────────────────────────────┘
    ↓
User choice:
    ├─ Cancel → [Detail Panel Open]
    │
    └─ Remove Anyway → F6.4
```

### **F6.4: Cascading Removal Execution**

```
[Cascading Removal Confirmed]
    ↓
{Execute removal}
    ├─ Remove airlock: bays[5] = null
    ├─ Mark dependents as "non-operational":
    │   bays[2].status = "inactive" (Lab)
    │   bays[4].status = "inactive" (Manufacturing)
    │   bays[6].status = "inactive" (Health Care)
    ├─ Recalculate metrics (exclude inactive revenue)
    ├─ Animate removal (airlock fades, dependents turn red)
    └─ Update warnings panel:
        "⚠️ 3 modules non-operational (missing airlock)"
    ↓
{Display feedback}
    ├─ Toast: "Crew Airlock removed"
    └─ Toast: "3 modules now non-operational"
    ↓
[Cascading Effect Active]
    ├─ Red indicators on affected modules
    ├─ Systems status shows reduced metrics
    └─ Warning persists until airlock reinstalled
```

---

## FLOW 7: EXPORT & SHARING

### **F7.1: Export Menu**

```
[Any Configuration State]
    ↓
User clicks "Export" button (top toolbar)
    ↓
{Show export options modal}
    ↓
┌──────────────────────────────────────┐
│ EXPORT CONFIGURATION                 │
│                                       │
│ [📄 PDF Technical Report]            │
│    Full analysis (5 pages)           │
│                                       │
│ [🔗 Shareable URL]                   │
│    Copy link to clipboard            │
│                                       │
│ [💾 JSON Configuration]              │
│    Raw data for analysis             │
│                                       │
│ [📊 CSV Data Export]                 │
│    Module specs spreadsheet          │
│                                       │
│ [Cancel]                             │
└──────────────────────────────────────┘
    ↓
User selects option:
    ├─ PDF → F7.2
    ├─ URL → F7.3
    ├─ JSON → F7.4
    └─ CSV → F7.5
```

### **F7.2: PDF Export**

```
[PDF Selected]
    ↓
{Show loading modal}
    ├─ Progress bar: "Generating report..."
    ├─ Status: "Rendering page 1 of 5"
    └─ Estimated time: 3-5 seconds
    ↓
{Generate PDF using jsPDF}
    ├─ Page 1: Configuration diagram + specs
    ├─ Page 2: Financial analysis + charts
    ├─ Page 3: Mission timeline
    ├─ Page 4: Constraint validation
    ├─ Page 5: Methodology & disclaimers
    ↓
    ├─ Success → CONTINUE
    │
    └─ Error (memory limit, etc.) → F7.6 (Export failure)
    ↓
{Trigger browser download}
    └─ Filename: "vishwakarma_config_2026-01-14.pdf"
    ↓
{Display success}
    └─ Toast: "✅ PDF report downloaded"
    ↓
[Export Complete - Return to App]
```

### **F7.3: Shareable URL**

```
[URL Selected]
    ↓
{Encode configuration to Base64}
    ├─ Serialize state object
    ├─ Compress using LZ-string (if available)
    ├─ Base64 encode
    └─ Generate URL: https://vishwakarma.app/?config=eyJiYXlz...
    ↓
{Check URL length}
    ↓
    ├─ Length < 2048 chars → CONTINUE
    │
    └─ Length >= 2048 chars → F7.7 (URL too long)
    ↓
{Copy to clipboard}
    ↓
{Show success modal}
    ↓
┌──────────────────────────────────────┐
│ ✅ URL COPIED TO CLIPBOARD           │
│                                       │
│ Share this link:                     │
│ https://vishwakarma.app/?config=...  │
│                                       │
│ Anyone with this link can view       │
│ your configuration.                  │
│                                       │
│ [OK]                                 │
└──────────────────────────────────────┘
    ↓
[Export Complete]
```

### **F7.4: JSON Export**

```
[JSON Selected]
    ↓
{Serialize configuration}
    ├─ Include all module data
    ├─ Include calculated metrics
    ├─ Add metadata (version, timestamp)
    └─ Format with indentation (pretty print)
    ↓
{Trigger download}
    └─ Filename: "vishwakarma_config_2026-01-14.json"
    ↓
{Display success}
    └─ Toast: "✅ JSON configuration downloaded"
    ↓
[Export Complete]
```

### **F7.5: CSV Export**

```
[CSV Selected]
    ↓
{Generate CSV}
    ├─ Headers: Module, Mass, Power_Cont, Power_Peak, Thermal, Revenue, CAPEX
    ├─ Data rows for each installed module
    ├─ Summary row: Totals
    └─ Format as standard CSV
    ↓
{Trigger download}
    └─ Filename: "vishwakarma_modules_2026-01-14.csv"
    ↓
{Display success}
    └─ Toast: "✅ CSV data exported"
    ↓
[Export Complete]
```

### **F7.6: Export Failure (PDF)**

```
[PDF Generation Failed]
    ↓
{Catch error}
    ├─ Log error to console
    └─ Show fallback modal
    ↓
┌──────────────────────────────────────┐
│ ❌ PDF EXPORT FAILED                 │
│                                       │
│ The configuration is too complex     │
│ for PDF generation.                  │
│                                       │
│ Try instead:                         │
│ • JSON export (full data)            │
│ • CSV export (module specs)          │
│ • Shareable URL                      │
│                                       │
│ [Export JSON] [Cancel]               │
└──────────────────────────────────────┘
    ↓
User choice:
    ├─ Export JSON → F7.4
    └─ Cancel → [Return to app]
```

### **F7.7: URL Too Long**

```
[URL > 2048 Characters]
    ↓
{Show error modal}
    ↓
┌──────────────────────────────────────┐
│ ⚠️ CONFIGURATION TOO COMPLEX         │
│                                       │
│ This configuration is too large      │
│ to encode in a URL.                  │
│                                       │
│ Use JSON export instead for full     │
│ data preservation.                   │
│                                       │
│ [Export JSON] [Cancel]               │
└──────────────────────────────────────┘
    ↓
User choice:
    ├─ Export JSON → F7.4
    └─ Cancel → [Return to app]
```

---

## FLOW 8: IMPORT CONFIGURATION

### **F8.1: Load from URL**

```
[Page Load with ?config= parameter]
    ↓
{Detect URL parameter}
    ↓
{Decode Base64 configuration}
    ↓
    ├─ Valid format → CONTINUE
    │
    └─ Invalid/corrupted → F8.3 (Load failure)
    ↓
{Validate configuration structure}
    ├─ Check version compatibility
    ├─ Validate module types exist
    └─ Verify constraint math is consistent
    ↓
    ├─ Valid → F8.2 (Load success)
    │
    └─ Invalid → F8.3 (Load failure)
```

### **F8.2: Load Configuration Success**

```
[Valid Configuration Decoded]
    ↓
{Apply configuration}
    ├─ Install modules to specified bays
    ├─ Recalculate all metrics
    ├─ Render 2D + 3D views
    └─ Update systems dashboard
    ↓
{Display info toast}
    └─ Toast: "✅ Configuration loaded from URL"
    ↓
[Configuration Loaded - Idle State]
F8.3: Load Configuration Failure**

```
[Invalid Configuration Data]
    ↓
{Show error modal}
    ↓
┌──────────────────────────────────────┐
│ ❌ INVALID CONFIGURATION URL         │
│                                       │
│ The URL contains corrupted or        │
│ incompatible data.                   │
│                                       │
│ Starting with empty configuration.   │
│                                       │
│ [OK]                                 │
└──────────────────────────────────────┘
    ↓
{Load empty configuration}
    └─ Hub only, no modules
    ↓
[Empty Configuration - Idle State]
```

### **F8.4: Import JSON File**

```
[User clicks "Import" button]
    ↓
{Show file picker modal}
    ↓
┌──────────────────────────────────────┐
│ IMPORT CONFIGURATION                 │
│                                       │
│ [Choose JSON File]                   │
│                                       │
│ Supports .json files exported from   │
│ Vishwakarma v2.0 or later.           │
│                                       │
│ [Cancel]                             │
└──────────────────────────────────────┘
    ↓
User selects file
    ↓
{Read file using FileReader API}
    ↓
{Parse JSON}
    ↓
    ├─ Valid JSON → Validate structure (F8.1 flow)
    │
    └─ Invalid JSON → Show error: "File is not valid JSON"
    ↓
[Apply configuration if valid, else show error]
```

---

## FLOW 9: METHODOLOGY & EDUCATIONAL CONTENT

### **F9.1: View Methodology Page**

```
[Any State]
    ↓
User clicks "Methodology" link (footer or menu)
    ↓
{Navigate to methodology page OR show modal}
    ↓
┌──────────────────────────────────────┐
│ METHODOLOGY & ASSUMPTIONS            │
│                                       │
│ [Disclaimer Section]                 │
│ [Sources & References]               │
│ [Known Limitations]                  │
│ [Calculation Details]                │
│                                       │
│ [Close]                              │
└──────────────────────────────────────┘
    ↓
User can:
    ├─ Scroll through content
    ├─ Click external links (NASA, SpaceX docs)
    └─ Return to app
```

### **F9.2: Constraint Tooltips (Educational)**

```
[User hovers over "⚡ Power Budget" label]
    ↓
{Show educational tooltip}
    ↓
┌──────────────────────────────────────┐
│ POWER BUDGET ℹ️                      │
│                                       │
│ Space stations generate power using  │
│ solar arrays. Power must be budgeted │
│ carefully to avoid brownouts.        │
│                                       │
│ • Continuous load: Normal operations │
│ • Peak load: During high activity    │
│ • Reserve margin: 20% safety buffer  │
│                                       │
│ Learn more: [NASA Power Systems]     │
└──────────────────────────────────────┘
    ↓
User can:
    ├─ Click external link (opens new tab)
    └─ Mouse away (tooltip disappears)
```

---

## FLOW 10: COMPARISON MODE (Tier 2)

### **F10.1: Enter Comparison Mode**

```
[Any Configuration State]
    ↓
User clicks "Compare Configurations" button
    ↓
{Switch to comparison interface}
    ↓
[Comparison Mode Active]
    ├─ Slot A: Current configuration (auto-filled)
    ├─ Slot B: Empty
    └─ Slot C: Empty
    ↓
{Show instructions}
    └─ "Load presets or create configs to compare"
    ↓
User can:
    ├─ F10.2: Load preset into slot
    ├─ F10.3: Edit configuration in slot
    └─ F10.4: View comparison analysis
```

### **F10.2: Load Configuration into Slot**

```
[Comparison Mode - Slot B Empty]
    ↓
User clicks "Load Preset" for Slot B
    ↓
{Show preset selector}
    ↓
User selects "Manufacturing Hub"
    ↓
{Load into Slot B}
    ├─ Install modules
    ├─ Calculate metrics
    └─ Display in comparison table
    ↓
[Slot B Filled]
    ↓
{Enable comparison analysis}
    └─ "Compare" button becomes active
```

### **F10.3: View Comparison Analysis**

```
[2+ Slots Filled]
    ↓
User clicks "Compare" button
    ↓
{Generate comparison table}
    ├─ Side-by-side metrics
    ├─ Color coding (green = best, red = worst)
    └─ Trade-off analysis
    ↓
{Display trade-off insights}
    ↓
┌──────────────────────────────────────┐
│ COMPARISON ANALYSIS                  │
│                                       │
│ Config A vs Config B:                │
│ ✅ B has +$67M higher NPV            │
│ ✅ B breaks even 24mo sooner         │
│ ❌ B has lower thermal margin (12%)  │
│ ❌ B costs $300M more upfront        │
│                                       │
│ Recommendation: Config B IF you can  │
│ secure funding. Config A for lower   │
│ risk approach.                       │
└──────────────────────────────────────┘
    ↓
[Comparison Active]
    ↓
User can:
    ├─ Export comparison report (PDF/CSV)
    ├─ Load different configs into slots
    └─ Exit comparison mode
```

---

## FLOW 11: OPTIMIZATION ASSISTANT (Tier 2)

### **F11.1: Run Optimization**

```
[Any Configuration State]
    ↓
User clicks "Optimize" button
    ↓
{Show optimization modal}
    ↓
┌──────────────────────────────────────┐
│ CONFIGURATION OPTIMIZATION           │
│                                       │
│ Optimize for:                        │
│ ○ Maximize Revenue                   │
│ ○ Minimize Cost                      │
│ ○ Balance Risk/Reward                │
│                                       │
│ Locked Modules (don't change):       │
│ ☐ Zero-G Lab (Bay 2)                │
│ ☐ Crew Airlock (Bay 5)              │
│                                       │
│ [Cancel] [Run Optimization]          │
└──────────────────────────────────────┘
    ↓
User selects "Maximize Revenue" + locks airlock
    ↓
User clicks "Run Optimization"
    ↓
{Execute optimization algorithm}
    ├─ Keep locked modules
    ├─ Test module combinations
    ├─ Evaluate against constraints
    ├─ Calculate NPV for each valid config
    └─ Select configuration with highest NPV
    ↓
{Show results}
    ↓
F11.2
```

### **F11.2: Optimization Results**

```
[Optimization Complete]
    ↓
{Display results modal}
    ↓
┌──────────────────────────────────────┐
│ OPTIMIZATION RESULTS                 │
│                                       │
│ Suggested Changes:                   │
│ 1. Remove: Hydroponics (Bay 4)       │
│    Impact: -$50K/mo, -$240M CAPEX    │
│                                       │
│ 2. Add: Data Center (Bay 4)          │
│    Impact: +$150K/mo, +$210M CAPEX   │
│                                       │
│ 3. Add: Power Station (Bay 7)        │
│    Impact: +$5K/mo, +$180M CAPEX     │
│    (Enables more data centers)       │
│                                       │
│ NET RESULT:                          │
│ Revenue: $1.85M → $2.25M/mo (+22%)   │
│ NPV:     $87M → $126M (+45%)         │
│ CAPEX:   $1.2B → $1.35B (+13%)       │
│                                       │
│ [Apply Changes] [Cancel]             │
└──────────────────────────────────────┘
    ↓
User choice:
    ├─ Apply Changes → F11.3
    └─ Cancel → [Return to original config]
```

### **F11.3: Apply Optimization**

```
[User Accepts Optimization]
    ↓
{Apply changes sequentially}
    ├─ Step 1: Remove Hydroponics (animate removal)
    ├─ Wait 300ms
    ├─ Step 2: Install Data Center (animate installation)
    ├─ Wait 300ms
    ├─ Step 3: Install Power Station (animate installation)
    └─ Recalculate all metrics
    ↓
{Display success}
    └─ Toast: "✅ Optimization applied (+$39M NPV)"
    ↓
[Optimized Configuration - Idle State]
```

---

## FLOW 12: 3D VISUALIZATION INTERACTION (Tier 2)

### **F12.1: 3D View Controls**

```
[3D View Active]
    ↓
User interactions:
    ├─ Click + Drag → Orbit camera
    ├─ Scroll Wheel → Zoom in/out
    ├─ Right-Click + Drag → Pan camera
    └─ Double-Click → Reset camera to default view
    ↓
{Update camera position}
    └─ Smooth interpolation (ease-out)
    ↓
[3D View Updated]
```

### **F12.2: 3D Module Interaction**

```
[3D View Active]
    ↓
User hovers over module in 3D view
    ↓
{Highlight module}
    ├─ Module glows (cyan outline)
    ├─ Sync with 2D grid (highlight corresponding bay)
    └─ Show tooltip with module name
    ↓
User clicks module
    ↓
{Open detail panel (F5.1)}
    └─ Same as clicking in 2D grid
    ↓
[Detail Panel Open]
```

### **F12.3: Center-of-Mass Visualization**

```
[3D View Active - Multiple Modules Installed]
    ↓
{Calculate and display CoM}
    ├─ Yellow sphere at CoM location
    ├─ Red cone from hub center to CoM
    ├─ Distance label floating near CoM
    └─ Color changes based on offset:
        ├─ Green: <1m (excellent)
        ├─ Yellow: 1-2m (acceptable)
        └─ Red: >2m (warning)
    ↓
User hovers over CoM indicator
    ↓
{Show tooltip}
    ↓
┌──────────────────────────────────────┐
│ CENTER OF MASS                       │
│                                       │
│ Offset: 1.3m from hub center         │
│ Status: ✅ Within acceptable range   │
│                                       │
│ A balanced CoM is critical for       │
│ station stability and control.       │
└──────────────────────────────────────┘
```

---

## FLOW 13: MISSION TIMELINE (Tier 1)

### **F13.1: View Timeline**

```
[Any Configuration State]
    ↓
User clicks "Mission Timeline" tab
    ↓
{Generate deployment sequence}
    ├─ Sort modules by logical deployment order:
    │   1. Hub (Month 0)
    │   2. Essential systems (airlock, power)
    │   3. Revenue-generating modules
    │   4. Support modules
    ├─ Calculate launch windows (3-month intervals)
    ├─ Assign operational dates (3 months post-launch)
    └─ Calculate cumulative metrics over time
    ↓
{Display timeline view}
    ├─ Gantt-style chart
    ├─ Launch events marked
    ├─ Revenue ramp overlay
    └─ Station-keeping fuel depletion
    ↓
[Timeline View Active]
    ↓
User can:
    ├─ Hover over events (see details)
    ├─ Adjust deployment order (drag events)
    └─ Export timeline (PDF/CSV)
```

### **F13.2: Adjust Deployment Order**

```
[Timeline View Active]
    ↓
User drags "Manufacturing Fab" event earlier
    ↓
{Validate new sequence}
    ├─ Check dependencies (needs airlock first)
    ├─ Check launch window feasibility
    └─ Recalculate cumulative metrics
    ↓
    ├─ Valid → Apply change, recalculate
    │
    └─ Invalid → Show error tooltip
         "Manufacturing Fab requires airlock (Month 3)"
    ↓
[Timeline Updated OR Error Shown]
```

---

## FLOW 14: ERROR RECOVERY & EDGE CASES

### **F14.1: Browser Storage Full**

```
[Attempting to Save Configuration]
    ↓
{Try localStorage.setItem()}
    ↓
{Catch QuotaExceededError}
    ↓
{Show warning modal}
    ↓
┌──────────────────────────────────────┐
│ ⚠️ STORAGE FULL                      │
│                                       │
│ Cannot save configuration locally.   │
│                                       │
│ Options:                             │
│ • Export as JSON (recommended)       │
│ • Clear browser storage              │
│ • Continue without saving            │
│                                       │
│ [Export JSON] [Clear Storage] [OK]   │
└──────────────────────────────────────┘
    ↓
User choice:
    ├─ Export JSON → F7.4
    ├─ Clear Storage → {localStorage.clear()} → Reload
    └─ OK → Continue (config lost on reload)
```

### **F14.2: Rapid Configuration Changes**

```
[User Installing/Removing Modules Rapidly]
    ↓
{Debounce calculations}
    ├─ Queue state changes
    ├─ Wait 100ms after last change
    └─ Execute batch calculation
    ↓
{Update UI once}
    └─ Prevents flickering/performance issues
    ↓
[Stable State Achieved]
```

### **F14.3: Browser Tab Backgrounded During Animation**

```
[3D Animation Running]
    ↓
User switches tabs
    ↓
{Tab visibility change detected}
    ↓
{Pause animations}
    ├─ Stop requestAnimationFrame loop
    └─ Save current animation state
    ↓
User returns to tab
    ↓
{Tab visible again}
    ↓
{Resume animations}
    ├─ Restore animation state
    └─ Restart requestAnimationFrame loop
    ↓
[Animation Continues Smoothly]
```

---

## CRITICAL USER STATES SUMMARY

### **Always-Available Actions (Global)**
- View current configuration (2D + 3D)
- Check systems status (power, thermal, mass, etc.)
- Access methodology/disclaimers
- Export configuration (any format)
- Load preset configuration
- Import configuration (JSON/URL)

### **Context-Dependent Actions**
- **When module selected:** Install to bay, cancel selection
- **When module installed:** View details, remove module
- **When configuration valid:** Export PDF, run optimization
- **When multiple configs:** Enter comparison mode
- **When timeline tab open:** View deployment sequence, adjust order

### **Error States**
- **Constraint violated:** Block action, explain why, suggest solutions
- **Dependency missing:** Warn user, show affected modules
- **Storage full:** Offer export, clear, or continue without save
- **Export failed:** Fallback to alternative formats
- **Import invalid:** Reset to empty config, show error

---

## APPROVAL CHECKPOINT

This App Flow Document defines:
- ✅ 14 major user flows (onboarding → optimization)
- ✅ All success, warning, and error paths
- ✅ Edge case handling (storage full, rapid changes, etc.)
- ✅ State transitions and system responses
- ✅ Every modal, tooltip, and feedback mechanism


# Phase 3: Design Document (UI/UX Intent)
## VISHWAKARMA Technical Configuration System - DESIGN SPECIFICATION

---

## 1. DESIGN PHILOSOPHY

### **Core Principles**

**Brutalist Technical Aesthetic**
- Function over decoration
- Expose complexity, don't hide it
- Sharp edges, grid systems, monospace data
- NASA mission control meets cyberpunk engineering terminal

**Information Density**
- Maximum data in minimum space
- No wasted pixels on decoration
- Every element serves a purpose
- Dashboard, not artwork

**Immediate Feedback**
- Zero latency between action and response
- Real-time constraint validation
- Color-coded status (green/yellow/red)
- Animation indicates system thinking

**Trust Through Transparency**
- Show the math, don't hide it
- Expose assumptions and limitations
- Educational tooltips for depth
- Methodology accessible at all times

---

## 2. VISUAL LANGUAGE

### **Color Palette**

**Primary Colors**
```
Background Tiers:
- Deep Space:     #0a0e14 (main background)
- Panel Dark:     #151a23 (cards, panels)
- Surface:        #1e2530 (elevated surfaces)
- Border:         #2d3748 (dividers, outlines)

Accent Colors:
- Cyan:           #00d9ff (primary actions, highlights)
- Orange:         #ff6b35 (warnings, secondary accent)
- Electric Blue:  #0af (links, interactive elements)

Status Colors:
- Success:        #00ff88 (constraints met, valid states)
- Warning:        #ffbb00 (approaching limits, caution)
- Critical:       #ff4444 (violations, errors, blocked)
- Info:           #4a9eff (neutral information)

Text Colors:
- Primary Text:   #e8eaed (main content)
- Secondary Text: #9ca3af (labels, metadata)
- Muted Text:     #6b7280 (disabled, placeholders)
```

**Usage Rules**
- Cyan = Primary interactive elements (buttons, selected states)
- Orange = Secondary actions, emphasis
- Green/Yellow/Red = Status only (never decorative)
- Text contrast ratio: Minimum 7:1 (WCAG AAA)

### **Typography**

**Font Stack**
```css
/* Display/Headers */
--font-display: 'Orbitron', 'Rajdhani', monospace;
/* Weight: 700 (Bold), 900 (Black) */
/* Use for: Page titles, section headers, module names */

/* Data/Numbers */
--font-mono: 'Space Mono', 'JetBrains Mono', monospace;
/* Weight: 400 (Regular), 700 (Bold) */
/* Use for: Metrics, calculations, code-like content */

/* Body Text */
--font-body: 'Inter', -apple-system, system-ui, sans-serif;
/* Weight: 400 (Regular), 600 (Semibold) */
/* Use for: Descriptions, paragraphs, UI labels */
```

**Type Scale**
```
Display (h1):     32px / 2rem   - Orbitron Bold
Header (h2):      24px / 1.5rem - Orbitron Bold
Subheader (h3):   18px / 1.125rem - Orbitron Regular
Body Large:       16px / 1rem   - Inter Regular
Body:             14px / 0.875rem - Inter Regular
Small:            12px / 0.75rem - Inter Regular
Tiny:             10px / 0.625rem - Space Mono Regular

Data Large:       20px / 1.25rem - Space Mono Bold
Data:             16px / 1rem   - Space Mono Regular
Data Small:       14px / 0.875rem - Space Mono Regular
```

### **Spacing System**

**Base Unit: 4px**
```
--space-1:  4px   (0.25rem)
--space-2:  8px   (0.5rem)
--space-3:  12px  (0.75rem)
--space-4:  16px  (1rem)     ← Most common
--space-6:  24px  (1.5rem)
--space-8:  32px  (2rem)
--space-12: 48px  (3rem)
--space-16: 64px  (4rem)
--space-24: 96px  (6rem)
```

**Application**
- Component padding: 16px (space-4)
- Section spacing: 32px (space-8)
- Element gaps: 8px (space-2) or 12px (space-3)
- Grid gaps: 16px (space-4)

### **Grid & Layout**

**Main Layout Structure**
```
┌─────────────────────────────────────────────────────────┐
│ HEADER (64px fixed)                                     │
├────────────────┬────────────────────┬────────────────────┤
│                │                    │                    │
│  STATION VIEW  │  SYSTEMS DASHBOARD │  MODULE PALETTE   │
│  (40% width)   │  (35% width)       │  (25% width)      │
│                │                    │                    │
│  - 2D Grid     │  - Metrics         │  - 9 Module       │
│  - 3D View     │  - Warnings        │    Cards          │
│  - Controls    │  - Recommendations │  - Drag to        │
│                │  - Financial       │    Install        │
│                │                    │                    │
│  Scrollable    │  Scrollable        │  Scrollable       │
│                │                    │                    │
└────────────────┴────────────────────┴────────────────────┘
```

**Responsive Breakpoints**
```
Desktop (1920px+):  3-column layout (40-35-25)
Laptop (1280-1919): 3-column layout (35-40-25)
Tablet (768-1279):  2-column (50-50), palette in drawer
Mobile (<768):      Single column, tabs for navigation
```

**Minimum Supported Resolution: 1280x800**

---

## 3. COMPONENT SPECIFICATIONS

### **3.1 HEADER / TOP BAR**

**Layout**
```
┌─────────────────────────────────────────────────────────┐
│ VISHWAKARMA v2.0    [Presets▼] [Compare] [Optimize]    │
│ Technical Config     ... more actions ...     [Export▼] │
└─────────────────────────────────────────────────────────┘
Height: 64px
Background: #151a23
Border-bottom: 1px solid #2d3748
```

**Elements**
- **Logo/Title:** Left-aligned, Orbitron Bold 24px, Cyan (#00d9ff)
- **Action Buttons:** Right-aligned, 40px height, 12px gap
  - Default state: Border 1px solid #2d3748, text #9ca3af
  - Hover: Border cyan, text white
  - Active: Background cyan, text #0a0e14
- **Dropdown Menus:** Icon + text, chevron indicator

### **3.2 STATION VIEW (Left Column)**

**2D Grid Component**
```
┌─────────────────────────────────┐
│  STATION CONFIGURATION           │
├─────────────────────────────────┤
│                                  │
│     ┌───┬───┬───┐               │
│     │ 7 │ 8 │ 9 │  Bay Grid     │
│     ├───┼───┼───┤  120px cells  │
│     │ 4 │ 5 │ 6 │  12px gaps    │
│     ├───┼───┼───┤               │
│     │ 1 │ 2 │ 3 │               │
│     └───┴───┴───┘               │
│                                  │
│  Center bay (5) = Hub (darker)  │
└─────────────────────────────────┘
```

**Bay Cell States**
```css
Empty Bay:
- Background: #1e2530
- Border: 1px solid #2d3748
- Hover: Border cyan, cursor pointer

Occupied Bay:
- Background: gradient based on module type
- Border: 2px solid module color
- Icon: Module emoji/icon centered
- Label: Module name (truncated)
- Hover: Brightness +20%, cursor pointer

Selected Bay (during drag):
- Border: 2px dashed cyan
- Background: rgba(0, 217, 255, 0.1)
- Animation: Pulse glow

Blocked Bay (constraint violated):
- Border: 2px solid #ff4444
- Background: rgba(255, 68, 68, 0.05)
- Cursor: not-allowed
- Diagonal stripe pattern overlay
```

**Module Colors (for occupied bays)**
```
Zero-G Lab:        Blue gradient (#4a9eff → #0066cc)
Manufacturing:     Orange gradient (#ff6b35 → #cc3300)
Data Center:       Cyan gradient (#00d9ff → #0099cc)
Hydroponics:       Green gradient (#00ff88 → #00cc66)
Service Station:   Purple gradient (#9333ea → #6b21a8)
Power Station:     Yellow gradient (#ffbb00 → #cc9900)
Health Care:       Red gradient (#ff4444 → #cc0000)
Crew Airlock:      Gray gradient (#6b7280 → #4b5563)
Cargo Bay:         Brown gradient (#a16207 → #78350f)
```

**3D View Component**
```
┌─────────────────────────────────┐
│  3D VISUALIZATION    [Reset🔄]  │
├─────────────────────────────────┤
│                                  │
│     [Three.js Canvas]            │
│     - Black starfield bg         │
│     - Central hub (sphere)       │
│     - Modules (colored boxes)    │
│     - Solar panels (rectangles)  │
│     - CoM indicator (sphere)     │
│     - Orbit controls enabled     │
│                                  │
│  Controls:                       │
│  🖱️ Drag: Rotate                │
│  🖲️ Scroll: Zoom                │
│  ⌘ Right-drag: Pan               │
└─────────────────────────────────┘
Canvas Height: 400px
Background: #000000 (pure black)
Grid: Optional, 10m spacing, #2d3748
```

**3D Camera Settings**
- Initial position: (150, 100, 150) looking at origin
- FOV: 60 degrees
- Near/Far: 1 / 10000
- Orbit limits: Min distance 50, max distance 500

**View Toggle**
```
[2D Grid] [3D View] [Both]
Tab-style toggle, active state = cyan underline
```

---

### **3.3 SYSTEMS DASHBOARD (Center Column)**

**Status Panel Layout**
```
┌─────────────────────────────────────┐
│  SYSTEMS STATUS           [Live ⚡] │
├─────────────────────────────────────┤
│                                      │
│  ⚡ POWER                            │
│  45.2 / 60.0 kW (75%)               │
│  [████████████████░░░░░░░░] ✅      │
│  Continuous: 38.2 kW | Peak: 67.5   │
│                                      │
│  🔥 THERMAL                          │
│  62.5 / 80.0 kW (78%)               │
│  [███████████████████░░░░] ⚠️       │
│  Approaching capacity limit          │
│                                      │
│  ⚖️ MASS                             │
│  98,400 / 200,000 kg (49%)          │
│  [████████████░░░░░░░░░░░] ✅      │
│  CoM offset: 1.3m (OK)               │
│                                      │
│  👥 CREW                             │
│  5 / 10 capacity (50%)               │
│  [██████████░░░░░░░░░░░░] ✅      │
│  ⚠️ Crew Airlock required            │
│                                      │
│  📡 DATA                             │
│  225 / 500 Mbps (45%)                │
│  [█████████░░░░░░░░░░░░░] ✅      │
│                                      │
│  💰 REVENUE                          │
│  $1.85M / month projected            │
│  $22.2M / year                       │
│                                      │
└─────────────────────────────────────┘
```

**Progress Bar Component**
```css
Container:
- Height: 24px
- Background: #1e2530
- Border: 1px solid #2d3748
- Border-radius: 4px

Fill:
- Height: 100%
- Gradient based on percentage:
  - 0-60%:  Green (#00ff88)
  - 60-85%: Yellow (#ffbb00)
  - 85-100%: Orange/Red gradient
- Transition: all 0.3s ease

Label:
- Position: Absolute, centered
- Color: White, Space Mono 14px Bold
- Drop-shadow for readability
```

**Status Indicator Icons**
```
✅ Green check:  All good (<75% capacity)
⚠️ Yellow warn:  Caution (75-90% capacity)
❌ Red X:        Critical (>90% or violated)
```

**Warnings Panel**
```
┌─────────────────────────────────────┐
│  ⚠️ WARNINGS & RECOMMENDATIONS      │
├─────────────────────────────────────┤
│                                      │
│  ❌ No crew airlock installed        │
│     EVA operations impossible        │
│     → Install Crew Airlock           │
│                                      │
│  ⚠️ Thermal at 78% capacity          │
│     Limited expansion room           │
│     → Consider Power Station         │
│                                      │
│  ✅ Power margins acceptable         │
│                                      │
│  ℹ️ Station-keeping: 200kg/month     │
│                                      │
└─────────────────────────────────────┘
```

**Warning Card Style**
```css
Critical (❌):
- Border-left: 4px solid #ff4444
- Background: rgba(255, 68, 68, 0.05)

Warning (⚠️):
- Border-left: 4px solid #ffbb00
- Background: rgba(255, 187, 0, 0.05)

Success (✅):
- Border-left: 4px solid #00ff88
- Background: rgba(0, 255, 136, 0.05)

Info (ℹ️):
- Border-left: 4px solid #4a9eff
- Background: rgba(74, 158, 255, 0.05)

Padding: 12px
Margin-bottom: 8px
Font: Inter 14px
```

**Financial Summary (Collapsed by Default)**
```
┌─────────────────────────────────────┐
│  💰 FINANCIAL ANALYSIS    [Expand▼] │
├─────────────────────────────────────┤
│  Monthly Revenue:  $1.85M            │
│  Total CAPEX:      $1.2B             │
│  Break-Even:       54 months         │
│  10yr NPV:         $87.3M            │
│                                      │
│  [View Details →]                   │
└─────────────────────────────────────┘

Expanded state shows:
- Cash flow chart (Recharts)
- Sensitivity sliders
- Scenario comparison table
```

---

### **3.4 MODULE PALETTE (Right Column)**

**Module Card Component**
```
┌─────────────────────────────────┐
│  🔬 ZERO-G LABORATORY           │
├─────────────────────────────────┤
│  Mass: 12,000 kg                │
│  Power: 8 kW / 15 kW peak       │
│  Revenue: $300K/mo              │
│                                  │
│  CAPEX: $270M                   │
│  Status: [Available]            │
│                                  │
│  [View Details →]               │
└─────────────────────────────────┘
Card dimensions: Full width x 180px
```

**Card States**
```css
Default:
- Background: #1e2530
- Border: 1px solid #2d3748
- Cursor: grab

Hover:
- Border: 1px solid #00d9ff
- Box-shadow: 0 0 12px rgba(0, 217, 255, 0.3)
- Transform: translateY(-2px)
- Transition: all 0.2s ease

Selected (dragging):
- Border: 2px solid #00d9ff
- Box-shadow: 0 0 20px rgba(0, 217, 255, 0.5)
- Cursor: grabbing
- Opacity: 0.9

Installed (already in grid):
- Background: #151a23
- Border: 1px solid #2d3748
- Opacity: 0.5
- Cursor: not-allowed
- Badge: "Installed in Bay X"
```

**Module Icon/Emoji**
- Size: 32px x 32px
- Position: Top-left, 12px padding
- Background circle: Module color (semi-transparent)

**Specifications Display**
```
Font: Space Mono 12px
Color: #9ca3af (secondary text)
Line height: 1.6
Format:
  Label: Value
  Power: 8 kW / 15 kW peak
  ↑      ↑     ↑
  Label  Cont  Peak
```

**Status Badge**
```css
Available:
- Background: rgba(0, 255, 136, 0.1)
- Text: #00ff88
- Border: 1px solid #00ff88

Installed:
- Background: rgba(74, 158, 255, 0.1)
- Text: #4a9eff
- Border: 1px solid #4a9eff

Blocked (constraint):
- Background: rgba(255, 68, 68, 0.1)
- Text: #ff4444
- Border: 1px solid #ff4444

Padding: 4px 8px
Border-radius: 4px
Font: Inter 10px Bold
```

---

### **3.5 MODULE DETAIL PANEL (Slide-in)**

**Layout**
```
┌────────────────────────────────────────┐
│  🔬 ZERO-G LABORATORY       [Close ✕] │
│  Bay 5 • Status: ACTIVE                │
├────────────────────────────────────────┤
│                                         │
│  SPECIFICATIONS                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Mass:         12,000 kg                │
│  Power Cont:   8 kW                     │
│  Power Peak:   15 kW                    │
│  Thermal:      12 kW rejection          │
│  Crew:         2 scientists             │
│  Volume:       45 m³ pressurized        │
│  Data Rate:    50 Mbps downlink         │
│                                         │
│  ECONOMICS                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  CAPEX:        $270M (dev + launch)     │
│  Revenue:      $300K/month base         │
│  OPEX:         $50K/month               │
│  ROI:          98% annual               │
│  Payback:      90 months                │
│                                         │
│  REQUIREMENTS                           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  ✅ Power available (8/60 kW)          │
│  ✅ Thermal capacity (12/80 kW)        │
│  ⚠️ Requires crew airlock (missing)    │
│  ✅ Structural capacity OK             │
│                                         │
│  OPERATIONAL NOTES                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Conducts microgravity research,        │
│  materials science, and biological      │
│  experiments. Primary revenue from      │
│  commercial research contracts.         │
│                                         │
├────────────────────────────────────────┤
│  [Remove Module]        [Export Specs] │
└────────────────────────────────────────┘

Width: 400px (slide in from right)
Height: 100vh (full height)
Background: #151a23
Box-shadow: -4px 0 16px rgba(0, 0, 0, 0.5)
Animation: slideIn 0.3s ease-out
```

**Section Headers**
```css
Font: Orbitron 14px Bold
Color: #00d9ff
Text-transform: uppercase
Letter-spacing: 1px
Border-bottom: 1px solid #2d3748
Padding-bottom: 8px
Margin-bottom: 12px
```

**Data Rows**
```
Label (left):  Inter 14px Regular, #9ca3af
Value (right): Space Mono 14px Bold, #e8eaed
Justify: space-between
Padding: 8px 0
Border-bottom: 1px solid #2d3748 (last row: none)
```

**Requirement Checkboxes**
```
✅ Green: Requirement met
⚠️ Yellow: Warning (can install but not optimal)
❌ Red: Requirement not met (blocking)

Format: [Icon] Description (context)
Example: ✅ Power available (8/60 kW)
```

---

### **3.6 BUTTONS & INTERACTIVE ELEMENTS**

**Primary Button**
```css
Default:
- Background: #00d9ff
- Color: #0a0e14
- Border: none
- Padding: 12px 24px
- Font: Inter 14px Semibold
- Border-radius: 4px
- Cursor: pointer

Hover:
- Background: #00b3d9
- Box-shadow: 0 0 16px rgba(0, 217, 255, 0.4)
- Transform: translateY(-1px)

Active:
- Background: #0099b3
- Transform: translateY(0)

Disabled:
- Background: #2d3748
- Color: #6b7280
- Cursor: not-allowed
- Opacity: 0.5
```

**Secondary Button**
```css
Default:
- Background: transparent
- Color: #00d9ff
- Border: 1px solid #00d9ff
- Padding: 12px 24px
- Font: Inter 14px Semibold

Hover:
- Background: rgba(0, 217, 255, 0.1)
- Border: 1px solid #00b3d9
```

**Danger Button (Delete/Remove)**
```css
Default:
- Background: transparent
- Color: #ff4444
- Border: 1px solid #ff4444

Hover:
- Background: rgba(255, 68, 68, 0.1)
- Border: 1px solid #ff2222
```

**Icon Button**
```css
Size: 40px x 40px
Background: transparent
Border: 1px solid #2d3748
Border-radius: 4px
Icon: 20px, centered

Hover:
- Border: 1px solid #00d9ff
- Icon color: #00d9ff
```

---

### **3.7 MODALS & OVERLAYS**

**Modal Container**
```
┌───────────────────────────────────────────┐
│ Background Overlay: rgba(10, 14, 20, 0.9) │
│ Blur effect: backdrop-filter: blur(4px)   │
│                                            │
│    ┌─────────────────────────────────┐   │
│    │  Modal Content                  │   │
│    │  Max-width: 600px               │   │
│    │  Background: #151a23            │   │
│    │  Border: 1px solid #2d3748      │   │
│    │  Border-radius: 8px             │   │
│    │  Box-shadow: 0 8px 32px rgba()  │   │
│    └─────────────────────────────────┘   │
│                                            │
└───────────────────────────────────────────┘
```

**Modal Header**
```
┌─────────────────────────────────────┐
│  Modal Title              [Close ✕] │
├─────────────────────────────────────┤

Font: Orbitron 20px Bold
Color: #e8eaed
Padding: 24px
Border-bottom: 1px solid #2d3748
```

**Modal Body**
```
Padding: 24px
Font: Inter 14px Regular
Color: #e8eaed
Line-height: 1.6
Max-height: 60vh
Overflow-y: auto
```

**Modal Footer**
```
├─────────────────────────────────────┤
│  [Cancel]              [Confirm] │
└─────────────────────────────────────┘

Padding: 16px 24px
Border-top: 1px solid #2d3748
Display: flex
Justify-content: space-between
Gap: 12px
```

---

### **3.8 TOOLTIPS**

**Standard Tooltip**
```css
Background: #1e2530
Border: 1px solid #2d3748
Padding: 8px 12px
Border-radius: 4px
Box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5)
Font: Inter 12px Regular
Color: #e8eaed
Max-width: 200px
Z-index: 1000

Arrow: 8px triangle, same background color
Position: Above element (if space), below otherwise
Delay: 500ms on hover
Fade-in: 0.2s
```

**Educational Tooltip (with "ℹ️" icon)**
```css
Max-width: 300px
Padding: 12px 16px
Font: Inter 13px Regular

Header:
- Font: Inter 13px Semibold
- Color: #00d9ff
- Margin-bottom: 8px

Body:
- Color: #9ca3af
- Line-height: 1.5

Learn More Link:
- Color: #4a9eff
- Text-decoration: underline
- Font-size: 12px
```

---

### **3.9 TOAST NOTIFICATIONS**

**Toast Container**
```
Position: Fixed, top-right
Top: 80px (below header)
Right: 24px
Z-index: 9999
Max-width: 400px
```

**Toast Card**
```
┌──────────────────────────────────┐
│  [Icon] Message Text  [Dismiss]  │
└──────────────────────────────────┘

Background: #1e2530
Border: 1px solid #2d3748
Border-left: 4px solid [status color]
Padding: 16px
Border-radius: 4px
Box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3)
Animation: slideInRight 0.3s ease-out
Duration: 5 seconds (auto-dismiss)
```

**Toast Types**
```
Success:
- Border-left: #00ff88
- Icon: ✅
- Text: #e8eaed

Warning:
- Border-left: #ffbb00
- Icon: ⚠️
- Text: #e8eaed

Error:
- Border-left: #ff4444
- Icon: ❌
- Text: #e8eaed

Info:
- Border-left: #4a9eff
- Icon: ℹ️
- Text: #e8eaed
```

---

### **3.10 CHARTS & VISUALIZATIONS**

**Cash Flow Chart (Recharts)**
```
Type: Line chart
Dimensions: Full width x 300px
Background: Transparent
Grid: Horizontal lines only, #2d3748
Axes: #6b7280 (muted text)
Line color: #00d9ff (cyan gradient)
Fill: Linear gradient (cyan to transparent)
Points: Circles, 4px, cyan
Tooltip: Custom styled (matches modal style)
```

**Progress Bar (Constraints)**
```
Already specified in 3.3
Gradient colors based on percentage
Animated transitions (0.3s ease)
```

**Sankey Diagram (Power Flow)**
```
Library: Recharts or custom D3
Colors: Match module colors
Links: Semi-transparent gradients
Labels: Space Mono 12px
Background: Transparent
```

---

### **3.11 LOADING STATES**

**Spinner Component**
```css
Size: 40px x 40px
Border: 4px solid #2d3748
Border-top: 4px solid #00d9ff
Border-radius: 50%
Animation: spin 0.8s linear infinite

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

**Loading Overlay (for heavy operations)**
```
Background: rgba(10, 14, 20, 0.95)
Backdrop-filter: blur(4px)
Display: Flex, center-aligned
Z-index: 10000

Content:
- Spinner (above)
- Text: "Generating PDF..." (below spinner)
- Font: Inter 14px, #9ca3af
- Optional: Progress bar if deterministic
```

**Skeleton Loading (for module cards)**
```css
Background: Linear gradient
  90deg,
  #1e2530 25%,
  #2d3748 50%,
  #1e2530 75%
Animation: shimmer 1.5s infinite
Background-size: 200% 100%

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

## 4. ANIMATION SPECIFICATIONS

### **4.1 Module Installation**
```
Duration: 400ms
Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (back-out)

Keyframes:
0%:   opacity: 0, scale: 0.8, translateY(-20px)
100%: opacity: 1, scale: 1, translateY(0)
```

### **4.2 Module Removal**
```
Duration: 300ms
Easing: ease-in

Keyframes:
0%:   opacity: 1, scale: 1
50%:  opacity: 0.5, scale: 0.95
100%: opacity: 0, scale: 0.8, translateY(-10px)
```

### **4.3 Constraint Violation (Shake)**
```
Duration: 400ms
Easing: ease-in-out

Keyframes:
0%, 100%: translateX(0)
10%, 30%, 50%, 70%, 90%: translateX(-4px)
20%, 40%, 60%, 80%: translateX(4px)
```

### **4.4 Success Glow**
```
Duration: 1000ms
Easing: ease-out

Keyframes:
0%
:   box-shadow: 0 0 0 rgba(0, 255, 136, 0)
50%:  box-shadow: 0 0 20px rgba(0, 255, 136, 0.6)
100%: box-shadow: 0 0 0 rgba(0, 255, 136, 0)
```

### **4.5 Panel Slide-In (Detail Panel)**
```
Duration: 300ms
Easing: ease-out

Keyframes:
0%:   translateX(100%), opacity: 0
100%: translateX(0), opacity: 1
```

### **4.6 Warning Pulse**
```
Duration: 2000ms
Easing: ease-in-out
Iteration: Infinite

Keyframes:
0%, 100%: opacity: 1
50%:      opacity: 0.6
```

---

## 5. RESPONSIVE DESIGN

### **Desktop (1920px+)**
- Full 3-column layout
- 3D view always visible
- All features accessible simultaneously

### **Laptop (1280-1919px)**
- 3-column layout (narrower columns)
- 3D view collapsible (toggle)
- Reduce chart heights by 20%

### **Tablet (768-1279px)**
- 2-column layout:
  - Left: Station View (full width)
  - Right: Systems Dashboard (full width)
- Module Palette: Drawer/sidebar (toggle)
- 3D view: Optional tab view
- Financial charts: Stacked vertically

### **Mobile (<768px) - MINIMAL SUPPORT**
```
Display warning:
"This tool is optimized for desktop.
 Minimum resolution: 1280x800"

Offer:
- Export current config
- Shareable URL
- PDF download
- Redirect to desktop
```

---

## 6. ACCESSIBILITY

### **Keyboard Navigation**
```
Tab:        Navigate interactive elements
Enter:      Activate buttons
Esc:        Close modals/panels, cancel selection
1-9:        Select bay (when no modal open)
Arrow keys: Navigate grid cells
Space:      Toggle selections
Cmd/Ctrl+E: Export menu
Cmd/Ctrl+S: Save to localStorage
```

### **Focus States**
```css
Default focus:
- Outline: 2px solid #00d9ff
- Outline-offset: 2px
- Box-shadow: 0 0 0 4px rgba(0, 217, 255, 0.2)

Remove default browser outline:
outline: none; (only if custom focus applied)
```

### **Screen Reader Support**
```html
- All interactive elements have aria-label
- Status changes announced with aria-live regions
- Module cards: role="button", aria-label="Install Zero-G Lab"
- Constraint status: aria-label="Power: 75% utilized, OK"
- Warnings: role="alert"
```

### **Color Blindness**
- Never rely on color alone
- Always pair color with icon/text
- Green = ✅, Yellow = ⚠️, Red = ❌
- Patterns/textures for critical distinctions

---

## 7. MICRO-INTERACTIONS

### **Button Hover**
- Lift effect: translateY(-1px)
- Glow: box-shadow with color
- Transition: 0.2s ease

### **Card Hover (Module Palette)**
- Lift: translateY(-2px)
- Border glow: 0 0 12px rgba(cyan, 0.3)
- Transition: 0.2s ease

### **Drag Preview**
- Reduce opacity to 0.9
- Add drop shadow: 0 4px 16px rgba(0, 0, 0, 0.5)
- Cursor: grabbing

### **Number Changes (Metrics)**
- Flash color on change:
  - Increase: Flash green (#00ff88)
  - Decrease: Flash red (#ff4444)
- Duration: 400ms
- Return to normal color

### **Toggle Switches**
```css
Width: 48px
Height: 24px
Background: #2d3748 (off), #00d9ff (on)
Knob: 20px circle, white
Transition: 0.3s ease
Knob slides left/right with smooth animation
```

---

## 8. SPECIAL STATES

### **Empty Configuration**
```
Display in center of Station View:
┌─────────────────────────────────┐
│                                  │
│     🚀 NO MODULES INSTALLED      │
│                                  │
│  Get started by:                 │
│  • Dragging modules from palette │
│  • Loading a preset config       │
│  • Importing a saved config      │
│                                  │
│  [Load Preset ▼]                │
│                                  │
└─────────────────────────────────┘

Font: Orbitron 18px
Color: #6b7280 (muted)
Icon: 64px emoji
Padding: 64px
Text-align: center
```

### **All Constraints Violated**
```
Red overlay on Systems Dashboard:
┌─────────────────────────────────────┐
│  ❌ CONFIGURATION INVALID            │
├─────────────────────────────────────┤
│  Critical issues:                    │
│  • Power budget exceeded (+15 kW)    │
│  • Thermal overload (+12 kW)         │
│  • No crew airlock (3 modules need)  │
│                                      │
│  This configuration cannot operate.  │
│  Remove modules or add support.      │
└─────────────────────────────────────┘

Background: rgba(255, 68, 68, 0.1)
Border: 2px solid #ff4444
Padding: 24px
```

### **Optimal Configuration Achievement**
```
Green badge in header:
[✅ Optimal Config] 

Toast notification:
"✨ Optimal configuration achieved!
 All systems green, maximum efficiency."

Subtle confetti animation (optional, 2 seconds)
```

---

## 9. APPROVAL CHECKPOINT

This Design Document defines:
- ✅ Complete visual language (colors, typography, spacing)
- ✅ All component specifications with exact measurements
- ✅ Animation timings and easing functions
- ✅ Responsive breakpoints and mobile handling
- ✅ Accessibility requirements (keyboard, screen reader, focus)
- ✅ Micro-interactions and special states
- ✅ Brutalist technical aesthetic maintained throughout


# Phase 4: Backend Document (Tech Stack & Schema)
## VISHWAKARMA Technical Configuration System - TECHNICAL ARCHITECTURE

---

## 1. TECH STACK JUSTIFICATION

### **Frontend Framework: React 18.3+ with TypeScript**

**Why React?**
- ✅ Component-based architecture perfect for modular UI (module cards, panels, etc.)
- ✅ Virtual DOM enables efficient re-renders during real-time constraint calculations
- ✅ Massive ecosystem (Three.js, Recharts, jsPDF integrations)
- ✅ React hooks simplify complex state management
- ✅ Already used in existing demo (continuity)

**Why TypeScript?**
- ✅ Type safety prevents calculation errors (critical for engineering tool)
- ✅ IntelliSense makes development faster
- ✅ Compile-time error detection (catch bugs before runtime)
- ✅ Self-documenting code (interfaces show data structure)
- ✅ Refactoring confidence (rename/restructure safely)

**Alternative Considered:** Vanilla JS
- ❌ Rejected: No type safety, harder to maintain complex state

---

### **State Management: Zustand**

**Why Zustand?**
- ✅ Lightweight (1KB vs Redux 10KB)
- ✅ No boilerplate (direct state mutations)
- ✅ Built-in TypeScript support
- ✅ DevTools integration for debugging
- ✅ Selectors prevent unnecessary re-renders
- ✅ Perfect for complex derived state (calculated metrics)

**Alternative Considered:** Redux Toolkit
- ❌ Rejected: Too heavyweight for this scope, excessive boilerplate

**Alternative Considered:** React Context + useReducer
- ❌ Rejected: Performance issues with frequent updates (real-time calculations)

---

### **3D Visualization: Three.js r128**

**Why Three.js?**
- ✅ Available in Claude artifacts (r128 via CDN)
- ✅ Industry standard for WebGL
- ✅ Orbit controls built-in
- ✅ Efficient rendering for simple geometry
- ✅ Large community, extensive documentation

**Version:** r128 (CRITICAL: No CapsuleGeometry, use alternatives)

**Alternative Considered:** Babylon.js
- ❌ Rejected: Not available in Claude artifacts, heavier bundle

---

### **Charts: Recharts**

**Why Recharts?**
- ✅ React-native API (components, not imperative)
- ✅ Beautiful defaults, minimal configuration
- ✅ Responsive out-of-the-box
- ✅ TypeScript support
- ✅ Available in Claude artifacts

**Chart Types Used:**
- Line chart: Cash flow timeline
- Area chart: Revenue accumulation
- Bar chart: Scenario comparison
- Custom: Sankey diagram (power flow)

**Alternative Considered:** Chart.js
- ❌ Rejected: Imperative API, harder to integrate with React

---

### **PDF Generation: jsPDF + html2canvas**

**Why jsPDF?**
- ✅ Client-side PDF generation (no backend needed)
- ✅ Programmatic control (not just HTML to PDF)
- ✅ Multi-page support
- ✅ Text, images, tables, charts

**Why html2canvas?**
- ✅ Capture charts/3D views as images
- ✅ Embed in PDF as raster graphics

**Alternative Considered:** Server-side PDF (Puppeteer)
- ❌ Rejected: Requires backend, not client-side only

---

### **Styling: Tailwind CSS**

**Why Tailwind?**
- ✅ Utility-first = rapid prototyping
- ✅ Consistent spacing system (matches design doc)
- ✅ No runtime cost (pre-compiled)
- ✅ PurgeCSS removes unused classes (tiny bundle)
- ✅ Dark mode built-in

**CRITICAL LIMITATION:**
- ⚠️ Claude artifacts only support **core utility classes**
- ⚠️ No Tailwind compiler, no custom classes
- ⚠️ Must use pre-defined classes only

**Fallback:** Custom CSS for complex styles (gradients, animations)

---

### **Data Persistence: localStorage + URL Encoding**

**Why localStorage?**
- ✅ Client-side only (no backend)
- ✅ Persistent across sessions
- ✅ 5-10MB capacity (sufficient)
- ✅ Synchronous API (simple)

**Why URL Encoding?**
- ✅ Shareable configurations
- ✅ No server needed
- ✅ Bookmarkable links

**Encoding Strategy:**
- JSON.stringify → LZ-String compression → Base64 → URL param

**Alternative Considered:** IndexedDB
- ❌ Rejected: Overkill for simple key-value storage

---

### **Build Tool: Vite**

**Why Vite?**
- ✅ Lightning-fast HMR (hot module replacement)
- ✅ Native ESM support
- ✅ TypeScript out-of-the-box
- ✅ Tree-shaking optimized
- ✅ Smaller bundle than Webpack

**Alternative Considered:** Create React App
- ❌ Rejected: Slower builds, deprecated by React team

---

### **Deployment: Vercel (Free Tier)**

**Why Vercel?**
- ✅ Zero-config deployment
- ✅ Automatic HTTPS
- ✅ CDN edge network (fast global access)
- ✅ Preview deployments (test before prod)
- ✅ Free tier: 100GB bandwidth/month

**Alternative Considered:** Netlify
- ✅ Also viable, similar features

**Alternative Considered:** GitHub Pages
- ❌ Rejected: No preview deployments, manual config

---

## 2. DATA STRUCTURES

### **2.1 Core Types (TypeScript Interfaces)**

```typescript
// ============================================
// MODULE SPECIFICATIONS
// ============================================

interface ModuleSpec {
  id: string;                    // e.g., "zero_g_lab"
  name: string;                  // e.g., "Zero-G Laboratory"
  emoji: string;                 // e.g., "🔬"
  category: ModuleCategory;      // Research | Manufacturing | Support | Power
  
  // Physical specs
  mass: number;                  // kg
  volume: number;                // m³
  
  // Power specs
  power_continuous: number;      // kW (normal operation)
  power_peak: number;            // kW (maximum load)
  
  // Thermal specs
  thermal_generation: number;    // kW (heat produced)
  
  // Crew requirements
  crew_required: number;         // Number of crew needed
  crew_capacity: number;         // Max crew this module supports
  
  // Data specs
  data_rate: number;             // Mbps (bandwidth usage)
  
  // Economics
  capex_development: number;     // $ (development cost)
  capex_launch: number;          // $ (launch cost)
  revenue_min: number;           // $/month (pessimistic)
  revenue_max: number;           // $/month (optimistic)
  opex_monthly: number;          // $/month (operating cost)
  
  // Dependencies
  requires_airlock: boolean;     // Needs crew access?
  requires_vacuum: boolean;      // Needs vacuum exposure?
  requires_power_station: boolean; // Needs extra power?
  
  // Reliability
  mtbf_months: number;           // Mean time between failures
  
  // UI
  color_primary: string;         // Hex color for visualization
  color_secondary: string;       // Gradient end color
  description: string;           // Short description
}

type ModuleCategory = 
  | "research" 
  | "manufacturing" 
  | "computing" 
  | "life_support" 
  | "power" 
  | "utility";

// ============================================
// HUB SPECIFICATIONS
// ============================================

interface HubSpec {
  mass: number;                  // 25,000 kg
  docking_ports: number;         // 9
  power_generation: number;      // 60 kW
  power_storage: number;         // 300 kWh
  thermal_capacity: number;      // 80 kW
  crew_capacity: number;         // 10
  data_capacity: number;         // 500 Mbps
  capex_development: number;     // $350M
  capex_launch: number;          // $150M
}

// ============================================
// CONFIGURATION STATE
// ============================================

interface StationConfiguration {
  version: string;               // "2.0"
  timestamp: number;             // Unix timestamp
  name: string;                  // User-defined name
  
  hub: HubSpec;
  
  bays: {
    [bayNumber: string]: InstalledModule | null; // "1" through "9"
  };
  
  modules_library: {
    [moduleId: string]: ModuleSpec;
  };
  
  // Calculated metrics (derived state)
  calculated: CalculatedMetrics;
  
  // Mission timeline
  timeline: MissionEvent[];
  
  // Financial settings
  financial_assumptions: FinancialAssumptions;
}

interface InstalledModule {
  module_id: string;             // Reference to ModuleSpec
  bay_number: number;            // 1-9
  status: ModuleStatus;          // active | inactive | maintenance
  install_date: number;          // Mission day (0 = hub launch)
  operational_date: number;      // When module becomes operational
}

type ModuleStatus = "active" | "inactive" | "maintenance";

// ============================================
// CALCULATED METRICS
// ============================================

interface CalculatedMetrics {
  // Power
  power_total_continuous: number;  // kW
  power_total_peak: number;        // kW
  power_available: number;         // kW (from hub + power stations)
  power_utilization_continuous: number; // Percentage
  power_utilization_peak: number;  // Percentage
  power_reserve_margin: number;    // kW remaining
  
  // Thermal
  thermal_total: number;           // kW heat generated
  thermal_capacity: number;        // kW cooling available
  thermal_utilization: number;     // Percentage
  thermal_margin: number;          // kW remaining
  
  // Mass
  mass_total: number;              // kg
  mass_limit: number;              // 200,000 kg
  mass_utilization: number;        // Percentage
  center_of_mass_offset: Vector3; // Meters from hub center
  com_status: "excellent" | "acceptable" | "warning" | "critical";
  
  // Crew
  crew_total_required: number;     // Number of crew needed
  crew_capacity: number;           // Max crew supported
  crew_utilization: number;        // Percentage
  has_airlock: boolean;            // Is crew access possible?
  
  // Data
  data_total: number;              // Mbps used
  data_capacity: number;           // Mbps available
  data_utilization: number;        // Percentage
  
  // Economics
  capex_total: number;             // $ total capital expenditure
  revenue_monthly_min: number;     // $ pessimistic revenue
  revenue_monthly_max: number;     // $ optimistic revenue
  revenue_monthly_expected: number; // $ base case
  opex_monthly: number;            // $ operating costs
  profit_monthly: number;          // $ net monthly profit
  
  // Financial metrics
  breakeven_months: number;        // Months to profitability
  npv_10yr: number;                // $ net present value
  irr: number;                     // % internal rate of return
  payback_period_months: number;   // Months to recover CAPEX
  roi_annual: number;              // % annual return on investment
  
  // Constraints
  constraints_met: boolean;        // All constraints satisfied?
  warnings: Warning[];             // List of warnings
  errors: ConstraintError[];       // List of violations
  
  // Operational
  propellant_monthly: number;      // kg/month for station-keeping
  propellant_10yr: number;         // kg total over 10 years
  
  // Risk
  expected_failures_10yr: number;  // Number of module failures
  redundancy_score: number;        // 0-10 (10 = fully redundant)
}

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface Warning {
  id: string;
  severity: "info" | "warning" | "critical";
  category: WarningCategory;
  message: string;
  recommendation?: string;
  affected_modules?: string[];    // Module IDs
}

type WarningCategory = 
  | "power" 
  | "thermal" 
  | "mass" 
  | "crew" 
  | "data" 
  | "dependency" 
  | "operational";

interface ConstraintError {
  id: string;
  constraint: string;              // e.g., "thermal_capacity"
  current_value: number;
  limit_value: number;
  excess: number;
  blocking: boolean;               // Prevents operation?
  message: string;
}

// ============================================
// MISSION TIMELINE
// ============================================

interface MissionEvent {
  id: string;
  type: EventType;
  mission_day: number;             // Days from hub launch (day 0)
  module_id?: string;              // If module-related
  bay_number?: number;             // If installation
  description: string;
  cost?: number;                   // $ if financial impact
  revenue_impact?: number;         // $/month change
}

type EventType = 
  | "launch" 
  | "installation" 
  | "operational" 
  | "maintenance" 
  | "reboost" 
  | "crew_rotation";

// ============================================
// FINANCIAL ASSUMPTIONS
// ============================================

interface FinancialAssumptions {
  discount_rate: number;           // % (default: 10%)
  launch_cost_multiplier: number;  // Multiplier (default: 1.0)
  revenue_multiplier: number;      // Multiplier (default: 1.0)
  opex_multiplier: number;         // Multiplier (default: 1.0)
  inflation_rate: number;          // % (default: 3%)
  tax_rate: number;                // % (default: 0, not modeled)
}

// ============================================
// COMPARISON MODE
// ============================================

interface ConfigurationComparison {
  configs: StationConfiguration[]; // 2-3 configs
  comparison_metrics: ComparisonMetric[];
  trade_offs: TradeOffAnalysis[];
  recommendation: string;
}

interface ComparisonMetric {
  label: string;
  values: number[];                // One per config
  unit: string;
  better_direction: "higher" | "lower"; // Which is better?
  best_index: number;              // Index of best config
}

interface TradeOffAnalysis {
  config_a_index: number;
  config_b_index: number;
  advantages_a: string[];
  advantages_b: string[];
  net_recommendation: string;
}

// ============================================
// OPTIMIZATION
// ============================================

interface OptimizationRequest {
  objective: OptimizationObjective;
  locked_modules: string[];        // Module IDs that can't change
  constraints: {
    max_capex?: number;            // $ budget limit
    min_revenue?: number;          // $/month minimum
    max_thermal?: number;          // kW limit
  };
}

type OptimizationObjective = 
  | "maximize_revenue" 
  | "minimize_cost" 
  | "maximize_npv" 
  | "balance_risk";

interface OptimizationResult {
  suggested_config: StationConfiguration;
  changes: ConfigurationChange[];
  impact_summary: {
    revenue_change: number;        // $/month
    capex_change: number;          // $
    npv_change: number;            // $
    constraint_improvements: string[];
  };
  reasoning: string;
}

interface ConfigurationChange {
  action: "add" | "remove" | "replace";
  module_id: string;
  bay_number: number;
  reason: string;
  impact: string;
}

// ============================================
// EXPORT FORMATS
// ============================================

interface PDFExportOptions {
  include_3d_render: boolean;
  include_charts: boolean;
  include_timeline: boolean;
  include_methodology: boolean;
}

interface ExportedConfiguration {
  config: StationConfiguration;
  export_date: string;
  export_format_version: string;
  checksum?: string;               // For validation
}
```

---

### **2.2 Module Library (Hardcoded Data)**

```typescript
// This is the source of truth for all module specs
export const MODULE_LIBRARY: Record<string, ModuleSpec> = {
  zero_g_lab: {
    id: "zero_g_lab",
    name: "Zero-G Laboratory",
    emoji: "🔬",
    category: "research",
    mass: 12000,
    volume: 45,
    power_continuous: 8,
    power_peak: 15,
    thermal_generation: 12,
    crew_required: 2,
    crew_capacity: 2,
    data_rate: 50,
    capex_development: 180000000,
    capex_launch: 90000000,
    revenue_min: 250000,
    revenue_max: 350000,
    opex_monthly: 50000,
    requires_airlock: true,
    requires_vacuum: false,
    requires_power_station: false,
    mtbf_months: 60,
    color_primary: "#4a9eff",
    color_secondary: "#0066cc",
    description: "Microgravity research facility for materials science and biology experiments."
  },
  
  manufacturing_fab: {
    id: "manufacturing_fab",
    name: "Manufacturing Fab (ZBLAN)",
    emoji: "🏭",
    category: "manufacturing",
    mass: 15000,
    volume: 60,
    power_continuous: 12,
    power_peak: 25,
    thermal_generation: 20,
    crew_required: 1,
    crew_capacity: 1,
    data_rate: 30,
    capex_development: 220000000,
    capex_launch: 110000000,
    revenue_min: 500000,
    revenue_max: 2000000,
    opex_monthly: 80000,
    requires_airlock: true,
    requires_vacuum: true,
    requires_power_station: false,
    mtbf_months: 36,
    color_primary: "#ff6b35",
    color_secondary: "#cc3300",
    description: "Orbital manufacturing facility for ZBLAN fiber optics and advanced materials."
  },
  
  data_center: {
    id: "data_center",
    name: "Data Center",
    emoji: "🖥️",
    category: "computing",
    mass: 8000,
    volume: 30,
    power_continuous: 20,
    power_peak: 30,
    thermal_generation: 25,
    crew_required: 0,
    crew_capacity: 0,
    data_rate: 1000,
    capex_development: 140000000,
    capex_launch: 70000000,
    revenue_min: 120000,
    revenue_max: 180000,
    opex_monthly: 30000,
    requires_airlock: false,
    requires_vacuum: false,
    requires_power_station: false,
    mtbf_months: 48,
    color_primary: "#00d9ff",
    color_secondary: "#0099cc",
    description: "High-performance computing facility leveraging space environment for cooling efficiency."
  },
  
  hydroponics: {
    id: "hydroponics",
    name: "Hydroponics Bay",
    emoji: "🌱",
    category: "life_support",
    mass: 10000,
    volume: 50,
    power_continuous: 6,
    power_peak: 8,
    thermal_generation: 8,
    crew_required: 0.5,
    crew_capacity: 0,
    data_rate: 5,
    capex_development: 160000000,
    capex_launch: 80000000,
    revenue_min: 30000,
    revenue_max: 70000,
    opex_monthly: 20000,
    requires_airlock: true,
    requires_vacuum: false,
    requires_power_station: false,
    mtbf_months: 72,
    color_primary: "#00ff88",
    color_secondary: "#00cc66",
    description: "Closed-loop agricultural system for fresh food production and life support."
  },
  
  service_station: {
    id: "service_station",
    name: "Satellite Servicing Station",
    emoji: "🛰️",
    category: "utility",
    mass: 18000,
    volume: 120,
    power_continuous: 5,
    power_peak: 30,
    thermal_generation: 15,
    crew_required: 2,
    crew_capacity: 2,
    data_rate: 100,
    capex_development: 280000000,
    capex_launch: 140000000,
    revenue_min: 833333, // $10M per mission / 12 months
    revenue_max: 4166667, // $50M per mission / 12 months
    opex_monthly: 150000,
    requires_airlock: true,
    requires_vacuum: true,
    requires_power_station: false,
    mtbf_months: 48,
    color_primary: "#9333ea",
    color_secondary: "#6b21a8",
    description: "Robotic servicing facility for satellite repair, refueling, and orbital debris removal."
  },
  
  power_station: {
    id: "power_station",
    name: "Power Station",
    emoji: "⚡",
    category: "power",
    mass: 6000,
    volume: 20,
    power_continuous: -40, // GENERATES power (negative consumption)
    power_peak: -40,
    thermal_generation: 5, // Minimal electronics heat
    crew_required: 0,
    crew_capacity: 0,
    data_rate: 2,
    capex_development: 120000000,
    capex_launch: 60000000,
    revenue_min: 5000, // Charging services
    revenue_max: 10000,
    opex_monthly: 10000,
    requires_airlock: false,
    requires_vacuum: false,
    requires_power_station: false,
    mtbf_months: 120,
    color_primary: "#ffbb00",
    color_secondary: "#cc9900",
    description: "Additional 40 kW solar array with 200 kWh battery storage for expanded power capacity."
  },
  
  health_care: {
    id: "health_care",
    name: "Health Care Module",
    emoji: "🏥",
    category: "life_support",
    mass: 11000,
    volume: 35,
    power_continuous: 7,
    power_peak: 12,
    thermal_generation: 10,
    crew_required: 1,
    crew_capacity: 1,
    data_rate: 50,
    capex_development: 190000000,
    capex_launch: 95000000,
    revenue_min: 80000,
    revenue_max: 120000,
    opex_monthly: 60000,
    requires_airlock: true,
    requires_vacuum: false,
    requires_power_station: false,
    mtbf_months: 60,
    color_primary: "#ff4444",
    color_secondary: "#cc0000",
    description: "Medical facility with surgery bay, diagnostics, and telemedicine for crew health."
  },
  
  crew_airlock: {
    id: "crew_airlock",
    name: "Crew Airlock",
    emoji: "🚪",
    category: "utility",
    mass: 5000,
    volume: 15,
    power_continuous: 2,
    power_peak: 8,
    thermal_generation: 3,
    crew_required: 0,
    crew_capacity: 2, // For EVA
    data_rate: 5,
    capex_development: 100000000,
    capex_launch: 50000000,
    revenue_min: 0,
    revenue_max: 0,
    opex_monthly: 15000,
    requires_airlock: false, // This IS the airlock
    requires_vacuum: false,
    requires_power_station: false,
    mtbf_months: 96,
    color_primary: "#6b7280",
    color_secondary: "#4b5563",
    description: "Essential EVA egress point for crew operations and emergency procedures."
  },
  
  cargo_bay: {
    id: "cargo_bay",
    name: "Cargo Bay",
    emoji: "📦",
    category: "utility",
    mass: 9000,
    volume: 100,
    power_continuous: 3,
    power_peak: 5,
    thermal_generation: 4,
    crew_required: 0,
    crew_capacity: 0,
    data_rate: 10,
    capex_development: 150000000,
    capex_launch: 75000000,
    revenue_min: 150000,
    revenue_max: 250000,
    opex_monthly: 25000,
    requires_airlock: false,
    requires_vacuum: true,
    requires_power_station: false,
    mtbf_months: 84,
    color_primary: "#a16207",
    color_secondary: "#78350f",
    description: "Unpressurized storage facility for cargo, experiments, and satellite staging."
  }
};

export const HUB_SPEC: HubSpec = {
  mass: 25000,
  docking_ports: 9,
  power_generation: 60,
  power_storage: 300,
  thermal_capacity: 80,
  crew_capacity: 10,
  data_capacity: 500,
  capex_development: 350000000,
  capex_launch: 150000000
};
```

---

## 3. CALCULATION ENGINE

### **3.1 Core Calculation Functions**

```typescript
// ============================================
// CONSTRAINT CALCULATIONS
// ============================================

export function calculateMetrics(
  config: StationConfiguration
): CalculatedMetrics {
  const installed = Object.values(config.bays).filter(m => m !== null);
  const modules = installed.map(im => 
    config.modules_library[im!.module_id]
  );
  
  // Power calculations
  const power_continuous = modules.reduce(
    (sum, m) => sum + m.power_continuous, 0
  );
  const power_peak = modules.reduce(
    (sum, m) => sum + m.power_peak, 0
  );
  const power_available = config.hub.power_generation + 
    modules
      .filter(m => m.id === "power_station")
      .reduce((sum) => sum + 40, 0); // Each power station adds 40 kW
  
  // Thermal calculations
  const thermal_total = modules.reduce(
    (sum, m) => sum + m.thermal_generation, 0
  );
  const thermal_capacity = config.hub.thermal_capacity;
  
  // Mass calculations
  const mass_total = config.hub.mass + 
    modules.reduce((sum, m) => sum + m.mass, 0);
  
  // Center of mass (simplified 2D calculation)
  const com = calculateCenterOfMass(config);
  
  // Crew calculations
  const crew_required = modules.reduce(
    (sum, m) => sum + m.crew_required, 0
  );
  const has_airlock = modules.some(m => m.id === "crew_airlock");
  
  // Data calculations
  const data_total = modules.reduce(
    (sum, m) => sum + m.data_rate, 0
  );
  
  // Economics
  const capex_total = config.hub.capex_development + 
    config.hub.capex_launch +
    modules.reduce((sum, m) => 
      sum + m.capex_development + m.capex_launch, 0
    );
  
  const revenue_monthly_expected = modules.reduce((sum, m) => 
    sum + (m.revenue_min + m.revenue_max) / 2, 0
  );
  
  const opex_monthly = modules.reduce((sum, m) => 
    sum + m.opex_monthly, 0
  );
  
  // Financial metrics
  const financial = calculateFinancialMetrics(
    capex_total,
    revenue_monthly_expected,
    opex_monthly,
    config.financial_assumptions
  );
  
  // Warnings and errors
  const { warnings, errors } = generateWarningsAndErrors(
    power_continuous,
    power_peak,
    power_available,
    thermal_total,
    thermal_capacity,
    crew_required,
    has_airlock,
    data_total,
    config.hub.data_capacity,
    com
  );
  
  return {
    power_total_continuous: power_continuous,
    power_total_peak: power_peak,
    power_available,
    power_utilization_continuous: (power_continuous / power_available) * 100,
    power_utilization_peak: (power_peak / power_available) * 100,
    power_reserve_margin: power_available - power_continuous,
    
    thermal_total,
    thermal_capacity,
    thermal_utilization: (thermal_total / thermal_capacity) * 100,
    thermal_margin: thermal_capacity - thermal_total,
    
    mass_total,
    mass_limit: 200000,
    mass_utilization: (mass_total / 200000) * 100,
    center_of_mass_offset: com,
    com_status: getCoMStatus(com),
    
    crew_total_required: crew_required,
    crew_capacity: config.hub.crew_capacity,
    crew_utilization: (crew_required / config.hub.crew_capacity) * 100,
    has_airlock,
    
    data_total,
    data_capacity: config.hub.data_capacity,
    data_utilization: (data_total / config.hub.data_capacity) * 100,
    
    capex_total,
    revenue_monthly_min: modules.reduce((s, m) => s + m.revenue_min, 0),
    revenue_monthly_max: modules.reduce((s, m) => s + m.revenue_max, 0),
    revenue_monthly_expected,
    opex_monthly,
    profit_monthly: revenue_monthly_expected - opex_monthly,
    
    breakeven_months: financial.breakeven_months,
    npv_10yr: financial.npv_10yr,
    irr: financial.irr,
    payback_period_months: financial.payback_period,
    roi_annual: financial.roi_annual,
    
    constraints_met: errors.length === 0,
    warnings,
    errors,
    
    propellant_monthly: 200, // Fixed for 400-450km orbit
    propellant_10yr: 200 * 120,
    
    expected_failures_10yr: modules.reduce((sum, m) => 
      sum + (120 / m.mtbf_months), 0
    ),
    redundancy_score: calculateRedundancyScore(modules),
  };
}

// ============================================
// CENTER OF MASS CALCULATION
// ============================================

function calculateCenterOfMass(
  config: StationConfiguration
): Vector3 {
  // Bay positions in 3x3 grid (meters from hub center)
  const BAY_POSITIONS:
  Record<number, Vector3> = {
    1: { x: -10, y: -10, z: 0 },
    2: { x: 0,   y: -10, z: 0 },
    3: { x: 10,  y: -10, z: 0 },
    4: { x: -10, y: 0,   z: 0 },
    5: { x: 0,   y: 0,   z: 0 }, // Hub center
    6: { x: 10,  y: 0,   z: 0 },
    7: { x: -10, y: 10,  z: 0 },
    8: { x: 0,   y: 10,  z: 0 },
    9: { x: 10,  y: 10,  z: 0 },
  };
  
  let total_mass = config.hub.mass;
  let weighted_sum = { x: 0, y: 0, z: 0 };
  
  // Hub at center (position 0, 0, 0)
  // Contributes 0 to weighted sum
  
  Object.entries(config.bays).forEach(([bay, installed]) => {
    if (installed) {
      const module = config.modules_library[installed.module_id];
      const position = BAY_POSITIONS[parseInt(bay)];
      
      total_mass += module.mass;
      weighted_sum.x += module.mass * position.x;
      weighted_sum.y += module.mass * position.y;
      weighted_sum.z += module.mass * position.z;
    }
  });
  
  return {
    x: weighted_sum.x / total_mass,
    y: weighted_sum.y / total_mass,
    z: weighted_sum.z / total_mass,
  };
}

function getCoMStatus(com: Vector3): "excellent" | "acceptable" | "warning" | "critical" {
  const offset = Math.sqrt(com.x ** 2 + com.y ** 2 + com.z ** 2);
  
  if (offset < 1.0) return "excellent";
  if (offset < 2.0) return "acceptable";
  if (offset < 3.0) return "warning";
  return "critical";
}

// ============================================
// FINANCIAL CALCULATIONS
// ============================================

function calculateFinancialMetrics(
  capex: number,
  monthly_revenue: number,
  monthly_opex: number,
  assumptions: FinancialAssumptions
): {
  breakeven_months: number;
  npv_10yr: number;
  irr: number;
  payback_period: number;
  roi_annual: number;
} {
  const monthly_profit = monthly_revenue - monthly_opex;
  
  // Break-even: When cumulative profit equals CAPEX
  const breakeven_months = monthly_profit > 0 
    ? Math.ceil(capex / monthly_profit)
    : Infinity;
  
  // NPV calculation (10 years = 120 months)
  const discount_rate_monthly = assumptions.discount_rate / 12 / 100;
  let npv = -capex; // Initial investment
  
  for (let month = 1; month <= 120; month++) {
    const discounted_cf = monthly_profit / Math.pow(1 + discount_rate_monthly, month);
    npv += discounted_cf;
  }
  
  // IRR (simplified Newton-Raphson approximation)
  const irr = calculateIRR(capex, monthly_profit, 120);
  
  // Payback period (same as break-even for simple case)
  const payback_period = breakeven_months;
  
  // Annual ROI
  const annual_profit = monthly_profit * 12;
  const roi_annual = (annual_profit / capex) * 100;
  
  return {
    breakeven_months,
    npv_10yr: npv,
    irr,
    payback_period,
    roi_annual,
  };
}

// Simplified IRR calculation (Newton-Raphson method)
function calculateIRR(
  initial_investment: number,
  monthly_cash_flow: number,
  periods: number
): number {
  let rate = 0.1; // Initial guess: 10%
  const tolerance = 0.0001;
  const max_iterations = 100;
  
  for (let i = 0; i < max_iterations; i++) {
    let npv = -initial_investment;
    let derivative = 0;
    
    for (let month = 1; month <= periods; month++) {
      npv += monthly_cash_flow / Math.pow(1 + rate, month / 12);
      derivative -= (month / 12) * monthly_cash_flow / Math.pow(1 + rate, month / 12 + 1);
    }
    
    if (Math.abs(npv) < tolerance) {
      return rate * 100; // Convert to percentage
    }
    
    rate = rate - npv / derivative;
    
    if (rate < -0.99) rate = -0.99; // Prevent negative infinity
    if (rate > 10) rate = 10; // Cap at 1000% (unrealistic)
  }
  
  return rate * 100;
}

// ============================================
// WARNING AND ERROR GENERATION
// ============================================

function generateWarningsAndErrors(
  power_cont: number,
  power_peak: number,
  power_avail: number,
  thermal: number,
  thermal_cap: number,
  crew: number,
  has_airlock: boolean,
  data: number,
  data_cap: number,
  com: Vector3
): { warnings: Warning[]; errors: ConstraintError[] } {
  const warnings: Warning[] = [];
  const errors: ConstraintError[] = [];
  
  // Power checks
  if (power_cont > power_avail) {
    errors.push({
      id: "power_exceeded",
      constraint: "power_continuous",
      current_value: power_cont,
      limit_value: power_avail,
      excess: power_cont - power_avail,
      blocking: true,
      message: `Power budget exceeded by ${(power_cont - power_avail).toFixed(1)} kW`,
    });
  } else if (power_cont / power_avail > 0.85) {
    warnings.push({
      id: "power_high",
      severity: "warning",
      category: "power",
      message: `Power utilization at ${((power_cont / power_avail) * 100).toFixed(0)}%`,
      recommendation: "Consider adding Power Station module for expansion capacity",
    });
  }
  
  // Thermal checks
  if (thermal > thermal_cap) {
    errors.push({
      id: "thermal_exceeded",
      constraint: "thermal_capacity",
      current_value: thermal,
      limit_value: thermal_cap,
      excess: thermal - thermal_cap,
      blocking: true,
      message: `Thermal capacity exceeded by ${(thermal - thermal_cap).toFixed(1)} kW`,
    });
  } else if (thermal / thermal_cap > 0.85) {
    warnings.push({
      id: "thermal_high",
      severity: "warning",
      category: "thermal",
      message: `Thermal load at ${((thermal / thermal_cap) * 100).toFixed(0)}%`,
      recommendation: "Limited cooling capacity remaining for additional modules",
    });
  }
  
  // Crew airlock dependency
  if (crew > 0 && !has_airlock) {
    errors.push({
      id: "missing_airlock",
      constraint: "crew_airlock",
      current_value: 0,
      limit_value: 1,
      excess: 1,
      blocking: true,
      message: "Crew Airlock required for crewed operations",
    });
  }
  
  // Data bandwidth
  if (data > data_cap) {
    warnings.push({
      id: "data_exceeded",
      severity: "warning",
      category: "data",
      message: `Data bandwidth at ${((data / data_cap) * 100).toFixed(0)}%`,
      recommendation: "Excess data will queue for delayed transmission",
    });
  }
  
  // Center of mass
  const com_offset = Math.sqrt(com.x ** 2 + com.y ** 2 + com.z ** 2);
  if (com_offset > 2.0) {
    warnings.push({
      id: "com_offset",
      severity: "warning",
      category: "mass",
      message: `Center of mass offset: ${com_offset.toFixed(1)}m from hub center`,
      recommendation: "Redistribute modules for better balance",
    });
  }
  
  return { warnings, errors };
}

function calculateRedundancyScore(modules: ModuleSpec[]): number {
  // Count modules by category
  const categories = modules.reduce((acc, m) => {
    acc[m.category] = (acc[m.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Score based on redundancy
  let score = 0;
  Object.values(categories).forEach(count => {
    if (count >= 3) score += 3; // Triple redundancy
    else if (count >= 2) score += 2; // Dual redundancy
    else score += 1; // Single point of failure
  });
  
  // Normalize to 0-10 scale
  const max_possible = Object.keys(categories).length * 3;
  return (score / max_possible) * 10;
}
```

---

## 4. APPROVAL CHECKPOINT

This Backend Document defines:
- ✅ Complete tech stack with justifications
- ✅ TypeScript interfaces for all data structures
- ✅ Module library with full specifications
- ✅ Calculation engine algorithms (power, thermal, mass, CoM, financials)
- ✅ Warning and error generation logic
- ✅ State management approach (Zustand)



# Phase 5: Security Architecture & Checklist
## VISHWAKARMA Technical Configuration System - SECURITY & DEPLOYMENT

---

## 1. SECURITY PHILOSOPHY

### **Core Principle: Defense in Depth**

Even though this is a **client-side-only application with no backend**, security remains critical:

1. **Data Integrity:** Prevent corrupted configurations from crashing the app
2. **Input Validation:** Sanitize all user inputs (imported configs, URL params)
3. **XSS Prevention:** Ensure no malicious scripts can execute
4. **Resource Limits:** Prevent DoS via excessive calculations
5. **Privacy:** No tracking, no analytics, no data exfiltration

**Threat Model:**
- ❌ **NOT defending against:** Nation-state actors, sophisticated hackers (no sensitive data)
- ✅ **Defending against:** Malicious URLs, corrupted files, accidental misuse, browser exploits

---

## 2. OWASP TOP 10 ALIGNMENT (Web Applications)

### **A01:2021 – Broken Access Control**
**Risk Level:** ⬜ N/A (no user accounts, no backend)

**Mitigation:**
- All data is client-side localStorage
- No authentication/authorization needed
- No cross-user data access possible

---

### **A02:2021 – Cryptographic Failures**
**Risk Level:** 🟢 Low

**Risks:**
- No passwords, no PII, no payment data stored
- Configuration data is not sensitive (public demo)

**Mitigation:**
- ✅ Use HTTPS for deployment (Vercel provides free SSL)
- ✅ No encryption needed (data is not sensitive)
- ⚠️ Shareable URLs contain config data in Base64 (not encrypted)
  - **Acceptable:** Configs are meant to be shared publicly

---

### **A03:2021 – Injection**
**Risk Level:** 🟡 Medium

**Risks:**
- **JSON Injection:** User imports malicious JSON file
- **URL Parameter Injection:** Malicious Base64 in shareable URL
- **XSS via localStorage:** Attacker sets malicious localStorage value

**Mitigation:**

```typescript
// ============================================
// INPUT VALIDATION & SANITIZATION
// ============================================

// JSON Import Validation
export function validateImportedConfig(data: unknown): StationConfiguration | null {
  try {
    // 1. Type check
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid data type');
    }
    
    // 2. Schema validation
    const config = data as Partial<StationConfiguration>;
    
    if (!config.version || typeof config.version !== 'string') {
      throw new Error('Missing or invalid version');
    }
    
    if (!config.bays || typeof config.bays !== 'object') {
      throw new Error('Missing or invalid bays');
    }
    
    // 3. Validate bay numbers (must be 1-9)
    const bayNumbers = Object.keys(config.bays);
    if (bayNumbers.some(n => {
      const num = parseInt(n);
      return isNaN(num) || num < 1 || num > 9;
    })) {
      throw new Error('Invalid bay numbers');
    }
    
    // 4. Validate module IDs (must exist in library)
    Object.values(config.bays).forEach(installed => {
      if (installed !== null) {
        if (!installed.module_id || typeof installed.module_id !== 'string') {
          throw new Error('Invalid module ID');
        }
        if (!MODULE_LIBRARY[installed.module_id]) {
          throw new Error(`Unknown module: ${installed.module_id}`);
        }
      }
    });
    
    // 5. Sanitize strings (prevent XSS)
    if (config.name) {
      config.name = sanitizeString(config.name);
    }
    
    // 6. Return validated config (with defaults for missing fields)
    return {
      ...getDefaultConfig(),
      ...config,
    } as StationConfiguration;
    
  } catch (error) {
    console.error('Config validation failed:', error);
    return null;
  }
}

// String sanitization (prevent XSS)
function sanitizeString(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .slice(0, 200); // Max length 200 chars
}

// URL Parameter Validation
export function decodeConfigFromURL(encodedConfig: string): StationConfiguration | null {
  try {
    // 1. Length check (prevent DoS)
    if (encodedConfig.length > 4096) {
      throw new Error('Config URL too long');
    }
    
    // 2. Base64 decode
    const decoded = atob(encodedConfig);
    
    // 3. Parse JSON
    const parsed = JSON.parse(decoded);
    
    // 4. Validate (same as import)
    return validateImportedConfig(parsed);
    
  } catch (error) {
    console.error('URL decode failed:', error);
    return null;
  }
}

// Number validation (prevent NaN/Infinity exploits)
function validateNumber(value: unknown, min: number, max: number): number {
  const num = Number(value);
  if (isNaN(num) || !isFinite(num)) {
    throw new Error('Invalid number');
  }
  if (num < min || num > max) {
    throw new Error(`Number out of range: ${num}`);
  }
  return num;
}
```

**Implementation Checklist:**
- ✅ Validate all imported JSON against schema
- ✅ Sanitize user-provided strings (config names)
- ✅ Reject unknown module IDs
- ✅ Limit string lengths (prevent memory exhaustion)
- ✅ Validate number ranges (no Infinity, no NaN)

---

### **A04:2021 – Insecure Design**
**Risk Level:** 🟢 Low

**Mitigation:**
- No authentication system to bypass
- No sensitive operations to exploit
- Calculations are deterministic (no randomness to exploit)

---

### **A05:2021 – Security Misconfiguration**
**Risk Level:** 🟡 Medium

**Risks:**
- Default error messages expose internal structure
- Development tools left in production
- Verbose console logging

**Mitigation:**

```typescript
// ============================================
// PRODUCTION SECURITY CONFIGURATION
// ============================================

// Environment detection
export const IS_PRODUCTION = import.meta.env.PROD;

// Error handling (production vs development)
export function handleError(error: Error, context: string) {
  if (IS_PRODUCTION) {
    // Production: Generic message, log to console only
    console.error(`Error in ${context}`);
    return 'An unexpected error occurred. Please try again.';
  } else {
    // Development: Detailed message
    console.error(`[${context}]`, error);
    return error.message;
  }
}

// Disable console.log in production
if (IS_PRODUCTION) {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  // Keep console.error and console.warn
}

// Content Security Policy (CSP) Headers
// Set in vercel.json:
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        }
      ]
    }
  ]
}
```

**Implementation Checklist:**
- ✅ Disable verbose logging in production
- ✅ Generic error messages for users
- ✅ CSP headers to prevent XSS
- ✅ X-Frame-Options to prevent clickjacking
- ✅ Remove React DevTools in production build

---

### **A06:2021 – Vulnerable and Outdated Components**
**Risk Level:** 🟡 Medium

**Mitigation:**

```json
// package.json - Lock to specific versions
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zustand": "^4.5.0",
    "three": "0.128.0",
    "recharts": "^2.10.0",
    "jspdf": "^2.5.1",
    "html2canvas": "^1.4.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/three": "^0.128.0",
    "typescript": "^5.3.3",
    "vite": "^5.0.0"
  }
}
```

**Implementation Checklist:**
- ✅ Use exact versions for critical dependencies
- ✅ Run `npm audit` before deployment
- ✅ Update dependencies quarterly (not during competition prep)
- ✅ Review Three.js r128 limitations (no CapsuleGeometry)
- ✅ Subresource Integrity (SRI) for CDN scripts

```html
<!-- CDN Scripts with SRI -->
<script 
  src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
  integrity="sha512-..." 
  crossorigin="anonymous">
</script>
```

---

### **A07:2021 – Identification and Authentication Failures**
**Risk Level:** ⬜ N/A (no authentication)

---

### **A08:2021 – Software and Data Integrity Failures**
**Risk Level:** 🟡 Medium

**Risks:**
- Corrupted localStorage data causes app crash
- Malicious configuration overwrites good data
- CDN script tampering (Three.js)

**Mitigation:**

```typescript
// ============================================
// DATA INTEGRITY CHECKS
// ============================================

// Checksum for exported configs
export function generateChecksum(config: StationConfiguration): string {
  const serialized = JSON.stringify(config, Object.keys(config).sort());
  return simpleHash(serialized);
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
}

// Validate checksum on import
export function validateChecksum(
  config: StationConfiguration, 
  providedChecksum: string
): boolean {
  const calculatedChecksum = generateChecksum(config);
  return calculatedChecksum === providedChecksum;
}

// localStorage wrapper with error handling
export const safeLocalStorage = {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('localStorage.getItem failed:', error);
      return null;
    }
  },
  
  setItem(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded');
        // Attempt to clear old data
        this.clearOldData();
      }
      return false;
    }
  },
  
  clearOldData() {
    // Remove items older than 30 days
    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('config_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          if (data.timestamp && (now - data.timestamp) > thirtyDays) {
            localStorage.removeItem(key);
          }
        } catch {}
      }
    }
  }
};
```

**Implementation Checklist:**
- ✅ Generate checksums for exported configs
- ✅ Validate checksums on import
- ✅ Graceful localStorage failure handling
- ✅ Auto-clear old localStorage data
- ✅ SRI tags for CDN scripts

---

### **A09:2021 – Security Logging and Monitoring Failures**
**Risk Level:** 🟢 Low (client-side app)

**Mitigation:**
- No server logs (client-side only)
- Browser console logs user actions (dev mode)
- Optional: Client-side error tracking (Sentry - disabled for privacy)

---

### **A10:2021 – Server-Side Request Forgery (SSRF)**
**Risk Level:** ⬜ N/A (no server, no external requests)

---

## 3. RATE LIMITING & RESOURCE PROTECTION

### **3.1 Calculation Throttling**

```typescript
// ============================================
// PREVENT DOS VIA EXCESSIVE CALCULATIONS
// ============================================

import { debounce } from 'lodash-es'; // Or custom implementation

// Debounce expensive calculations
export const debouncedCalculateMetrics = debounce(
  (config: StationConfiguration) => {
    return calculateMetrics(config);
  },
  100, // Wait 100ms after last change
  { leading: false, trailing: true }
);

// Rate limit PDF generation (max 1 per 5 seconds)
let lastPDFGeneration = 0;
const PDF_GENERATION_COOLDOWN = 5000; // 5 seconds

export function canGeneratePDF(): boolean {
  const now = Date.now();
  if (now - lastPDFGeneration < PDF_GENERATION_COOLDOWN) {
    return false;
  }
  lastPDFGeneration = now;
  return true;
}

// Limit localStorage operations (max 10 per second)
let localStorageOps = 0;
const MAX_LOCALSTORAGE_OPS = 10;

setInterval(() => {
  localStorageOps = 0;
}, 1000);

export function canWriteLocalStorage(): boolean {
  if (localStorageOps >= MAX_LOCALSTORAGE_OPS) {
    console.warn('localStorage rate limit exceeded');
    return false;
  }
  localStorageOps++;
  return true;
}
```

**Implementation Checklist:**
- ✅ Debounce real-time calculations (100ms)
- ✅ Rate limit PDF generation (1 per 5 seconds)
- ✅ Rate limit localStorage writes (10 per second)
- ✅ Limit 3D animation frame rate (60 FPS max)

---

### **3.2 Input Length Limits**

```typescript
// ============================================
// INPUT VALIDATION LIMITS
// ============================================

export const LIMITS = {
  CONFIG_NAME_MAX_LENGTH: 200,
  URL_PARAM_MAX_LENGTH: 4096,
  JSON_FILE_MAX_SIZE: 1024 * 1024, // 1 MB
  LOCALSTORAGE_KEY_MAX_LENGTH: 100,
  MAX_MODULES_PER_CONFIG: 9, // Physical limit
  MAX_COMPARISON_CONFIGS: 3,
  MAX_TIMELINE_EVENTS: 1000,
} as const;

// File upload validation
export function validateUploadedFile(file: File): string | null {
  // 1. File type
  if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
    return 'Only JSON files are allowed';
  }
  
  // 2. File size
  if (file.size > LIMITS.JSON_FILE_MAX_SIZE) {
    return `File too large. Maximum size: ${LIMITS.JSON_FILE_MAX_SIZE / 1024} KB`;
  }
  
  // 3. File name
  if (file.name.length > 255) {
    return 'File name too long';
  }
  
  return null; // Valid
}
```

**Implementation Checklist:**
- ✅ Enforce string length limits
- ✅ Validate file sizes before parsing
- ✅ Reject unexpected file types
- ✅ Limit array/object sizes in imported configs

---

## 4. XSS PREVENTION

### **4.1 React's Built-in Protection**

React automatically escapes content in JSX:
```tsx
// SAFE: React escapes this automatically
<div>{userProvidedName}</div>

// DANGEROUS: Bypasses escaping
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**Implementation Checklist:**
- ✅ Never use `dangerouslySetInnerHTML`
- ✅ Never use `eval()` or `Function()`
- ✅ Sanitize all user strings before rendering
- ✅ Use `textContent` instead of `innerHTML` in vanilla JS

---

### **4.2 Sanitization Library (Optional)**

```typescript
// ============================================
// XSS SANITIZATION (Manual Implementation)
// ============================================

export function sanitizeHTML(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// Alternative: Use DOMPurify if needed
// import DOMPurify from 'dompurify';
// const clean = DOMPurify.sanitize(dirty);
```

**Decision:** Manual sanitization sufficient (no rich text input)

---

## 5. PRIVACY & TRACKING

### **5.1 Zero Tracking Policy**

```typescript
// ============================================
// NO ANALYTICS, NO TRACKING
// ============================================

// ❌ DO NOT INCLUDE:
// - Google Analytics
// - Facebook Pixel
// - Hotjar / FullStory
// - Any third-party tracking scripts

// ✅ ALLOWED:
// - Essential functionality only
// - CDN for libraries (Three.js, etc.)
// - No cookies, no tracking pixels
```

**Implementation Checklist:**
- ✅ No Google Analytics
- ✅ No third-party trackers
- ✅ No cookies (except essential browser storage)
- ✅ No user fingerprinting
- ✅ Privacy policy states "no data collection"

---

### **5.2 Data Storage Transparency**

```typescript
// Display in UI (Settings page or footer)
export const PRIVACY_STATEMENT = `
PRIVACY & DATA STORAGE

This application operates entirely in your browser. No data is sent to external servers.

Data Storage:
- Configuration saves: localStorage (your device only)
- Shareable URLs: Encoded in URL (no server storage)
- Exported files: Downloaded to your device

External Resources:
- Three.js: Loaded from cdnjs.cloudflare.com (library only, no tracking)
- Fonts: Google Fonts (no tracking, per Google's policy)

We do not collect, store, or transmit any personal information.
`;
```

---

## 6. SECURE API KEY HANDLING

### **6.1 No API Keys Needed**

This app has **zero external API calls** (client-side only).

**But if future versions add features:**

```typescript
// ============================================
// SECURE API KEY MANAGEMENT (FUTURE)
// ============================================

// ❌ NEVER:
const API_KEY = "sk-1234567890abcdef"; // Hardcoded

// ✅ CORRECT (if backend added):
const API_KEY = import.meta.env.VITE_API_KEY;

// .env file (not committed to git):
VITE_API_KEY=sk-1234567890abcdef

// .gitignore:
.env
.env.local
```

**Current Status:** N/A (no APIs)

---

## 7. PRE-DEPLOYMENT SECURITY CHECKLIST

### **7.1 Code Review Checklist**

```markdown
## SECURITY CODE REVIEW

### Input Validation
- [ ] All JSON imports validated against schema
- [ ] URL parameters decoded safely
- [ ] String lengths enforced
- [ ] Number ranges validated (no Infinity/NaN)
- [ ] File uploads rejected if > 1MB
- [ ] Unknown module IDs rejected

### XSS Prevention
- [ ] No `dangerouslySetInnerHTML` usage
- [ ] No `eval()` or `Function()` calls
- [ ] All user strings sanitized
- [ ] React escaping relied upon

### Resource Protection
- [ ] Calculations debounced (100ms)
- [ ] PDF generation rate-limited (5s cooldown)
- [ ] localStorage write rate-limited (10/sec)
- [ ] 3D rendering capped at 60 FPS

### Error Handling
- [ ] Try-catch on all localStorage operations
- [ ] Try-catch on all JSON.parse() calls
- [ ] Try-catch on all calculations
- [ ] Generic error messages in production
- [ ] console.log disabled in production

### Data Integrity
- [ ] Checksums generated for exports
- [ ] Checksums validated on imports
- [ ] localStorage corruption handled gracefully
- [ ] Old localStorage data auto-cleared

### Dependencies
- [ ] npm audit shows 0 high/critical vulnerabilities
- [ ] All dependencies at latest stable versions
- [ ] CDN scripts have SRI tags
- [ ] No unused dependencies in package.json

### Headers & Configuration
- [ ] CSP header configured
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] Referrer-Policy set
- [ ] HTTPS enforced (Vercel default)

### Privacy
- [ ] No analytics scripts
- [ ] No tracking pixels
- [ ] No cookies (except localStorage)
- [ ] Privacy statement displayed
- [ ] No data sent to external servers

### Performance
- [ ] Bundle size < 3 MB
- [ ] Lighthouse score > 90
- [ ] Time to Interactive < 3s
- [ ] No memory leaks in 3D rendering

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader labels present
- [ ] Color contrast ratios met (WCAG AAA)
```

---

### **7.2 Penetration Testing Checklist**

```markdown
## MANUAL PENETRATION TESTING

### Injection Attacks
- [ ] Try importing JSON with `<script>` tags
- [ ] Try config name with `'; DROP TABLE--`
- [ ] Try URL param with `../../../etc/passwd`
- [ ] Try numbers: Infinity, -Infinity, NaN
- [ ] Try extremely long strings (10,000 chars)

### Resource Exhaustion
- [ ] Rapidly click PDF export (should rate-limit)
- [ ] Rapidly install/remove modules (should debounce)
- [ ] Import 100MB JSON file (should reject)
- [ ] Generate 1000 timeline events (should limit)

### Data Corruption
- [ ] Import config with unknown module IDs
- [ ] Import config with bay number "999"
- [ ] Import config with negative masses
- [ ] Manually corrupt localStorage JSON

### Browser Compatibility
- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)
- [ ] Test with JavaScript disabled (show error)

### URL Manipulation
- [ ] Try 10,000 character config URL
- [ ] Try malformed Base64 in URL
- [ ] Try SQL injection in URL param
- [ ] Try XSS payload in URL param
```

---

## 8. INCIDENT RESPONSE PLAN

### **8.1 If Vulnerability Discovered**

```markdown
## VULNERABILITY RESPONSE PROCEDURE

1. **Assess Severity**
   - Critical: Allows code execution, data theft
   - High: Allows app crash, data corruption
   - Medium: Degrades user experience
   - Low: Minor UI glitch

2. **Immediate Actions (Critical/High)**
   - Take down live deployment (Vercel dashboard)
   - Post notice on GitHub: "Temporarily offline for security update"
   - Develop patch within 24 hours
   - Test patch thoroughly
   - Redeploy with fix
   - Notify users (if any known affected)

3. **Post-Mortem**
   - Document vulnerability
   - Update security checklist
   - Add regression test
   - Review similar code for same issue

4. **Disclosure**
   - If user-reported: Credit researcher
   - Publish fix details after patch deployed
   - Update documentation
```

---

## 9. COMPLIANCE & LEGAL

### **9.1 GDPR Compliance**

**Status:** ✅ Compliant (no personal data collected)

- No user accounts
- No cookies (except localStorage)
- No tracking
- No data processors
- No cross-border data transfers

### **9.2 Accessibility (WCAG 2.1 AA)**

**Status:** ✅ Target compliance

- Keyboard navigation
- Screen reader support
- Color contrast ratios
- Focus indicators
- Alt text for images

---

## 10. FINAL PRE-DEPLOYMENT CHECKLIST

```markdown
## DEPLOYMENT READINESS

### Security
- [x] All OWASP Top 10 reviewed
- [ ] Input validation implemented
- [ ] Rate limiting configured
- [ ] XSS prevention verified
- [ ] Error handling tested
- [ ] Security headers configured

### Performance
- [ ] Bundle size < 3 MB
- [ ] Lighthouse score > 90
- [ ] Load time < 3s
- [ ] No console errors

### Functionality
- [ ] All Phase 1 features working
- [ ] All Phase 2 features working (if included)
- [ ] Export functions working
- [ ] Import functions working
- [ ] 3D visualization rendering

### Testing
- [ ] Unit tests pass (if implemented)
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing done
- [ ] Penetration testing completed

### Documentation
- [ ] README.md updated
- [ ] Methodology page complete
- [ ] Privacy statement added
- [ ] License file included (MIT recommended)

### Deployment
- [ ] Vercel project configured
- [ ] Custom domain set (optional)
- [ ] Environment variables set (if any)
- [ ] Preview deployment tested
- [ ] Production deployment ready

### Post-Launch
- [ ] Monitor error logs (browser console)
- [ ] Check Lighthouse score
- [ ] Verify HTTPS working
- [ ] Test shareable URLs
- [ ] Collect user feedback
```

---

## 11. APPROVED SECURITY ARCHITECTURE

This Security Document defines:
- ✅ OWASP Top 10 alignment and mitigations
- ✅ Input validation and sanitization strategies
- ✅ Rate limiting and resource protection
- ✅ XSS prevention measures
- ✅ Data integrity checks (checksums)
- ✅ Privacy policy (zero tracking)
- ✅ Comprehensive pre-deployment checklist
- ✅ Incident response procedures

---
