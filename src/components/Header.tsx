import { Box, Switch, Typography } from "@mui/material";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";

interface Props {
  mode: "dark" | "light";
  setMode: (value: "dark" | "light") => void;
}

export default function Header(props: Props) {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: { xs: 2, sm: 4 },
        py: { xs: 2, sm: 2.5 },
        bgcolor: "#1e4fa3",
        color: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <HomeWorkRoundedIcon sx={{ fontSize: 42, flexShrink: 0 }} />
      <Box>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            lineHeight: 1.2,
            fontSize: { xs: 22, sm: 26 },
          }}
        >
          Bolånekalkyl
        </Typography>
        <Typography
          variant="body2"
          sx={{
            opacity: 0.9,
            fontSize: { xs: 13.5, sm: 15 },
            letterSpacing: 0.2,
          }}
        >
          Räkna ut din månadskostnad snabbt och enkelt
        </Typography>
      </Box>
      <Switch
        checked={props.mode === "dark"}
        onChange={() =>
          props.setMode(props.mode === "light" ? "dark" : "light")
        }
        color="default"
      />
    </Box>
  );
}
