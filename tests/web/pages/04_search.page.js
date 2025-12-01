import { expect } from "@playwright/test";
export class SearchPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.searchField = page.getByTestId("navbarSearchBox");
    this.searchPanelCard = page.getByTestId("searchPanelCard");
    this.authorName = page.getByTestId("authorName");
    this.authorSuggestionListWait = '[data-testid^="suggestionAuthorContainer"]';
    this.authorSuggestionListAll = page.locator('[data-testid^="suggestionAuthorContainer"]');

    this.searchBox = page.getByTestId("navbarSearchBox");
    this.searchSuggest = page.getByTestId("suggestionText0");
    this.dismissButton = page.getByTestId("searchInputDismiss");
    this.searchHistoryTitle = page.getByTestId("searchHistoryTitle0");
    this.removeHistoryButton = page.getByTestId("searchHistoryRemove0");
    this.removeAllHistoryButton = page.getByTestId("searchHistoryRemoveAll");
    this.searchSummary = page.getByTestId("productListSearchSummary");
    this.titleText = page.getByTestId("errorTitleSearch404");
    this.descriptionText = page.getByTestId("errorDescriptionSearch404");
    this.changeSearchButton = page.getByTestId("errorCtaSearch404");
    this.productRecommendations = page.getByTestId("productSliderSlider");
    this.emptySuggestion = page.getByTestId("emptySuggestion");
    this.searchHistoryContainer = page.getByTestId("searchHistoryContainer");

    this.filterCategoryTrigger = (categoryName) => this.page.getByRole("heading", { name: categoryName, exact: true }).getByTestId("filterCategory#0Trigger");
    this.minPriceInput = this.page.getByTestId("productListFilterMinPrice");
    this.maxPriceInput = this.page.getByTestId("productListFilterMaxPrice");
    this.toggleOnlyAvailableStock = this.page.getByTestId("productListFilterStockSwitch");

    this.prodcutListSort = this.page.getByTestId("productListSort");
    this.sortOptionTerbaru = this.page.getByTestId("productListSortOption#1");
    this.sortOptionTerpopuler = this.page.getByTestId("productListSortOption#2");
    this.sortOptionHargaTerendah = this.page.getByTestId("productListSortOption#3");
    this.sortOptionHargaTertinggi = this.page.getByTestId("productListSortOption#4");

    this.bubbleFilter1 = this.page.getByTestId("productListFilterBubble#1");
    this.bubbleFilter2 = this.page.getByTestId("productListFilterBubble#2");

    this.authorTab = this.page.getByTestId("productListSearchTabsAuthor");
    this.productTab = this.page.getByTestId("productListSearchTabsProduct");
    this.authorLink = (author) => this.page.getByRole("link", { name: author }).nth(0);

    this.categoryFilter = page.getByTestId("productListFilterCategorySearch");
    this.filterCategory = this.page.getByTestId("productListFilterCategorySearch").getByText("Kategori");
    this.filterHarga = this.page.getByText("Harga");
    this.filterStock = this.page.getByTestId("productListFilterStock").getByText("Stok");
    this.filterText = this.page.getByText("Filter");

    this.productCardTitles = this.page.locator('[data-testid^="productCardTitle"]');
    this.authorCardLocator = page.locator('[data-testid^="authorCardContent"]');
    this.authorImageLocator = page.locator('[data-testid^="authorCardImage"]');
    this.loadmoreButton = this.page.getByTestId("productListLoadMore");

    this.errorImageLocator = page.getByTestId("errorImageProduct404");
    this.errorTitleLocator = page.getByTestId("errorTitleProduct404");
    this.errorDescriptionLocator = page.getByTestId("errorDescriptionProduct404");
    this.ctaRemoveFilter = this.page.getByTestId("errorCtaProduct404");
    this.productCard = page.getByTestId("productCardContent");

  }

  async validateTopAuthorList() {
    await this.page.waitForSelector(this.authorSuggestionListWait, {
      state: "visible",
    });
  }

  async validateCountTopAuthorList() {
    return this.authorSuggestionListAll.count();
  }
  
  async clickSearchField() {
    await this.searchField.click();
  }

  async validateSearchPanelCard() {
    await expect(this.searchPanelCard).toBeVisible();
  }

  async fillSearchBox(inputString) {
    await this.searchBox.fill(inputString);
  }

  async getSearchBoxValue() {
    return this.searchBox.inputValue();
  }

  async pressEnterInSearchBox() {
    await this.searchBox.press("Enter");
  }

  async clickDismissButton() {
    await this.dismissButton.click();
  }

  async getSearchHistoryTitle() {
    return this.searchHistoryTitle.textContent();
  }

  async getSearchSuggestionText() {
    return this.searchSuggest.textContent();
  }

  async clickRemoveHistoryButton() {
    await this.removeHistoryButton.click();
  }

  async clickRemoveAllHistoryButton() {
    await this.removeAllHistoryButton.click();
  }

  async waitForSearchSuggest() {
    return this.searchSuggest.waitFor();
  }

  async waitForSearchBox() {
    return this.searchBox.waitFor();
  }

  async waitForSearchSummary() {
    return this.searchSummary.waitFor();
  }

  async waitForProductRecommendations() {
    return this.productRecommendations.waitFor();
  }

  async getTitleText() {
    return this.titleText.textContent();
  }

  async getDescriptionText() {
    return this.descriptionText.textContent();
  }

  async clickChangeSearchButton() {
    await this.changeSearchButton.click();
  }

  async getEmptySuggestionText() {
    return this.emptySuggestion.textContent();
  }

  async expandFilterCategory(categoryName) {
    await this.filterCategoryTrigger(categoryName).click();
  }

  async inputMinPrice(price) {
    const formattedPrice = price.replace(/\./g, "");
    await this.minPriceInput.fill(formattedPrice);
  }

  async inputMaxPrice(price) {
    const formattedPrice = price.replace(/\./g, "");
    await this.maxPriceInput.fill(formattedPrice);
  }

  async clickToggleOnlyAvailableStock() {
    await this.toggleOnlyAvailableStock.click();
  }

  async clickProductListSort() {
    await this.prodcutListSort.click();
  }

  async validateProductListSort() {
    expect(this.prodcutListSort).toBeVisible();
  }

  async selectSortOptionTerbaru() {
    await this.sortOptionTerbaru.click();
  }

  async selectSortOptionTerpopuler() {
    await this.sortOptionTerpopuler.click();
  }

  async selectSortOptionHargaTerendah() {
    await this.sortOptionHargaTerendah.click();
  }

  async selectSortOptionHargaTertinggi() {
    await this.sortOptionHargaTertinggi.click();
  }

  async validateCtaRemoveFilter() {
    expect(this.ctaRemoveFilter).toBeVisible();
  }

  async clickCtaRemoveFilter() {
    await this.ctaRemoveFilter.click();
  }

  async clickBubbleFilter1() {
    await this.bubbleFilter1.click();
  }

  async clickAuthorTab() {
    await this.authorTab.click();
  }

  async clickProductTab() {
    await this.productTab.click();
  }

  async clickAuthorList(author) {
    await this.authorLink(author).click();
  }

  async verifyAllProductCardsContainKeyword(expectedKeyword) {
    const cardCount = await this.productCardTitles.count();

    for (let i = 0; i < cardCount; i++) {
      const cardTitle = await this.productCardTitles.nth(i).textContent();
      expect(cardTitle.toLowerCase()).toContain(expectedKeyword.toLowerCase());
    }
  }

  async validateCtaLoadMore() {
    expect(this.loadmoreButton).toBeVisible();
  }

  async verifyProductCardsContainKeyword(expectedKeyword, expectedCount) {
    const cardCount = await this.productCardTitles.count();
    expect(cardCount).toEqual(expectedCount);

    for (let i = 0; i < cardCount; i++) {
      const cardTitle = await this.productCardTitles.nth(i).textContent();
      expect(cardTitle.toLowerCase()).toContain(expectedKeyword.toLowerCase());
    }
  }

  async clickLoadMoreAndVerify(initialCount) {
    await this.loadmoreButton.click();

    await this.page.waitForFunction((initialCount) => {
      const currentCount = document.querySelectorAll(
        '[data-testid^="productCardTitle"]'
      ).length;
      return currentCount > initialCount;
    }, initialCount);
  }

  async verifyAppliedFilterCategory(appliedStr) {
    const escapedInputString = appliedStr.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const regexPattern = escapedInputString.replace(/\s+/g, "[+%20]+");
    const expectedUrlPattern = new RegExp(
      `${process.env.BASE_URL}.*${regexPattern}.*`,
      "i"
    );

    await expect(this.page).toHaveURL(expectedUrlPattern);
  }

  async verifyAppliedMinimumPriceFilter(price) {
    const formattedPrice = price.replace(/\./g, "");
    const escapedInputString = formattedPrice.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const regexPattern = escapedInputString.replace(/\s+/g, "[+%20]+");
    const expectedUrlPattern = new RegExp(
      `${process.env.BASE_URL}.*${regexPattern}.*`,
      "i"
    );

    await expect(this.page).toHaveURL(expectedUrlPattern);
  }

  async verifyAppliedMaximumPriceFilter(price) {
    const formattedPrice = price.replace(/\./g, "");
    const escapedInputString = formattedPrice.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const regexPattern = escapedInputString.replace(/\s+/g, "[+%20]+");
    const expectedUrlPattern = new RegExp(
      `${process.env.BASE_URL}.*${regexPattern}.*`,
      "i"
    );

    await expect(this.page).toHaveURL(expectedUrlPattern);
  }

  async verifyFilterBubbleText(expectedText) {
    const bubbleText = await this.bubbleFilter1.textContent();
    expect(bubbleText).toEqual(expectedText);
  }

  async verifyPriceFilters(minPrice, maxPrice) {
    const formattedMinPrice = minPrice.replace(/\./g, "");
    const formattedMaxPrice = maxPrice.replace(/\./g, "");
    const escapedInputMinPrice = formattedMinPrice.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const escapedInputMaxPrice = formattedMaxPrice.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const regexPatternMinPrice = escapedInputMinPrice.replace(
      /\s+/g,
      "[+%20]+"
    );
    const regexPatternMaxPrice = escapedInputMaxPrice.replace(
      /\s+/g,
      "[+%20]+"
    );

    const expectedUrlPattern = new RegExp(
      `${process.env.BASE_URL}.*${regexPatternMinPrice}.*${regexPatternMaxPrice}.*`,
      "i"
    );

    await expect(this.page).toHaveURL(expectedUrlPattern);
  }

  async verifyMinimumPriceFilterBubble(expectedPrice) {
    const bubbleText = await this.bubbleFilter1.textContent();
    expect(bubbleText).toContain("Harga Minimal: Rp" + expectedPrice);
  }

  async verifyMaximumPriceFilterBubble(expectedPrice) {
    const bubbleText = await this.bubbleFilter1.textContent();
    expect(bubbleText).toContain("Harga Maksimal: Rp" + expectedPrice);
  }

  async verifyPriceFilterBubbles(minPrice, maxPrice) {
    const bubbleTextMinPrice = await this.bubbleFilter1.textContent();
    const bubbleTextMaxPrice = await this.bubbleFilter2.textContent();

    expect(bubbleTextMinPrice).toEqual("Harga Minimal: Rp" + minPrice);
    expect(bubbleTextMaxPrice).toEqual("Harga Maksimal: Rp" + maxPrice);
  }

  async verifyEmptyStateFilter() {
    await this.errorImageLocator.waitFor();
    await expect(this.errorImageLocator).toHaveJSProperty("complete", true);
    await expect(this.errorImageLocator).not.toHaveJSProperty(
      "naturalWidth",
      0
    );
    await expect(this.errorImageLocator).toBeVisible();
  }

  async verifyErrorMessage(expectTitle, expectDescription) {
    const titleText = await this.errorTitleLocator.textContent();
    const descriptionText = await this.errorDescriptionLocator.textContent();

    expect(titleText).toEqual(expectTitle);
    expect(descriptionText).toEqual(expectDescription);
  }

  async verifyStockFilterApplied() {
    await expect(this.page).toHaveURL(new RegExp(`${process.env.BASE_URL}` + '.*search.*'));
  }

  async verifyStockFilterBubble() {
    const bubbleText = await this.bubbleFilter1.textContent();
    expect(bubbleText).toEqual("Stok Tersedia");
  }

  async verifySortByNewest() {
    await expect(this.page).toHaveURL(new RegExp(`.*${process.env.BASE_URL}.*`));
  }

  async verifySortByPopular() {
    await expect(this.page).toHaveURL(new RegExp(`.*sort=popular.*`));
  }

  async verifySortByLowestPrice() {
    await expect(this.page).toHaveURL(new RegExp(`.*sort=lowest_price.*`));
  }

  async verifySortByHighestPrice() {
    await expect(this.page).toHaveURL(new RegExp(`.*sort=highest_price.*`));
  }

  async verifyFiltersReset() {
    await expect(this.page).not.toHaveURL(new RegExp(`.*max_price=.*`));
    await expect(this.page).not.toHaveURL(new RegExp(`.*min_price=.*`));
    await expect(this.page).not.toHaveURL(
      new RegExp(`.*is_available_only=true`)
    );
    await expect(this.page).not.toHaveURL(new RegExp(`.*sort=popular`));
    await expect(this.page).not.toHaveURL(new RegExp(`.*sort=lowest_price`));
    await expect(this.page).not.toHaveURL(new RegExp(`.*sort=highest_price`));
    await expect(this.page).not.toHaveURL(new RegExp(`.*sort=latest*`));
  }

  async verifySearchResultTab(keyword) {
    await expect(this.searchSummary.getByText(keyword)).toBeVisible();
  }

  async verifyAuthorCardsContainKeyword(keyword) {
    const cardCount = await this.authorCardLocator.count();

    for (let i = 0; i < cardCount; i++) {
      const cardTitle = await this.authorCardLocator.nth(i).textContent();
      expect(cardTitle.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }

  async verifyAllAuthorImagesLoaded() {
    const imageCount = await this.authorImageLocator.count();

    for (let i = 0; i < imageCount; i++) {
      const authorImage = this.authorImageLocator.nth(i);
      await expect(authorImage).toHaveJSProperty("complete", true);
      await expect(authorImage).not.toHaveJSProperty("naturalWidth", 0);
    }
  }

  async verifyFilterAndSortHidden() {
    await expect(this.filterText).not.toBeVisible();
    await expect(this.prodcutListSort).not.toBeVisible();
  }

  async verifyMaxBooksPerAuthor(maxBooks) {
    const authorCards = this.authorCardLocator;
    const cardCount = await authorCards.count();

    for (let i = 0; i < cardCount; i++) {
      const productCards = authorCards
        .nth(i)
        .locator('[data-testid^="productCardContent"]');
      const productCardCount = await productCards.count();
      expect(productCardCount).toBeLessThanOrEqual(maxBooks);
    }
  }

  async verifyAuthorCardContainKeyword(expectedCount, keyword) {
    await this.loadmoreButton.waitFor({ state: "visible" });
    const authorCards = this.authorCardLocator;
    const cardCount = await authorCards.count();

    let matchCount = 0;
    for (let i = 0; i < cardCount; i++) {
      const cardTitle = await authorCards.nth(i).textContent();
      if (cardTitle.toLowerCase().includes(keyword.toLowerCase())) {
        matchCount++;
      }
    }

    expect(matchCount).toEqual(expectedCount);
  }

  async selectFilterCategory(category) {
    await this.categoryFilter.getByText(category, { exact: true }).click();
  }

  async verifyAuthorCount() {
    const authorTabText = await this.authorTab.textContent();
    const numberMatch = authorTabText.match(/\d+/);
    const numberFromAuthorTab = numberMatch ? numberMatch[0] : null;
    const searchSummary = await this.searchSummary.textContent();
    const expectedText = `${numberFromAuthorTab} hasil pencarian untuk`;
    expect(searchSummary).toContain(expectedText);
  }

  async verifyProductCount() {
    const productTabText = await this.productTab.textContent();
    const numberMatch = productTabText.match(/\d+/);
    const numberFromProductTab = numberMatch ? numberMatch[0] : null;
    const searchSummary = await this.searchSummary.textContent();
    const expectedText = `${numberFromProductTab} hasil pencarian untuk`;
    expect(searchSummary).toContain(expectedText);
  }
}
