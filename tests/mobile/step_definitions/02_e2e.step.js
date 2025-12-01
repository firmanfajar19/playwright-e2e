import { createBdd } from "playwright-bdd";
import { E2ePage } from "../pages/02_e2e.page";
import test from "node:test";

const { Given, When, Then } = createBdd();

Given(
  "[Mobile] user already on PDP with product type book and ebook format",
  async ({ page }) => {
    const e2e = new E2ePage(page);
    await page.goto(process.env.EBOOK);
    await e2e.validateSkeletonPDP();
  }
);

Given(
  "[Mobile] user already on PDP with {string}",
  async ({ page }, product_type) => {
    const e2e = new E2ePage(page);
    switch (product_type) {
      case "BOOK":
        await page.goto(process.env.BOOK, { waitUntil: 'domcontentloaded', timeout: 60000 });
        break;
      case "NON BOOK":
        await page.goto(process.env.NONBOOK, { waitUntil: 'domcontentloaded', timeout: 60000 });
        break;

      default:
        break;
    }
    await e2e.validateSkeletonPDP();
  }
);

When("[Mobile] user validate product item on cart", async ({ page }) => {
  const e2e = new E2ePage(page);
  await e2e.clickCartButton();

  const recProd = e2e.recommendProductTitleCart;
  await recProd.waitFor({ state: "visible" });

  const shimmering = e2e.shimmeringCartItem;
  await shimmering.waitFor({ state: "hidden" });

  const isVisible = await e2e.cartButtonRemoveAll.isVisible();
  if (isVisible) {
    await e2e.clickRemoveAll();
  } else {
    test.skip("Cart is empty, skipping test.");
  }
});

Then("[Mobile] user user see no item on cart", async ({ page }) => {
  const e2e = new E2ePage(page);
  await e2e.validateEmptyCart();
});

When(
  "[Mobile] user select product type {string} at product detail page",
  async ({ page }, format_type) => {
    const e2e = new E2ePage(page);
    await e2e.clickAddToCart();
    switch (format_type) {
      case "SOFT COVER":
        await e2e.selectSoftCover();
        break;
      case "HARD COVER":
        await e2e.selectHardCover();
        break;
      case "POD":
        await e2e.selectPOD();
        break;
      case "VARIANT 1":
        await e2e.selectItemRow1();
        break;
      case "VARIANT 2":
        await e2e.selectItemRow2();
        break;

      default:
        break;
    }
  }
);

When("[Mobile] user select product type EBOOK page", async ({ page }) => {
  const e2e = new E2ePage(page);
  await e2e.clickAddToCart();
  await e2e.selectEbook();
});

When(
  "[Mobile] user click button add to cart at drawer product detail page",
  async ({ page }) => {
    const e2e = new E2ePage(page);
    await e2e.clickATCDrawer();
  }
);

When(
  "[Mobile] user click snackbar Cek Keranjang at product detail page",
  async ({ page }) => {
    const e2e = new E2ePage(page);
    await e2e.clickSnackbarCekCart();
  }
);

When("[Mobile] user click button checkout at cart page", async ({ page }) => {
  const e2e = new E2ePage(page);
  await e2e.clickCheckout();
});

When(
  "[Mobile] user select {string} and {string} as shipping method at checkout page",
  async ({ page }, shipping_method, courier_service) => {
    const e2e = new E2ePage(page);
    await e2e.selectShippingMethod();
    switch (shipping_method) {
      case "Ninja Xpress":
        await e2e.selectNinjaXpress();
        break;
      case "Ambil di Toko":
        await e2e.selectPickUpInStore();
        break;
      case "KGX":
        await e2e.selectKGX();
        break;
      case "Sicepat":
        await e2e.selectSicepat();
        break;
      case "JNE":
        await e2e.selectJNE();
        break;

      default:
        break;
    }
    switch (courier_service) {
      case "Gramedia Jakarta Matraman":
        await e2e.selectServicePIS();
        break;
      case "Next Day":
        await e2e.selectServiceNinjaNextDay();
        break;
      case "Same Day":
        await e2e.selectServiceNinjaSameDay();
        break;
      case "Regular (Std)":
        await e2e.selectServiceNinjaReguler();
        break;
      case "REG":
        await e2e.selectServiceKGXReg();
        break;
      case "Cargo (minimal 10Kg)":
        await e2e.selectServiceSicepatCargo();
        break;
      case "Besok Sampai Tujuan":
        await e2e.selectServiceSicepatBST();
        break;
      case "JTR":
        await e2e.selectServiceJNEJTR();
        break;
      case "YES":
        await e2e.selectServiceJNEYes();
        break;
      case "Regular":
        await e2e.selectServiceJNERegular();
        break;

      default:
        break;
    }
  }
);

