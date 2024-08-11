import { Box, Stack, Typography } from "@mui/material";
import { RegistrationForm } from "../components/RegistrationForm";
import { SortedTable } from "../components/SortedTable";

export const HomePage = () => {
  return (
    <Box sx={{ px: 16, py: 8 }}>
      <Stack spacing={4} alignItems="center">
        <Typography variant="h1" align="center">
          Eppendorf Challenge
        </Typography>
        <RegistrationForm />
        <SortedTable />
      </Stack>
    </Box>
  );
};
