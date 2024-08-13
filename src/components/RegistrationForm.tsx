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
import { FormFieldInput } from "../atoms/FormFieldInput";
import useForm from "../hooks/useForm";
import { FormField } from "../types/types";

export type RegistrationFormProps = { formFields: FormField[] };

export const RegistrationForm = (props: RegistrationFormProps) => {
  const { formValues, handleChange, resetFormValues, validateFields } = useForm(
    props.formFields
  );

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
          {props.formFields.map((field) => (
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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
          Your submit was successful!
        </Alert>
      </Snackbar>
    </Paper>
  );
};
