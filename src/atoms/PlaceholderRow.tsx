import { TableRow, TableCell } from "@mui/material";
import { PlaceholderRowProps } from "../types/props";

export const PlaceholderRow = (props: PlaceholderRowProps) => {
  return (
    <TableRow
      // height equals the table row height * rows to be replaced
      style={{
        height: 45 * props.rows,
      }}
    >
      <TableCell colSpan={6} align="center">
        {props.children}
      </TableCell>
    </TableRow>
  );
};
