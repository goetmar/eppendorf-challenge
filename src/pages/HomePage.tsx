import { Stack } from "@mui/material";
import { DeviceTable, DeviceTableProps } from "../components/DeviceTable";
import {
  ColorValueHex,
  Device,
  DeviceHealthKey,
  DeviceHealth,
  DeviceType,
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

const devices: Device[] = deviceDataJson.map((deviceData) =>
  createDevice(deviceData)
);

const deviceTableProps: DeviceTableProps = { rows: devices };

export const HomePage = () => {
  return (
    <Stack spacing={4} alignItems="center" sx={{ px: 16, py: 8 }}>
      <DeviceTable {...deviceTableProps} />
    </Stack>
  );
};
