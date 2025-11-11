import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        bgcolor: "#153b82", // mörkare variant av headerfärgen
        color: "#fff",
        textAlign: "center",
        py: { xs: 3 },
        borderTop: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          opacity: 0.9,
          fontSize: { xs: 13, sm: 14 },
          letterSpacing: 0.3,
        }}
      >
        © {new Date().getFullYear()} Bolånekalkyl — Alla rättigheter reserverade
      </Typography>
    </Box>
  );
}
