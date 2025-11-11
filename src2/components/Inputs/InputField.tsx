import { Box, Typography, InputBase } from "@mui/material";

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  unit?: string;
  format?: (val: number) => string;
  description?: string;
  readonly?: boolean;
}

export default function InputField({
  label,
  value,
  onChange,
  unit = "",
  format = (v) => v.toLocaleString("sv-SE"),
  description = "",
  readonly = false,
}: InputFieldProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        {label}
      </Typography>

      {description && (
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          color="text.secondary"
        >
          {description}
        </Typography>
      )}

      <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
        <InputBase
          readOnly={readonly}
          value={format(value)}
          onChange={(e) => {
            const num = Number(e.target.value.replace(/\s/g, ""));
            if (!isNaN(num)) onChange(num);
          }}
          sx={{
            flex: 1,
            padding: "8px 4px 4px 14px",
            borderRadius: "4px",
            border: "1px solid",
            borderColor: "divider",
            fontSize: "1.1rem",
            fontWeight: 500,
            width: "100%",
            bgcolor: readonly ? "action.hover" : "background.paper",
            "& .MuiInputBase-input": {
              textAlign: "left",
            },
          }}
        />

        {unit && (
          <Typography
            sx={{
              position: "absolute",
              right: "14px",
              color: "text.secondary",
              fontSize: "1rem",
            }}
          >
            {unit}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
