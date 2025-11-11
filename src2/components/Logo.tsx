import { Box, Typography } from "@mui/material";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";

type Props = {
  title?: string;
  subtitle?: string;
};

export default function Header({
  title = "Bolånekalkyl",
  subtitle = "Räkna ut din månadskostnad snabbt och enkelt",
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        py: 3,
        mb: 4,
        borderBottom: "1px solid",
        borderColor: "divider",
        // backgroundColor: "background.paper",
        backgroundColor: "#fafafa",
      }}
    >
      <HomeWorkRoundedIcon
        sx={{
          fontSize: 70,
          color: "primary.main",
        }}
      />
      <Box textAlign="left">
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ fontSize: { xs: 22, sm: 28 }, lineHeight: 1.1 }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontSize: { xs: 14, sm: 16 } }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}
