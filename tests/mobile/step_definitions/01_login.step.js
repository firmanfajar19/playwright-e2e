import { createBdd } from "playwright-bdd";
import { LoginPage } from "../pages/01_login.page";
import { expect } from "@playwright/test";

const { Given, When, Then } = createBdd();

Given("[Mobile] user already access website gramedia.com",
  async ({page}) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  }
);

When("[Mobile] user already on gramedia.com homepage", async ({ page }) => {
  await expect(page).toHaveURL(new RegExp(".*gramedia.com.*"));
});

When("[Mobile] user click account on bottom navbar", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickNavbarAccount();
});

When(
  "[Mobile] user input email {string} in field email",
  async ({ page }, email) => {
    const loginPage = new LoginPage(page);
    switch (email) {
      case "REGISTERED_EMAIL_MOBILE":
        email = process.env.REGISTERED_EMAIL_MOBILE;
        break;
      case "UNREGISTERED_EMAIL":
        email = process.env.UNREGISTERED_EMAIL;
        break;
      case "INVALID_FORMAT_EMAIL":
        email = process.env.INVALID_FORMAT_EMAIL;
        break;
  
      default:
        break;
    }
    await loginPage.inputEmail(email);
  });

When(
  "[Mobile] user input password {string} in field password",
  async ({ page }, password) => {
    const loginPage = new LoginPage(page);
    switch (password) {
      case "REGISTERED_PASSWORD":
        password = process.env.REGISTERED_PASSWORD;
        break;
      case "UNREGISTERED_PASSWORD":
        password = process.env.UNREGISTERED_PASSWORD;
        break;
        
      default:
        break;
    }
    await loginPage.inputPassword(password);
  }
);

When(
  "[Mobile] user click CTA Ok on snackbar success login",
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.clickSnackbarAction();
  }
);

When("[Mobile] user already on login page gramedia", async ({ page }) => {
  await expect(page).toHaveURL(new RegExp(".*gramedia.com/login.*"));
});

When("[Mobile] user click button login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickLoginButton();
});

When("[Mobile] user click icon show password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickShowPassword();
});

When("[Mobile] user click icon show password twice", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickShowPassword();
  await loginPage.clickHidePassword();
});

When(
  "[Mobile] user wait {int} seconds to close snackbar login",
  async ({ page }, seconds) => {
    const loginPage = new LoginPage(page);
    const milliseconds = seconds * 1000;
    await page.waitForTimeout(milliseconds);
    await expect(loginPage.snackbarDescription).toBeHidden();
  }
);

When(
  "[Mobile] user click link {string} at login page",
  async ({ page }, pageType) => {
    const loginPage = new LoginPage(page);
    switch (pageType) {
      case "FORGOT_PASSWORD":
        await loginPage.clickForgotPassword();
        break;
      case "REGISTER":
        await loginPage.clickRegister();
        break;
    }
  }
);

When('[Mobile] user click logout on My account page',
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.clickLogoutMyAccount();
  }
)

Then(
  "[Mobile] user success to login and redirect to homepage",
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.validateLoginSuccess();
  }
);

Then(
  "[Mobile] user failed to login and shown validation {string} at login page",
  async ({ page }, validation) => {
    const loginPage = new LoginPage(page);
    switch (validation) {
      case "INVALID_CREDENTIALS":
        await loginPage.validateInvalidCredentials();
        break;
      case "INVALID_FORMAT_EMAIL":
        await loginPage.validateInvalidFormatEmail();
        break;
    }
  }
);

Then(
  "[Mobile] user success to close snackbar success login",
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.validateSnackbarClose();
  }
);

Then("[Mobile] user see password text showing", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.validateShowPassword();
});

Then("[Mobile] user see password text hidden", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.validateHidePassword();
});

Then("[Mobile] user redirect to {string} page", async ({ page }, pageType) => {
  const login = new LoginPage(page);
  switch (pageType) {
    case "FORGOT_PASSWORD":
      await expect(page).toHaveURL(process.env.FORGOT_PASSWORD_URL);
      break;
    case "REGISTER":
      await expect(page).toHaveURL(process.env.REGISTER_URL);
      break;
  }
});

Then('[Mobile] user success to logout and shown snackbar {string}',
  async ({ page } ) => {
    const login = new LoginPage(page);
    await login.validateLogoutSuccess();
  }
);