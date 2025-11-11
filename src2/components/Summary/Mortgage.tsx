import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useMortgageCalculation } from "./useMortgageCalculation";
import type { PropertyType } from "../Inputs/PropertyTypeSelector";

interface Props {
  price: number;
  downPayment: number;
  interestRate: number;
  income: number;
  maintenanceCost: number;
  monthlyFee: number;
  propertyType: PropertyType;
}

const formatCurrency = (v: number) =>
  v.toLocaleString("sv-SE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const HISTORICAL_RATES = {
  2022: 4.27,
  2023: 5.58,
  2024: 5.24,
} as const;

export default function MortgageDetails(props: Props) {
  const [open, setOpen] = useState(false);
  const mainResult = useMortgageCalculation(props);

  const {
    loanAmount,
    loanToValue,
    amortizationPercent,
    amortizationPerMonth,
    interestCost,
    interestCostAfterDeduction,
  } = mainResult;

  const historyData = Object.entries(HISTORICAL_RATES).map(([year, rate]) => {
    const { totalBeforeDeduction } = useMortgageCalculation({
      ...props,
      interestRate: rate,
    });
    return { year, rate, monthlyCost: totalBeforeDeduction };
  });

  const mortgageEntries = useMemo(
    () => [
      { label: "Lånebelopp", value: `${formatCurrency(loanAmount)} kr` },
      { label: "Belåningsgrad", value: `${loanToValue.toFixed(1)} %` },
      {
        label: `Amortering ${amortizationPercent}%`,
        value: `${formatCurrency(amortizationPerMonth)} kr/mån`,
      },
      {
        label: "Räntekostnad",
        value: `${formatCurrency(interestCost)} kr/mån`,
      },
      {
        label: "Ränta efter avdrag",
        value: `${formatCurrency(interestCostAfterDeduction)} kr/mån`,
      },
    ],
    [
      loanAmount,
      loanToValue,
      amortizationPercent,
      amortizationPerMonth,
      interestCost,
      interestCostAfterDeduction,
    ]
  );

  const additionalEntries = useMemo(
    () => [
      {
        label: "Driftkostnad",
        value: `${formatCurrency(props.maintenanceCost)} kr/mån`,
      },
      {
        label: "Avgift",
        value:
          props.propertyType === "condo"
            ? `${formatCurrency(props.monthlyFee)} kr/mån`
            : "0 kr/mån",
      },
    ],
    [props.maintenanceCost, props.propertyType, props.monthlyFee]
  );

  const Section = ({
    title,
    entries,
  }: {
    title: string;
    entries: { label: string; value: string }[];
  }) => (
    <Box>
      <Box sx={{ pb: 1, px: 0.5, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
      </Box>
      {entries.map(({ label, value }, index) => (
        <Box
          key={label}
          display="flex"
          justifyContent="space-between"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            py: 1.5,
            px: 0.5,
            backgroundColor:
              index % 2 === 1 ? "background.paper" : "action.hover",
          }}
        >
          <Typography fontWeight={500}>{label}</Typography>
          <Typography>{value}</Typography>
        </Box>
      ))}
    </Box>
  );

  const HistoricalSection = () => (
    <Box mt={4}>
      <Box
        sx={{
          pb: 1,
          px: 0.5,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Historisk jämförelse
        </Typography>
        <IconButton onClick={() => setOpen(true)} size="small">
          <InfoOutlinedIcon fontSize="inherit" />
        </IconButton>
      </Box>

      {historyData.map((item, index) => (
        <Box
          key={item.year}
          display="flex"
          justifyContent="space-between"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            py: 1.5,
            px: 0.5,
            backgroundColor:
              index % 2 === 1 ? "background.paper" : "action.hover",
          }}
        >
          <Typography fontWeight={500}>
            {item.year} ({item.rate.toFixed(2)}%)
          </Typography>
          <Typography>{formatCurrency(item.monthlyCost)} kr/mån</Typography>
        </Box>
      ))}
    </Box>
  );

  const InfoDialog = () => (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          pt: 2,
        }}
      >
        <DialogTitle sx={{ m: 0, p: 0 }}>Om historiska jämförelser</DialogTitle>
        <IconButton onClick={() => setOpen(false)} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ px: 2, pb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          Här visas hur samma bolån skulle ha kostat med genomsnittliga räntor
          under respektive år. Det kan hjälpa dig att förstå hur förändringar i
          ränteläget påverkar din månadskostnad.
        </Typography>
        <Typography variant="body2">
          Räntorna baseras på historiska snitträntor från bankernas rapporterade
          värden (Swedbank, SEB, Handelsbanken m.fl.).
        </Typography>
      </DialogContent>
    </Dialog>
  );

  return (
    <Box>
      <Section title="Bolån" entries={mortgageEntries} />
      <Box mt={4}>
        <Section title="Boende" entries={additionalEntries} />
      </Box>
      <HistoricalSection />
      <InfoDialog />
    </Box>
  );
}
