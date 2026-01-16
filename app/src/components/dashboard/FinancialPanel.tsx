import { useStationStore } from '../../store/useStationStore';
import { DollarSign, Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine
} from 'recharts';
import { calculateNPV, calculateIRR, calculateBreakEven } from '../../lib/financials';
import { LAUNCH_VEHICLES, type LaunchVehicleType } from '../../lib/launch';
import { getOPEXCategories, calculateAnnualOPEX } from '../../lib/opex';
import { Rocket } from 'lucide-react'; // Assuming Rocket icon exists or use generic

export function FinancialPanel() {
    const { metrics, financialParameters, setFinancialParameter, launchVehicle, setLaunchVehicle } = useStationStore();

    // Calculate OPEX breakdown for display
    const opexBreakdown = calculateAnnualOPEX(
        metrics.totalInvestment,
        metrics.crewCapacity > 0,
        metrics.crewCapacity
    );
    const opexCategories = getOPEXCategories(opexBreakdown);

    // Generate Cash Flow Data for Chart (10 years)
    const data = [];
    const monthlyNet = metrics.monthlyRevenue * financialParameters.revenueMultiplier - metrics.monthlyOpex;
    let cumulative = -metrics.totalInvestment; // Start with negative CAPEX + Launch

    for (let year = 0; year <= 10; year++) {
        data.push({
            year: `Y${year}`,
            cash: cumulative,
        });
        cumulative += monthlyNet * 12;
    }

    const formatCurrency = (val: number) => {
        if (Math.abs(val) >= 1_000_000_000) return `$${(val / 1_000_000_000).toFixed(2)}B`;
        if (Math.abs(val) >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
        if (Math.abs(val) >= 1_000) return `$${(val / 1_000).toFixed(1)}K`;
        return `$${val}`;
    };

    // Calculate scenario comparisons
    const baseNPV = metrics.netPresentValue;
    const baseIRR = metrics.internalRateReturn;
    const baseBE = metrics.breakEvenMonths;

    // Optimistic: -20% costs, +10% revenue
    const optRevenue = metrics.monthlyRevenue * 1.1;
    const optCapex = metrics.totalCapex * 0.8;
    const optNPV = calculateNPV(optCapex, optRevenue, metrics.monthlyOpex, 120, financialParameters.discountRate);
    const optIRR = calculateIRR(optCapex, optRevenue, metrics.monthlyOpex, 120);
    const optBE = calculateBreakEven(optCapex, optRevenue, metrics.monthlyOpex);

    // Pessimistic: +30% costs, -30% revenue
    const pessRevenue = metrics.monthlyRevenue * 0.7;
    const pessCapex = metrics.totalCapex * 1.3;
    const pessNPV = calculateNPV(pessCapex, pessRevenue, metrics.monthlyOpex, 120, financialParameters.discountRate);
    const pessIRR = calculateIRR(pessCapex, pessRevenue, metrics.monthlyOpex, 120);
    const pessBE = calculateBreakEven(pessCapex, pessRevenue, metrics.monthlyOpex);

    const scenarios = [
        { name: 'Base', npv: baseNPV, irr: baseIRR, be: baseBE, icon: Minus, color: 'text-primary' },
        { name: 'Optimistic', npv: optNPV, irr: optIRR, be: optBE, icon: TrendingUp, color: 'text-status-success' },
        { name: 'Pessimistic', npv: pessNPV, irr: pessIRR, be: pessBE, icon: TrendingDown, color: 'text-status-critical' },
    ];

    return (
        <div className="bg-background-panel border border-border rounded-lg p-6">
            <h2 className="font-display text-xl mb-6 text-primary flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Financial Analysis
            </h2>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-background-surface rounded-lg border border-white/5">
                    <div className="text-xs text-gray-400 mb-1">10-Year NPV</div>
                    <div className={`font-mono text-xl ${metrics.netPresentValue > 0 ? 'text-status-success' : 'text-status-critical'}`}>
                        {formatCurrency(metrics.netPresentValue)}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">@ {(financialParameters.discountRate * 100).toFixed(0)}% Discount</div>
                </div>

                <div className="p-4 bg-background-surface rounded-lg border border-white/5">
                    <div className="text-xs text-gray-400 mb-1">IRR</div>
                    <div className={`font-mono text-xl ${!Number.isNaN(metrics.internalRateReturn) && metrics.internalRateReturn > 0.15 ? 'text-status-success' : 'text-status-warning'}`}>
                        {Number.isNaN(metrics.internalRateReturn) ? 'N/A' : `${(metrics.internalRateReturn * 100).toFixed(1)}%`}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">Target: &gt;15%</div>
                </div>

                <div className="p-4 bg-background-surface rounded-lg border border-white/5">
                    <div className="text-xs text-gray-400 mb-1">Break-Even</div>
                    <div className="font-mono text-xl text-white">
                        {metrics.breakEvenMonths > 0 ? `${(metrics.breakEvenMonths / 12).toFixed(1)} yrs` : 'Never'}
                    </div>
                </div>

                <div className="p-4 bg-background-surface rounded-lg border border-white/5">
                    <div className="text-xs text-gray-400 mb-1">Total Investment</div>
                    <div className="font-mono text-lg text-white">
                        {formatCurrency(metrics.totalInvestment)}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">
                        Incl. {formatCurrency(metrics.totalLaunchCost)} Launch
                    </div>
                </div>

                <div className="p-4 bg-background-surface rounded-lg border border-white/5">
                    <div className="text-xs text-gray-400 mb-1">Annual OPEX</div>
                    <div className="font-mono text-xl text-status-critical">
                        {formatCurrency(metrics.monthlyOpex * 12)}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">
                        {metrics.crewCapacity > 0 ? 'Crewed Station' : 'Uncrewed'}
                    </div>
                </div>

                <div className="p-4 bg-background-surface rounded-lg border border-white/5">
                    <div className="text-xs text-gray-400 mb-1">Monthly Net</div>
                    <div className={`font-mono text-xl ${monthlyNet > 0 ? 'text-status-success' : 'text-status-critical'}`}>
                        {formatCurrency(monthlyNet)}
                    </div>
                </div>
            </div>

            {/* Cash Flow Chart */}
            <div className="h-40 mb-6 relative">
                <div className="text-xs text-gray-500 absolute top-0 right-0 z-10">Cumulative Cash Flow (10y)</div>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={formatCurrency} width={50} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#151a23', borderColor: '#2d3748', fontSize: '12px' }}
                            itemStyle={{ color: '#00d9ff' }}
                            formatter={(val: any) => formatCurrency(Number(val))}
                        />
                        <ReferenceLine y={0} stroke="#ffffff30" strokeDasharray="3 3" />
                        <Area type="monotone" dataKey="cash" stroke="#00d9ff" fillOpacity={1} fill="url(#colorCash)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Sensitivity Sliders */}
            <div className="space-y-3 pt-4 border-t border-white/5">
                <h3 className="text-sm font-display text-gray-400 flex items-center">
                    <Activity className="w-3 h-3 mr-2" /> Sensitivity Analysis
                </h3>

                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span>Revenue Achieved</span>
                        <span className="font-mono text-primary">{(financialParameters.revenueMultiplier * 100).toFixed(0)}%</span>
                    </div>
                    <input
                        type="range" min="0.5" max="1.5" step="0.05"
                        value={financialParameters.revenueMultiplier}
                        onChange={(e) => setFinancialParameter('revenueMultiplier', parseFloat(e.target.value))}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>

                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span>Discount Rate</span>
                        <span className="font-mono text-primary">{(financialParameters.discountRate * 100).toFixed(0)}%</span>
                    </div>
                    <input
                        type="range" min="0.05" max="0.20" step="0.01"
                        value={financialParameters.discountRate}
                        onChange={(e) => setFinancialParameter('discountRate', parseFloat(e.target.value))}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>
            </div>

            {/* Launch Vehicle Selection */}
            <div className="space-y-3 pt-4 border-t border-white/5">
                <h3 className="text-sm font-display text-gray-400 flex items-center">
                    <Rocket className="w-3 h-3 mr-2" /> Launch Configuration
                </h3>

                <div className="bg-background-surface p-3 rounded border border-white/5">
                    <select
                        value={launchVehicle}
                        onChange={(e) => setLaunchVehicle(e.target.value as LaunchVehicleType)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded p-2 text-sm mb-2"
                    >
                        {Object.values(LAUNCH_VEHICLES).map(v => (
                            <option key={v.id} value={v.id} disabled={!v.available}>
                                {v.name} - {formatCurrency(v.costPerLaunch)}/launch
                            </option>
                        ))}
                    </select>
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Payload: {formatCurrency(LAUNCH_VEHICLES[launchVehicle].payloadToLEO).replace('$', '')} kg</span>
                        <span>{(metrics.totalMass / LAUNCH_VEHICLES[launchVehicle].payloadToLEO).toFixed(1)} launches needed</span>
                    </div>
                </div>
            </div>

            {/* OPEX Breakdown */}
            <div className="space-y-3 pt-4 border-t border-white/5">
                <h3 className="text-sm font-display text-gray-400">Annual OPEX Breakdown</h3>
                <div className="bg-background-surface rounded p-2">
                    {opexCategories.map((cat, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-white/5 last:border-0">
                            <span className="text-gray-400 truncate pr-2">{cat.category}</span>
                            <span className="font-mono text-white">{formatCurrency(cat.amount)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between items-center text-xs py-1 mt-1 font-bold">
                        <span className="text-gray-300">Total</span>
                        <span className="font-mono text-status-critical">{formatCurrency(opexBreakdown.annualTotal)}</span>
                    </div>
                </div>
            </div>

            {/* Scenario Comparison Table */}
            <div className="mt-6 pt-4 border-t border-white/5">
                <h3 className="text-sm font-display text-gray-400 mb-3">Scenario Comparison</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="text-gray-500 border-b border-white/5">
                                <th className="text-left py-2">Scenario</th>
                                <th className="text-right py-2">NPV (10yr)</th>
                                <th className="text-right py-2">IRR</th>
                                <th className="text-right py-2">Break-Even</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scenarios.map((s) => (
                                <tr key={s.name} className="border-b border-white/5">
                                    <td className={`py-2 font-mono ${s.color} flex items-center`}>
                                        <s.icon className="w-3 h-3 mr-1" />
                                        {s.name}
                                    </td>
                                    <td className={`text-right py-2 font-mono ${s.npv > 0 ? 'text-status-success' : 'text-status-critical'}`}>
                                        {formatCurrency(s.npv)}
                                    </td>
                                    <td className="text-right py-2 font-mono text-white">
                                        {Number.isNaN(s.irr) ? 'N/A' : `${(s.irr * 100).toFixed(1)}%`}
                                    </td>
                                    <td className="text-right py-2 font-mono text-white">
                                        {s.be > 0 ? `${(s.be / 12).toFixed(1)} yrs` : 'Never'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
