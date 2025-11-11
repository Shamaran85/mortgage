import { Box, Stack } from "@mui/material";
import MortgageInputs from "./MortgageInputs";
import MonthlyCost from "./MonthlyCost";
import MortgageDetails from "./MortgageDetails";
import { useState } from "react";

export default function Mobile() {
  const [price, setPrice] = useState(4500000);
  const [downPayment, setDownPayment] = useState(800000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [income, setIncome] = useState(55000);
  const [maintenanceCost, setMaintenanceCost] = useState(2500);
  const [monthlyFee, setMonthlyFee] = useState(3000);
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
        display: { xs: "block", md: "none" },
        bgcolor: "background.default",
        minHeight: "100vh",
        py: 3,
      }}
    >
      <MonthlyCost {...sharedProps} />
      <Box sx={{ maxWidth: 600, mx: "auto", px: 2 }}>
        <Stack spacing={3}>
          {/* 🏠 Inputs */}
          <Box
            sx={{
              p: 3,
              bgcolor: "background.paper",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
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

          {/* 💰 Resultat */}

          <MortgageDetails {...sharedProps} />
        </Stack>
      </Box>
    </Box>
  );
}
