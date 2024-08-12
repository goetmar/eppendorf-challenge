import {
  ColorValueHex,
  Device,
  DeviceHealth,
  DeviceHealthEnum,
  DeviceType,
  HeadCell,
} from "../types/types";
import deviceDataJson from "../data/data.json";

type DeviceData = (typeof deviceDataJson)[0];

function createDevice(data: DeviceData): Device {
  return {
    id: data.id,
    location: data.location,
    type: data.type as DeviceType,
    deviceHealth: DeviceHealthEnum[data.device_health as DeviceHealth],
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
