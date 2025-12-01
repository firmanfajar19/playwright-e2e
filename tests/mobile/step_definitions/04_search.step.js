import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";
import { SearchPage } from "../pages/04_search.page";

const { Given, When, Then } = createBdd();

When("[Mobile] user click at search field", async ({ page }) => {
  const search = new SearchPage(page);
  await search.clickSearchField();
});

When(
  "[Mobile] user input {string} on search field",
  async ({ page }, inputString) => {
    const search = new SearchPage(page);
    await search.fillSearchBox(inputString);
    const filledString = await search.getSearchBoxValue();

    await page.evaluate((text) => {
      localStorage.setItem("string", text);
    }, filledString);
  }
);

When("[Mobile] user click button x on search field", async ({ page }) => {
  const search = new SearchPage(page);
  await search.clickDismissButton();
});

When(
  "[Mobile] user search keyword {string} on search field",
  async ({ page }, inputString) => {
    const search = new SearchPage(page);
    await search.fillSearchBox(inputString);

    const filledString = await search.getSearchBoxValue();

    await page.evaluate((text) => {
      localStorage.setItem("string", text);
    }, filledString);

    await search.waitForSearchBox();
    await search.pressEnterInSearchBox();
  }
);

When("[Mobile] user back to homepage by click back browser", async ({ page }) => {
  const search = new SearchPage(page);
  await page.goBack();
  await search.waitForSearchBox();
});

When("[Mobile] user click at search field panel card", async ({ page }) => {
  const search = new SearchPage(page);
  await search.clickSearchFieldPanelCard();
});

When(
  "[Mobile] user click button x on search history {string} at search panel card",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.clickRemoveHistoryButton();
  }
);

When(
  "[Mobile] user click button hapus semua at search panel card",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.waitForSearchBox();
    await search.clickRemoveAllHistoryButton();
  }
);

When(
  "[Mobile] user click button Ubah Pencarian at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.clickChangeSearchButton();
  }
);

When(
  "[Mobile] user click on tab {string} at search result page",
  async ({ page }, tab) => {
    const search = new SearchPage(page);
    switch (tab) {
      case "Author":
        await search.authorTab.waitFor({ state: "visible" });
        await search.setAuthorTabCount();
        await search.authorTab.click();
        break;
      case "Product":
        await search.productTab.waitFor({ state: "visible" });
        await search.productTab.click();
        break;

      default:
        break;
    }
  }
);

When(
  "[Mobile] user click button Filter at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.productTab.waitFor({ state: "visible" });
    await search.authorTab.waitFor({ state: "visible" });
    await search.clickFilterButton();
  }
);

When(
  "[Mobile] user input {string} price Rp {string} at drawer",
  async ({ page }, filter, price) => {
    const search = new SearchPage(page);
    switch (filter) {
      case "minimum":
        await search.inputMinPrice(price);
        break;
      case "maximum":
        await search.inputMaxPrice(price);
        break;
      default:
        break;
    }
  }
);

When(
  "[Mobile] user click toggle only available stock at drawer",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.clickToggleOnlyAvailableStock();
  }
);

When(
  "[Mobile] user select sort by {string} at drawer",
  async ({ page }, sort) => {
    const search = new SearchPage(page);
    switch (sort) {
      case "Terbaru":
        await search.clickSortByNewest();
        break;
      case "Terpopuler":
        await search.clickSortByPopular();
        break;
      case "Harga Terendah":
        await search.clickSortByLowestPrice();
        break;
      case "Harga Tertinggi":
        await search.clickSortByHighestPrice();
        break;

      default:
        break;
    }
  }
);

When(
  "[Mobile] user click button Hapus Filter at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.clickCtaRemoveFilter();
  }
);

When(
  "[Mobile] user click bubble filter at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.clickBubbleFilter1();
  }
);

When("[Mobile] user click button reset filter at drawer", async ({ page }) => {
  const search = new SearchPage(page);
  await search.clickFilterReset();
});

