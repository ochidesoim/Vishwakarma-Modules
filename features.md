# COMPLETE FIX & ADD LIST

## PRIORITY 1: CRITICAL FIXES

### 1. ADD LAUNCH COSTS TO CAPEX
- Create launch vehicle database (Falcon 9, Falcon Heavy, Starship, Vulcan)
- Calculate launches needed based on total station mass
- Add $15M integration cost per launch
- **Add totalLaunchCost to CAPEX calculation**
- Display: Vehicle selector, # launches, cost breakdown

### 2. CUT REVENUE BY 50-70%
- Zero-G Lab: $300K → $100K/month
- Manufacturing Lab: $500K → $150K/month
- Data Center: $150K → $40K/month
- Service Station: $2.5M → $500K/month
- Health Care: $200K → $50K/month
- Add tooltip showing revenue assumptions for each module

### 3. ADD OPEX MODEL
- Mission Control: $50M/year (crewed) or $15M (uncrewed)
- Crew Rotation: $150M/year (2 Dragon flights)
- Cargo Resupply: $300M/year (crewed) or $80M (uncrewed)
- Ground Staff: $100M/year (crewed) or $30M (uncrewed)
- Insurance: 5% of asset value annually
- Maintenance: 2% of asset value annually
- **Update NPV: Monthly Cash Flow = Revenue - (OPEX/12)**
- Display OPEX breakdown table, warn if OPEX > Revenue

### 4. ADD LIFE SUPPORT SYSTEMS
Add to Module interface:
- `crewCapacity` (number)
- `eclssPower` (kW for life support)
- `eclssMass` (kg for ECLSS equipment)
- `consumablesMass` (kg initial supplies)

Update modules:
- Crew Quarters: +15 kW ECLSS, +3000 kg equipment, +2000 kg consumables
- Health Care: +8 kW ECLSS, +1500 kg equipment, +500 kg consumables
- Validation: Crew modules require airlock, minimum 2-person crew
- Display: Life Support row in Systems Status

### 5. ADD ATTITUDE CONTROL SYSTEM (ACS)
- Calculate moment of inertia (Ixx, Iyy, Izz)
- Calculate asymmetry factor = max(I)/min(I)
- ACS propellant = base × √(asymmetry factor)
- Warn if asymmetry > 1.5
- Display: Asymmetry factor with color coding, add ACS fuel to budget

### 6. ADD DOCKING PORTS MODULE
New module type:
- Mass: 2000 kg
- Power: 1 kW
- CAPEX: $80M
- Validation: Crewed stations need minimum 2 ports
- Warn if no docking ports on stations with >3 modules

### 7. ADD BATTERY STORAGE
Update Power Station:
- `batteryCapacity`: 50 kWh
- `batteryMass`: 500 kg
- Calculate eclipse energy requirements (40% of 90-min orbit)
- Warn if insufficient battery for eclipse
- Display: Energy Storage row showing capacity vs. requirements

### 8. ADD RADIATION SHIELDING
- Add `radiationShielding` boolean to crew modules
- Calculate annual dose: 100 mSv baseline × shielding factor
- Shielding mass: 2000 kg per crew module
- Add $40M CAPEX for shielding
- NASA limit: 50 mSv/year
- Display: Radiation dose, warn if exceeds limit

---

## PRIORITY 2: FIX BROKEN FEATURES

