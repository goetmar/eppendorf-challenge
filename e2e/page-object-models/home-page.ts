import { type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("http://localhost:5173/");
  }

  firstCellOfColumn(c: number): Locator {
    return this.page.locator("td").nth(c);
  }

  private createToggleSortBy(label: string) {
    return async () => {
      await this.page.getByRole("button", { name: label }).click();
    };
  }

  toggleSortByLocation = this.createToggleSortBy("Location");
  toggleSortByType = this.createToggleSortBy("Type");
  toggleSortByHealth = this.createToggleSortBy("Health");
  toggleSortByLastUsed = this.createToggleSortBy("Last Used");
  toggleSortByPrice = this.createToggleSortBy("Price");
  toggleSortByColor = this.createToggleSortBy("Color");
}
