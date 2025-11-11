import { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import PropertyTypeSelector from "./Inputs/PropertyTypeSelector";
import Inputs from "./Inputs/MortgageInputs";
import MonthlyCost from "./Summary/MonthlyCost";
import Mortgage from "./Summary/Mortgage";

interface Props {
  price: number;
  setPrice: (value: number) => void;
  downPayment: number;
  setDownPayment: (value: number) => void;
  interestRate: number;
  setInterestRate: (value: number) => void;
  income: number;
  setIncome: (value: number) => void;
  maintenanceCost: number;
  setMaintenanceCost: (value: number) => void;
  monthlyFee: number;
  setMonthlyFee: (value: number) => void;
  propertyType: PropertyType;
  setPropertyType: (value: PropertyType) => void;
  includePropertyTax: boolean;
  setIncludePropertyTax: (value: boolean) => void;
}

export default function Mobile(props: Props) {
  const {
    price,
    setPrice,
    downPayment,
    setDownPayment,
    interestRate,
    setInterestRate,
    income,
    setIncome,
    maintenanceCost,
    setMaintenanceCost,
    monthlyFee,
    setMonthlyFee,
    propertyType,
    setPropertyType,
    includePropertyTax,
    setIncludePropertyTax,
  } = props;

  return (
    <Box sx={{ display: { xs: "block", md: "none" } }}>
      <Grid container spacing={1}>
        <Inputs
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
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          monthlyFee={monthlyFee}
          setMonthlyFee={setMonthlyFee}
        />
        <MonthlyCost
          price={price}
          downPayment={downPayment}
          interestRate={interestRate}
          income={income}
          maintenanceCost={maintenanceCost}
          monthlyFee={monthlyFee}
          propertyType={propertyType}
        />
        <Grid size={{ xs: 12 }}>
          <Mortgage
            price={price}
            downPayment={downPayment}
            interestRate={interestRate}
            income={income}
            maintenanceCost={maintenanceCost}
            monthlyFee={monthlyFee}
            propertyType={propertyType}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
