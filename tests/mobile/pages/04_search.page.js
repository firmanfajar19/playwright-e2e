import { expect } from "@playwright/test";

export class SearchPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.searchField = page.getByTestId("topbarSearch");
    this.searchPanelCard = page.getByTestId("searchPanelCard");
    this.authorName = page.getByTestId("authorName");
    this.authorSuggestionListWait = '[data-testid^="suggestionAuthorContainer"]';
    this.authorSuggestionListAll = page.locator('[data-testid^="suggestionAuthorContainer"]');

    this.searchBox = page.getByTestId('searchPanelCard').getByTestId('topbarSearch')
    this.searchSuggest = page.getByTestId("suggestionText0");
    this.emptySuggestion = page.getByTestId("emptySuggestion");
    this.dismissButton = page.getByTestId('searchPanelCard').getByTestId("searchInputDismiss");
    this.filter = page.getByTestId("filterMwebTrigger");
    this.removeHistoryButton = page.getByTestId("searchHistoryRemove0");
    this.removeAllHistoryButton = page.getByTestId("searchHistoryRemoveAll");
    this.searchHistoryContainer = page.getByTestId("searchHistoryContainer");
    this.titleText = page.getByTestId("errorTitleSearch404");
    this.descriptionText = page.getByTestId("errorDescriptionSearch404");
    this.changeSearchButton = page.getByTestId("errorCtaSearch404");
    this.productRecommendations = page.getByTestId("productSliderSlider");
    this.changeSearchButton = page.getByTestId("errorCtaSearch404");

    this.authorTab = this.page.getByTestId("productListSearchTabsAuthor");
    this.productTab = this.page.getByTestId("productListSearchTabsProduct");
    this.productCardTitles = this.page.locator('[data-testid^="productCardTitle"]');
    this.authorCardTitles = this.page.locator('[data-testid^="productCardAuthor"]');
    this.authorCardContent = this.page.locator('[data-testid^="authorCardContent"]');
    
    this.drawerFilter = page.getByTestId("productListFilterMwebDrawerContent");
    this.filterText = this.page.getByTestId('productListFilterMwebDrawerContent').getByText("Filter");
    this.filterSort = page.getByTestId('productListFilterMwebSort');
    this.filterCategory = page.getByTestId('productListFilterMwebCategory');
    this.filterPrice = page.getByTestId('productListFilterMwebPrice');
    this.filterStock = page.getByTestId('productListFilterMwebStock');
    this.filterApplyButton = page.getByTestId('productListFilterMwebApply');
    this.filterBackButton = page.getByRole('button').first();
    this.filterCategoryList = page.getByTestId('filterCategoryMwebList');
    this.filterSaveButton = page.getByTestId('filterCategoryMwebListSave');
    this.filterResetButton = page.getByTestId("productListFilterMwebReset");
    this.minPriceInput = this.page.getByTestId("productListFilterMwebMinPrice");
    this.maxPriceInput = this.page.getByTestId("productListFilterMwebMaxPrice");
    this.toggleOnlyAvailableStock = this.page.getByTestId("productListFilterMwebStockSwitch");

    this.bubbleFilter1 = this.page.getByTestId("productListFilterBubble#1");
    this.bubbleFilter2 = this.page.getByTestId("productListFilterBubble#2");

    this.errorImageLocator = page.getByTestId("errorImageProduct404");
    this.errorTitleLocator = page.getByTestId("errorTitleProduct404");
    this.errorDescriptionLocator = page.getByTestId("errorDescriptionProduct404");
    this.ctaRemoveFilter = this.page.getByTestId("errorCtaProduct404");

    this.sortOptionNewest = page.getByTestId("productListFilterMwebSortChip#1");
    this.sortOptionPopular = page.getByTestId("productListFilterMwebSortChip#2");
    this.sortOptionLowestPrice = page.getByTestId("productListFilterMwebSortChip#3");
    this.sortOptionHighestPrice = page.getByTestId("productListFilterMwebSortChip#4");

    this.authorCardLocator = page.locator('[data-testid^="authorCardContent"]');
    this.authorImageLocator = page.locator('[data-testid^="authorCardImage"]');
    this.authorLink = (author) => this.page.getByRole("link", { name: author }).nth(0);
    this.productCard = page.getByTestId("productCardContent");

  }

  async clickSearchField() {
    await this.searchField.click();
  }

  async clickSearchFieldPanelCard() {
    await this.searchBox.click();
  }

  async validateSearchPanelCard() {
    await expect(this.searchPanelCard).toBeVisible();
  }

  async validateTopAuthorList() {
    await this.page.waitForSelector(this.authorSuggestionListWait, {
      state: "visible",
    });
  }

  async validateCountTopAuthorList() {
    return this.authorSuggestionListAll.count();
  }

  async fillSearchBox(inputString) {
    await this.searchBox.fill(inputString);
  }

  async getSearchBoxValue() {
    return this.searchBox.inputValue();
  }

  async waitForSearchSuggest() {
    return this.searchSuggest.waitFor();
  }

  async getEmptySuggestionText() {
    return this.emptySuggestion.textContent();
  }

  async clickDismissButton() {
    await this.dismissButton.click();
  }
  async waitForSearchBox() {
    return this.searchBox.waitFor();
  }

  async pressEnterInSearchBox() {
    await this.searchBox.press("Enter");
  }

  async waitForFilter() {
    return this.filter.waitFor();
  }

  async clickRemoveHistoryButton() {
    await this.removeHistoryButton.click();
  }

  async clickRemoveAllHistoryButton() {
    await this.removeAllHistoryButton.click();
  }

  async getTitleText() {
    return this.titleText.textContent();
  }

  async getDescriptionText() {
    return this.descriptionText.textContent();
  }

  async waitForProductRecommendations() {
    return this.productRecommendations.waitFor();
  }

  async clickChangeSearchButton() {
    await this.changeSearchButton.click();
  }

  async validateFilterVisible() {
    await expect(this.filter).toBeVisible();
  }


  async verifyAllProductCardsContainProductKeyword(expectedKeyword) {
    const cardCount = await this.productCardTitles.count();

    for (let i = 0; i < cardCount; i++) {
      const cardTitle = await this.productCardTitles.nth(i).textContent();
      expect(cardTitle.toLowerCase()).toContain(expectedKeyword.toLowerCase());
    }
  }

  async verifyAllProductCardsContainAuthorKeyword(expectedKeyword) {
    const cardCount = await this.authorCardTitles.count();

    for (let i = 0; i < cardCount; i++) {
      const cardTitle = await this.authorCardTitles.nth(i).textContent();
      expect(cardTitle.toLowerCase()).toContain(expectedKeyword.toLowerCase());
    }
  }

  async clickFilterButton() {
    await this.filter.click();
  }

  async validateDrawerFilterVisible() {
    await expect(this.drawerFilter).toBeVisible();
  }

  async inputMinPrice(price) {
    const formattedPrice = price.replace(/\./g, "");
    await this.minPriceInput.fill(formattedPrice);
  }

  async inputMaxPrice(price) {
    const formattedPrice = price.replace(/\./g, "");
    await this.maxPriceInput.fill(formattedPrice);
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

  async verifyMinimumPriceFilterBubble(expectedPrice) {
    const bubbleText = await this.bubbleFilter1.textContent();
    expect(bubbleText).toContain("Harga Minimal: Rp" + expectedPrice);
  }

  async verifyMaximumPriceFilterBubble(expectedPrice) {
    const bubbleText = await this.bubbleFilter1.textContent();
    expect(bubbleText).toContain("Harga Maksimal: Rp" + expectedPrice);
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

  async validateCtaRemoveFilter() {
    expect(this.ctaRemoveFilter).toBeVisible();
  }

  async clickToggleOnlyAvailableStock() {
    await this.toggleOnlyAvailableStock.click();
  }

  async verifyStockFilterApplied() {
    await expect(this.page).toHaveURL(new RegExp(`${process.env.BASE_URL}` + '.*search.*'));
  }

  async verifyStockFilterBubble() {
    const bubbleText = await this.bubbleFilter1.textContent();
    expect(bubbleText).toEqual("Stok Tersedia");
  }

  async clickSortByNewest() {
    await this.sortOptionNewest.click();
  }
  
  async clickSortByPopular() {
    await this.sortOptionPopular.click();
  }

  async clickSortByLowestPrice() {
    await this.sortOptionLowestPrice.click();
  }

  async clickSortByHighestPrice() {
    await this.sortOptionHighestPrice.click();
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

  async clickCtaRemoveFilter() {
    await this.ctaRemoveFilter.click();
  }

  async verifyFiltersReset() {
    await expect(this.page).not.toHaveURL(new RegExp(`.*max_price=.*`));
    await expect(this.page).not.toHaveURL(new RegExp(`.*min_price=.*`));
    await expect(this.page).not.toHaveURL(new RegExp(`.*sort=popular`));
    await expect(this.page).not.toHaveURL(new RegExp(`.*sort=lowest_price`));
    await expect(this.page).not.toHaveURL(new RegExp(`.*sort=highest_price`));
    await expect(this.page).not.toHaveURL(new RegExp(`.*sort=latest*`));
  }

  async clickBubbleFilter1() {
    await this.bubbleFilter1.click();
  }

  async clickFilterReset() {
    await this.filterResetButton.click();
  }

  async verifyFiltersResetDrawer() {
    await expect(this.filterResetButton).not.toBeVisible();
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

  async verifyFilterButtonIsHidden() {
    await expect(this.filter).not.toBeVisible();
  }

  async clickAuthorList(author) {
    await this.authorLink(author).click();
  }

  async setAuthorTabCount() {
      const authorTabCount = await this.authorTab.innerText();
      await this.page.evaluate((tabCount) => {
        localStorage.setItem("tabCount", tabCount);
      }, authorTabCount);
  }

  async validateTabAuthorCount() {
    const tabCount = await this.page.evaluate(() => {
      return localStorage.getItem("tabCount");
    });
    const tabValue = await this.authorTab.innerText();
    expect(tabValue).toEqual(tabCount);
  }

}
