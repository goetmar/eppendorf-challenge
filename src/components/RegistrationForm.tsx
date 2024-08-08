import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

type FormFieldState = {
  value: string;
  error: boolean;
  errorMessage: string;
};

const defaultFormFieldState: FormFieldState = {
  value: "",
  error: false,
  errorMessage: "",
};

const defaultFormState: Record<string, FormFieldState> = {
  name: defaultFormFieldState,
  email: defaultFormFieldState,
  password: defaultFormFieldState,
};

export const RegistrationForm = () => {
  const [formValues, setFormValues] = useState(defaultFormState);

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

  const validateFields = (): boolean => {
    let newFormValues = { ...formValues };
    let isValid = true;

    for (let field of Object.keys(formValues)) {
      const currentValue = formValues[field].value;
      let error = false;
      let errorMessage = "";

      if (!currentValue) {
        errorMessage = "Field must not be empty";
        error = true;
        isValid = false;
      }
      newFormValues = {
        ...newFormValues,
        [field]: {
          ...newFormValues[field],
          error: error,
          errorMessage: errorMessage,
        },
      };
    }
    setFormValues(newFormValues);
    return isValid;
  };

  const resetFormValues = () => {
    setFormValues(defaultFormState);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const isValid = validateFields();
    if (isValid) {
      resetFormValues();
    }
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
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              label="Name"
              variant="outlined"
              type="text"
              sx={{ width: "100%" }}
              value={formValues.name.value}
              onChange={handleChange}
              error={formValues.name.error}
              helperText={formValues.name.errorMessage}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              sx={{ width: "100%" }}
              value={formValues.email.value}
              onChange={handleChange}
              error={formValues.email.error}
              helperText={formValues.email.errorMessage}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              sx={{ width: "100%" }}
              value={formValues.password.value}
              onChange={handleChange}
              error={formValues.password.error}
              helperText={formValues.password.errorMessage}
            />
          </Grid>
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
    </Paper>
  );
};
