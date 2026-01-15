export function calculateNPV(initialInvestment: number, monthlyRevenue: number, monthlyOpex: number, months: number = 120, discountRate: number = 0.10): number {
    const monthlyRate = discountRate / 12;
    let npv = -initialInvestment;

    const monthlyCashFlow = monthlyRevenue - monthlyOpex;

    for (let t = 1; t <= months; t++) {
        npv += monthlyCashFlow / Math.pow(1 + monthlyRate, t);
    }

    return Math.round(npv);
}

export function calculateIRR(initialInvestment: number, monthlyRevenue: number, monthlyOpex: number, months: number = 120): number {
    const monthlyNet = monthlyRevenue - monthlyOpex;

    // Edge case: If monthly net is non-positive, IRR is undefined/negative infinity
    if (monthlyNet <= 0) {
        return NaN; // Signal invalid IRR
    }

    // Edge case: If no investment, IRR is infinite
    if (initialInvestment <= 0) {
        return NaN;
    }

    const cashFlows = [-initialInvestment];
    for (let i = 0; i < months; i++) cashFlows.push(monthlyNet);

    // Binary search for IRR (rate where NPV = 0)
    let low = -0.5;
    let high = 2.0; // Allow up to 200% annual returns
    let guess = 0.1;

    for (let i = 0; i < 50; i++) { // More iterations for precision
        const npv = calculateNPV(initialInvestment, monthlyRevenue, monthlyOpex, months, guess);
        if (Math.abs(npv) < 1000) break;
        if (npv > 0) low = guess;
        else high = guess;
        guess = (low + high) / 2;
    }

    // Clamp to reasonable range (-50% to 200%)
    const clampedRate = Math.max(-0.5, Math.min(2.0, guess));
    return clampedRate; // Return as decimal (0.15 = 15%)
}

export function calculateBreakEven(initialInvestment: number, monthlyRevenue: number, monthlyOpex: number): number {
    const monthlyNet = monthlyRevenue - monthlyOpex;
    if (monthlyNet <= 0) return -1; // Never
    return Math.ceil(initialInvestment / monthlyNet);
}
