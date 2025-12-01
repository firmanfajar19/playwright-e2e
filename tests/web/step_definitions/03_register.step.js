import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";
import { RegisterPage } from "../pages/03_register.page";
import { LoginPage } from "../pages/01_login.page";

const { Given, When, Then } = createBdd();

When("[Desktop] user click button daftar at homepage", async ({ page }) => {
  const register = new RegisterPage(page);
  await register.clickRegisterButtonHome();
});

When("[Desktop] user already on register page", async ({ page }) => {
  const register = new RegisterPage(page);
  await expect(page).toHaveURL(new RegExp(".*register.*"));
});

When("[Desktop] user input email {string} in field email at register page",
  async ({ page }, email) => {
    const register = new RegisterPage(page);
    switch (email) {
      case "UNREGISTERED_EMAIL":
        await register.inputValidEmail();
        break;
      case "REGISTERED_EMAIL":
        await register.inputRegisteredEmail();
        break;
      case "INVALID_FORMAT_EMAIL":
        await register.inputInvalidEmail();
        break;

      default:
        break;
    }
  }
);


When("[Desktop] user input name {string} in field name at register page",
  async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.inputFullname();
  }
);

When("[Desktop] user input password {string} in field password at register page",
  async ({ page }, passwordType) => {
    const registerPage = new RegisterPage(page);
    if (passwordType === "PASSWORD") {
      await registerPage.inputValidPassword();
    } else {
      await registerPage.inputPassword(passwordType);
    }
  }
);

When("[Desktop] user input confirmation password {string} in field confirmation password at register page",
  async ({ page }, password) => {
    const registerPage = new RegisterPage(page);
    switch (password) {
      case "MATCH_PASSWORD":
        await registerPage.inputValidConfirmationPassword();
        break;
      case "NOT_MATCH_PASSWORD":
        await registerPage.inputInvalidConfirmationPassword();
        break;

      default:
        break;
    }
  }
);

When("[Desktop] user check terms and conditions at register page",
  async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.clickCheckboxTerms();
  }
);


When("[Desktop] user click button daftar at register page",
  async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.submitRegisterPage();
  }
);

When("[Desktop] user click Nanti Saja link on Personal Data page",
  async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.clickNantiSajaLink();
  }
);

Then("[Desktop] user validate all field was inputted at register page with detail:",
  async ({ page }, page_content) => {
    const registerPage = new RegisterPage(page);
    const contentArray = page_content.rows().map((row) => row[0]);
    for (const content of contentArray) {
      switch (content) {
        case "UNREGISTERED_EMAIL":
          await registerPage.validateEmail();
          break;
        case "FULL_NAME":
          await registerPage.validateFullname();
          break;
        case "PASSWORD":
          await registerPage.ValidatePassword();
          break;

        default:
          break;
      }
    }
  }
);

Then("[Desktop] user success to register and redirect to gramedia.com homepage with login state",
  async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.closePopupAddress();
    await expect(page).toHaveURL(process.env.BASE_URL);
  }
);

Then("[Desktop] shown snackbar {string}", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.validateLoginSuccess();
});

Then("[Desktop] user will see snackbar {string} at register page",
  async ({ page }, message) => {
    const registerPage = new RegisterPage(page);
    switch (message) {
      case "INVALID_CREDENTIALS":
        await registerPage.validateInvalidCreds();
        break;
      case "EMAIL_ALREADY_REGISTERED":
        await registerPage.validateEmailAlreadyRegistered();
        break;
      case "INVALID_FORMAT_EMAIL":
        await registerPage.validateInvalidFormatEmail();
        break;

      default:
        break;
    }
  }
);

Then("[Desktop] user see text validate password with colour {string}, {string}, {string}",
  async ({ page }, minChar, capLetter, numSymbol) => {
    const registerPage = new RegisterPage(page);
    switch (minChar) {
      case "NEUTRAL":
        await expect(registerPage.textColourMinCharNeutral).toBeVisible();
        break;
      case "GREEN":
        await expect(registerPage.textColourMinCharGreen).toBeVisible();
        break;
      case "RED":
        await expect(registerPage.textColourMinCharRed).toBeVisible();
        break;
      default:
        break;
    }
    switch (capLetter) {
      case "NEUTRAL":
        await expect(registerPage.textColourCapLetterNeutral).toBeVisible();
        break;
      case "GREEN":
        await expect(registerPage.textColourCapLetterGreen).toBeVisible();
        break;
      case "RED":
        await expect(registerPage.textColourCapLetterRed).toBeVisible();
        break;
      default:
        break;
    }
    switch (numSymbol) {
      case "NEUTRAL":
        await expect(registerPage.textColourNumSymbolNeutral).toBeVisible();
        break;
      case "GREEN":
        await expect(registerPage.textColourNumSymbolGreen).toBeVisible();
        break;
      case "RED":
        await expect(registerPage.textColourNumSymbolRed).toBeVisible();
        break;

      default:
        break;
    }
  }
);

Then("[Desktop] user see button daftar disabled",
  async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await expect(registerPage.registerBtnDisable).toBeDisabled();
  }
);