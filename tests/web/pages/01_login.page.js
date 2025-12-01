import { expect } from '@playwright/test';

export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.fieldEmail = page.locator('input[name="email"]');
    this.fieldPassword = page.locator('input[name="password"]');
    this.forgotPassword = page.getByTestId("forgotPasswordLink");
    this.register = page.getByTestId("registerLink");
    this.loginButtonHome = page.getByTestId("navbarLogin");
    this.loginButton = page.getByTestId("loginButton");
    this.snackbarLoginSuccess = page.getByTestId("snackbarSuccessAuth");
    this.snackbarLoginError = page.getByTestId("errorLoginSnackbar");
    this.snackbarLoginInvalidFormat = page.getByTestId("errorRegisterSnackbar");
    this.snackbarDescription = page.getByTestId("snackbarDescription");
    this.snackbarAction = page.getByTestId("snackbarAction");
    this.iconShowPassword = page.getByTestId("showTextIcon");
    this.iconHidePassword = page.getByTestId("hideTextIcon");
    this.iconFacebook = page.getByTestId("footerSocial#0");
    this.iconTwitter = page.getByTestId("footerSocial#1");
    this.iconInstagram = page.getByTestId("footerSocial#2");
    this.navbarAccountDropdownTrigger = page.getByTestId("navbarAccountTrigger");
    this.navbarAccountDropdownContainer = page.getByTestId("navbarAccountMenu");
    this.LogoutButton = page.getByTestId("accountMenuLogout");
  }

  async clickLoginHome() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.loginButtonHome.waitFor({ state: "visible" });
    await this.loginButtonHome.click();
  }
  async inputEmail(email) {
    await this.fieldEmail.fill(email);
  }

  async inputPassword(password) {
    await this.fieldPassword.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async validateLoginSuccess() {
    await this.snackbarLoginSuccess.waitFor({ state: "visible" });
    await this.snackbarDescription.waitFor({ state: "visible" });
    const message = await this.snackbarDescription.innerText();
    const validateMessage = (`Selamat datang, ${process.env.FIRST_NAME}!`);
    await expect(message).toEqual(validateMessage);
  }

  async validateInvalidCredentials() {
    await this.snackbarLoginError.waitFor({ state: "visible" });
    await this.snackbarDescription.waitFor({ state: "visible" });
    const message = await this.snackbarDescription.innerText();
    const validateMessage = (`${process.env.INVALID_CREDENTIALS}`);
    await expect(message).toEqual(validateMessage);
  }

  async validateInvalidFormatEmail() {
    await this.snackbarLoginInvalidFormat.waitFor({ state: "visible" });
    await this.snackbarDescription.waitFor({ state: "visible" });
    const message = await this.snackbarDescription.innerText();
    const validateMessage = (`${process.env.INVALID_FORMAT_EMAIL}`);
    await expect(message).toEqual(validateMessage);
  }

  async clickSnackbarAction() {
    await this.snackbarAction.click();
  }

  async validateSnackbarClose() {
    await this.snackbarLoginSuccess.waitFor({ state: "hidden" });
    await expect(this.snackbarLoginSuccess).not.toBeVisible();
  }

  async clickShowPassword() {
    await this.iconShowPassword.click();
  }

  async clickHidePassword() {
    await this.iconHidePassword.click();
  }
  
  async clickForgotPassword() {
    await this.forgotPassword.click();
  }

  async clickRegister() {
    await this.register.click();
  }

  async clickFacebook() {
    await this.iconFacebook.click();
  }

  async clickTwitter() {
    await this.iconTwitter.click();
  }

  async clickInstagram() {
    await this.iconInstagram.click();
  }


  async clickAccountDropdownTrigger() {
    await this.navbarAccountDropdownTrigger.click();
  }

  async clickLogoutButtonHome() {
    await this.LogoutButton.click();
  }

  async validateSnackbarLogoutSuccess() {
    const message = await this.snackbarDescription.innerText();
    await expect(message).toEqual(process.env.LOGOUT_SUCCESS);
  }

}
