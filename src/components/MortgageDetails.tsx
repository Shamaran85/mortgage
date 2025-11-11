import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Chip,
  Divider,
  Card,
  CardContent,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HistoryIcon from "@mui/icons-material/History";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useMortgageCalculation } from "./useMortgageCalculation";

interface Props {
  price: number;
  downPayment: number;
  interestRate: number;
  income: number;
  maintenanceCost: number;
  monthlyFee: number;
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

// ---------- Styled Components ----------

const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const DataRowBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${theme.spacing(1.5)} 0`,
}));

const HistoryCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

// ---------- Components ----------

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
      {
        label: "Lånebelopp",
        value: `${formatCurrency(loanAmount)} kr`,
      },
      {
        label: "Belåningsgrad",
        value: `${loanToValue.toFixed(1)} %`,
      },
      {
        label: `Amortering ${amortizationPercent}%`,
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
    ];

    if (props.maintenanceCost > 0) {
      baseEntries.push({
        label: "Driftkostnad",
        value: `${formatCurrency(props.maintenanceCost)} kr/mån`,
      });
    }

    if (props.monthlyFee > 0) {
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
  ]);

  const DataRow = ({
    label,
    value,
    emphasis = false,
  }: {
    label: string;
    value: string;
    sublabel?: string;
    emphasis?: boolean;
  }) => (
    <DataRowBox>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="body1"
          fontWeight={emphasis ? 700 : 500}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {label}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        fontWeight={emphasis ? 700 : 500}
        color="text.primary"
      >
        {value}
      </Typography>
    </DataRowBox>
  );

  const Section = ({
    title,
    icon,
    children,
  }: {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <Box>
      <SectionHeader>
        {icon}
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
      </SectionHeader>
      <Divider />
      <Box mt={1}>{children}</Box>
    </Box>
  );

  const HistoricalSection = () => (
    <Box mt={4}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <HistoryIcon color="primary" />
          <Typography variant="h6" fontWeight={600}>
            Historisk jämförelse
          </Typography>
        </Box>
        <IconButton onClick={() => setOpen(true)} size="small">
          <InfoOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box display="flex" flexDirection="column" gap={1.5}>
        {historyData.map((item) => {
          const isCurrent = item.rate === props.interestRate;
          return (
            <HistoryCard
              key={item.year}
              sx={{
                borderColor: isCurrent ? "primary.main" : "divider",
                backgroundColor: isCurrent
                  ? "action.selected"
                  : "background.paper",
              }}
            >
              <CardContent sx={{ py: 1.5, px: 2 }}>
                <Box display="flex" justifyContent="space-between">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      color={isCurrent ? "primary.main" : "text.primary"}
                    >
                      {item.year}
                    </Typography>
                    <Chip
                      label={`${item.rate.toFixed(2)}%`}
                      size="small"
                      color={isCurrent ? "primary" : "default"}
                      variant="outlined"
                    />
                    {isCurrent && (
                      <Chip
                        label="Nuvarande"
                        size="small"
                        color="primary"
                        variant="filled"
                      />
                    )}
                  </Box>
                  <Typography
                    variant="body1"
                    color={isCurrent ? "primary.main" : "text.primary"}
                  >
                    {formatCurrency(item.monthlyCost)} kr/mån
                  </Typography>
                </Box>
              </CardContent>
            </HistoryCard>
          );
        })}
      </Box>
    </Box>
  );

  const InfoDialog = () => (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: 600,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TrendingUpIcon color="primary" />
          <Typography variant="h6">Om historiska jämförelser</Typography>
        </Box>
        <IconButton onClick={() => setOpen(false)} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
          Här visas hur samma bolån skulle ha kostat med genomsnittliga räntor
          under respektive år. Det hjälper dig förstå hur förändringar i
          ränteläget påverkar månadskostnaden.
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
          Räntorna baseras på historiska snitträntor från bankernas rapporterade
          värden (Swedbank, SEB, Handelsbanken m.fl.).
        </Typography>
      </DialogContent>
    </Dialog>
  );

  return (
    <Container>
      <Section title="Bolåneöversikt" icon={<TrendingUpIcon color="primary" />}>
        {mortgageEntries.map((entry) => (
          <DataRow
            key={entry.label}
            label={entry.label}
            value={entry.value}
            emphasis={(entry as any).emphasis}
          />
        ))}
      </Section>

      <Divider sx={{ my: 4 }} />

      <HistoricalSection />
      <InfoDialog />
    </Container>
  );
}
