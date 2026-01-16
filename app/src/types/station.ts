export type ModuleType = 'hub' | 'lab' | 'fab' | 'data' | 'hydro' | 'repair' | 'power' | 'health' | 'airlock' | 'cargo' | 'quarters';

export interface ModuleSpec {
    type: ModuleType;
    title: string;
    description: string;
    icon: string;
    color: string; // Tailwind class or hex

    // Technical Specs
    mass: number;        // kg
    power_cont: number;  // kW (continuous load)
    power_peak: number;  // kW (peak load)
    thermal: number;     // kW (heat rejection required/generated)
    crew: number;        // Crew slots required
    volume: number;      // m³
    data: number;        // Mbps

    // Financial Specs
    capex: number;       // $ (USD)
    revenue: number;     // $/month
    revenueAssumption?: string; // Tooltip explanation
    opex: number;        // $/month

    // Constraints
    requires?: ModuleType[];
    provides?: {
        power?: number;    // kW generation
        thermal?: number;  // kW cooling capacity
        crew?: number;     // Crew quarters
        storage?: number;  // kg
    };
}

export interface InstalledModule {
    id: string; // Unique ID (e.g., bay-2)
    bayId: number;
    type: ModuleType;
    status: 'active' | 'inactive' | 'construction';
}

export interface StationMetrics {
    totalMass: number;
    totalPowerCont: number;
    totalPowerPeak: number;
    totalThermal: number;
    totalCrew: number;
    totalVolume: number;

    powerGeneration: number;
    thermalCapacity: number;
    crewCapacity: number;

    totalCapex: number;
    totalLaunchCost: number; // New field
    totalInvestment: number; // Capex + Launch
    monthlyRevenue: number;
    monthlyOpex: number;

    netPresentValue: number; // 10yr
    internalRateReturn: number;
    breakEvenMonths: number;
}
