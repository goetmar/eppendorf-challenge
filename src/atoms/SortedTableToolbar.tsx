import { Toolbar, Typography } from "@mui/material";
import { SortedTableToolbarProps } from "../types/types";

export const SortedTableToolbar = (props: SortedTableToolbarProps) => {
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
        id="sortedTableTitle"
        component="div"
        color="primary"
      >
        Data
      </Typography>
      {props.children}
    </Toolbar>
  );
};
