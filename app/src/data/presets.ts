export interface StationPreset {
    id: string;
    name: string;
    description: string;
    focus: string;
    crew: number;
    revenue: string;
    modules: { type: string; bayId: number }[];
}

export const STATION_PRESETS: StationPreset[] = [
    {
        id: 'research',
        name: 'Research Station',
        description: 'Zero-G Lab + Health Care + Crew Airlock + Hydroponics',
        focus: 'Scientific research',
        crew: 6,
        revenue: '$450K/month',
        modules: [
            { type: 'hub', bayId: -1 },
            { type: 'lab', bayId: 0 },
            { type: 'health', bayId: 1 },
            { type: 'airlock', bayId: 2 },
            { type: 'hydro', bayId: 3 }
        ]
    },
    {
        id: 'manufacturing',
        name: 'Manufacturing Hub',
        description: '2x Manufacturing Fab + Cargo Bay + Power Station',
        focus: 'ZBLAN production',
        crew: 3,
        revenue: '$1-4M/month',
        modules: [
            { type: 'hub', bayId: -1 },
            { type: 'fab', bayId: 0 },
            { type: 'fab', bayId: 1 },
            { type: 'cargo', bayId: 2 },
            { type: 'power', bayId: 3 }
        ]
    },
    {
        id: 'data',
        name: 'Data Fortress',
        description: '3x Data Center + 2x Power Station',
        focus: 'Secure computing',
        crew: 1,
        revenue: '$450K/month',
        modules: [
            { type: 'hub', bayId: -1 },
            { type: 'data', bayId: 0 },
            { type: 'data', bayId: 1 },
            { type: 'data', bayId: 2 },
            { type: 'power', bayId: 3 },
            { type: 'power', bayId: 4 }
        ]
    },
    {
        id: 'service',
        name: 'Satellite Servicing',
        description: 'Service Station + Crew Airlock + Power Station + Cargo Bay',
        focus: 'On-orbit operations',
        crew: 4,
        revenue: 'Variable ($10M+)',
        modules: [
            { type: 'hub', bayId: -1 },
            { type: 'repair', bayId: 0 },
            { type: 'airlock', bayId: 1 },
            { type: 'power', bayId: 2 },
            { type: 'cargo', bayId: 3 }
        ]
    },
    {
        id: 'balanced',
        name: 'Balanced Commercial',
        description: 'Diverse revenue stream with one of each major module.',
        focus: 'Revenue Diversity',
        crew: 8,
        revenue: '$2-3M/month',
        modules: [
            { type: 'hub', bayId: -1 },
            { type: 'lab', bayId: 0 },
            { type: 'fab', bayId: 1 },
            { type: 'data', bayId: 2 },
            { type: 'quarters', bayId: 3 },
            { type: 'power', bayId: 4 }
        ]
    }
];
