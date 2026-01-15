import jsPDF from 'jspdf';
import type { StationMetrics, InstalledModule } from '../types/station';
import { MODULE_SPECS } from '../data/modules';

interface ExportData {
    modules: InstalledModule[];
    metrics: StationMetrics;
    financialParameters?: {
        discountRate: number;
        revenueMultiplier: number;
    };
}

/**
 * Export configuration as JSON file
 */
export function exportJSON(data: ExportData): void {
    const exportObj = {
        version: '2.0',
        timestamp: new Date().toISOString(),
        configuration: {
            modules: data.modules.map(m => ({
                bayId: m.bayId,
                type: m.type,
                status: m.status,
                specs: MODULE_SPECS[m.type]
            })),
            metrics: data.metrics,
            financialParameters: data.financialParameters
        }
    };

    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vishwakarma_config_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Export module data as CSV spreadsheet
 */
export function exportCSV(data: ExportData): void {
    const headers = ['Module', 'Bay', 'Status', 'Mass (kg)', 'Power (kW)', 'Thermal (kW)', 'Crew', 'CAPEX ($M)', 'Revenue ($/mo)'];

    const rows = data.modules.map(m => {
        const spec = MODULE_SPECS[m.type];
        return [
            spec.title,
            m.bayId,
            m.status,
            spec.mass,
            spec.power_cont,
            spec.thermal,
            spec.crew,
            (spec.capex / 1_000_000).toFixed(1),
            spec.revenue
        ].join(',');
    });

    // Add totals row
    rows.push('');
    rows.push([
        'TOTALS', '', '',
        data.metrics.totalMass,
        data.metrics.totalPowerCont,
        data.metrics.totalThermal,
        data.metrics.totalCrew,
        (data.metrics.totalCapex / 1_000_000).toFixed(1),
        data.metrics.monthlyRevenue
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vishwakarma_modules_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

const formatCurrency = (val: number) => {
    if (Math.abs(val) >= 1_000_000_000) return `$${(val / 1_000_000_000).toFixed(2)}B`;
    if (Math.abs(val) >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
    if (Math.abs(val) >= 1_000) return `$${(val / 1_000).toFixed(1)}K`;
    return `$${val.toFixed(0)}`;
};

/**
 * Generate 5-page PDF Technical Report
 */
export function exportPDF(modules: InstalledModule[], metrics: StationMetrics, discountRate: number = 0.10): void {
    const doc = new jsPDF();
    const margin = 20;
    let y = margin;

    // ========== PAGE 1: Configuration Summary ==========
    doc.setFontSize(24);
    doc.setTextColor(0, 217, 255);
    doc.text('VISHWAKARMA', margin, y);
    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(150, 150, 150);
    doc.text('Space Station Configuration Report', margin, y);
    y += 5;
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, y);
    y += 15;

    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50);
    doc.text('STATION OVERVIEW', margin, y);
    y += 10;

    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    const overview = [
        `Total Modules: ${modules.length}`,
        `Total Mass: ${(metrics.totalMass / 1000).toFixed(1)} tonnes`,
        `Power: ${metrics.totalPowerCont} / ${metrics.powerGeneration} kW`,
        `Thermal: ${metrics.totalThermal} / ${metrics.thermalCapacity} kW`,
        `Crew: ${metrics.totalCrew} / ${metrics.crewCapacity || '--'} persons`,
    ];
    overview.forEach(line => { doc.text(line, margin, y); y += 6; });
    y += 10;

    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50);
    doc.text('INSTALLED MODULES', margin, y);
    y += 10;

    doc.setFontSize(9);
    modules.forEach(m => {
        const spec = MODULE_SPECS[m.type];
        doc.setTextColor(80, 80, 80);
        doc.text(`Bay ${m.bayId}: ${spec.title}`, margin, y);
        doc.setTextColor(120, 120, 120);
        doc.text(`${(spec.mass / 1000).toFixed(1)}t | ${spec.power_cont}kW | ${formatCurrency(spec.capex)}`, margin + 80, y);
        y += 5;
        if (y > 270) { doc.addPage(); y = 20; }
    });

    // ========== PAGE 2: Financial Analysis ==========
    doc.addPage();
    y = margin;

    doc.setFontSize(18);
    doc.setTextColor(0, 100, 200);
    doc.text('FINANCIAL ANALYSIS', margin, y);
    y += 15;

    doc.setFontSize(11);
    const financialMetrics = [
        ['Total CAPEX', formatCurrency(metrics.totalCapex)],
        ['Monthly Revenue', formatCurrency(metrics.monthlyRevenue)],
        ['Monthly OPEX', formatCurrency(metrics.monthlyOpex)],
        ['Monthly Net', formatCurrency(metrics.monthlyRevenue - metrics.monthlyOpex)],
        ['Annual Revenue', formatCurrency(metrics.monthlyRevenue * 12)],
        ['10-Year NPV', formatCurrency(metrics.netPresentValue)],
        ['IRR', Number.isNaN(metrics.internalRateReturn) ? 'N/A' : `${(metrics.internalRateReturn * 100).toFixed(1)}%`],
        ['Break-Even', metrics.breakEvenMonths > 0 ? `${(metrics.breakEvenMonths / 12).toFixed(1)} years` : 'Never'],
    ];

    financialMetrics.forEach(([label, value]) => {
        doc.setTextColor(100, 100, 100);
        doc.text(String(label), margin, y);
        doc.setTextColor(30, 30, 30);
        doc.text(String(value), margin + 50, y);
        y += 8;
    });

    y += 10;
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`Discount Rate: ${(discountRate * 100).toFixed(0)}%`, margin, y);

    // ========== PAGE 3: Mission Timeline ==========
    doc.addPage();
    y = margin;

    doc.setFontSize(18);
    doc.setTextColor(0, 100, 200);
    doc.text('MISSION TIMELINE', margin, y);
    y += 15;

    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text('Month 0: Hub Launch ($500M, 25t)', margin, y);
    y += 6;

    const sortedModules = [...modules].sort((a, b) => a.bayId - b.bayId);
    let cumulativeMass = 25000;
    let cumulativeCost = 500_000_000;

    sortedModules.forEach((m, i) => {
        const spec = MODULE_SPECS[m.type];
        const month = (i + 1) * 3;
        cumulativeMass += spec.mass;
        cumulativeCost += spec.capex;
        doc.text(`Month ${month}: ${spec.title} (${formatCurrency(spec.capex)}, ${(spec.mass / 1000).toFixed(1)}t)`, margin, y);
        y += 6;
        if (y > 270) { doc.addPage(); y = 20; }
    });

    y += 10;
    doc.setTextColor(30, 30, 30);
    doc.text(`Total Deployment: ${sortedModules.length * 3} months`, margin, y);
    y += 6;
    doc.text(`Final Station Mass: ${(cumulativeMass / 1000).toFixed(1)} tonnes`, margin, y);
    y += 6;
    doc.text(`Total Investment: ${formatCurrency(cumulativeCost)}`, margin, y);

    // ========== PAGE 4: Systems Validation ==========
    doc.addPage();
    y = margin;

    doc.setFontSize(18);
    doc.setTextColor(0, 100, 200);
    doc.text('SYSTEMS VALIDATION', margin, y);
    y += 15;

    doc.setFontSize(11);
    const checks = [
        { name: 'Power Budget', status: metrics.totalPowerCont <= metrics.powerGeneration ? 'PASS' : 'FAIL', detail: `${metrics.totalPowerCont}/${metrics.powerGeneration} kW` },
        { name: 'Thermal Capacity', status: metrics.totalThermal <= metrics.thermalCapacity ? 'PASS' : 'FAIL', detail: `${metrics.totalThermal}/${metrics.thermalCapacity} kW` },
        { name: 'Crew Capacity', status: metrics.crewCapacity === 0 ? 'N/A' : (metrics.totalCrew <= metrics.crewCapacity ? 'PASS' : 'FAIL'), detail: metrics.crewCapacity === 0 ? 'No quarters' : `${metrics.totalCrew}/${metrics.crewCapacity}` },
        { name: 'Financial Viability', status: metrics.netPresentValue > 0 ? 'PASS' : 'FAIL', detail: `NPV: ${formatCurrency(metrics.netPresentValue)}` }
    ];

    checks.forEach(check => {
        doc.setTextColor(check.status === 'PASS' ? 0 : check.status === 'FAIL' ? 200 : 100, check.status === 'PASS' ? 150 : 50, check.status === 'PASS' ? 50 : 50);
        doc.text(`[${check.status}]`, margin, y);
        doc.setTextColor(30, 30, 30);
        doc.text(check.name, margin + 25, y);
        doc.setTextColor(100, 100, 100);
        doc.text(check.detail, margin + 75, y);
        y += 10;
    });

    // ========== PAGE 5: Methodology & Disclaimers ==========
    doc.addPage();
    y = margin;

    doc.setFontSize(18);
    doc.setTextColor(0, 100, 200);
    doc.text('METHODOLOGY & DISCLAIMERS', margin, y);
    y += 15;

    doc.setFontSize(9);
    doc.setTextColor(180, 120, 0);
    doc.text('DISCLAIMER: This tool is a CAPABILITY DEMONSTRATION, not a production', margin, y); y += 5;
    doc.text('planning system. Specifications are based on publicly available data,', margin, y); y += 5;
    doc.text('engineering estimates, and conceptual design assumptions.', margin, y); y += 12;

    doc.setTextColor(30, 30, 30);
    doc.setFontSize(11);
    doc.text('MODULE SPECIFICATIONS', margin, y); y += 8;
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    ['• Masses: Scaled from ISS module data (±20% accuracy)', '• Power: Based on comparable terrestrial systems', '• Costs: Extrapolated from SpaceX/NASA pricing', '• Revenue: Market estimates (high uncertainty)'].forEach(line => { doc.text(line, margin, y); y += 5; });

    y += 8;
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(11);
    doc.text('SOURCES & REFERENCES', margin, y); y += 8;
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    ['• ISS specs: NASA Technical Reports', '• Launch costs: SpaceX Falcon 9 User Guide', '• Orbital mechanics: Curtis "Orbital Mechanics for Engineering Students"', '• Thermal/power: SMAD (Space Mission Analysis & Design)'].forEach(line => { doc.text(line, margin, y); y += 5; });

    y += 8;
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(11);
    doc.text('KNOWN LIMITATIONS', margin, y); y += 8;
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    ['• Does not model component failures', '• Simplified thermal analysis (no transient effects)', '• Revenue estimates have ±50% uncertainty', '• Does not account for regulatory/insurance costs'].forEach(line => { doc.text(line, margin, y); y += 5; });

    // Footer
    y = doc.internal.pageSize.getHeight() - 15;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('PURPOSE: Demonstrate systems engineering methodology and technical competency.', margin, y);

    // Save
    doc.save(`vishwakarma_report_${new Date().toISOString().split('T')[0]}.pdf`);
}
