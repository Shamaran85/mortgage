import { Box, Grid, Stack, useTheme } from "@mui/material";
import MortgageInputs from "./MortgageInputs";
import MonthlyCost from "./MonthlyCost";
import MortgageDetails from "./MortgageDetails";
import { useState } from "react";

export default function Desktop() {
  const theme = useTheme();

  // 🔢 State för alla inputs
  const [price, setPrice] = useState(3345000);
  const [downPayment, setDownPayment] = useState(3345000 * 0.15);
  const [interestRate, setInterestRate] = useState(2.9);
  const [income, setIncome] = useState(94000);
  const [maintenanceCost, setMaintenanceCost] = useState(1456);
  const [monthlyFee, setMonthlyFee] = useState(7348);
  const [propertyType, setPropertyType] = useState<"house" | "condo">("house");

  const sharedProps = {
    price,
    downPayment,
    interestRate,
    income,
    maintenanceCost,
    monthlyFee,
    propertyType,
  };

  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        bgcolor: "background.default",
        py: 6,
      }}
    >
      <Box
        sx={{
          maxWidth: "1024px",
          mx: "auto",
          px: 3,
        }}
      >
        <Grid container spacing={4}>
          {/* 🧮 Vänster kolumn: Inputs */}
          <Grid size={6}>
            <Box
              sx={{
                p: 4,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
              }}
            >
              <MortgageInputs
                price={price}
                setPrice={setPrice}
                downPayment={downPayment}
                setDownPayment={setDownPayment}
                interestRate={interestRate}
                setInterestRate={setInterestRate}
                income={income}
                setIncome={setIncome}
                maintenanceCost={maintenanceCost}
                setMaintenanceCost={setMaintenanceCost}
                monthlyFee={monthlyFee}
                setMonthlyFee={setMonthlyFee}
                propertyType={propertyType}
                setPropertyType={setPropertyType}
              />
            </Box>
          </Grid>

          {/* 💰 Höger kolumn: Resultat */}
          <Grid size={6}>
            <Stack spacing={3}>
              <MonthlyCost {...sharedProps} />
              <MortgageDetails {...sharedProps} />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
