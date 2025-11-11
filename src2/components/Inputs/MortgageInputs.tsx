import { useMemo } from "react";
import { Box, Slider, Stack } from "@mui/material";
import PropertyTypeSelector from "./PropertyTypeSelector";
import type { PropertyType } from "./PropertyTypeSelector";
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
  propertyType: PropertyType;
  setPropertyType: (value: PropertyType) => void;
}

const formatCurrency = (v: number) =>
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
    () =>
      price > 0 ? parseFloat(((downPayment / price) * 100).toFixed(1)) : 0,
    [downPayment, price]
  );

  return (
    <Stack spacing={3}>
      <PropertyTypeSelector
        propertyType={propertyType}
        setPropertyType={setPropertyType}
      />

      {/* Pris */}
      <Stack spacing={1}>
        <InputField
          label="Vad kostar bostaden?"
          value={price}
          onChange={setPrice}
          unit="kr"
        />
        <Box px={1}>
          <Slider
            min={100000}
            max={10000000}
            step={50000}
            value={price}
            onChange={(_, v) => setPrice(v as number)}
          />
        </Box>
      </Stack>

      {/* Kontantinsats */}
      <Stack spacing={1}>
        <InputField
          label={`Kontantinsats (${downPaymentPercent}%)`}
          value={downPayment}
          onChange={setDownPayment}
          unit="kr"
          description={`Minst 15% krävs (${formatCurrency(minDownPayment)} kr)`}
        />
        <Box px={1}>
          <Slider
            min={Math.max(minDownPayment, 0)}
            max={Math.max(price, minDownPayment)}
            step={10000}
            value={Math.min(downPayment, Math.max(price, minDownPayment))}
            onChange={(_, v) => setDownPayment(v as number)}
          />
        </Box>
      </Stack>

      {/* Ränta */}
      <Stack spacing={1}>
        <InputField
          label="Vilken ränta vill du räkna på?"
          value={interestRate}
          onChange={() => {}}
          unit="%"
          readonly
        />
        <Box px={1}>
          <Slider
            min={0}
            max={10}
            step={0.05}
            value={interestRate}
            onChange={(_, v) => setInterestRate(v as number)}
          />
        </Box>
      </Stack>

      <InputField
        label="Hushållets inkomst före skatt"
        value={income}
        onChange={setIncome}
        unit="kr/mån"
      />

      <InputField
        label="Driftskostnad"
        value={maintenanceCost}
        onChange={setMaintenanceCost}
        unit="kr/mån"
      />

      {propertyType === "condo" && (
        <InputField
          label="Avgift"
          value={monthlyFee}
          onChange={setMonthlyFee}
          unit="kr/mån"
        />
      )}
    </Stack>
  );
}
