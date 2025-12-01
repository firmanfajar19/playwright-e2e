import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";
import { SearchPage } from "../pages/04_search.page";

const { Given, When, Then } = createBdd();

When("[Desktop] user click at search field", async ({ page }) => {
  const search = new SearchPage(page);
  await search.clickSearchField();
});

Then("[Desktop] user sees search panel card was opened", async ({ page }) => {
  const search = new SearchPage(page);
  await search.validateSearchPanelCard();
});

Given(`[Desktop] user see {int} default top author at search panel card`, 
  async ({ page }, int) => {
    const search = new SearchPage(page);
      await search.validateTopAuthorList();
      const totalAuthor = await search.validateCountTopAuthorList();
      expect(totalAuthor).toEqual(int)
    }
);


When("[Desktop] user input {string} on search field",
  async ({ page }, inputString) => {
    const search = new SearchPage(page);
    await search.fillSearchBox(inputString);
    const filledString = await search.getSearchBoxValue();

    await page.evaluate((text) => {
      localStorage.setItem("string", text);
    }, filledString);
  }
);

When("[Desktop] user click button x on search field", async ({ page }) => {
  const search = new SearchPage(page);
  await search.clickDismissButton();
});

When("[Desktop] user search keyword {string} on search field",
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

When("[Desktop] user back to homepage by click back browser",
  async ({ page }) => {
    const search = new SearchPage(page);
    await page.goBack();
    await search.waitForSearchBox();
  }
);

When("[Desktop] user click button hapus semua at search panel card",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.waitForSearchBox();
    await search.clickRemoveAllHistoryButton();
  }
);

When("[Desktop] user click button Ubah Pencarian at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.clickChangeSearchButton();
  }
);

When("[Desktop] user select filter category {string} at search result page",
  async ({ page }, str) => {
    const search = new SearchPage(page);
    await search.selectFilterCategory(str);
  }
);

When("[Desktop] user expand filter category {string} at search result page",
  async ({ page }, categoryName) => {
    const search = new SearchPage(page);
    await search.expandFilterCategory(categoryName);
  }
);

When("[Desktop] user input minimum price Rp {string} at search result page",
  async ({ page }, price) => {
    const search = new SearchPage(page);
    await search.inputMinPrice(price);
  }
);

When("[Desktop] user input maximum price Rp {string} at search result page",
  async ({ page }, price) => {
    const search = new SearchPage(page);
    await search.inputMaxPrice(price);
  }
);

When("[Desktop] user click toggle only available stock at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.clickToggleOnlyAvailableStock();
  }
);

When("[Desktop] user click button product list sort at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.clickProductListSort();
  }
);

When("[Desktop] user select sort by {string} at search result page",
  async ({ page }, sort) => {
    const search = new SearchPage(page);
    switch (sort) {
      case "Terbaru":
        await search.selectSortOptionTerbaru();
        break;
      case "Terpopuler":
        await search.selectSortOptionTerpopuler();
        break;
      case "Harga Terendah":
        await search.selectSortOptionHargaTerendah();
        break;
      case "Harga Tertinggi":
        await search.selectSortOptionHargaTertinggi();
        break;
      default:
        break;
    }
  }
);

When("[Desktop] user click button Hapus Filter at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.clickCtaRemoveFilter();
  }
);

When("[Desktop] user click bubble filter at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.clickBubbleFilter1();
  }
);

When("[Desktop] user click on tab {string} at search result page",
  async ({ page }, tab) => {
    const search = new SearchPage(page);
    switch (tab) {
      case "Author":
        await search.authorTab.click();
        break;
      case "Product":
        await search.productTab.click();
        break;

      default:
        break;
    }
  }
);

When("[Desktop] user click author {string} at search result page",
  async ({ page }, author) => {
    const search = new SearchPage(page);
    await search.clickAuthorList(author);
  }
);

When("[Desktop] user click PDP on tab {string} at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.productCard.first().click();
  }
);

Then("[Desktop] user see keyword {string} in section history Search at search panel card",
  async ({ page }, expectedString) => {
    const filledString = await page.evaluate(() => {
      return localStorage.getItem("string");
    });

    expect(expectedString).toEqual(filledString);
  }
);

