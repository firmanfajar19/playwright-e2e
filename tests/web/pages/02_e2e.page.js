import { expect } from "@playwright/test";

export class E2ePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.skeletonPDP = page.getByTestId("productDetailFinalPriceSkeleton");
    this.buttonATC = page.getByTestId("productDetailAtcCta");
    this.buttonCart = page.getByTestId("navbarCart");
    this.snackbarCekCart = page.getByTestId("snackbarAction");
    this.chipHardCover = page.getByRole("button").locator(".truncate", { hasText: "Hard Cover" });
    this.chipSoftCover = page.getByRole("button").locator(".truncate", { hasText: "Soft Cover" });
    this.variantGroup = page.getByTestId("productDetailVariantTriggerButton");
    this.variantRow1 = page.getByTestId("productDetailVariantFormItem#0");
    this.variantRow2 = page.getByTestId("productDetailVariantFormItem#1");
    this.applyVariant = page.getByTestId("productDetailVariantFormApply");
    this.selectChipWarehouse = page.getByTestId('productDetailWarehouseTriggerButton');
    this.chooseRecommendedWarehouse = page.getByRole('radiogroup').getByText('Gramedia Jakarta Matraman');
    this.applyWarehouse = page.getByTestId('productDetailWarehouseFormApply');

    this.buttonCheckout = page.getByTestId("buttonCheckout");
    this.cartButtonRemoveAll = page.getByTestId("removeAllCartItemButton");
    this.ctaRemoveConfirmation = page.getByTestId("cartDeleteConfirmationCta");
    this.snackbarRemoveSuccess = page.getByTestId("snackbarSuccessDelete");
    this.titleCartEmpty = page.getByTestId("errorTitleCartEmpty");
    this.recommendProductTitleCart = page.getByTestId('productListRecommendation').getByTestId('productSliderTitle')

    this.shimmeringCartItem = page.locator(".py-2 > .flex > .h-4");
    this.address = page.locator(".mt-6").nth(1);
    this.shippingMethod = page.getByTestId("shippingOrderShippingTrigger");
    this.shimmeringShipment = page.locator(".relative > .animate-pulse").nth(0);
    this.pickUpInStore = page.locator("button > .truncate", { hasText: "Ambil di Toko", exact: true });
    this.servicePIS = page.getByRole("radiogroup").locator(".flex >.truncate", { hasText: "Gramedia Jakarta Matraman" });
    this.ninjaXpress = page.locator("button > .truncate", {hasText: "Ninja Xpress", exact: true});
    this.serviceNinjaNextDay = page.getByRole("radiogroup").locator(".truncate", { hasText: "Next Day" });
    this.serviceNinjaSameDay = page.getByRole("radiogroup").locator(".truncate", { hasText: "Same Day" });
    this.serviceNinjaRegular = page.getByRole("radiogroup").locator(".truncate", { hasText: "Reguler (Std)" });
    this.sicepat = page.locator("button > .truncate", { hasText: "Sicepat" });
    this.serviceSicepatBST = page.getByRole("radiogroup").locator(".truncate", { hasText: "Besok Sampai Tujuan" });
    this.serviceSicepatCargo = page.getByRole("radiogroup").locator(".truncate", { hasText: "Cargo (minimal 10Kg)" });
    this.kgx = page.locator("button > .truncate", { hasText: "KGXpress" });
    this.serviceKGXReg = page.getByRole("radiogroup").locator(".truncate", { hasText: "REG" });
    this.JNE = page.locator("button > .truncate", {hasText: "JNE", exact: true});
    this.serviceJNE_JTR = page.getByText('JTR');
    this.serviceJNE_YES = page.getByText('Yakin Esok Sampai - Dalam Kota');
    this.serviceJNE_Regular = page.getByText('Reguler - Dalam Kota');

    this.buttonContinuePayment = page.getByTestId("toPaymentButton");

    this.groupQRIS = page.getByTestId("accordionPaymentMethodTrigger30");
    this.paymentQRIS = page.getByTestId("paymentMethodRadio#1#1");
    this.groupVA = page.getByTestId("accordionPaymentMethodTrigger31");
    this.paymentVABCA = page.getByTestId("paymentMethodRadio#2#1");
    this.paymentVAMandiri = page.getByTestId("paymentMethodRadio#2#2");
    this.paymentVABNI = page.getByTestId("paymentMethodRadio#2#3");
    this.paymentVABRI = page.getByTestId("paymentMethodRadio#2#4");
    this.groupCC = page.getByTestId("accordionPaymentMethodTrigger32");
    this.paymentCC = page.getByTestId("paymentMethodRadio#3#1");

    this.creditCardName = page.locator("#cardName");
    this.creditCardNumber = page.locator('input[type="text"]');
    this.creditCardExpMonth = page.locator("#cardExpiryMonth");
    this.creditCardExpYear = page.locator("#cardExpiryYear");
    this.creditCardCVV = page.locator("#cardCvv");
    this.saveCreditCard = page.getByTestId("saveCCInformationButton");
    this.iframeOtp = page.frameLocator('iframe[title="\\33 ds"]');

    this.totalBillPrice = page.locator('[data-testid="totalBillPrice"]');
    this.totalShippingPrice = page.locator('[data-testid="totalShippingPrice"]');
    this.totalDiscount = page.locator('[data-testid="totalDiscount"]');
    this.voucherDiscount = page.locator('[data-testid="voucherDiscount"]');
    this.subTotalPrice = page.locator('[data-testid="subTotalPrice"]');
    this.shimmeringPrice = page.locator('[data-testid="subTotalPrice"] > .animate-pulse');

    this.inputVoucher = page.getByRole("textbox");
    this.buttonApplyVoucher = page.getByTestId("applyPromoButton");
    this.successApplyVoucher = page.getByTestId("snackbarSuccessPromoCode");

    this.buttonPay = page.getByTestId("payButton");
    this.buttonShopAgain = page.getByTestId("shoppingAgainButton");
    this.buttonOrderList = page.getByTestId("checkPaymentButton");
    this.imageQRIS = page.getByRole("img", { name: "QRIS" });
    this.subTotalTYP = page.locator(".text-m-extrabold", { hasText: "Rp" });

    this.validateVABCA = page.getByAltText("BCA Virtual Account");
    this.validateVAMandiri = page.getByAltText("Mandiri Virtual Account");
    this.validateVABNI = page.getByAltText("BNI Virtual Account");
    this.validateVABRI = page.getByAltText("BRI Virtual Account");
    this.validateSuccessPaid = page.getByText("Terima Kasih Telah Bertransaksi di Gramedia.com");
  }

  async validateSkeletonPDP() {
    await this.skeletonPDP.waitFor({ state: 'hidden' });
  }

  async selectHardCover() {
    await this.chipHardCover.click();
  }

  async selectSoftCover() {
    await this.chipSoftCover.click();
  }

  async selectItemRow1() {
    await this.variantGroup.click();
    await this.variantRow1.click();
    await this.applyVariant.click();
  }

  async selectItemRow2() {
    await this.variantGroup.click();
    await this.variantRow2.click();
    await this.applyVariant.click();
  }

  async selectRecommendedWarehouse() {
    await this.selectChipWarehouse.click();
    await this.chooseRecommendedWarehouse.click();
    await this.applyWarehouse.click();
  }

  async clickAddToCart() {
    await this.buttonATC.click();
  }

  async clickSnackbarCekCart() {
    await this.snackbarCekCart.click();
  }

  async clickCheckout() {
    await this.buttonCheckout.click();
  }

  async selectShippingMethod() {
    await this.address.waitFor({ state: "visible" });
    await this.shippingMethod.click();
  }

  async selectPickUpInStore() {
    await this.pickUpInStore.click();
  }

  async selectServicePIS() {
    await this.servicePIS.click();
  }

  async selectNinjaXpress() {
    await this.ninjaXpress.click();
  }

  async selectServiceNinjaNextDay() {
    await this.serviceNinjaNextDay.click();
  }

  async selectServiceNinjaSameDay() {
    await this.serviceNinjaSameDay.click();
  }

  async selectServiceNinjaReguler() {
    await this.serviceNinjaRegular.click();
  }

  async selectSicepat() {
    await this.sicepat.click();
  }

  async selectServiceSicepatBST() {
    await this.serviceSicepatBST.click();
  }

  async selectServiceSicepatCargo() {
    await this.serviceSicepatCargo.click();
  }

  async selectKGX() {
    await this.kgx.click();
  }

  async selectServiceKGXReg() {
    await this.serviceKGXReg.click();
  }

  async selectJNE() {
    await this.JNE.click();
  }

  async selectServiceJNEJTR() {
    await this.serviceJNE_JTR.click();
  }

  async selectServiceJNEYes() {
    await this.serviceJNE_YES.click();
  }

  async selectServiceJNERegular() {
    await this.serviceJNE_Regular.click();
  }

  async clickContinuePayment() {
    await this.address.waitFor({ state: "visible" });
    await this.buttonContinuePayment.click();
  }

  async selectPaymentQRIS() {
    await this.groupQRIS.click();
    await this.paymentQRIS.click();
  }

  async selectPaymentVABCA() {
    await this.groupVA.click();
    await this.paymentVABCA.click();
  }

  async selectPaymentVAMandiri() {
    await this.groupVA.click();
    await this.paymentVAMandiri.click();
  }

  async selectPaymentVABRI() {
    await this.groupVA.click();
    await this.paymentVABRI.click();
  }

  async selectPaymentVABNI() {
    await this.groupVA.click();
    await this.paymentVABNI.click();
  }
  async selectPaymentCC() {
    await this.groupCC.click();
    await this.paymentCC.click();
  }

  async inputFormCC() {
    await this.creditCardName.fill(process.env.CREDIT_CARD_NAME);
    await this.creditCardNumber.fill(process.env.CREDIT_CARD_NUMBER);
    await this.creditCardExpMonth.fill(process.env.CREDIT_CARD_EXP_MONTH);
    await this.creditCardExpYear.fill(process.env.CREDIT_CARD_EXP_YEAR);
    await this.creditCardCVV.fill(process.env.CREDIT_CARD_CVV);
    await this.saveCreditCard.click();
  }

  async inputOtpCC() {
    await this.iframeOtp
      .locator('input[type="password"]')
      .fill(process.env.OTP_CODE_CC, { timeout: 10000 });
    await this.iframeOtp.getByRole("button", { name: "OK" }).click();
  }

  async voucherCartPercent() {
    await this.inputVoucher.fill(process.env.VALID_VOUCHER_CART_PERCENT);
  }

  async voucherCartFlat() {
    await this.inputVoucher.fill(process.env.VALID_VOUCHER_CART_FLAT);
  }

  async voucherCartFinal() {
    await this.inputVoucher.fill(process.env.VALID_VOUCHER_CART_FINAL);
  }

  async voucherShipPercent() {
    await this.inputVoucher.fill(process.env.VALID_VOUCHER_SHIP_PERCENT);
  }

  async voucherShipFlat() {
    await this.inputVoucher.fill(process.env.VALID_VOUCHER_SHIP_FLAT);
  }

  async voucherShipFinal() {
    await this.inputVoucher.fill(process.env.VALID_VOUCHER_SHIP_FINAL);
  }

  async applyVoucher() {
    await this.buttonApplyVoucher.click();
    await this.successApplyVoucher.waitFor({state: "visible"});
    await this.subTotalPrice.waitFor({state: "visible"});
    await this.successApplyVoucher.waitFor({state: "hidden"});
  }

  async clickPay() {
    await this.buttonPay.click();
  }

  async validateSubTotalPrice() {
    await this.shimmeringPrice.waitFor({ state: "hidden" })

    const totalBillPrice = parseInt(
      (await this.totalBillPrice.innerText()).replace(/Rp|\.|,/g, "")
    );
    const totalShippingPrice = parseInt(
      (await this.totalShippingPrice.innerText()).replace(/Rp|\.|,/g, "")
    );
    const totalDiscount =
      parseInt((await this.totalDiscount.innerText()).replace(/Rp|\.|,/g, "")) *
      -1;
    const voucherDiscount =
      parseInt(
        (await this.voucherDiscount.innerText()).replace(/Rp|\.|,/g, "")
      ) * -1;
    const subTotalPrice = parseInt(
      (await this.subTotalPrice.innerText()).replace(/Rp|\.|,/g, "")
    );

    const sumTotalPrice =
      totalBillPrice + totalShippingPrice - totalDiscount - voucherDiscount;
    expect(subTotalPrice).toEqual(sumTotalPrice);

    // console.log(`
    //     Total Price Rp${totalBillPrice}
    //     Total Shipping Price Rp${totalShippingPrice}
    //     Total Discount -Rp${totalDiscount}
    //     Voucher Discount -Rp${voucherDiscount}
    //     =============================
    //     Sub Total Price Rp${sumTotalPrice}`
    // );

    // Store the value in localStorage
    await this.page.evaluate((price) => {
      localStorage.setItem("sumTotalPrice", price);
    }, sumTotalPrice);
  }

  async validatePaymentQRIS() {
    await expect(this.imageQRIS).toBeVisible();
  }

  async validatePaymentBCA() {
    await expect(this.validateVABCA).toBeVisible();
  }

  async validatePaymentMandiri() {
    await expect(this.validateVAMandiri).toBeVisible();
  }

  async validatePaymentBRI() {
    await expect(this.validateVABRI).toBeVisible();
  }

  async validatePaymentBNI() {
    await expect(this.validateVABNI).toBeVisible();
  }

  async validateSubTotalTYP() {
    await this.buttonOrderList.waitFor({ state: "visible" });

    // Retrieve the value from localStorage
    const sumTotalPrice = await this.page.evaluate(() => {
      return parseInt(localStorage.getItem("sumTotalPrice"));
    });

    const subTotalTYP = parseInt(
      (await this.subTotalTYP.innerText()).replace(/Rp|\.|,/g, "")
    );
    expect(subTotalTYP).toEqual(sumTotalPrice);

    // console.log(`
    //     Sub Total TYP Rp${subTotalTYP} === Sub Total Price Rp${sumTotalPrice}`)
  }

  async validatePaymentSuccess() {
    await this.buttonOrderList.waitFor({ state: "visible" });
    await this.validateSuccessPaid.waitFor({ state: "visible" });
  }

  async clickCartButton() {
    await this.buttonCart.click();
  }

  async clickRemoveAll() {
    await this.cartButtonRemoveAll.click();
    await this.ctaRemoveConfirmation.click();
  }

  async validateRemoveSuccess() {
    await expect(this.snackbarRemoveSuccess).toBeVisible();
  }

  async validateEmptyCart() {
    await expect(this.titleCartEmpty).toBeVisible();
  }
}
