import {
  Alert,
  Button,
  Grid,
  Paper,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FormField, FormFieldState } from "../types";
import { FormFieldInput } from "./FormFieldInput";
import {
  hasMinEightChars,
  hasMinTwoChars,
  hasNumber,
  hasSpecialCharacter,
  hasUppercaseLetter,
  isValidEmail,
} from "../utils/validation";

const formFields: FormField[] = [
  {
    id: "name",
    label: "Name",
    required: true,
    type: "text",
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
    validations: [
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
    validations: [
      {
        isValid: hasMinEightChars,
        errorMessage: "Password must have at least eight characters",
      },
      {
        isValid: hasUppercaseLetter,
        errorMessage: "Password must be have at least one uppercase letter",
      },
      {
        isValid: hasSpecialCharacter,
        errorMessage: "Password must be have at least one special character",
      },
      {
        isValid: hasNumber,
        errorMessage: "Password must be have at least one number",
      },
    ],
  },
];

const defaultFormFieldState: FormFieldState = {
  value: "",
  error: false,
  errorMessage: "",
};

function createDefaultFormState(
  fields: string[]
): Record<string, FormFieldState> {
  let defaultFormState: Record<string, FormFieldState> = {};
  fields.forEach((field) => {
    defaultFormState[field] = defaultFormFieldState;
  });
  return defaultFormState;
}
const defaultFormState: Record<string, FormFieldState> = createDefaultFormState(
  formFields.map((field) => field.id)
);

export const RegistrationForm = () => {
  const [formValues, setFormValues] = useState(defaultFormState);
  const [openAlert, setOpenAlert] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormValues({
      ...formValues,
      [id]: {
        ...formValues[id],
        value,
      },
    });
  };

  const resetFormValues = () => {
    setFormValues(defaultFormState);
  };

  const validateFields = (): boolean => {
    let newFormValues = { ...formValues };
    let isValid = true;

    for (let field of formFields) {
      const currentValue = formValues[field.id].value;
      let { error, errorMessage } = defaultFormFieldState;

      if (field.required && !currentValue) {
        errorMessage = `${field.label} must not be empty`;
      } else {
        for (const validation of field.validations) {
          if (!validation.isValid(currentValue)) {
            errorMessage = validation.errorMessage;
            break;
          }
        }
      }
      if (errorMessage !== defaultFormFieldState.errorMessage) {
        error = true;
        isValid = false;
      }
      newFormValues = {
        ...newFormValues,
        [field.id]: {
          ...newFormValues[field.id],
          error: error,
          errorMessage: errorMessage,
        },
      };
    }
    setFormValues(newFormValues);
    return isValid;
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const isValid = validateFields();
    if (isValid) {
      resetFormValues();
      setOpenAlert(true);
    }
  };

  const handleCloseAlert = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <Paper sx={{ maxWidth: "600px" }}>
      <form noValidate onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{ p: 2 }}
        >
          <Grid item xs={12}>
            <Typography variant="h5" color="primary">
              Registration Form
            </Typography>
          </Grid>
          {formFields.map((field) => (
            <Grid item xs={12} key={field.id}>
              <FormFieldInput
                {...{
                  ...field,
                  ...formValues[field.id],
                  handleChange,
                }}
              />
            </Grid>
          ))}
          <Grid item xs={6}>
            <Button
              variant="outlined"
              sx={{ width: "100%" }}
              onClick={resetFormValues}
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" sx={{ width: "100%" }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Your submit was successful
        </Alert>
      </Snackbar>
    </Paper>
  );
};
