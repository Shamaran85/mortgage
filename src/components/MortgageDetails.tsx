import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useMortgageCalculation } from "./useMortgageCalculation";

interface Props {
  price: number;
  downPayment: number;
  interestRate: number;
  income: number;
  maintenanceCost: number;
  monthlyFee: number;
  propertyType: "house" | "condo";
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

  const mortgageEntries = useMemo(() => {
    const baseEntries = [
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
      {
        label: "Driftkostnad",
        value: `${formatCurrency(props.maintenanceCost)} kr/mån`,
      },
    ];

    if (props.propertyType === "condo") {
      baseEntries.push({
        label: "Avgift",
        value: `${formatCurrency(props.monthlyFee)} kr/mån`,
      });
    }

    return baseEntries;
  }, [
    loanAmount,
    loanToValue,
    amortizationPercent,
    amortizationPerMonth,
    interestCost,
    interestCostAfterDeduction,
    props.maintenanceCost,
    props.monthlyFee,
    props.propertyType,
  ]);

  const Section = ({
    title,
    entries,
  }: {
    title: string;
    entries: { label: string; value: string }[];
  }) => (
    <Box>
      <Box
        sx={{
          pb: 1,
          px: 0.5,
          //   borderBottom: 1,
          //   borderColor: "divider",
          mb: 0.5,
        }}
      >
        <Typography variant="h6" fontWeight={700} color="primary.main">
          {title}
        </Typography>
      </Box>
      {entries.map(({ label, value }, index) => (
        <Box
          key={label}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            // borderBottom: 1,
            // borderColor: "divider",
            py: 1.3,
            px: 0.8,
            backgroundColor:
              index % 2 === 1 ? "background.paper" : "action.hover",
            borderRadius: index === 0 ? "8px 8px 0 0" : 0,
          }}
        >
          <Typography variant="body1" fontWeight={500}>
            {label}
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {value}
          </Typography>
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
          //   borderBottom: 1,
          //   borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={700} color="primary.main">
          Historisk jämförelse
        </Typography>
        <IconButton
          onClick={() => setOpen(true)}
          size="small"
          sx={{
            color: "text.secondary",
            "&:hover": { color: "primary.main" },
          }}
        >
          <InfoOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>

      {historyData.map((item, index) => (
        <Box
          key={item.year}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            // borderBottom: 1,
            // borderColor: "divider",
            py: 1.3,
            px: 0.8,
            backgroundColor:
              index % 2 === 1 ? "background.paper" : "action.hover",
          }}
        >
          <Typography fontWeight={500}>
            {item.year} ({item.rate.toFixed(2)}%)
          </Typography>
          <Typography fontWeight={600}>
            {formatCurrency(item.monthlyCost)} kr/mån
          </Typography>
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
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Section title="Bolån" entries={mortgageEntries} />
      <Divider />
      <HistoricalSection />
      <InfoDialog />
    </Paper>
  );
}
