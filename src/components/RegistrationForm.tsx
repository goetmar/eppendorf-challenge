import { Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { FormField, FormFieldState } from "../types";
import { FormFieldInput } from "./FormFieldInput";

const formFields: FormField[] = [
  {
    id: "name",
    label: "Name",
    required: true,
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    required: true,
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    required: true,
    type: "password",
  },
];

function createDefaultFormState(
  fields: string[]
): Record<string, FormFieldState> {
  const defaultFormFieldState: FormFieldState = {
    value: "",
    error: false,
    errorMessage: "",
  };
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
    </Paper>
  );
};