When(
  "[Mobile] user click author {string} at search result page",
  async ({ page }, author) => {
    const search = new SearchPage(page);
    await search.clickAuthorList(author);
  }
);

When(
  "[Mobile] user click PDP on tab {string} at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.productCard.first().click();
  }
);

Then("[Mobile] user sees search panel card was opened", async ({ page }) => {
  const search = new SearchPage(page);
  await search.validateSearchPanelCard();
});

Then(
  `[Mobile] user see {int} default top author at search panel card`,
  async ({ page }, int) => {
    const search = new SearchPage(page);
    await search.validateTopAuthorList();
    const totalAuthor = await search.validateCountTopAuthorList();
    expect(totalAuthor).toEqual(int);
  }
);

Then(
  "[Mobile] user success to see inputted keyword {string} on search field",
  async ({ page }, expectedString) => {
    const filledString = await page.evaluate(() => {
      return localStorage.getItem("string");
    });
    expect(expectedString).toEqual(filledString);
  }
);

Then(
  "[Mobile] user will see search suggestion with keyword {string} at search panel card",
  async ({ page }, expectedString) => {
    const search = new SearchPage(page);
    await search.waitForSearchSuggest();

    const filledString = await page.evaluate(() => {
      return localStorage.getItem("string");
    });

    expect(expectedString).toContain(filledString);
  }
);

Then(
  "[Mobile] user failed to see inputted keyword {string} on search field",
  async ({ page }) => {
    const filledString = await page.evaluate(() => {
      return localStorage.getItem("string");
    });
    expect(filledString.length).toBeLessThanOrEqual(50);
  }
);

Then(
  "[Mobile] user will see wording {string} at search panel card",
  async ({ page }, string) => {
    const search = new SearchPage(page);
    const suggestEmptyPanel = await search.getEmptySuggestionText();
    const receivedString = suggestEmptyPanel.replace(/\"/g, "");

    const expectedString = string.replace(/\"/g, "");
    expect(receivedString).toContain(expectedString);
  }
);

Then(
  "[Mobile] success to clear keyword {string} on search field",
  async ({ page }) => {
    const search = new SearchPage(page);
    const filledString = await search.getSearchBoxValue();
    expect(filledString).toBeFalsy();
  }
);

Then(
  "[Mobile] user will be redirect to search result page of keyword {string}",
  async ({ page }, inputString) => {
    const search = new SearchPage(page);
    await search.waitForFilter();

    const escapedInputString = inputString.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const regexPattern = escapedInputString.replace(/\s+/g, "[+%20]+");
    await expect(page).toHaveURL(
      new RegExp(process.env.BASE_URL + `.*${regexPattern}.*`)
    );
  }
);

Then(
  "[Mobile] user see keyword {string} in section history Search at search panel card",
  async ({ page }, expectedString) => {
    const filledString = await page.evaluate(() => {
      return localStorage.getItem("string");
    });

    expect(expectedString).toEqual(filledString);
  }
);

Then(
  "[Mobile] user success to clear search history {string} at search panel card",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.searchHistoryContainer.waitFor({ state: "hidden" });
    expect(search.searchHistoryContainer).not.toBeVisible();
  }
);

Then(
  "[Mobile] user will see empty state with title {string} at search result page and description {string} at search result page",
  async ({ page }, expectedTitle, expectedDescription) => {
    const search = new SearchPage(page);
    const titleString = await search.getTitleText();
    const descriptionString = await search.getDescriptionText();
    const normalizeQuotes = (str) =>
      str.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");

    const normalizedTitleString = normalizeQuotes(titleString);
    const normalizedExpectedTitleString = normalizeQuotes(expectedTitle);

    expect(normalizedTitleString).toEqual(normalizedExpectedTitleString);
    expect(descriptionString).toEqual(expectedDescription);
  }
);

Then(
  "[Mobile] user will see button Ubah Pencarian at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    expect(search.changeSearchButton).toBeVisible();
  }
);

