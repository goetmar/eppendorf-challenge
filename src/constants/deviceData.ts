import {
  ColorValueHex,
  Device,
  DeviceHealthKey,
  DeviceHealth,
  DeviceType,
  HeadCell,
  StatusColors,
} from "../types/types";
import deviceDataJson from "../data/data.json";

type DeviceData = (typeof deviceDataJson)[0];

function createDevice(data: DeviceData): Device {
  return {
    id: data.id,
    location: data.location,
    type: data.type as DeviceType,
    deviceHealth: DeviceHealth[data.device_health as DeviceHealthKey],
    lastUsed: new Date(data.last_used),
    price: Number(data.price),
    color: data.color.toUpperCase() as ColorValueHex,
  };
}

export const devices: Device[] = deviceDataJson.map((deviceData) =>
  createDevice(deviceData)
);

export const headCells: HeadCell[] = [
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

export const statusColors: StatusColors = {
  0: "#F44336",
  1: "#FFA726",
  2: "#FAD800",
  3: "#81C784",
  4: "#388E3C",
};
