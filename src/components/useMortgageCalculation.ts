import { useMemo } from "react";

interface MortgageInput {
  price: number;
  downPayment: number;
  interestRate: number;
  income: number;
  maintenanceCost: number;
  monthlyFee: number;
  propertyType: "house" | "condo";
}

interface MortgageResult {
  loanAmount: number;
  loanToValue: number;
  debtToIncome: number;
  amortizationPercent: number;
  amortizationPerMonth: number;
  interestCost: number;
  interestCostAfterDeduction: number;
  totalBeforeDeduction: number;
  totalAfterDeduction: number;
}

export function useMortgageCalculation({
  price,
  downPayment,
  interestRate,
  income,
  maintenanceCost,
  monthlyFee,
  propertyType,
}: MortgageInput): MortgageResult {
  return useMemo(() => {
    // Loan & ratios
    const loanAmount = price - downPayment;
    const loanToValue = (loanAmount / price) * 100;
    const annualIncome = income * 12;
    const debtToIncome = loanAmount / annualIncome;

    // Amortization
    let amortizationPercent = 0;
    if (loanToValue > 70) amortizationPercent = 2;
    else if (loanToValue > 50) amortizationPercent = 1;
    if (debtToIncome > 4.5) amortizationPercent += 1;

    const amortizationPerMonth =
      (loanAmount * (amortizationPercent / 100)) / 12;

    // Interest
    const interestCost = loanAmount * (interestRate / 100 / 12);
    const interestCostAfterDeduction = interestCost * 0.72;

    const monthlyFeeCost = propertyType === "condo" ? monthlyFee : 0;

    // Totals
    const totalBeforeDeduction =
      amortizationPerMonth + interestCost + maintenanceCost + monthlyFeeCost;
    const totalAfterDeduction =
      amortizationPerMonth +
      interestCostAfterDeduction +
      maintenanceCost +
      monthlyFeeCost;

    return {
      loanAmount,
      loanToValue,
      debtToIncome,
      amortizationPercent,
      amortizationPerMonth,
      interestCost,
      interestCostAfterDeduction,
      monthlyFeeCost,
      totalBeforeDeduction,
      totalAfterDeduction,
    };
  }, [
    price,
    downPayment,
    interestRate,
    income,
    maintenanceCost,
    monthlyFee,
    propertyType,
  ]);
}
