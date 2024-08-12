import { Stack } from "@mui/material";
import { RegistrationForm } from "../components/RegistrationForm";
import { formFields } from "../constants/formFields";

export const RegistrationPage = () => {
  return (
    <Stack spacing={4} alignItems="center" sx={{ px: 16, py: 8 }}>
      <RegistrationForm formFields={formFields} />
    </Stack>
  );
};
