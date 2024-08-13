import { Stack } from "@mui/material";
import { SortedTable } from "../components/SortedTable";
import { devices } from "../constants/deviceData";

export const HomePage = () => {
  return (
    <Stack spacing={4} alignItems="center" sx={{ px: 16, py: 8 }}>
      <SortedTable rows={devices} />
    </Stack>
  );
};
