import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { Device, HeadCell, Order } from "../types/types";
import { MouseEvent } from "react";

const headCells: HeadCell[] = [
  {
    id: "location",
    numeric: false,
    label: "Location",
    percentageWidth: 25,
  },
  {
    id: "type",
    numeric: false,
    label: "Type",
    percentageWidth: 15,
  },
  {
    id: "deviceHealth",
    numeric: false,
    label: "Health",
    percentageWidth: 15,
  },
  {
    id: "lastUsed",
    numeric: true,
    label: "Last Used",
    percentageWidth: 15,
  },
  {
    id: "price",
    numeric: true,
    label: "Price",
    percentageWidth: 15,
  },
  {
    id: "color",
    numeric: false,
    label: "Color",
    percentageWidth: 15,
  },
];

export type DeviceTableHeadProps = {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Device) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
};

export const DeviceTableHead = (props: DeviceTableHeadProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Device) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
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
              sx={{ fontWeight: "bold" }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
