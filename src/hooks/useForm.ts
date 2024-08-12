import { useState } from "react";
import { FormField, FormValue } from "../types";

function createDefaultFormState(formFields: FormField[]) {
  let defaultFormState: Record<string, FormValue> = {};
  formFields.forEach((field) => {
    defaultFormState[field.id] = field.defaultValue;
  });
  return defaultFormState;
}

export default function useForm(formFields: FormField[]) {
  const defaultFormState = createDefaultFormState(formFields);
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

  const resetFormValues = () => {
    setFormValues(defaultFormState);
  };

  const validateFields = (): boolean => {
    let newFormValues = { ...formValues };
    let isValid = true;

    for (let field of formFields) {
      const currentValue = formValues[field.id].value;
      let { error, errorMessage } = field.defaultValue;

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
      if (errorMessage !== field.defaultValue.errorMessage) {
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

  return {
    formValues,
    handleChange,
    resetFormValues,
    validateFields,
  };
}
