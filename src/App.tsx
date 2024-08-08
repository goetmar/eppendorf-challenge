import { CssBaseline, ThemeProvider } from "@mui/material";
import { HomePage } from "./pages/HomePage";
import { useDefaultTheme } from "./themes/Theme";

const App = () => {
  return (
    <ThemeProvider theme={useDefaultTheme()}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
};

export default App;
