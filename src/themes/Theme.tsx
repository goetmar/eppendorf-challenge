import { ThemeOptions, createTheme } from "@mui/material/styles";
import { useMemo } from "react";

const defaultTheme: ThemeOptions = {
  palette: {
    background: {
      default: "#FAFAFA",
    },
    primary: {
      main: "#0135AD",
    },
  },
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
};

export const useDefaultTheme = () => {
  const theme = useMemo(() => createTheme(defaultTheme), []);
  return theme;
};
