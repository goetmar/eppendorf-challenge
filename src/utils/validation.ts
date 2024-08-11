function composeMinCharactersValidation(minCharacters: number) {
  return (value: string) => {
    return value.length >= minCharacters;
  };
}
function composePatternValidation(regExp: RegExp) {
  return (value: string) => {
    return regExp.test(value);
  };
}
export const isValidEmail = composePatternValidation(
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
);
export const hasAtSymbol = composePatternValidation(/^(?=.*@)/);
export const hasUppercaseLetter = composePatternValidation(/^(?=.*[A-Z])/);
export const hasSpecialCharacter = composePatternValidation(/^(?=.*\W)/);
export const hasNumber = composePatternValidation(/^(?=.*\d)/);
export const hasMinTwoChars = composeMinCharactersValidation(2);
export const hasMinEightChars = composeMinCharactersValidation(8);
