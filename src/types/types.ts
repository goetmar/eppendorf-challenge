// Device Data Types
export type Device = {
  id: number;
  location: string;
  type: DeviceType;
  deviceHealth: DeviceHealthEnum;
  lastUsed: Date;
  price: number;
  color: ColorValueHex;
};

export type DeviceType =
  | "freezer"
  | "cycler"
  | "shaker"
  | "pipette"
  | "centrifuge";

export enum DeviceHealthEnum {
  "broken",
  "bad",
  "mediocre",
  "ok",
  "good",
}

export type DeviceHealth = keyof typeof DeviceHealthEnum;

export type ColorValueHex = `#${string}`;

export enum StatusColor {
  "#f44336",
  "#ffa726",
  "#FAD800",
  "#81c784",
  "#388e3c",
}

// Sorted Table Types
export type Order = "asc" | "desc";

export type HeadCell = {
  id: keyof Device;
  label: string;
  numeric: boolean;
  percentageWidth: number;
};

// Registration Form Types
export type Validation = {
  isValid: (value: string) => boolean;
  errorMessage: string;
};

export type FormValue = {
  value: string;
  error: boolean;
  errorMessage: string;
};

export type FormField = {
  id: string;
  label: string;
  required: boolean;
  type: string;
  defaultValue: FormValue;
  validations: Validation[];
};
