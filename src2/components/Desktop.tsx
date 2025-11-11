import { Box, Typography, Grid } from "@mui/material";
import PropertyTypeSelector, {
  type PropertyType,
} from "./Inputs/PropertyTypeSelector";
import Inputs from "./Inputs/MortgageInputs";
import Mortgage from "./Summary/Mortgage";
import MonthlyCost from "./Summary/MonthlyCost";

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

export default function Desktop(props: Props) {
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
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <Grid container spacing={12}>
        {/* Left */}
        <Grid size={{ md: 6 }} mt={4}>
          {/* <Typography variant="h5" fontWeight={700} my={4}>
            Boende
          </Typography> */}
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
        </Grid>

        {/* Right */}
        <Grid size={{ md: 6 }}>
          {/* <Typography variant="h5" fontWeight={700} my={4}>
            Låneinformation
          </Typography> */}
          <MonthlyCost
            price={price}
            downPayment={downPayment}
            interestRate={interestRate}
            income={income}
            maintenanceCost={maintenanceCost}
            monthlyFee={monthlyFee}
            propertyType={propertyType}
          />
          <Mortgage
            price={price}
            downPayment={downPayment}
            interestRate={interestRate}
            income={income}
            maintenanceCost={maintenanceCost}
            monthlyFee={monthlyFee}
            propertyType={propertyType}
          />
          {/* <Summary
            price={price}
            downPayment={downPayment}
            rate={rate}
            income={income}
            drift={drift}
            includePropertyTax={includePropertyTax}
          /> */}
          {/* <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Cost
                price={price}
                downPayment={downPayment}
                rate={rate}
                income={income}
                drift={drift}
                includePropertyTax={includePropertyTax}
                propertyType={propertyType}
                avgift={avgift}
              />
            </Box>
            <Box>
              <Summary
                price={price}
                downPayment={downPayment}
                rate={rate}
                income={income}
                drift={drift}
                includePropertyTax={includePropertyTax}
              />
            </Box>
          </Box> */}
        </Grid>
      </Grid>
    </Box>
  );
}
