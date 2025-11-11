import { Box, Typography, IconButton, Divider, Chip } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { SectionHeader, DataRowBox } from "./MortgageStyles";

interface Props {
  historyData: { year: string; rate: number; monthlyCost: number }[];
  onInfoClick: () => void;
}

const formatCurrency = (v: number) =>
  v.toLocaleString("sv-SE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export const MortgageHistory = ({ historyData, onInfoClick }: Props) => (
  <Box mt={4}>
    {/* Header */}
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <SectionHeader sx={{ mb: 0 }}>
        <HistoryIcon color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Historisk jämförelse
        </Typography>
      </SectionHeader>
      <IconButton onClick={onInfoClick} size="small">
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>
    </Box>

    <Divider />

    {/* Rows */}
    <Box mt={1}>
      {historyData.map((item, index) => (
        <DataRowBox
          key={item.year}
          sx={{
            backgroundColor: index % 2 === 0 ? "transparent" : "action.hover", // ljusgrå från theme
            px: 1, // lite padding så bakgrunden får andas
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1" fontWeight={700}>
              {item.year}
            </Typography>
            <Chip
              label={`${item.rate.toFixed(2)}%`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
          <Typography variant="body1" fontWeight={400}>
            {formatCurrency(item.monthlyCost)} kr/mån
          </Typography>
        </DataRowBox>
      ))}
    </Box>
  </Box>
);
