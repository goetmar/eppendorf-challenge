export type Validation = {
  isValid: (value: string) => boolean;
  errorMessage: string;
};

export type FormField = {
  id: string;
  label: string;
  required: boolean;
  type: string;
  validations: Validation[];
};

export type FormFieldState = {
  value: string;
  error: boolean;
  errorMessage: string;
};

export type FormFieldInputProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & FormField &
  FormFieldState;
