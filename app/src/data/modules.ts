import type { ModuleSpec } from '../types/station';

export const MODULE_SPECS: Record<string, ModuleSpec> = {
    hub: {
        type: 'hub',
        title: 'Vishwakarma Hub',
        description: 'Central command and utility node. Provides initial power, thermal, and docking capabilities.',
        icon: '💠',
        color: 'bg-gray-800',
        mass: 25000,
        power_cont: 2,
        power_peak: 5,
        thermal: 5,
        crew: 0,
        volume: 100,
        data: 100,
        capex: 500_000_000,
        revenue: 0,
        opex: 1_000_000,
        provides: {
            power: 60,      // Initial solar arrays
            thermal: 40,    // Initial radiators
            crew: 0,
            storage: 5000,
        }
    },
    lab: {
        type: 'lab',
        title: 'Zero-G Laboratory',
        description: 'Equipped for microgravity research: pharmaceuticals, protein crystallization, and material science.',
        icon: '🔬',
        color: 'bg-blue-500/50',
        mass: 12000,
        power_cont: 8,
        power_peak: 15,
        thermal: 12,
        crew: 2,
        volume: 45,
        data: 50,
        capex: 270_000_000,
        revenue: 100_000, // Reduced from 300k
        revenueAssumption: "Conservative estimate given unproven early market demand for microgravity R&D.",
        opex: 50_000,
        requires: ['airlock']
    },
    fab: {
        type: 'fab',
        title: 'Manufacturing Lab',
        description: 'In-space manufacturing of high-value products like ZBLAN fibers and semiconductors.',
        icon: '🏭',
        color: 'bg-green-500/50',
        mass: 15000,
        power_cont: 12,
        power_peak: 25,
        thermal: 20,
        crew: 0, // Automated
        volume: 60,
        data: 80,
        capex: 330_000_000,
        revenue: 150_000, // Reduced from 500k
        revenueAssumption: "Lowered to reflect logistic constraints and current market for ZBLAN fiber.",
        opex: 80_000,
        requires: ['airlock'] // For maintenance
    },
    data: {
        type: 'data',
        title: 'Orbital Data Center',
        description: 'Secure off-planet edge computing and storage node.',
        icon: '🛰️',
        color: 'bg-purple-500/50',
        mass: 8000,
        power_cont: 20,
        power_peak: 22,
        thermal: 25, // High heat
        crew: 0,
        volume: 30,
        data: 1000, // High bandwidth
        capex: 210_000_000,
        revenue: 40_000, // Reduced from 150k
        revenueAssumption: "Limited by downlink bandwidth costs and latency for edge computing.",
        opex: 30_000,
        requires: []
    },
    hydro: {
        type: 'hydro',
        title: 'Hydroponics Bay',
        description: 'Closed-loop agriculture for food research and life support supplementation.',
        icon: '🌱',
        color: 'bg-emerald-500/50',
        mass: 10000,
        power_cont: 5,
        power_peak: 8,
        thermal: 4,
        crew: 1,
        volume: 80,
        data: 10,
        capex: 240_000_000,
        revenue: 20_000, // Reduced from 50k
        revenueAssumption: "Research grants only. Food production offsets OPEX but generates little direct revenue.",
        opex: 20_000,
        requires: ['airlock']
    },
    repair: {
        type: 'repair',
        title: 'Service Station',
        description: 'Robotic arms and fuel depot for satellite servicing and debris removal.',
        icon: '🔧',
        color: 'bg-orange-500/50',
        mass: 14000,
        power_cont: 4,
        power_peak: 10,
        thermal: 8,
        crew: 0,
        volume: 40,
        data: 20,
        capex: 350_000_000,
        revenue: 500_000, // Reduced from 2.5M
        revenueAssumption: "Satellite servicing market is nascent. Assumes ~1 major mission every 2 months.",
        opex: 60_000,
        requires: []
    },
    power: {
        type: 'power',
        title: 'Power Station',
        description: 'Large solar array trusses and batteries to expand station capacity.',
        icon: '⚡',
        color: 'bg-yellow-500/50',
        mass: 11000,
        power_cont: 0,
        power_peak: 0,
        thermal: 0,
        crew: 0,
        volume: 0,
        data: 5,
        capex: 180_000_000,
        revenue: 5_000,
        revenueAssumption: "Power sales to visiting vehicles only.",
        opex: 10_000,
        provides: {
            power: 40,
            thermal: 20,
        },
        requires: []
    },
    health: {
        type: 'health',
        title: 'Health Care',
        description: 'Medical bay for crew health monitoring and biological experiments.',
        icon: '🏥',
        color: 'bg-red-500/50',
        mass: 9000,
        power_cont: 6,
        power_peak: 8,
        thermal: 6,
        crew: 1,
        volume: 35,
        data: 40,
        capex: 290_000_000,
        revenue: 50_000, // Reduced from 200k
        revenueAssumption: "Internal crew benefit primarily. Validation studies for pharma are intermittent.",
        opex: 40_000,
        requires: ['airlock']
    },
    airlock: {
        type: 'airlock',
        title: 'Crew Airlock',
        description: 'Required for EVA activities, maintenance, and crew transfer.',
        icon: '🚪',
        color: 'bg-slate-600',
        mass: 6000,
        power_cont: 2,
        power_peak: 4,
        thermal: 2,
        crew: 0,
        volume: 15,
        data: 5,
        capex: 150_000_000,
        revenue: 0,
        opex: 15_000,
        requires: []
    },
    cargo: {
        type: 'cargo',
        title: 'Cargo Bay',
        description: 'Pressurized and unpressurized storage for supplies and experiments.',
        icon: '📦',
        color: 'bg-amber-700/50',
        mass: 5000,
        power_cont: 1,
        power_peak: 2,
        thermal: 1,
        crew: 0,
        volume: 50,
        data: 0,
        capex: 100_000_000,
        revenue: 80_000, // Kept similar as logistics is steady
        revenueAssumption: "Storage fees for experiments and 3rd party supplies.",
        opex: 5_000,
        provides: {
            storage: 10000
        },
        requires: []
    },
    quarters: {
        type: 'quarters',
        title: 'Crew Quarters',
        description: 'Habitation module with private berths, galley, and life support for long-duration missions.',
        icon: '🛏️',
        color: 'bg-indigo-900/50',
        mass: 14000,
        power_cont: 6,
        power_peak: 8,
        thermal: 8,
        crew: 0,
        volume: 60,
        data: 20,
        capex: 320_000_000,
        revenue: 100_000,
        revenueAssumption: "Space tourism or leased astronaut berths.",
        opex: 30_000,
        provides: {
            crew: 4
        },
        requires: []
    }
};
