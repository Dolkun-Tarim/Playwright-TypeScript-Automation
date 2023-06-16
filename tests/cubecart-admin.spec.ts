import { test} from '@playwright/test';
import { customerTestData } from './cubecart-testdata';
import { CustomerPage } from './pages/CustomerPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let customerPage: CustomerPage;

test.describe(`Cubecart admin test`,async()=>{
    test.beforeEach(async({page,browser})=>{
        loginPage=new LoginPage(page);
      await  loginPage.goToLoginPage();
       await loginPage.login('cubecart','cubecart');
    });
    test.afterEach(async({page})=>{
        dashboardPage=new DashboardPage(page);
       await dashboardPage.logout();
    });
    test(`Customer List link should display`,async({page})=>{
        dashboardPage=new DashboardPage(page);
    await dashboardPage.verifyCustomersLink();
    });
    test(`Verify orders link`,async({page})=>{
        dashboardPage=new DashboardPage(page);
     await dashboardPage.verifyOrdersLink();
    });
    customerTestData.forEach((customer:{status:boolean,title:string,firstname:string,lastname:string,customerType:string,email:string,phone:string}) => {
    
   test(`Add a new customer test ${customer.firstname} ${customer.email}`,async({page})=>
  {
    customerPage=new CustomerPage(page);
    await customerPage.addANewCustomer(
        customer.status,
        customer.title,
        customer.firstname,
        customer.lastname,
        customer.customerType,
        customer.email,
        customer.phone);
  });
    });

});
