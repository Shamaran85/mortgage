import { ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo, useState } from "react";
import themeFactory from "./theme";
import Header from "./components/Header";
import Desktop from "./components/Desktop";
import Mobile from "./components/Mobile";
import Footer from "./components/Footer";

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(() => themeFactory(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header mode={mode} setMode={setMode} />
      <Desktop />
      <Mobile />
      <Footer />
    </ThemeProvider>
  );
}
