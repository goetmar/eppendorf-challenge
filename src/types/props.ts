import { MouseEvent, ReactNode } from "react";
import {
  Device,
  HeadCell,
  Order,
  FormField,
  FormValue,
  ColorValueHex,
} from "./types";

// Sorted Table Props
export type SortedTableProps = {
  rows: Device[];
  headCells: HeadCell[];
};

export type SortedTableHeadProps = {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Device) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
};

export type SortedTableToolbarProps = { children?: ReactNode };

export type PlaceholderRowProps = { rows: number; children?: ReactNode };

// Registration Form Props
export type RegistrationFormProps = { formFields: FormField[] };

export type FormFieldInputProps = Omit<FormField, "defaultValue"> &
  FormValue & {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

export type ColorChipProps = { color: ColorValueHex; label: string };
