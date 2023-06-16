import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";

export class DashboardPage{
    private _DASHBOARD_URL='https://demo.cubecart.com/cc6/admin_5xArPd.php';
    readonly page: Page;
    readonly ordersLink: Locator;
    readonly customersListLink: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page)
    {
        this.page=page;
        this.ordersLink=page.getByRole('link',{name:'Orders',exact:true});
        this.customersListLink=page.getByRole('link',{name:'Customer List',exact:true});
        this.logoutButton=page.locator('i.fa.fa-sign-out');
    }

async goToDashboardPage()
{
    await this.page.goto(this._DASHBOARD_URL);
}

async verifyOrdersLink()
{
    await expect(this.ordersLink).toBeVisible({timeout: 60000});
}

async verifyCustomersLink()
{
    await expect(this.customersListLink).toBeVisible({timeout: 60000});
}

async logout()
{
    await this.logoutButton.click();
    let loginPage=new LoginPage(this.page)
   await loginPage.verifyLoginButton();
}

}