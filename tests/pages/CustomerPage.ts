import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";

export class CustomerPage{
    readonly page: Page;
    readonly customersListLink: Locator;
    readonly addCustomerLink: Locator;
    readonly statusCheckbox: Locator;
    readonly titleInput: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly typeDropdown: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly saveButton: Locator;
    readonly successMessage:Locator;

    constructor(page: Page)
    {
        this.page=page;
        this.addCustomerLink=page.getByRole('link',{name:'Add Customer',exact:true});
        this.customersListLink=page.getByRole('link',{name:'Customer List',exact:true});
        this.statusCheckbox=page.locator('xpath=//img[@rel="#customer_status"]');
        this.titleInput=page.locator('#cust-title');
        this.firstNameInput=page.locator('#cust-firstname');
        this.lastNameInput=page.locator('#cust-lastname');
        this.typeDropdown=page.locator('#cust-type');
        this.emailInput=page.locator('#cust-email');
        this.phoneInput=page.locator('#cust-phone');
        this.saveButton=page.locator('xpath=//input[@value="Save"]');
        this.successMessage=page.locator('div.success');


    }

async verifyAddCustomerLink()
{
    await expect(this.addCustomerLink).toBeVisible({timeout: 10000});
}

async verifyCustomersLink()
{
    await expect(this.customersListLink).toBeVisible({timeout: 10000});
}

async addANewCustomer(status:boolean,title:string,firstname:string, lastname:string,customerType:string,email:string,phone:string)
{
    await this.customersListLink.click({timeout:10000});
    await this.addCustomerLink.click({timeout:10000});
    if(status)
    {
       await this.statusCheckbox.click();
    }
 await this.titleInput.fill(`${title}`);
 await this.firstNameInput.fill(`${firstname}`);
 await this.lastNameInput.focus();
 await this.lastNameInput.fill(`${lastname}`);
 console.log(`customer type: ${customerType}`)
 await this.typeDropdown.selectOption({label:`${customerType}`},{timeout:10000});
 let milliseconds = new Date().getTime();
 await this.emailInput.fill(`cube${milliseconds}${email}`);
 await this.phoneInput.fill(`${phone}`);
 await this.saveButton.click();
 await expect(this.successMessage).toBeVisible({timeout:10000});
 await expect(this.successMessage).toContainText('Customer successfully added');
}
}