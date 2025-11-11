import { Box, Typography, Divider, Chip } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { SectionHeader, DataRowBox } from "./MortgageStyles";

interface OverviewEntry {
  label: string;
  value: string;
  emphasis?: boolean;
  chip?: string;
}

interface Props {
  entries: OverviewEntry[];
}

export const MortgageOverview = ({ entries }: Props) => (
  <Box>
    <SectionHeader>
      <TrendingUpIcon color="primary" />
      <Typography variant="h6" fontWeight={600}>
        Bolåneöversikt
      </Typography>
    </SectionHeader>
    <Divider />

    <Box mt={1}>
      {entries.map((e, index) => (
        <DataRowBox
          key={e.label}
          sx={{
            backgroundColor: index % 2 === 0 ? "transparent" : "action.hover", // ljusgrå från theme
            px: 1, // lite padding så bakgrunden får andas
          }}
        >
          <Typography
            variant="body1"
            fontWeight={e.emphasis ? 700 : 500}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {e.label}
            {e.chip && (
              <Chip
                label={e.chip}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Typography>
          <Typography variant="body1" fontWeight={e.emphasis ? 700 : 500}>
            {e.value}
          </Typography>
        </DataRowBox>
      ))}
    </Box>
  </Box>
);
