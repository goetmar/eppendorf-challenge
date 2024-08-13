// Device Data Types
export type DeviceType =
  | "freezer"
  | "cycler"
  | "shaker"
  | "pipette"
  | "centrifuge";

export enum DeviceHealth {
  "broken",
  "bad",
  "mediocre",
  "ok",
  "good",
}

export type DeviceHealthKey = keyof typeof DeviceHealth;

export type DeviceHealthValue = (typeof DeviceHealth)[DeviceHealthKey];

export type ColorValueHex = `#${string}`;

export type StatusColors = Record<DeviceHealthValue, ColorValueHex>;

export type Device = {
  id: number;
  location: string;
  type: DeviceType;
  deviceHealth: DeviceHealthValue;
  lastUsed: Date;
  price: number;
  color: ColorValueHex;
};

// Device Table Types
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