Then("[Desktop] user will be redirect to search result page of keyword {string}",
  async ({ page }, inputString) => {
    const search = new SearchPage(page);
    await search.waitForSearchSummary();

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

Then("[Desktop] user success to see inputted keyword {string} on search field",
  async ({ page }, expectedString) => {
    const filledString = await page.evaluate(() => {
      return localStorage.getItem("string");
    });
    expect(expectedString).toEqual(filledString);
  }
);

Then("[Desktop] user will see search suggestion with keyword {string} at search panel card",
  async ({ page }, expectedString) => {
    const search = new SearchPage(page);
    await search.waitForSearchSuggest();

    const filledString = await page.evaluate(() => {
      return localStorage.getItem("string");
    });

    expect(expectedString).toContain(filledString);
  }
);

Then("[Desktop] user failed to see inputted keyword {string} on search field",
  async ({ page }) => {
    const filledString = await page.evaluate(() => {
      return localStorage.getItem("string");
    });
    expect(filledString.length).toBeLessThanOrEqual(50);
  }
);

Then("[Desktop] user will see wording {string} at search panel card",
  async ({ page }, string) => {
    const search = new SearchPage(page);
    const suggestEmptyPanel = await search.getEmptySuggestionText();
    const receivedString = suggestEmptyPanel.replace(/\"/g, "");

    const expectedString = string.replace(/\"/g, "");
    expect(receivedString).toContain(expectedString);
  }
);

Then("[Desktop] success to clear keyword {string} on search field",
  async ({ page }) => {
    const search = new SearchPage(page);
    const filledString = await search.getSearchBoxValue();
    expect(filledString).toBeFalsy();
  }
);

Then("[Desktop] user click button x on search history {string} at search panel card",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.clickRemoveHistoryButton();
  }
);

Then("[Desktop] user success to clear search history {string} at search panel card",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.searchHistoryContainer.waitFor({ state: "hidden" });
    expect(search.searchHistoryContainer).not.toBeVisible();
  }
);

Then("[Desktop] user will see empty state with title {string} at search result page and description {string} at search result page",
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

Then("[Desktop] user will see button Ubah Pencarian at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    expect(search.changeSearchButton).toBeVisible();
  }
);

Then("[Desktop] user will see section product recommendations at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.waitForProductRecommendations();

    expect(search.productRecommendations).toBeVisible();
  }
);

Then("[Desktop] user see keyword {string} on search field was deleted",
  async ({ page }) => {
    const search = new SearchPage(page);
    const filledString = await search.getSearchBoxValue();
    expect(filledString).toBeFalsy();
  }
);

Then("[Desktop] user see tab product and author at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    const productTab = search.productTab;
    const authorTab = search.authorTab;
    expect(productTab).toBeVisible();
    expect(authorTab).toBeVisible();
  }
);

Then("[Desktop] user see section summary of keyword {string} at search result page",
  async ({ page }, keyword) => {
    const search = new SearchPage(page);
    expect(search.searchSummary).toContainText(keyword);
  }
);

Then("[Desktop] user see section filter at search result page:",
  async ({ page }, data) => {
    const search = new SearchPage(page);
    const filters = data.rows().map((row) => row[0]);
    await expect(search.filterText).toBeVisible();
    for (const filter of filters) {
      switch (filter) {
        case "Kategori":
          await expect(search.filterCategory).toBeVisible();
          break;
        case "Harga":
          await expect(search.filterHarga).toBeVisible();
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

Then("[Desktop] user see all card product contains keyword {string} at search result page",
  async ({ page }, expectedKeyword) => {
    const search = new SearchPage(page);
    await search.verifyAllProductCardsContainKeyword(expectedKeyword);
  }
);

Then("[Desktop] user see product list sort at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.validateProductListSort();
  }
);

Then("[Desktop] user see button Load More at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.validateCtaLoadMore();
  }
);

Then("[Desktop] user see {int} product card contains keyword {string} at search result page",
  async ({ page }, expectedCount, expectedKeyword) => {
    const search = new SearchPage(page);
    await search.verifyProductCardsContainKeyword(
      expectedKeyword,
      expectedCount
    );
  }
);

Then("[Desktop] user click button {string} at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    const initialCount = await search.productCardTitles.count();
    await search.clickLoadMoreAndVerify(initialCount);
  }
);

Then("[Desktop] user success to applied filter category {string} at search result page",
  async ({ page }, appliedStr) => {
    const search = new SearchPage(page);
    await search.waitForSearchSummary();
    await search.verifyAppliedFilterCategory(appliedStr);
  }
);

Then("[Desktop] user see bubble filter applied category {string} at search result page",
  async ({ page }, expectedBubble) => {
    const search = new SearchPage(page);
    await search.verifyFilterBubbleText(expectedBubble);
  }
);

Then("[Desktop] user success applied miminum price filter Rp {string} at search result page",
  async ({ page }, price) => {
    const search = new SearchPage(page);
    await search.waitForSearchSummary();
    await search.verifyAppliedMinimumPriceFilter(price);
  }
);

Then("[Desktop] user see bubble filter applied minimum price Rp {string} at search result page",
  async ({ page }, price) => {
    const search = new SearchPage(page);
    await search.verifyMinimumPriceFilterBubble(price);
  }
);

Then("[Desktop] user success applied maximum price filter Rp {string} at search result page",
  async ({ page }, price) => {
    const search = new SearchPage(page);
    await search.waitForSearchSummary();
    await search.verifyAppliedMaximumPriceFilter(price);
  }
);

Then("[Desktop] user see bubble filter applied maximum price Rp {string} at search result page",
  async ({ page }, price) => {
    const search = new SearchPage(page);
    await search.verifyMaximumPriceFilterBubble(price);
  }
);

Then("[Desktop] user success applied miminum price filter Rp {string} and maximum price filter Rp {string} at search result page",
  async ({ page }, minPrice, maxPrice) => {
    const search = new SearchPage(page);
    await search.verifyPriceFilters(minPrice, maxPrice);
  }
);

Then("[Desktop] user see bubble filter applied minimum price Rp {string} and maximum price filter Rp {string} at search result page",
  async ({ page }, minPrice, maxPrice) => {
    const search = new SearchPage(page);
    await search.verifyPriceFilterBubbles(minPrice, maxPrice);
  }
);

Then("[Desktop] user see empty state filter at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.verifyEmptyStateFilter();
  }
);