### 9. DELETE LAUNCH WINDOWS FEATURE
- Remove `getLaunchWindows()` function
- Delete Launch Windows display
- (Already replaced by Launch Vehicle Selection in #1)

### 10. REPLACE RISK EVENTS WITH FMEA
Delete random risk events, replace with:
- Single Point of Failure detection (power, airlock, etc.)
- Micrometeoroid probability calculation (not random)
- Thermal margin risk
- Display FMEA table sorted by risk score
- Show top 5 risks with mitigations

### 11. ENFORCE SOLAR DEGRADATION
- Reduce available power by 2.5% per year
- Update NPV to account for declining revenue over time
- Display: "Year X: Y kW available" in Power panel
- Show degradation curve in Reliability panel

---

## PRIORITY 3: ENHANCEMENTS

### 12. ADD ASSEMBLY SEQUENCE ANALYSIS
- Generate step-by-step assembly timeline
- Calculate required EVAs per step
- Estimate assembly duration (weeks)
- Calculate assembly costs
- Display: New "Assembly" tab with timeline

### 13. ADD CREW CONSUMABLES CALCULATOR
- Calculate O₂, water, food requirements per year
- Account for recycling (80% O₂, 90% water)
- Calculate resupply flights needed
- Add to OPEX: consumables resupply cost
- Display: Mass breakdown in Systems panel

### 14. ADD COMPARISON MODE
- Compare user design vs. ISS and Axiom Station
- Show mass ratio, power ratio, crew ratio, cost ratio
- Calculate cost per kg
- Display: Side-by-side comparison table

### 15. ADD WARNING SYSTEM
Create centralized warnings for:
- **Economics**: OPEX > Revenue (CRITICAL)
- **Power**: <20% margin (WARNING)
- **Crew Safety**: Single airlock (CRITICAL)
- **Attitude Control**: Asymmetry >1.5 (WARNING)
- Display: "⚠️ System Warnings" panel with severity color coding

### 16. ADD VIABILITY EXPLAINER
Calculate and explain:
- Annual profit/loss
- Payback period
- Investment verdict (Viable/Marginal/Not Viable)
- Specific reasons why design fails
- "Fix It" suggestions
- Display: "💡 Viability Check" panel with clear verdict

---

## PRIORITY 4: DATA CORRECTIONS

### 17. FIX STATION-KEEPING FORMULA
Current formula is too simple. Add:
- Cross-sectional area calculation for drag
- Solar cycle adjustment (±50% variation)
- Configuration penalty for 3×3 grid (worse drag than linear)
- Update: `Propellant = f(mass, area, solar_activity)`

### 18. FIX THERMAL MODEL
Add physics-based thermal:
- Solar heating: Q = 1367 W/m² × area × (1-albedo)
- Earth IR: 237 W/m² × area × view factor
- Radiator effectiveness: ε×σ×A×T⁴
- Beta angle variation (sun exposure)
- Replace static "kW capacity" with dynamic thermal analysis

### 19. ADD REAL COSTS TO MODULES
Add missing costs:
- Ground segment: +$150M to station CAPEX
- Crew training: +$50M/year to OPEX
- Assembly EVAs: +$300M to CAPEX
- Launch insurance: +10-15% of CAPEX

---

## PRIORITY 5: UI/UX

### 20. ADD REALITY CHECK ALERTS
When user designs unprofitable station:
- Pop-up: "⚠️ This station loses $XXX M/year"
- Show: "Years until bankrupt: X"
- Force acknowledgment before continuing

### 21. ADD TUTORIAL IMPROVEMENTS
Current tutorial doesn't explain economics. Add:
- "Why most stations fail financially" step
- "Launch costs are 20-30% of budget" step
- "OPEX always exceeds revenue initially" step

### 22. ADD EXPORT IMPROVEMENTS
Current export is basic. Add to PDF:
- Executive summary (1 page)
- Viability verdict
- Risk assessment (FMEA)
- Assembly timeline
- Cost breakdown with launch costs
- Comparison to reference stations

### 23. ADD KEYBOARD SHORTCUTS
Already have basic shortcuts, add:
- **V**: Toggle Viability Check
- **W**: Show/hide Warnings
- **C**: Compare to reference
- **A**: Assembly sequence
- **F**: FMEA risk analysis

---

## IMPLEMENTATION PRIORITY ORDER

**Week 1-2 (Must Do):**
1. Add Launch Costs (#1)
2. Cut Revenue (#2)
3. Add OPEX (#3)
4. Add Warnings (#15)
5. Add Viability Explainer (#16)

**Week 3-4 (Critical Systems):**
6. Life Support (#4)
7. ACS (#5)
8. Docking Ports (#6)
9. Batteries (#7)
10. Radiation (#8)

**Week 5-6 (Fix Broken):**
11. Delete Launch Windows (#9)
12. Replace Risk Events (#10)
13. Enforce Solar Degradation (#11)
14. Fix Station-Keeping (#17)

**Week 7-8 (Polish):**
15. Assembly Sequence (#12)
16. Consumables (#13)
17. Comparison Mode (#14)
18. Reality Checks (#20)
19. Export Improvements (#22)

---

## FILES TO MODIFY

**lib/modules.ts:**
- Add fields: crewCapacity, eclssPower, eclssMass, consumablesMass, batteryCapacity, batteryMass, radiationShielding
- Add dockingPort module
- Update all module masses and CAPEX

**lib/financials.ts:**
- Add calculateLaunchCosts()
- Add calculateAnnualOPEX()
- Update calculateNPV() to include OPEX and degradation
- Add getViabilityExplainer()

**lib/physics.ts:**
- Add validateLifeSupport()
- Add calculateMomentOfInertia()
- Add calculateACSPropellant()
- Add validateDocking()
- Add calculatePowerAvailability()
- Fix station-keeping formula with area and solar cycle

**lib/reliability.ts:**
- Add calculateRadiationExposure()
- Update getPowerDegradation() enforcement
- Add performFMEA() (replace risk events)

**lib/risk.ts:**
- DELETE random event system
- Replace with FMEA logic

**components/dashboard/:**
- Add OPEXPanel.tsx
- Add ViabilityPanel.tsx
- Add WarningsPanel.tsx
- Add AssemblyPanel.tsx
- Add ComparisonPanel.tsx
- Update FinancialPanel to show launch costs
- Update SystemsStatus to show life support, ACS, batteries, radiation

**New files:**
- lib/launch.ts (launch vehicle database)
- lib/warnings.ts (warning system)
- lib/assembly.ts (assembly sequence)
- lib/consumables.ts (crew consumables)

---

## WHAT THIS FIXES

**Before (Current State):**
- Tool shows $2.5B station making $40M/year = "profitable"
- Missing $800M in launch costs
- Missing $600M/year OPEX
- **Reality: Station loses $560M/year, bankrupt in 5 years**

**After (Fixed State):**
- Same station: $3.3B CAPEX (with launches)
- Revenue: $18M/year (realistic)
- OPEX: $600M/year
- **Reality: Station loses $582M/year**
- **Tool warns: "❌ NOT VIABLE - loses $582M annually"**

Your tool becomes **honest** about space economics instead of accidentally lying to users.