import { test as base, expect } from "@playwright/test";
import { HomePage } from "../page-object-models/home-page";

const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
});

test("should sort by location", async ({ homePage }) => {
  await expect(homePage.firstCellOfColumn(0)).toHaveText("Troy");
  await homePage.toggleSortByLocation();
  await expect(homePage.firstCellOfColumn(0)).toHaveText("Abaca");
  await homePage.toggleSortByLocation();
  await expect(homePage.firstCellOfColumn(0)).toHaveText("Ṭikāpur");
});
test("should sort by type", async ({ homePage }) => {
  await expect(homePage.firstCellOfColumn(1)).toHaveText("shaker");
  await homePage.toggleSortByType();
  await expect(homePage.firstCellOfColumn(1)).toHaveText("centrifuge");
  await homePage.toggleSortByType();
  await expect(homePage.firstCellOfColumn(1)).toHaveText("shaker");
});
test("should sort by health", async ({ homePage }) => {
  await expect(homePage.firstCellOfColumn(2)).toHaveText("ok");
  await homePage.toggleSortByHealth();
  await expect(homePage.firstCellOfColumn(2)).toHaveText("broken");
  await homePage.toggleSortByHealth();
  await expect(homePage.firstCellOfColumn(2)).toHaveText("good");
});
test("should sort by last used", async ({ homePage }) => {
  await expect(homePage.firstCellOfColumn(3)).toHaveText("12/6/2018");
  await homePage.toggleSortByLastUsed();
  await expect(homePage.firstCellOfColumn(3)).toHaveText("9/1/2018");
  await homePage.toggleSortByLastUsed();
  await expect(homePage.firstCellOfColumn(3)).toHaveText("9/1/2019");
});
test("should sort by price", async ({ homePage }) => {
  // price is sorted by default in ascending order
  await expect(homePage.firstCellOfColumn(4)).toHaveText("0,00 €");
  await homePage.toggleSortByPrice();
  await expect(homePage.firstCellOfColumn(4)).toHaveText("100,00 €");
  await homePage.toggleSortByPrice();
  await expect(homePage.firstCellOfColumn(4)).toHaveText("0,00 €");
});
test("should sort by color", async ({ homePage }) => {
  await expect(homePage.firstCellOfColumn(5)).toHaveText("#63430A");
  await homePage.toggleSortByColor();
  await expect(homePage.firstCellOfColumn(5)).toHaveText("#000044");
  await homePage.toggleSortByColor();
  await expect(homePage.firstCellOfColumn(5)).toHaveText("#807433");
});
