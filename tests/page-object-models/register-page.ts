import { type Locator, type Page } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly resetButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByLabel("Name");
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.resetButton = page.getByRole("button", { name: "Reset" });
    this.submitButton = page.getByRole("button", { name: "Submit" });
  }

  async goto() {
    await this.page.goto("http://localhost:5173/register");
  }

  async fillForm(name: string, email: string, password: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async reset() {
    await this.resetButton.click();
  }

  async submit() {
    await this.submitButton.click();
  }

  async getErrorMessages() {
    const locatorIds = [
      "#name-helper-text",
      "#email-helper-text",
      "#password-helper-text",
    ];
    const errorMessages = await Promise.all(
      locatorIds.map(async (id) =>
        (await this.page.locator(id).isVisible())
          ? await this.page.locator(id).innerText()
          : ""
      )
    );
    return errorMessages;
  }
}
