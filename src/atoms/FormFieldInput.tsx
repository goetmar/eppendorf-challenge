import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { FormField, FormValue } from "../types/types";

export type FormFieldInputProps = Omit<FormField, "defaultValue"> &
  FormValue & {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

export const FormFieldInput = (props: FormFieldInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      {props.type !== "password" ? (
        <TextField
          required={props.required}
          id={props.id}
          label={props.label}
          variant="outlined"
          type={props.type}
          sx={{ width: "100%" }}
          value={props.value}
          onChange={props.handleChange}
          error={props.error}
          helperText={props.errorMessage}
        />
      ) : (
        <FormControl
          required={props.required}
          error={props.error}
          sx={{ width: "100%" }}
          variant="outlined"
        >
          <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
          <OutlinedInput
            id={props.id}
            type={showPassword ? "text" : "password"}
            value={props.value}
            onChange={props.handleChange}
            endAdornment={
              props.value !== "" && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }
            label="Password"
          />
          {props.errorMessage && (
            <FormHelperText id={`${props.id}-helper-text`}>
              {props.errorMessage}
            </FormHelperText>
          )}
        </FormControl>
      )}
    </>
  );
};
