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
import { FormField, FormValue } from "../types";
import { FormFieldInput } from "../atoms/FormFieldInput";
import {
  hasAtSymbol,
  hasMinEightChars,
  hasMinTwoChars,
  hasNumber,
  hasSpecialCharacter,
  hasUppercaseLetter,
  isValidEmail,
} from "../utils/validation";
import useForm from "../hooks/useForm";

const defaultFormValue: FormValue = {
  value: "",
  error: false,
  errorMessage: "",
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

export const RegistrationForm = () => {
  const { formValues, handleChange, resetFormValues, validateFields } =
    useForm(formFields);

  const [openAlert, setOpenAlert] = useState(false);

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
    <Paper sx={{ width: "100%", maxWidth: 600 }}>
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
