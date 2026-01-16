/**
 * OPEX (Operating Expenditure) Model
 * 
 * Calculates realistic annual operating costs for space stations.
 * Crewed stations have significantly higher OPEX than uncrewed.
 */

export interface OPEXBreakdown {
    // Fixed costs
    missionControl: number;     // Ground operations
    groundStaff: number;        // Engineers, mission planners
    insurance: number;          // 5% of asset value
    maintenance: number;        // 2% of asset value

    // Crew-dependent costs
    crewRotation: number;       // Dragon/Starliner flights
    cargoResupply: number;      // Cargo Dragon/Cygnus flights
    crewTraining: number;       // Astronaut training

    // Totals
    annualTotal: number;
    monthlyTotal: number;

    // Flags
    isCrewed: boolean;
}

// Cost constants (based on ISS and commercial station projections)
const COSTS = {
    // Crewed station costs
    crewed: {
        missionControl: 50_000_000,     // $50M/year - 24/7 mission control
        groundStaff: 100_000_000,       // $100M/year - ~200 staff
        crewRotation: 150_000_000,      // $150M/year - 2 Dragon flights
        cargoResupply: 300_000_000,     // $300M/year - 4-6 cargo flights
        crewTraining: 50_000_000,       // $50M/year - astronaut training
    },
    // Uncrewed station costs
    uncrewed: {
        missionControl: 15_000_000,     // $15M/year - minimal ops
        groundStaff: 30_000_000,        // $30M/year - ~50 staff
        crewRotation: 0,
        cargoResupply: 80_000_000,      // $80M/year - occasional servicing
        crewTraining: 0,
    },
    // Variable costs (% of asset value)
    insuranceRate: 0.05,                // 5% annually
    maintenanceRate: 0.02,              // 2% annually
};

/**
 * Calculate annual OPEX for a station
 */
export function calculateAnnualOPEX(
    assetValue: number,  // Total CAPEX + Launch costs
    isCrewed: boolean,
    crewSize: number = 4
): OPEXBreakdown {
    const costs = isCrewed ? COSTS.crewed : COSTS.uncrewed;

    // Scale crew costs by crew size (base is 4 crew)
    const crewScale = isCrewed ? Math.max(1, crewSize / 4) : 0;

    const missionControl = costs.missionControl;
    const groundStaff = costs.groundStaff;
    const crewRotation = Math.round(costs.crewRotation * crewScale);
    const cargoResupply = Math.round(costs.cargoResupply * crewScale);
    const crewTraining = Math.round(costs.crewTraining * crewScale);

    // Variable costs based on asset value
    const insurance = Math.round(assetValue * COSTS.insuranceRate);
    const maintenance = Math.round(assetValue * COSTS.maintenanceRate);

    const annualTotal = missionControl + groundStaff + crewRotation +
        cargoResupply + crewTraining + insurance + maintenance;

    return {
        missionControl,
        groundStaff,
        insurance,
        maintenance,
        crewRotation,
        cargoResupply,
        crewTraining,
        annualTotal,
        monthlyTotal: Math.round(annualTotal / 12),
        isCrewed,
    };
}

/**
 * Get OPEX category breakdown for display
 */
export function getOPEXCategories(opex: OPEXBreakdown): Array<{
    category: string;
    amount: number;
    percent: number;
}> {
    const categories = [
        { category: 'Cargo Resupply', amount: opex.cargoResupply },
        { category: 'Crew Rotation', amount: opex.crewRotation },
        { category: 'Insurance (5%)', amount: opex.insurance },
        { category: 'Ground Staff', amount: opex.groundStaff },
        { category: 'Mission Control', amount: opex.missionControl },
        { category: 'Crew Training', amount: opex.crewTraining },
        { category: 'Maintenance (2%)', amount: opex.maintenance },
    ].filter(c => c.amount > 0);

    return categories.map(c => ({
        ...c,
        percent: Math.round((c.amount / opex.annualTotal) * 100),
    })).sort((a, b) => b.amount - a.amount);
}

/**
 * Compare OPEX to revenue to determine sustainability
 */
export function analyzeOPEXSustainability(
    annualOPEX: number,
    annualRevenue: number
): {
    sustainable: boolean;
    annualCashFlow: number;
    coverageRatio: number;  // Revenue / OPEX
    message: string;
} {
    const annualCashFlow = annualRevenue - annualOPEX;
    const coverageRatio = annualOPEX > 0 ? annualRevenue / annualOPEX : 0;

    let message: string;
    let sustainable: boolean;

    if (coverageRatio >= 1.5) {
        sustainable = true;
        message = 'Strong cash flow - OPEX well covered';
    } else if (coverageRatio >= 1.0) {
        sustainable = true;
        message = 'Break-even - minimal margin for growth';
    } else if (coverageRatio >= 0.5) {
        sustainable = false;
        message = 'Cash burn - losing money annually';
    } else {
        sustainable = false;
        message = 'Critical - OPEX far exceeds revenue';
    }

    return {
        sustainable,
        annualCashFlow,
        coverageRatio,
        message,
    };
}
