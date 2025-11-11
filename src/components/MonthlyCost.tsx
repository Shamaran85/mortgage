import { Box, Typography, Paper, Divider, useTheme } from "@mui/material";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import { useMortgageCalculation } from "./useMortgageCalculation";

interface Props {
  price: number;
  downPayment: number;
  interestRate: number;
  income: number;
  maintenanceCost: number;
  monthlyFee: number;
}

const formatMoney = (val: number) =>
  val.toLocaleString("sv-SE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export default function MonthlyCost(props: Props) {
  const theme = useTheme();
  const { totalBeforeDeduction, totalAfterDeduction } =
    useMortgageCalculation(props);

  return (
    <Paper
      elevation={0}
      sx={{
        width: { xs: "90%", md: "100%" },
        margin: "24px auto",
        p: { xs: 3, sm: 4 },
        textAlign: "center",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 0.5,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box display="flex" justifyContent="center" mb={2}>
        <SavingsOutlinedIcon
          sx={{
            fontSize: 56,
            color: theme.palette.primary.main,
          }}
        />
      </Box>

      <Typography
        variant="h3"
        fontWeight={700}
        sx={{
          fontSize: { xs: 38, sm: 52 },
          color: theme.palette.primary.main,
          lineHeight: 1.1,
        }}
      >
        {formatMoney(totalBeforeDeduction)} kr/mån
      </Typography>

      <Divider sx={{ my: 2, mx: "auto", width: "60%", opacity: 0.4 }} />

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontSize: { xs: 14, sm: 16 } }}
      >
        Efter skatteavdrag{" "}
        <strong>{formatMoney(totalAfterDeduction)} kr/mån</strong>
      </Typography>
    </Paper>
  );
}
