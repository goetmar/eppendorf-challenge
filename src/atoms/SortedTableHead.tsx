import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { SortedTableHeadProps, Device } from "../types/types";
import { MouseEvent } from "react";

export const SortedTableHead = (props: SortedTableHeadProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Device) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            width={`${headCell.percentageWidth}%`}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
