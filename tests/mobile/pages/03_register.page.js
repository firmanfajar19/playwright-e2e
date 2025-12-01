import { expect } from "@playwright/test";

export class RegisterPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.btnRegisterHome = page.getByTestId("navbarRegister");
    this.fieldEmail = page.locator('input[name="email"]');
    this.fieldFullname = page.locator('input[name="fullname"]');
    this.fieldPassword = page.locator('input[name="password"]');
    this.fiedlConfirmationPassword = page.locator('input[name="confirmationPassword"]');
    this.checkboxTerms = page.getByRole("checkbox");
    this.btnAccProfile = page.getByTestId("navbarAccountTrigger");
    this.btnAccountEnable = page.getByTestId("registerButtonEnabled");
    this.btnAccountDisable = page.getByTestId("registerButtonDisabled");
    this.snackbarLoginSuccess = page.getByTestId("snackbarSuccessAuth");
    this.snackbarDescription = page.getByTestId("snackbarDescription");
    this.snackbarRegisterError = page.getByTestId("errorRegisterSnackbar");
    this.nantiSajaLink = page.getByRole('link', { name: 'Nanti Saja' });
    this.closePopupAdress = page.locator('.cursor-pointer > path')

    this.textColourMinCharGreen = page.getByTestId("minCharSuccess");
    this.textColourMinCharRed = page.getByTestId("minCharError");
    this.textColourMinCharNeutral = page.getByTestId("minCharNeutral");
    this.textColourCapLetterGreen = page.getByTestId("withValidLetterSuccess");
    this.textColourCapLetterRed = page.getByTestId("withValidLetterError");
    this.textColourCapLetterNeutral = page.getByTestId("withValidLetterNeutral");
    this.textColourNumSymbolGreen = page.getByTestId("withNumberSymbolSuccess");
    this.textColourNumSymbolRed = page.getByTestId("withNumberSymbolError");
    this.textColourNumSymbolNeutral = page.getByTestId("withNumberSymbolNeutral");
  }

  async validateRegisterPage() {
    await expect(this.fieldEmail).toBeVisible();
    await expect(this.fieldFullname).toBeVisible();
    await expect(this.fieldPassword).toBeVisible();
    await expect(this.fiedlConfirmationPassword).toBeVisible();
  }

  async validatesnackbarRegisterSuccess() {
    await expect(this.snackbarLoginSuccess).toBeVisible();
    await expect(this.snackbarDescription).toHaveText(
      `Selamat datang, ${process.env.FIRST_NAME}!`
    );
  }

  async validateRegisterSuccess() {
    await expect(this.btnAccProfile).toBeVisible();
  }

  async validateBtnAccDisabled() {
    await expect(this.btnAccountDisable).toBeDisabled();
  }

  async clickRegisterButtonHome() {
    await this.btnRegisterHome.click();
  }

  async inputRegisteredEmail() {
    await this.fieldEmail.fill(process.env.REGISTERED_EMAIL_MOBILE);
  }

  async inputInvalidEmail() {
    await this.fieldEmail.fill(process.env.EMAIL_INVALID);
  }

  async inputValidEmail() {
    const timestamp = Date.now();
    const emailBase = process.env.EMAIL_BASE.split("@")[0];
    const emailDomain = process.env.EMAIL_DOMAIN.split("@")[1];
    const email = `${emailBase}${timestamp}@${emailDomain}`;
    await this.fieldEmail.fill(email);
    await this.page.evaluate((email) => {
      localStorage.setItem("email", email);
    }, email);
  }

  async inputFullname() {
    await this.fieldFullname.fill(process.env.FULL_NAME);
    const fullname = await this.fieldFullname.inputValue();
    await this.page.evaluate((fullname) => {
      localStorage.setItem("fullname", fullname);
    }, fullname);
  }

  async inputValidPassword() {
    await this.fieldPassword.fill(process.env.REGISTERED_PASSWORD);
    const password = await this.fieldPassword.inputValue();
    await this.page.evaluate((password) => {
      localStorage.setItem("password", password);
    }, password);
  }

  async inputPassword(passwordType) {
    await this.fieldPassword.fill(passwordType);
  }

  async inputValidConfirmationPassword() {
    await this.fiedlConfirmationPassword.fill(process.env.REGISTERED_PASSWORD);
  }

  async inputInvalidConfirmationPassword() {
    await this.fiedlConfirmationPassword.fill(process.env.PASSWORD_INVALID);
  }

  async clickCheckboxTerms() {
    await this.checkboxTerms.check();
  }

  async clickSubmitRegisterPage() {
    await this.btnAccountEnable.click();
  }

  async validateEmail() {
    const email = await this.page.evaluate(() => {
      return localStorage.getItem("email");
    });
    const emailValue = await this.fieldEmail.inputValue();
    expect(emailValue).toEqual(email);
  }

  async validateFullname() {
    const fullname = await this.page.evaluate(() => {
      return localStorage.getItem("fullname");
    });
    const fullnameValue = await this.fieldFullname.inputValue();
    expect(fullnameValue).toEqual(fullname);
  }

  async ValidatePassword() {
    const password = await this.page.evaluate(() => {
      return localStorage.getItem("password");
    });
    const passwordValue = await this.fieldPassword.inputValue();
    expect(passwordValue).toEqual(password);
  }

  async validateInvalidCreds() {
    await expect(this.snackbarRegisterError).toBeVisible();
    const message = await this.snackbarDescription.innerText();
    await expect(message).toEqual(process.env.INVALID_PASSWORD);
  }

  async validateEmailAlreadyRegistered() {
    await expect(this.snackbarRegisterError).toBeVisible()
    const message = await this.snackbarDescription.innerText();
    await expect(message).toEqual(process.env.EMAIL_ALREADY_REGISTERED);
  }

  async validateInvalidFormatEmail() {
    await expect(this.snackbarRegisterError).toBeVisible();
    const message = await this.snackbarDescription.innerText();
    await expect(message).toEqual(process.env.INVALID_FORMAT_EMAIL);
  }

  async clickNantiSajaLink() {
    await this.nantiSajaLink.click();
  }

  async closePopupAddress() {
    await this.closePopupAdress.click();
  } 
  
}
