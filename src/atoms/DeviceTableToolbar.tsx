import { Toolbar, Typography } from "@mui/material";
import { DeviceTableToolbarProps } from "../types/props";

export const DeviceTableToolbar = (props: DeviceTableToolbarProps) => {
  return (
    <Toolbar
      sx={{
        pl: { xs: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="deviceTableTitle"
        component="div"
        color="primary"
      >
        Data
      </Typography>
      {props.children}
    </Toolbar>
  );
};
