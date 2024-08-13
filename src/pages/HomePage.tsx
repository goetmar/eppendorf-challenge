import { Stack } from "@mui/material";
import { DeviceTable } from "../components/DeviceTable";
import { devices } from "../constants/deviceData";

export const HomePage = () => {
  return (
    <Stack spacing={4} alignItems="center" sx={{ px: 16, py: 8 }}>
      <DeviceTable rows={devices} />
    </Stack>
  );
};