When(
  "[Mobile] user click button lanjut pembayaran at checkout page",
  async ({ page }) => {
    const e2e = new E2ePage(page);
    await e2e.clickContinuePayment();
  }
);

When(
  "[Mobile] user select {string} as payment method at payment page",
  async ({ page }, payment_method) => {
    const e2e = new E2ePage(page);
    await e2e.selectPaymentMethod();
    switch (payment_method) {
      case "QRIS":
        await e2e.selectPaymentQRIS();
        break;
      case "BCA Virtual Account":
        await e2e.selectPaymentVABCA();
        break;
      case "Mandiri Virtual Account":
        await e2e.selectPaymentVAMandiri();
        break;
      case "BRI Virtual Account":
        await e2e.selectPaymentVABRI();
        break;
      case "BNI Virtual Account":
        await e2e.selectPaymentVABNI();
        break;
      case "Credit Card":
        await e2e.selectPaymentCC();
        await e2e.inputFormCC();
        break;

      default:
        break;
    }
    await e2e.applyPaymentMethod();
  }
);

When(
  "[Mobile] user select payment method VA BCA at checkout page",
  async ({ page }) => {
    const e2e = new E2ePage(page);
    await e2e.selectPaymentMethod();
    await e2e.selectPaymentVABCA();
    await e2e.applyPaymentMethod();
  }
);

When(
  "[Mobile] user input voucher code {string}",
  async ({ page }, voucher_code) => {
    const e2e = new E2ePage(page);
    await e2e.insertVoucher();
    switch (voucher_code) {
      case "Shipping Flat Amount":
        await e2e.voucherShipFlat();
        break;
      case "Shipping Percentage":
        await e2e.voucherShipPercent();
        break;
      case "Shipping Final Price":
        await e2e.voucherShipFlat();
        break;
      case "Cart Flat Amount":
        await e2e.voucherCartFlat();
        break;
      case "Cart Percentage":
        await e2e.voucherCartPercent();
        break;
      case "Cart Final Price":
        await e2e.voucherCartFinal();
        break;

      default:
        break;
    }
  }
);

When("[Mobile] user apply voucher", async ({ page }) => {
  const e2e = new E2ePage(page);
  await e2e.applyVoucher();
});

When("[Mobile] user see grand total at payment page", async ({ page }) => {
  const e2e = new E2ePage(page);
  await e2e.validateSubTotalPrice();
});

When("[Mobile] user click button bayar at payment page", async ({ page }) => {
  const e2e = new E2ePage(page);
  await e2e.clickPay();
});

When(
  "[Mobile] user click button bayar with {string} at payment page",
  async ({ page }, payment_method) => {
    const e2e = new E2ePage(page);
    await e2e.clickPay();
    if (payment_method === "Credit Card") {
      await e2e.inputOtpCC();
    }
  }
);

Then(
  "[Mobile] user success to checkout and redirect to thank you page with payment method VA BCA",
  async ({ page }) => {
    const e2e = new E2ePage(page);
    await e2e.validateSubTotalTYP();
  }
);

Then(
  "[Mobile] user success to checkout and redirect to thank you page with payment method {string}",
  async ({ page }, payment_method) => {
    const e2e = new E2ePage(page);
    switch (payment_method) {
      case "QRIS":
        await e2e.validateSubTotalTYP();
        await e2e.validatePaymentQRIS();
        break;
      case "BCA Virtual Account":
        await e2e.validateSubTotalTYP();
        await e2e.validatePaymentBCA();
        break;
      case "Mandiri Virtual Account":
        await e2e.validateSubTotalTYP();
        await e2e.validatePaymentMandiri();
        break;
      case "BNI Virtual Account":
        await e2e.validateSubTotalTYP();
        await e2e.validatePaymentBNI();
        break;
      case "BRI Virtual Account":
        await e2e.validateSubTotalTYP();
        await e2e.validatePaymentBRI();
        break;
      case "Credit Card":
        await e2e.validatePaymentSuccess();
        break;

      default:
        break;
    }
  }
);
