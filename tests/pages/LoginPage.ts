import { expect, Locator, Page } from "@playwright/test";

export class LoginPage{
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page)
    {
        this.page=page;
        this.usernameInput=page.locator('#username');
        this.passwordInput=page.locator('#password');
        this.loginButton=page.locator('#login');
        this.logoutButton=page.locator('i.fa.fa-sign-out');
    }

async goToLoginPage()
{
    await this.page.goto('/cc6/admin_5xArPd.php');
}
async login(username:string, password: string)
{
    await this.usernameInput.fill(`${username}`);
    await this.passwordInput.fill(`${password}`);
    await this.loginButton.click();
}
async verifyLogoutIcon()
{
    await expect(this.logoutButton).toBeVisible({timeout: 10000});
}
async verifyLoginButton()
{
    await expect(this.loginButton).toBeVisible({timeout:10000});
}

}