import { expect, test } from "vitest";
import { isValidEmail } from "../utils/validation";

test("email validation", () => {
  expect(isValidEmail("totallyValidEmail")).toBeFalsy();
  expect(isValidEmail("email@email@invalid.com")).toBeFalsy();
  expect(isValidEmail("valid.email@site.com")).toBeTruthy();
});
