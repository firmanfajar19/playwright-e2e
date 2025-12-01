import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { LoginPage } from "../pages/01_login.page";

const { Given, When, Then } = createBdd();


Given("[Desktop] user already access website gramedia.com",
  async ({page}) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  }
);

When("[Desktop] user already on gramedia.com homepage", async ({ page }) => {
  await expect(page).toHaveURL(new RegExp(".*gramedia.com.*"));
});

When("[Desktop] user click button masuk at homepage", async ({ page }) => {
  const homePage = new LoginPage(page);
  await homePage.clickLoginHome();
});

Then("[Desktop] shown login page gramedia.com", async ({ page }) => {
  await expect(page).toHaveURL(new RegExp(".*gramedia.com/login.*"));
});

When("[Desktop] user input email {string} in field email", 
  async ({page}, email) => {
  const loginPage = new LoginPage(page);
  switch (email) {
    case "REGISTERED_EMAIL":
      email = process.env.REGISTERED_EMAIL_WEB;
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

When("[Desktop] user input password {string} in field password",
  async ({page}, password) => {
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

When("[Desktop] user click button login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickLogin();
});

Then("[Desktop] user success to login and redirect to homepage", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.validateLoginSuccess();
  await expect(page).toHaveURL(process.env.BASE_URL);
});

Then("[Desktop] user failed to login and shown validation {string} at login page",
  async ({page}, validation) => {
    const loginPage = new LoginPage(page);
    switch (validation) {
      case "INVALID_CREDENTIALS":
        await loginPage.validateInvalidCredentials();
        break;
      case "INVALID_FORMAT_EMAIL":
        await loginPage.validateInvalidFormatEmail();
        break;

      default:
        break;
    }
  }
);

When("[Desktop] user click CTA Ok on snackbar success login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickSnackbarAction();
});

Then("[Desktop] user success to close snackbar success login",
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.validateSnackbarClose();
  }
);

When("[Desktop] user wait {int} seconds to close snackbar login",
  async ({page}, seconds) => {
    const loginPage = new LoginPage(page);
    const milliseconds = seconds * 1000;
    await page.waitForTimeout(milliseconds);
    await expect(loginPage.snackbarDescription).toBeHidden();
  }
);

When("[Desktop] user click icon show password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickShowPassword();
});

Then("[Desktop] user see password text showing", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await expect(loginPage.iconHidePassword).toBeVisible();
});

Then("[Desktop] user see password text hidden", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await expect(loginPage.iconShowPassword).toBeVisible();
});

When("[Desktop] user click icon show password twice", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickShowPassword();
  await loginPage.clickHidePassword();
});

When("[Desktop] user click link {string} at login page",
  async ({ page }, pages) => {
    const loginPage = new LoginPage(page);
    switch (pages) {
      case "FORGOT_PASSWORD":
        await loginPage.clickForgotPassword();
        break;
      case "REGISTER":
        await loginPage.clickRegister();
        break;
    }
  }
);

When("[Desktop] user click icon {string} at login page",
  async ({ page }, sosmed) => {
    const loginPage = new LoginPage(page);
    switch (sosmed) {
      case "FACEBOOK":
        await loginPage.clickFacebook();
        break;
      case "TWITTER":
        await loginPage.clickTwitter();
        break;
      case "INSTAGRAM":
        await loginPage.clickInstagram();
        break;
    }
  }
);

Then("[Desktop] user redirect to {string} page", async ({ page }, pages) => {
  switch (pages) {
    case "FORGOT_PASSWORD":
      await expect(page).toHaveURL(process.env.FORGOT_PASSWORD_URL);
      break;
    case "REGISTER":
      await expect(page).toHaveURL(process.env.REGISTER_URL);
      break;
  }
});


Then("[Desktop] user redirect to official page {string}",
  async ({ page }, sosmed) => {
    const pagePromise = page.waitForEvent("popup");
    const newTab = await pagePromise;
    await newTab.waitForLoadState();
    switch (sosmed) {
      case "FACEBOOK":
        await expect(newTab).toHaveURL(new RegExp(process.env.FACEBOOK));
        break;
      case "TWITTER":
        await expect(newTab).toHaveURL(new RegExp(process.env.X));
        break;
      case "INSTAGRAM":
        await expect(newTab).toHaveURL(new RegExp(process.env.INSTAGRAM));
        break;
    }
  }
);

When("[Desktop] user click section My Account on header at homepage",
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.clickAccountDropdownTrigger();
  }
);

When("[Desktop] user click CTA Keluar Akun on pop up My Account",
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.clickLogoutButtonHome();
  }
);

Then("[Desktop] user will see CTA Keluar Akun on pop up My Account",
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.navbarAccountDropdownContainer).toBeVisible();
  }
);

Then("[Desktop] user success to logout", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await expect(loginPage.loginButtonHome).toBeVisible();
});

Then("[Desktop] user will be redirect to gramedia.com homepage with guest state",
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.navbarAccountDropdownTrigger).not.toBeVisible();
  }
);

Then("[Desktop] shown snackbar Sesi anda telah berakhir", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.validateSnackbarLogoutSuccess()
});