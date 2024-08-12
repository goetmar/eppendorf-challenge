import { CssBaseline, ThemeProvider } from "@mui/material";
import { HomePage } from "./pages/HomePage";
import { useDefaultTheme } from "./themes/Theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegistrationPage } from "./pages/RegistrationPage";
import { NavigationBar } from "./components/NavigationBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={useDefaultTheme()}>
      <CssBaseline />
      <NavigationBar />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
