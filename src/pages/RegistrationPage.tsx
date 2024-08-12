import { Stack } from "@mui/material";
import { RegistrationForm } from "../components/RegistrationForm";

export const RegistrationPage = () => {
  return (
    <Stack spacing={4} alignItems="center" sx={{ px: 16, py: 8 }}>
      <RegistrationForm />
    </Stack>
  );
};
