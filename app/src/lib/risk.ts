import type { InstalledModule, ModuleType } from '../types/station';

// --- TYPES ---

export type EventType = 'meteor' | 'solar_flare' | 'malfunction';

export interface RiskEvent {
    id: string;
    name: string;
    type: EventType;
    severity: number; // 0-1  
    description: string;
    icon: string;
}

export interface RiskProfile {
    shieldingLevel: number;  // 0-100 (% protection from physical damage)
    radiationResist: number; // 0-100 (% protection from solar events)
    repairCapacity: number;  // 0-100 (% ability to recover from damage)
    overallDefense: number;  // 0-100 (composite score)
}

export interface EventResult {
    success: boolean; // true = mitigated, false = damage
    title: string;
    message: string;
    severity: 'critical' | 'warning' | 'success';
}

// --- RISK EVENTS CATALOG ---

export const RISK_EVENTS: Record<EventType, RiskEvent> = {
    meteor: {
        id: 'meteor',
        name: 'Meteor Shower',
        type: 'meteor',
        severity: 0.7,
        description: 'High-velocity debris field approaching. Shielding recommended.',
        icon: '☄️'
    },
    solar_flare: {
        id: 'solar_flare',
        name: 'Solar Flare',
        type: 'solar_flare',
        severity: 0.6,
        description: 'Elevated solar activity detected. Radiation levels increasing.',
        icon: '☀️'
    },
    malfunction: {
        id: 'malfunction',
        name: 'System Malfunction',
        type: 'malfunction',
        severity: 0.4,
        description: 'Random component failure detected. Repair capacity critical.',
        icon: '⚠️'
    }
};

// --- MODULE DEFENSE CONTRIBUTIONS ---
// Which modules provide protection?

const DEFENSE_MODULES: Partial<Record<ModuleType, {
    shielding?: number;
    radiation?: number;
    repair?: number;
}>> = {
    // Repair module provides repair capacity
    'repair': { repair: 50, shielding: 10 },
    // Cargo can store spare parts
    'cargo': { repair: 15 },
    // Hub has basic shielding
    'hub': { shielding: 20, radiation: 10 },
    // Power station has radiation hardening
    'power': { radiation: 20 },
    // Airlock allows EVA repairs
    'airlock': { repair: 20 },
};

// --- CORE FUNCTIONS ---

/**
 * Calculate the station's risk profile based on installed modules
 */
export function calculateRiskProfile(modules: InstalledModule[]): RiskProfile {
    let shielding = 0;
    let radiation = 0;
    let repair = 0;

    for (const module of modules) {
        if (module.status !== 'active') continue;

        const defense = DEFENSE_MODULES[module.type];
        if (defense) {
            shielding += defense.shielding ?? 0;
            radiation += defense.radiation ?? 0;
            repair += defense.repair ?? 0;
        }
    }

    // Cap at 100
    shielding = Math.min(shielding, 100);
    radiation = Math.min(radiation, 100);
    repair = Math.min(repair, 100);

    // Overall is weighted average
    const overall = Math.round((shielding * 0.4 + radiation * 0.3 + repair * 0.3));

    return {
        shieldingLevel: shielding,
        radiationResist: radiation,
        repairCapacity: repair,
        overallDefense: overall
    };
}

/**
 * Simulate an event occurring and determine outcome
 */
export function simulateEvent(eventType: EventType, profile: RiskProfile): EventResult {
    const event = RISK_EVENTS[eventType];

    // Determine which defense stat applies
    let relevantDefense: number;
    let defenseName: string;

    switch (eventType) {
        case 'meteor':
            relevantDefense = profile.shieldingLevel;
            defenseName = 'Shielding';
            break;
        case 'solar_flare':
            relevantDefense = profile.radiationResist;
            defenseName = 'Radiation Resistance';
            break;
        case 'malfunction':
            relevantDefense = profile.repairCapacity;
            defenseName = 'Repair Capacity';
            break;
    }

    // Calculate survival chance:
    // Base challenge = event severity (0.4 - 0.7)
    // Defense reduces challenge
    // Random factor adds uncertainty

    const challenge = event.severity * 100; // 40-70
    const protection = relevantDefense; // 0-100
    const randomFactor = Math.random() * 20 - 10; // -10 to +10

    const survivalScore = protection - challenge + randomFactor;

    // Determine outcome
    if (survivalScore >= 20) {
        // Strong success
        return {
            success: true,
            title: `${event.icon} ${event.name} - DEFLECTED`,
            message: `${defenseName} at ${relevantDefense}% held strong. No damage sustained.`,
            severity: 'success'
        };
    } else if (survivalScore >= -10) {
        // Partial success
        return {
            success: true,
            title: `${event.icon} ${event.name} - MITIGATED`,
            message: `Minor damage absorbed. ${defenseName} reduced impact significantly.`,
            severity: 'warning'
        };
    } else if (survivalScore >= -30) {
        // Moderate damage
        return {
            success: false,
            title: `${event.icon} ${event.name} - DAMAGE SUSTAINED`,
            message: `${defenseName} insufficient (${relevantDefense}%). Station systems stressed.`,
            severity: 'warning'
        };
    } else {
        // Critical damage
        return {
            success: false,
            title: `${event.icon} ${event.name} - CRITICAL DAMAGE`,
            message: `${defenseName} failed! Major system damage. Immediate repairs needed.`,
            severity: 'critical'
        };
    }
}

/**
 * Get a risk level description based on defense score
 */
export function getRiskLevel(overallDefense: number): {
    level: 'low' | 'medium' | 'high' | 'critical';
    label: string;
    color: string;
} {
    if (overallDefense >= 70) {
        return { level: 'low', label: 'Well Protected', color: 'text-green-400' };
    } else if (overallDefense >= 40) {
        return { level: 'medium', label: 'Moderate Risk', color: 'text-yellow-400' };
    } else if (overallDefense >= 20) {
        return { level: 'high', label: 'High Risk', color: 'text-orange-400' };
    } else {
        return { level: 'critical', label: 'Critical Vulnerability', color: 'text-red-400' };
    }
}
