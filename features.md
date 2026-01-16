# Vishwakarma - Complete Feature Documentation

> Commercial Space Station Designer - Financial & Technical Analysis Tool

---

## Table of Contents

1. [Station Design Features](#station-design-features)
2. [Financial Analysis](#financial-analysis)
3. [Physics & Engineering](#physics--engineering)
4. [Reliability & Risk](#reliability--risk)
5. [Visualization & UX](#visualization--ux)
6. [Mathematical Models](#mathematical-models)

---

## Station Design Features

### 3×3 Module Grid System

| Bay | Position | Usage |
|-----|----------|-------|
| 1-9 | Radial around Hub | Install modules via drag-drop or click |

**Hub** (always present): Central command node providing base power (60kW) and thermal (40kW).

### Available Modules

| Module | Mass (kg) | Power (kW) | Thermal (kW) | CAPEX ($M) | Monthly Revenue |
|--------|-----------|------------|--------------|------------|-----------------|
| Zero-G Laboratory | 12,000 | 8 | 12 | $270M | $300K |
| Manufacturing Lab | 15,000 | 12 | 20 | $330M | $500K |
| Orbital Data Center | 8,000 | 20 | 25 | $210M | $150K |
| Hydroponics Bay | 10,000 | 5 | 4 | $240M | $50K |
| Service Station | 14,000 | 4 | 8 | $350M | $2.5M |
| Power Station | 11,000 | 0 | 0 | $180M | $5K |
| Health Care | 9,000 | 6 | 6 | $290M | $200K |
| Crew Airlock | 6,000 | 2 | 2 | $150M | $0 |
| Cargo Bay | 5,000 | 1 | 1 | $100M | $80K |
| Crew Quarters | 14,000 | 6 | 8 | $320M | $100K |

### Module Dependencies

```
Manufacturing Lab → requires Airlock
Zero-G Laboratory → requires Airlock
Hydroponics Bay → requires Airlock
Health Care → requires Airlock
```

---

## Financial Analysis

### Net Present Value (NPV)

**Formula:**
```
NPV = -CAPEX + Σ(Monthly Cash Flow / (1 + r)^t)
```

Where:
- `r` = Monthly discount rate = Annual Rate / 12
- `t` = Month (1 to 120 for 10 years)
- `Monthly Cash Flow` = Revenue - OPEX

**Default Parameters:**
- Discount Rate: 10% annual
- Analysis Period: 10 years (120 months)

### Internal Rate of Return (IRR)

Calculated via binary search for rate where NPV = 0.

**Range:** -50% to 200% annual

### Break-Even Analysis

**Formula:**
```
Break-Even Months = CAPEX / (Monthly Revenue - Monthly OPEX)
```

### Sensitivity Analysis

Adjustable parameters:
- Base revenue multiplier (0.5x - 2.0x)
- OPEX adjustment (0.5x - 2.0x)
- Discount rate (5% - 20%)

---

## Physics & Engineering

### Power System

**Balance Equation:**
```
Power Available = Hub Generation (60kW) + Power Stations (40kW each)
Power Required = Σ(Module Continuous Power)
Surplus = Available - Required
```

**Constraints:**
- Module installation blocked if `Required > Available`
- Warning at <20% margin

### Thermal Management

**Heat Balance:**
```
Thermal Capacity = Hub Radiators (40kW) + Power Station Radiators (20kW each)
Thermal Load = Σ(Module Thermal Output)
Utilization = Load / Capacity × 100%
```

**Critical thresholds:**
- Warning: >70% utilization
- Critical: >90% utilization

### Station-Keeping Requirements

Based on ISS reference data:
- Reference: ISS at 420,000 kg uses ~200 kg/month propellant
- Orbital altitude: 400 km (LEO)
- Inclination: 51.6°

**Formula:**
```
Monthly Propellant = 200 × (Station Mass / 420,000) kg
Reboost Frequency = 30-45 days (high mass) or 45-60 days (low mass)
10-Year Fuel Mass = Monthly Propellant × 120 months
10-Year Fuel Cost = Fuel Mass × $5,000/kg
```

### Launch Windows

- **Frequency:** ~2 per month for ISS-compatible orbit
- **Per Quarter:** 6 windows
- **Optimal Months:** March, June, September, December

### Center of Mass

Calculated as weighted centroid of installed modules:
```
CoM_x = Σ(module_mass × bay_x) / total_mass
CoM_y = Σ(module_mass × bay_y) / total_mass
```

---

## Reliability & Risk

### Mean Time Between Failures (MTBF)

| Module Type | MTBF (months) | Years | 10-Year Failure Probability |
|-------------|---------------|-------|----------------------------|
| Hub | 180 | 15 | 49% |
| Cargo Bay | 168 | 14 | 51% |
| Crew Airlock | 156 | 13 | 54% |
| Power Station | 144 | 12 | 57% |
| Crew Quarters | 132 | 11 | 60% |
| Zero-G Lab | 120 | 10 | 63% |
| Service Station | 108 | 9 | 67% |
| Manufacturing | 96 | 8 | 71% |
| Health Care | 96 | 8 | 71% |
| Hydroponics | 84 | 7 | 76% |
| Data Center | 72 | 6 | 81% |

**Failure Probability Formula (Exponential Distribution):**
```
P(failure in t months) = 1 - e^(-t/MTBF)
```

### Station Reliability

**10-Year Survival Probability:**
```
Station Reliability = Π(e^(-120/MTBF_i))
```

Product of individual module reliability over 10 years.

### Solar Panel Degradation

**Model:** 2.5% degradation per year in LEO

**Formula:**
```
Power_year_n = Initial_Power × (1 - 0.025)^n
```

| Year | Power Remaining | Degradation |
|------|-----------------|-------------|
| 0 | 100% | 0% |
| 5 | 88.1% | 11.9% |
| 10 | 77.6% | 22.4% |

### Redundancy Analysis

**Single Point of Failure Detection:**
- Single Power Station → station-wide blackout risk
- Single Airlock → limited emergency egress
- Missing Crew Quarters with crew modules

### Risk Events

| Event | Severity | Defense |
|-------|----------|---------|
| Meteor Shower | 70% | Shielding |
| Solar Flare | 60% | Radiation Resistance |
| System Malfunction | 40% | Repair Capacity |

**Defense Contributions by Module:**
- Repair Station: +50% repair, +10% shielding
- Cargo Bay: +15% repair
- Hub: +20% shielding, +10% radiation
- Power Station: +20% radiation
- Airlock: +20% repair

**Survival Score Calculation:**
```
Survival Score = Defense% - (Event Severity × 100) + Random(-10 to +10)
```

| Survival Score | Outcome |
|----------------|---------|
| ≥ 20 | Deflected (success) |
| ≥ -10 | Mitigated (minor damage) |
| ≥ -30 | Damage Sustained |
| < -30 | Critical Damage |

---

## Visualization & UX

### Power Flow (Sankey)

Displays:
- **Generation Sources:** Hub Solar (60kW), Power Stations (+40kW each)
- **Consumption:** Per-module power draw
- **Balance:** Surplus/Deficit indicator

### Thermal Heatmap

Color-coded grid:
| Color | Meaning | Threshold |
|-------|---------|-----------|
| Blue | Cool | <5% capacity |
| Yellow | Warm | 5-15% |
| Orange | Hot | 15-25% |
| Red | Critical | >25% |

### Crew Time Allocation

Bar chart showing crew distribution across modules with activity breakdown:
- Research, Experiments, Data Analysis (Lab)
- Monitoring, Quality Control (Manufacturing)
- Plant Care, Harvesting (Hydroponics)
- Patient Care, Equipment Maintenance (Health)

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| 1-9 | Select bay |
| Escape | Clear selection |
| Ctrl/⌘ + E | Export PDF |
| Ctrl/⌘ + Shift + E | Export JSON |
| Ctrl/⌘ + Shift + S | Save snapshot |
| Ctrl/⌘ + Shift + R | Reset station |

### Tutorial Overlay

5-step walkthrough for first-time users:
1. Welcome to Vishwakarma
2. Station Grid (bay system)
3. Power & Thermal management
4. Financial Analysis
5. Risk & Reliability

Uses `localStorage` to remember completion.

---

## Mathematical Models

### Summary of All Formulas

| Model | Formula | Source File |
|-------|---------|-------------|
| NPV | `-CAPEX + Σ(CF/(1+r)^t)` | `financials.ts` |
| IRR | Binary search NPV=0 | `financials.ts` |
| Break-Even | `CAPEX / Net Monthly` | `financials.ts` |
| Failure Probability | `1 - e^(-t/MTBF)` | `reliability.ts` |
| Station Reliability | `Π(e^(-120/MTBF_i))` | `reliability.ts` |
| Solar Degradation | `P₀ × (0.975)^year` | `reliability.ts` |
| Propellant/Month | `200 × (Mass/420000)` | `physics.ts` |
| Center of Mass | `Σ(m×pos)/Σm` | `physics.ts` |
| Risk Defense | `0.4×Shield + 0.3×Rad + 0.3×Repair` | `risk.ts` |
| ROI | `NPV / CAPEX` | `reliability.ts` |

### Constants Used

| Constant | Value | Source |
|----------|-------|--------|
| ISS Reference Mass | 420,000 kg | NASA ISS data |
| ISS Monthly Propellant | 200 kg | NASA ISS operations |
| LEO Altitude | 400 km | Standard ISS orbit |
| Inclination | 51.6° | ISS orbital inclination |
| Fuel Cost to Orbit | $5,000/kg | Industry estimates |
| Solar Degradation Rate | 2.5%/year | Standard LEO arrays |
| Analysis Period | 10 years (120 months) | Financial standard |

---

## File Structure

```
app/src/
├── lib/
│   ├── financials.ts     # NPV, IRR, Break-Even
│   ├── physics.ts        # Validation, Station-Keeping, Launch Windows
│   ├── reliability.ts    # MTBF, Solar Degradation, Redundancy, Trade-Offs
│   ├── risk.ts           # Risk Events, Defense Calculations
│   ├── optimization.ts   # AI Recommendations
│   └── export.ts         # PDF, JSON, CSV export
├── data/
│   ├── modules.ts        # Module specifications
│   └── presets.ts        # Pre-built station configurations
├── components/
│   ├── dashboard/
│   │   ├── FinancialPanel.tsx
│   │   ├── SystemsStatus.tsx
│   │   ├── ReliabilityPanel.tsx
│   │   ├── PowerFlowPanel.tsx
│   │   ├── ThermalHeatmap.tsx
│   │   ├── CrewTimePanel.tsx
│   │   ├── RiskPanel.tsx
│   │   └── OptimizationPanel.tsx
│   └── ui/
│       ├── TutorialOverlay.tsx
│       └── ConfirmDialog.tsx
└── hooks/
    └── useKeyboardShortcuts.tsx
```

---

*Last Updated: January 2026*
