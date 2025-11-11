import { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import Logo from "./components/Logo";
import Desktop from "./components/Desktop";
import Mobile from "./components/Mobile";
import Footer from "./components/Footer";

export default function LoanCalculator() {
  // 🌙 Följ systemtema

  const theme = createTheme({
    palette: {
      primary: { main: "#008f72" },
      secondary: { main: "#26a69a" },
      background: {
        default: "#fafafa",
        // default: "#fff",
        paper: "#fff",
      },
      text: {
        primary: "#111",
        secondary: "#333",
      },
    },
    shape: { borderRadius: 10 },
  });

  const [price, setPrice] = useState<number>(5250000);
  const [downPayment, setDownPayment] = useState<number>(
    Math.round(5250000 * 0.15)
  );
  const [interestRate, setInterestRate] = useState<number>(2.85);
  const [income, setIncome] = useState<number>(94000);
  const [maintenanceCost, setMaintenanceCost] = useState<number>(4582);
  const [includePropertyTax, setIncludePropertyTax] = useState<boolean>(false);
  const [propertyType, setPropertyType] = useState<"house" | "condo">("house");
  const [monthlyFee, setMonthlyFee] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Logo />
      {/* Desktop layout */}
      <Box mb={10}>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            maxWidth: { xs: "100%", md: 960 },
            mx: "auto",
          }}
        >
          <Desktop
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
            includePropertyTax={includePropertyTax}
            setIncludePropertyTax={setIncludePropertyTax}
          />
        </Box>

        {/* Mobile */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            maxWidth: { xs: "480px" },
            px: "24px",
            mx: "auto",
          }}
        >
          <Mobile
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
            includePropertyTax={includePropertyTax}
            setIncludePropertyTax={setIncludePropertyTax}
          />
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
