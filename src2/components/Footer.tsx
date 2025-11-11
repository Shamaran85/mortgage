import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "grey.900",
        color: "white",
        textAlign: "center",
        py: 2,
        mt: "auto",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Bolånekalkyl — All rights reserved
      </Typography>
    </Box>
  );
}