Then(
  "[Mobile] user will see section product recommendations at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.waitForProductRecommendations();

    expect(search.productRecommendations).toBeVisible();
  }
);

Then(
  "[Mobile] user see keyword {string} on search field was deleted",
  async ({ page }) => {
    const search = new SearchPage(page);
    const filledString = await search.getSearchBoxValue();
    expect(filledString).toBeFalsy();
  }
);

Then(
  "[Mobile] user see tab product and author at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.productTab.waitFor({ state: "visible" });
    await search.authorTab.waitFor({ state: "visible" });
  }
);

Then("[Mobile] user see filter at search result page", async ({ page }) => {
  const search = new SearchPage(page);
  await search.validateFilterVisible();
});

Then(
  "[Mobile] user see all card product contains product keyword {string} at search result page",
  async ({ page }, expectedKeyword) => {
    const search = new SearchPage(page);
    await search.verifyAllProductCardsContainProductKeyword(expectedKeyword);
  }
);

Then(
  "[Mobile] user see all card product contains author keyword {string} at search result page",
  async ({ page }, expectedKeyword) => {
    const search = new SearchPage(page);
    await search.verifyAllProductCardsContainAuthorKeyword(expectedKeyword);
  }
);

Then(
  "[Mobile] user see tab author shows the number equal to count tab at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.authorCardContent.first().waitFor();
    await search.validateTabAuthorCount();
  }
);

Then(
  "[Mobile] user see tab author shows the number not equal {int} at search result page",
  async ({ page }, int) => {
    const search = new SearchPage(page);
    await search.authorCardContent.first().waitFor();
    const cardCount = await search.authorCardContent.count();
    expect(cardCount).not.toEqual(int);
  }
);

Then(
  "[Mobile] user succcess to open modal filter at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.validateDrawerFilterVisible();
  }
);

Then(
  "[Mobile] user see section filter at modal filter search result page:",
  async ({ page }, data) => {
    const search = new SearchPage(page);
    const filters = data.rows().map((row) => row[0]);
    await expect(search.filterText).toBeVisible();
    for (const filter of filters) {
      switch (filter) {
        case "Urutkan":
          await expect(search.filterSort).toBeVisible();
          break;
        case "Kategori":
          await expect(search.filterCategory).toBeVisible();
          break;
        case "Harga":
          await expect(search.filterPrice).toBeVisible();
          break;
        case "Stok":
          await expect(search.filterStock).toBeVisible();
          break;

        default:
          break;
      }
    }
  }
);

Then(
  "[Mobile] user see button Terapkan at modal filter search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await expect(search.filterApplyButton).toBeVisible();
  }
);

Then(
  "[Mobile] user see button back on modal filter all category at drawer",
  async ({ page }) => {
    const search = new SearchPage(page);
    await expect(search.filterBackButton).toBeVisible();
  }
);

Then(
  "[Mobile] user see category list on modal filter all category at drawer",
  async ({ page }) => {
    const search = new SearchPage(page);
    await expect(search.filterCategoryList).toBeVisible();
  }
);

Then(
  "[Mobile] user see button simpan on modal filter all category at drawer",
  async ({ page }) => {
    const search = new SearchPage(page);
    await expect(search.filterSaveButton).toBeVisible();
  }
);

Then(
  "[Mobile] user success applied {string} price filter Rp {string} at search result page",
  async ({ page }, filter, price) => {
    const search = new SearchPage(page);
    await search.waitForFilter();
    switch (filter) {
      case "minimum":
        await search.verifyAppliedMinimumPriceFilter(price);
        break;
      case "maximum":
        await search.verifyAppliedMaximumPriceFilter(price);
        break;
    }
  }
);

