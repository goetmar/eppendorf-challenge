import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Device, DeviceHealth, HeadCell, Order } from "../types/types";
import { ChangeEvent, MouseEvent, useMemo, useState } from "react";
import { SortedTableToolbar } from "../atoms/SortedTableToolbar";
import { SortedTableHead } from "../atoms/SortedTableHead";
import { getComparator } from "../utils/comparator";
import { ColorChip } from "../atoms/ColorChip";
import { SortedTableProps } from "../types/props";
import { FolderOff } from "@mui/icons-material";
import { PlaceholderRow } from "../atoms/PlaceholderRow";
import { statusColors } from "../constants/deviceData";

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

export const SortedTable = (props: SortedTableProps) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Device>("price");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    _event: MouseEvent<unknown>,
    property: keyof Device
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      props.rows
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Paper sx={{ width: "100%", maxWidth: 1000 }}>
      <SortedTableToolbar />
      <TableContainer>
        <Table
          sx={{ minWidth: 850, tableLayout: "fixed" }}
          aria-labelledby="sortedTableTitle"
          size="small"
        >
          <SortedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={props.rows.length}
            headCells={headCells}
          />
          <TableBody>
            {visibleRows.length > 0 ? (
              <>
                {visibleRows.map((row) => (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <Tooltip title={row.location} enterDelay={500} arrow>
                      <TableCell
                        style={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {row.location}
                      </TableCell>
                    </Tooltip>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      <ColorChip
                        color={statusColors[row.deviceHealth]}
                        label={DeviceHealth[row.deviceHealth]}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {row.lastUsed.toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      {new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                      }).format(row.price)}
                    </TableCell>
                    <TableCell>
                      <ColorChip color={row.color} label={row.color} />
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && <PlaceholderRow rows={emptyRows} />}
              </>
            ) : (
              <PlaceholderRow rows={rowsPerPage}>
                <FolderOff />
                <Typography>No Data</Typography>
              </PlaceholderRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
      />
    </Paper>
  );
};
