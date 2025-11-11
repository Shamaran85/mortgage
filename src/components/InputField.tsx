import { Box, Typography, OutlinedInput } from "@mui/material";

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  description?: string;
  readonly?: boolean;
}

export default function InputField({
  label,
  value,
  onChange,
  unit = "",
  description = "",
  readonly = false,
}: Props) {
  // 🔧 Fallback för undefined/null values
  const safeValue = Number.isFinite(value) ? value : 0;

  const formatValue = (v: number) =>
    v.toLocaleString("sv-SE", {
      minimumFractionDigits: v % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\s/g, "");
    const parsed = parseFloat(cleaned);
    if (!isNaN(parsed)) {
      onChange(parsed);
    } else if (cleaned === "") {
      onChange(0);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        {label}
      </Typography>

      {description && (
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mb={1}
        >
          {description}
        </Typography>
      )}

      <Box sx={{ position: "relative" }}>
        <OutlinedInput
          fullWidth
          readOnly={readonly}
          value={formatValue(safeValue)}
          onChange={handleChange}
          sx={{
            borderRadius: 2,
            fontWeight: 500,
            fontSize: "1rem",
            backgroundColor: readonly ? "action.hover" : "background.paper",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "divider",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
              borderWidth: 2,
            },
            pr: unit ? 6 : 2,
          }}
        />
        {unit && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          >
            {unit}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