Then(
  "[Mobile] user see bubble filter applied {string} price Rp {string} at search result page",
  async ({ page }, filter, price) => {
    const search = new SearchPage(page);
    switch (filter) {
      case "minimum":
        await search.verifyMinimumPriceFilterBubble(price);
        break;
      case "maximum":
        await search.verifyMaximumPriceFilterBubble(price);
        break;
    }
  }
);

Then(
  "[Mobile] user success applied miminum price filter Rp {string} and maximum price filter Rp {string} at search result page",
  async ({ page }, minPrice, maxPrice) => {
    const search = new SearchPage(page);
    await search.verifyPriceFilters(minPrice, maxPrice);
  }
);

Then(
  "[Mobile] user see bubble filter applied minimum price Rp {string} and maximum price filter Rp {string} at search result page",
  async ({ page }, minPrice, maxPrice) => {
    const search = new SearchPage(page);
    await search.verifyPriceFilterBubbles(minPrice, maxPrice);
  }
);

Then(
  "[Mobile] user see empty state filter at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.verifyEmptyStateFilter();
  }
);

Then(
  "[Mobile] user see error message title {string} and description {string} at search result page",
  async ({ page }, expectTitle, expectDescription) => {
    const search = new SearchPage(page);
    await search.verifyErrorMessage(expectTitle, expectDescription);
  }
);

Then(
  "[Mobile] user see button Hapus Filter at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.validateCtaRemoveFilter();
  }
);

Then(
  "[Mobile] user success to unapplied filter by stock available at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.verifyStockFilterApplied();
  }
);

Then(
  "[Mobile] user see bubble filter applied stock available at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.verifyStockFilterBubble();
  }
);

Then(
  "[Mobile] user success sort product list at search result page by {string}",
  async ({ page }, sort) => {
    const search = new SearchPage(page);
    await search.waitForFilter();
    switch (sort) {
      case "Terbaru":
        await search.verifySortByNewest();
        break;
      case "Terpopuler":
        await search.verifySortByPopular();
        break;
      case "Harga Terendah":
        await search.verifySortByLowestPrice();
        break;
      case "Harga Tertinggi":
        await search.verifySortByHighestPrice();
        break;

      default:
        break;
    }
  }
);

Then(
  "[Mobile] user success to reset filter at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.verifyFiltersReset();
  }
);

Then(
  "[Mobile] user success reset filter before applied it at drawer",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.verifyFiltersResetDrawer();
  }
);

Then(
  "[Mobile] user see author card contains keyword {string} at search result page",
  async ({ page }, keyword) => {
    const search = new SearchPage(page);
    await search.verifyAuthorCardsContainKeyword(keyword);
  }
);

Then(
  "[Mobile] user see author image on author card at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.verifyAllAuthorImagesLoaded();
  }
);

Then(
  "[Mobile] user see search result page tab author of keyword {string} at search result page",
  async ({ page }, keyword) => {
    const search = new SearchPage(page);
    await search.authorCardContent.first().waitFor();

    const escapedInputString = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regexPattern = escapedInputString.replace(/\s+/g, "[+%20]+");
    await expect(page).toHaveURL(
      new RegExp(process.env.BASE_URL + `.*${regexPattern}.*` + ".*author.*")
    );
  }
);

Then(
  "[Mobile] user see maximum {int} books owned by the author at search result page",
  async ({ page }, maxBooks) => {
    const search = new SearchPage(page);
    await search.authorCardContent.first().waitFor();
    await search.verifyMaxBooksPerAuthor(maxBooks);
  }
);

Then(
  "[Mobile] user see button filter was hide on tab author at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.verifyFilterButtonIsHidden();
  }
);

Then(
  "[Mobile] user redirected to author detail page of author {string}",
  async ({ page }, author) => {
    await expect(page).toHaveURL(new RegExp(`.*${author}.*`.toLowerCase()));
  }
);

Then(
  "[Mobile] user redirected to PDP page from search result {string}",
  async ({ page }) => {
    await expect(page).toHaveURL(new RegExp(`.*products.*`.toLowerCase()));
  }
);

