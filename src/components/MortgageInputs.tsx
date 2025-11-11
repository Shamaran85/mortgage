import { useMemo } from "react";
import { Box, Slider, Stack, Grid } from "@mui/material";
import PropertyTypeSelector from "./PropertyTypeSelector";
import InputField from "./InputField";

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
  propertyType: "house" | "condo";
  setPropertyType: (value: "house" | "condo") => void;
}

const formatMoney = (v: number) =>
  v.toLocaleString("sv-SE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export default function MortgageInputs({
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
}: Props) {
  const minDownPayment = useMemo(() => Math.round(price * 0.15), [price]);
  const downPaymentPercent = useMemo(
    () => (price > 0 ? ((downPayment / price) * 100).toFixed(1) : "0"),
    [downPayment, price]
  );

  return (
    <Stack spacing={3}>
      {/* 🏠 Boendetyp */}
      <PropertyTypeSelector
        propertyType={propertyType}
        setPropertyType={setPropertyType}
      />

      {/* 💰 Pris */}
      <Box>
        <InputField
          label="Vad kostar bostaden?"
          value={price}
          onChange={setPrice}
          unit="kr"
        />
        <Slider
          min={100_000}
          max={15_000_000}
          step={50_000}
          value={price}
          onChange={(_, v) => setPrice(v as number)}
          sx={{
            color: "primary.main",
            height: 6,
            "& .MuiSlider-thumb": {
              width: 22,
              height: 22,
              border: "2px solid white",
              boxShadow: "0 0 0 2px #1e4fa3",
            },
          }}
        />
      </Box>

      {/* 💵 Kontantinsats */}
      <Box>
        <InputField
          label={`Kontantinsats (${downPaymentPercent} %)`}
          value={downPayment}
          onChange={setDownPayment}
          unit="kr"
          description={`Minst 15 % krävs (${formatMoney(minDownPayment)} kr)`}
        />
        <Slider
          min={minDownPayment}
          max={price}
          step={10_000}
          value={Math.min(downPayment, price)}
          onChange={(_, v) => setDownPayment(v as number)}
          sx={{
            color: "primary.main",
            height: 6,
            "& .MuiSlider-thumb": {
              width: 22,
              height: 22,
              border: "2px solid white",
              boxShadow: "0 0 0 2px #1e4fa3",
            },
          }}
        />
      </Box>

      {/* 📈 Ränta */}
      <Box>
        <InputField
          label="Vilken ränta vill du räkna på?"
          value={interestRate}
          onChange={setInterestRate}
          unit="%"
          readonly
        />
        <Slider
          min={0}
          max={10}
          step={0.05}
          value={interestRate}
          onChange={(_, v) => setInterestRate(v as number)}
          sx={{
            color: "primary.main",
            height: 6,
            "& .MuiSlider-thumb": {
              width: 22,
              height: 22,
              border: "2px solid white",
              boxShadow: "0 0 0 2px #1e4fa3",
            },
          }}
        />
      </Box>

      {/* 👨‍👩‍👧‍👦 Inkomst */}
      <InputField
        label="Hushållets inkomst före skatt"
        value={income}
        onChange={setIncome}
        unit="kr/mån"
      />

      {/* 🧾 Driftkostnad */}
      <InputField
        label="Driftskostnad"
        value={maintenanceCost}
        onChange={setMaintenanceCost}
        unit="kr/mån"
      />

      {/* 🏢 Avgift (bostadsrätt) */}
      {propertyType === "condo" && (
        <InputField
          label="Månadsavgift"
          value={monthlyFee}
          onChange={setMonthlyFee}
          unit="kr/mån"
        />
      )}
    </Stack>
  );
}
