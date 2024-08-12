import { test as base, expect, Page } from "@playwright/test";
import { RegisterPage } from "../page-object-models/register-page";

export const test = base.extend<{ registerPage: RegisterPage }>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
});

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

test("show error message for short name", async ({ registerPage }) => {
  await registerPage.fillForm("a", "", "");
  await registerPage.submit();
  const errorMessages = await registerPage.getErrorMessages();
  expect(errorMessages).toContain("Name must have at least two characters");
});

test("show error message for email without @ symbol", async ({
  registerPage,
}) => {
  await registerPage.fillForm("", "email", "");
  await registerPage.submit();
  const errorMessages = await registerPage.getErrorMessages();
  expect(errorMessages).toContain("Email must have an @ Symbol");
});

test("show error message for invalid email format", async ({
  registerPage,
}) => {
  await registerPage.fillForm("", "invalid@email", "");
  await registerPage.submit();
  const errorMessages = await registerPage.getErrorMessages();
  expect(errorMessages).toContain("Email must be valid");
});

test("show error message for short password", async ({ registerPage }) => {
  await registerPage.fillForm("", "", "abcdefg");
  await registerPage.submit();
  const errorMessages = await registerPage.getErrorMessages();
  expect(errorMessages).toContain(
    "Password must have at least eight characters"
  );
});

test("show error message for password without uppercase letter", async ({
  registerPage,
}) => {
  await registerPage.fillForm("", "", "abcdefghi");
  await registerPage.submit();
  const errorMessages = await registerPage.getErrorMessages();
  expect(errorMessages).toContain(
    "Password must have at least one uppercase letter"
  );
});

test("show error message for password without special character", async ({
  registerPage,
}) => {
  await registerPage.fillForm("", "", "ABCdefghi");
  await registerPage.submit();
  const errorMessages = await registerPage.getErrorMessages();
  expect(errorMessages).toContain(
    "Password must have at least one special character"
  );
});

test("show error message for password without number", async ({
  registerPage,
}) => {
  await registerPage.fillForm("", "", "ABCdefghi!");
  await registerPage.submit();
  const errorMessages = await registerPage.getErrorMessages();
  expect(errorMessages).toContain("Password must have at least one number");
});