Then("[Desktop] user see error message title {string} and description {string} at search result page",
  async ({ page }, expectTitle, expectDescription) => {
    const search = new SearchPage(page);
    await search.verifyErrorMessage(expectTitle, expectDescription);
  }
);

Then("[Desktop] user see button Hapus Filter at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.validateCtaRemoveFilter();
  }
);

Then("[Desktop] user success to unapplied filter by stock available at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.verifyStockFilterApplied();
  }
);

Then("[Desktop] user success sort product list at search result page by {string}",
  async ({ page }, sort) => {
    const search = new SearchPage(page);
    await search.waitForSearchSummary();
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

Then("[Desktop] user success to reset filter at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.verifyFiltersReset();
  }
);

Then("[Desktop] user see search result page tab author of keyword {string} at search result page",
  async ({ page }, keyword) => {
    const search = new SearchPage(page);
    await search.verifySearchResultTab(keyword);
    const escapedInputString = keyword.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const regexPattern = escapedInputString.replace(/\s+/g, "[+%20]+");
    await expect(page).toHaveURL(
      new RegExp(process.env.BASE_URL + `.*${regexPattern}.*` + ".*author.*")
    );
  }
);

Then("[Desktop] user see author card contains keyword {string} at search result page",
  async ({ page }, keyword) => {
    const search = new SearchPage(page);
    await search.verifyAuthorCardsContainKeyword(keyword);
  }
);

Then("[Desktop] user see author image on author card at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.waitForSearchSummary();
    await search.verifyAllAuthorImagesLoaded();
  }
);

Then("[Desktop] user see filter and sort was hide on tab author at search result page",
  async ({ page }) => {
    const search = new SearchPage(page);
    await search.waitForSearchSummary();
    await search.verifyFilterAndSortHidden();
  }
);

Then("[Desktop] user see maximum {int} books owned by the author at search result page",
  async ({ page }, maxBooks) => {
    const search = new SearchPage(page);
    await search.waitForSearchSummary();
    await search.verifyMaxBooksPerAuthor(maxBooks);
  }
);

Then("[Desktop] user redirected to author detail page of author {string}",
  async ({ page }, author) => {
    await expect(page).toHaveURL(new RegExp(`.*${author}.*`.toLowerCase()));
  }
);

Then("[Desktop] user see {int} author card contains keyword {string} at search result page",
  async ({ page }, expectedCount, keyword) => {
    const search = new SearchPage(page);
    await search.verifyAuthorCardContainKeyword(expectedCount, keyword);
  }
);

Then("[Desktop] user see {string} count in summary result text at search result page",
  async ({ page }, tab) => {
    const search = new SearchPage(page);
    await search.waitForSearchSummary();
    switch (tab) {
      case "Author":
        await search.verifyAuthorCount();
        break;
      case "Product":
        await search.verifyProductCount();
        break;

      default:
        throw new Error("Invalid tab option");
    }
  }
);


Then("[Desktop] user redirected to PDP page from search result {string}",
  async ({ page }) => {
    await expect(page).toHaveURL(new RegExp(`.*products.*`.toLowerCase()));
  }
);