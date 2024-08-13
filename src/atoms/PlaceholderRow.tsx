import { TableRow, TableCell } from "@mui/material";
import { ReactNode } from "react";

export type PlaceholderRowProps = { rows: number; children?: ReactNode };

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
