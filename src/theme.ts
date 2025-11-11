import { createTheme } from "@mui/material/styles";

const basePalette = {
  primary: {
    main: "#1e4fa3", // huvudblå
    // main: "#53bb7e", // huvudblå
    light: "#4f74c3",
    dark: "#153b82",
  },
  secondary: {
    main: "#008f72",
  },
};

const theme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            ...basePalette,
            background: {
              default: "#f7f8fa",
              paper: "#ffffff",
            },
            text: {
              primary: "#1b1b1b",
              secondary: "#4a4a4a",
            },
            divider: "rgba(0,0,0,0.12)",
          }
        : {
            ...basePalette,
            primary: {
              main: "#3b82f6", // lite ljusare blå för kontrast
            },
            background: {
              default: "#0d1117",
              paper: "#1e2633",
            },
            text: {
              primary: "#e6edf3",
              secondary: "#9da5b4",
            },
            divider: "rgba(255,255,255,0.1)",
          }),
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
      h5: { fontWeight: 700 },
      h6: { fontWeight: 600 },
      body1: { fontWeight: 400 },
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: "none",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 1px 2px rgba(0,0,0,0.6)"
                : "0 1px 2px rgba(0,0,0,0.08)",
          }),
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
          },
        },
      },
    },
  });

export default theme;
