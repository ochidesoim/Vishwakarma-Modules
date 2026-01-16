/**
 * Launch Vehicle Database and Cost Calculations
 * 
 * Adds realistic launch costs to CAPEX calculations.
 * Launch costs are typically 20-30% of total station budget.
 */

export type LaunchVehicleType = 'falcon9' | 'falconHeavy' | 'starship' | 'vulcan';

export interface LaunchVehicle {
    id: LaunchVehicleType;
    name: string;
    provider: string;
    payloadToLEO: number;  // kg to 400km LEO
    costPerLaunch: number; // USD
    reliability: number;   // 0-1 success rate
    available: boolean;    // Currently operational
}

export const LAUNCH_VEHICLES: Record<LaunchVehicleType, LaunchVehicle> = {
    falcon9: {
        id: 'falcon9',
        name: 'Falcon 9',
        provider: 'SpaceX',
        payloadToLEO: 22_800,
        costPerLaunch: 67_000_000,
        reliability: 0.98,
        available: true,
    },
    falconHeavy: {
        id: 'falconHeavy',
        name: 'Falcon Heavy',
        provider: 'SpaceX',
        payloadToLEO: 63_800,
        costPerLaunch: 150_000_000,
        reliability: 0.95,
        available: true,
    },
    starship: {
        id: 'starship',
        name: 'Starship',
        provider: 'SpaceX',
        payloadToLEO: 100_000,
        costPerLaunch: 100_000_000, // Projected when operational
        reliability: 0.90,
        available: false, // Not yet human-rated
    },
    vulcan: {
        id: 'vulcan',
        name: 'Vulcan Centaur',
        provider: 'ULA',
        payloadToLEO: 27_200,
        costPerLaunch: 110_000_000,
        reliability: 0.95,
        available: true,
    },
};

// Integration cost per launch (payload prep, mission ops, etc.)
export const INTEGRATION_COST_PER_LAUNCH = 15_000_000; // $15M

export interface LaunchCostResult {
    vehicle: LaunchVehicle;
    totalMass: number;          // kg
    launchesNeeded: number;
    launchCost: number;         // Vehicle costs
    integrationCost: number;    // Payload integration
    totalLaunchCost: number;    // Total
    costPerKg: number;          // $/kg
}

/**
 * Calculate launch costs for a given station mass
 */
export function calculateLaunchCosts(
    totalMass: number,
    vehicleType: LaunchVehicleType = 'falcon9'
): LaunchCostResult {
    const vehicle = LAUNCH_VEHICLES[vehicleType] || LAUNCH_VEHICLES['falcon9'];  // Safe fallback

    // Calculate number of launches needed (round up)
    const launchesNeeded = Math.ceil(totalMass / vehicle.payloadToLEO);

    // Calculate costs
    const launchCost = launchesNeeded * vehicle.costPerLaunch;
    const integrationCost = launchesNeeded * INTEGRATION_COST_PER_LAUNCH;
    const totalLaunchCost = launchCost + integrationCost;

    // Cost per kg (for comparison)
    const costPerKg = totalMass > 0 ? Math.round(totalLaunchCost / totalMass) : 0;

    return {
        vehicle,
        totalMass,
        launchesNeeded,
        launchCost,
        integrationCost,
        totalLaunchCost,
        costPerKg,
    };
}

/**
 * Find the most cost-effective launch vehicle for a given mass
 */
export function findOptimalLaunchVehicle(totalMass: number): LaunchCostResult {
    let bestResult: LaunchCostResult | null = null;

    for (const vehicleType of Object.keys(LAUNCH_VEHICLES) as LaunchVehicleType[]) {
        const vehicle = LAUNCH_VEHICLES[vehicleType];
        if (!vehicle.available) continue;

        const result = calculateLaunchCosts(totalMass, vehicleType);

        if (!bestResult || result.totalLaunchCost < bestResult.totalLaunchCost) {
            bestResult = result;
        }
    }

    return bestResult || calculateLaunchCosts(totalMass, 'falcon9');
}

/**
 * Get all launch options with costs for comparison
 */
export function getAllLaunchOptions(totalMass: number): LaunchCostResult[] {
    return (Object.keys(LAUNCH_VEHICLES) as LaunchVehicleType[])
        .filter(type => LAUNCH_VEHICLES[type].available)
        .map(type => calculateLaunchCosts(totalMass, type))
        .sort((a, b) => a.totalLaunchCost - b.totalLaunchCost);
}
