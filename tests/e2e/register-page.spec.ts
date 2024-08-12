import { test as base, expect, Page } from "@playwright/test";
import { RegisterPage } from "../page-object-models/register-page";

const test = base.extend<{ registerPage: RegisterPage }>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
});

function composeErrorMessageTest(props: {
  title: string;
  name?: string;
  email?: string;
  password?: string;
  expectedErrorMessage: string;
}) {
  test(props.title, async ({ registerPage }) => {
    await registerPage.fillForm(
      props.name || "",
      props.email || "",
      props.password || ""
    );
    await registerPage.submit();
    const errorMessages = await registerPage.getErrorMessages();
    expect(errorMessages).toContain(props.expectedErrorMessage);
  });
}

test("show error messages for empty inputs", async ({ registerPage }) => {
  await registerPage.fillForm("", "", "");
  await registerPage.submit();
  const errorMessages = await registerPage.getErrorMessages();
  expect(errorMessages).toEqual([
    "Name must not be empty",
    "Email must not be empty",
    "Password must not be empty",
  ]);
});

composeErrorMessageTest({
  title: "show error message for short name",
  name: "a",
  expectedErrorMessage: "Name must have at least two characters",
});
composeErrorMessageTest({
  title: "show error message for email without @ symbol",
  email: "email",
  expectedErrorMessage: "Email must have an @ Symbol",
});
composeErrorMessageTest({
  title: "show error message for invalid email format",
  email: "invalid@email",
  expectedErrorMessage: "Email must be valid",
});
composeErrorMessageTest({
  title: "show error message for short password",
  password: "1234567",
  expectedErrorMessage: "Password must have at least eight characters",
});
composeErrorMessageTest({
  title: "show error message for password without uppercase letter",
  password: "abcdefghi",
  expectedErrorMessage: "Password must have at least one uppercase letter",
});
composeErrorMessageTest({
  title: "show error message for password without special character",
  password: "ABCdefghi",
  expectedErrorMessage: "Password must have at least one special character",
});
composeErrorMessageTest({
  title: "show error message for password without number",
  password: "ABCdefghi!",
  expectedErrorMessage: "Password must have at least one number",
});
