import { test as base, expect } from "@playwright/test";
import { RegisterPage } from "../page-object-models/register-page";

const test = base.extend<{ registerPage: RegisterPage }>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
});

function testErrorMessage(props: {
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

testErrorMessage({
  title: "show error message for short name",
  name: "a",
  expectedErrorMessage: "Name must have at least two characters",
});
testErrorMessage({
  title: "show error message for email without @ symbol",
  email: "email",
  expectedErrorMessage: "Email must have an @ Symbol",
});
testErrorMessage({
  title: "show error message for invalid email format",
  email: "invalid@email",
  expectedErrorMessage: "Email must be valid",
});
testErrorMessage({
  title: "show error message for short password",
  password: "1234567",
  expectedErrorMessage: "Password must have at least eight characters",
});
testErrorMessage({
  title: "show error message for password without uppercase letter",
  password: "abcdefghi",
  expectedErrorMessage: "Password must have at least one uppercase letter",
});
testErrorMessage({
  title: "show error message for password without special character",
  password: "ABCdefghi",
  expectedErrorMessage: "Password must have at least one special character",
});
testErrorMessage({
  title: "show error message for password without number",
  password: "ABCdefghi!",
  expectedErrorMessage: "Password must have at least one number",
});

test("reset values on reset button click", async ({ registerPage }) => {
  await registerPage.fillForm("Valid Name", "invalid@email", "invalidPassword");
  await registerPage.reset();
  const errorMessages = await registerPage.getErrorMessages();
  expect(errorMessages).toEqual(["", "", ""]);
  await expect(registerPage.nameInput).toBeEmpty();
  await expect(registerPage.emailInput).toBeEmpty();
  await expect(registerPage.passwordInput).toBeEmpty();
});

test("reset values and show alert on valid submit", async ({
  registerPage,
}) => {
  await registerPage.fillForm(
    "Valid Name",
    "valid.email@site.com",
    "ABCdef123!"
  );
  await registerPage.submit();
  const errorMessages = await registerPage.getErrorMessages();
  expect(errorMessages).toEqual(["", "", ""]);
  await expect(registerPage.nameInput).toBeEmpty();
  await expect(registerPage.emailInput).toBeEmpty();
  await expect(registerPage.passwordInput).toBeEmpty();
  await expect(registerPage.page.getByRole("alert")).toHaveText(
    "Your submit was successful!"
  );
});
