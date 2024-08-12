import { Home } from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";

// This offset is used to account for the fixed position of the navigation bar
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const NavigationBar = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton href="/" color="inherit" aria-label="home">
            <Home />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ pl: 2, flexGrow: 1 }}>
            Eppendorf Challenge
          </Typography>
          <Button href="/register" color="inherit">
            Register
          </Button>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};
