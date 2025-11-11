import { Box, Typography, useTheme } from "@mui/material";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
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
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      flexWrap="wrap"
      justifyContent={{ xs: "center", md: "start" }}
      my={{ xs: 4, md: 4 }}
    >
      <NewReleasesIcon
        sx={{
          fontSize: { xs: 80, md: 120 },
          color: theme.palette.primary.main,
        }}
      />

      <Box>
        <Box display="flex" alignItems="baseline" gap={1}>
          <Typography
            variant="h2"
            fontWeight={700}
            fontSize={{ xs: 42, sm: 56 }}
          >
            {formatMoney(totalBeforeDeduction)}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            fontSize={{ xs: 18, sm: 22 }}
          >
            kr/mån
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          fontSize={{ xs: 14, sm: 16 }}
        >
          Före ränteavdrag {formatMoney(totalAfterDeduction)} kr/mån
        </Typography>
      </Box>
    </Box>
  );
}
