import { useState, useMemo } from "react";
import { Container } from "./MortgageStyles";
import { MortgageOverview } from "./MortgageOverview";
import { MortgageHistory } from "./MortgageHistory";
import { MortgageInfoDialog } from "./MortgageInfoDialog";
import { useMortgageCalculation } from "../useMortgageCalculation";

const HISTORICAL_RATES = {
  2022: 4.27,
  2023: 5.58,
  2024: 5.24,
} as const;

const formatCurrency = (v: number) =>
  v.toLocaleString("sv-SE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export interface MortgageProps {
  price: number;
  downPayment: number;
  interestRate: number;
  income: number;
  maintenanceCost: number;
  monthlyFee: number;
}

export default function MortgageDetails(props: MortgageProps) {
  const [open, setOpen] = useState(false);
  const result = useMortgageCalculation(props);
  const {
    loanAmount,
    loanToValue,
    amortizationPercent,
    amortizationPerMonth,
    interestCost,
    interestCostAfterDeduction,
  } = result;

  const historyData = Object.entries(HISTORICAL_RATES).map(([year, rate]) => {
    const { totalBeforeDeduction } = useMortgageCalculation({
      ...props,
      interestRate: rate,
    });
    return { year, rate, monthlyCost: totalBeforeDeduction };
  });

  const overviewEntries = useMemo(
    () => [
      { label: "Lånebelopp", value: `${formatCurrency(loanAmount)} kr` },
      { label: "Belåningsgrad", value: `${loanToValue.toFixed(1)} %` },
      {
        label: "Amortering",
        chip: `${amortizationPercent}%`,
        value: `${formatCurrency(amortizationPerMonth)} kr/mån`,
      },
      {
        label: "Räntekostnad",
        value: `${formatCurrency(interestCost)} kr/mån`,
        emphasis: true,
      },
      {
        label: "Ränta efter avdrag",
        value: `${formatCurrency(interestCostAfterDeduction)} kr/mån`,
      },
      ...(props.maintenanceCost
        ? [
            {
              label: "Driftkostnad",
              value: `${formatCurrency(props.maintenanceCost)} kr/mån`,
            },
          ]
        : []),
      ...(props.monthlyFee
        ? [
            {
              label: "Avgift",
              value: `${formatCurrency(props.monthlyFee)} kr/mån`,
            },
          ]
        : []),
    ],
    [
      loanAmount,
      loanToValue,
      amortizationPercent,
      amortizationPerMonth,
      interestCost,
      interestCostAfterDeduction,
      props.maintenanceCost,
      props.monthlyFee,
    ]
  );

  return (
    <Container>
      <MortgageOverview entries={overviewEntries} />
      <MortgageHistory
        historyData={historyData}
        onInfoClick={() => setOpen(true)}
      />
      <MortgageInfoDialog open={open} onClose={() => setOpen(false)} />
    </Container>
  );
}
