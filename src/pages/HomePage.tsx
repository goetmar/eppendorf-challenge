import { Box, Stack, Typography } from "@mui/material";
import { RegistrationForm } from "../components/RegistrationForm";

export const HomePage = () => {
  return (
    <Box sx={{ px: 16, py: 8 }}>
      <Stack spacing={4} alignItems="center">
        <Typography variant="h1" align="center">
          Eppendorf Challenge
        </Typography>
        <RegistrationForm />
      </Stack>
    </Box>
  );
};
