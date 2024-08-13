import { Stack } from "@mui/material";
import {
  RegistrationForm,
  RegistrationFormProps,
} from "../components/RegistrationForm";
import { FormField, FormValue } from "../types/types";
import {
  hasAtSymbol,
  hasMinEightChars,
  hasMinTwoChars,
  hasNumber,
  hasSpecialCharacter,
  hasUppercaseLetter,
  isValidEmail,
} from "../utils/validation";

const defaultFormValue: FormValue = {
  value: "",
  error: false,
  errorMessage: "", // can be replaced with " " to have a placeholder for the error message
};

const formFields: FormField[] = [
  {
    id: "name",
    label: "Name",
    required: true,
    type: "text",
    defaultValue: defaultFormValue,
    validations: [
      {
        isValid: hasMinTwoChars,
        errorMessage: "Name must have at least two characters",
      },
    ],
  },
  {
    id: "email",
    label: "Email",
    required: true,
    type: "email",
    defaultValue: defaultFormValue,
    validations: [
      {
        isValid: hasAtSymbol,
        errorMessage: "Email must have an @ Symbol",
      },
      {
        isValid: isValidEmail,
        errorMessage: "Email must be valid",
      },
    ],
  },
  {
    id: "password",
    label: "Password",
    required: true,
    type: "password",
    defaultValue: defaultFormValue,
    validations: [
      {
        isValid: hasMinEightChars,
        errorMessage: "Password must have at least eight characters",
      },
      {
        isValid: hasUppercaseLetter,
        errorMessage: "Password must have at least one uppercase letter",
      },
      {
        isValid: hasSpecialCharacter,
        errorMessage: "Password must have at least one special character",
      },
      {
        isValid: hasNumber,
        errorMessage: "Password must have at least one number",
      },
    ],
  },
];

const registrationFormProps: RegistrationFormProps = {
  formFields: formFields,
};

export const RegistrationPage = () => {
  return (
    <Stack spacing={4} alignItems="center" sx={{ px: 16, py: 8 }}>
      <RegistrationForm {...registrationFormProps} />
    </Stack>
  );
};
