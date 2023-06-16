# playwright-typescript-automation
This Playwright Typescript Automation repository has Playwright UI and API demo automation code for the Cubecart demo application and Petstore API
# how to use this Playwright Typescript code repository
1. You should have installed Nodejs on your PC. If you have not installed the Nodejs application, visit the website below to install. 
https://nodejs.org/en/download
2. in the terminal, type the command below to install all the dependencies.
<p>npm install </p>

# cubecart demo url 
https://www.cubecart.com/demo
You can find the cubecart demo admin page url on the link above. 
# Petstore API website
https://petstore.swagger.io/


# test cases
  - admin user should be able to add a new customer
  - admin user should see a customer link
  - User should be able to see the order link
  - example test for title verification
  - example test for get started link verification
  - example test for community link verification

# API test cases
  - admin user should be able to submit a new pet with a post request
  - admin user should be able to find pets with a get request
  - admin user should be able to update an existing pet with a put request
  - admin user should be able to delete a pet with a delete request
  
# to execute the Playwright UI and API framework
check out the code and run the command below. 
- npx playwright test --headed  (run the test with a browser mode)
- npx playwright test (run the test with a headless mode with 5 workers)
- npx playwright test --headed --workers 1 (run the test with a browser mode with 1 worker)
# execution result
**you can see the test execution report by typing the command below in the terminal**
<p> npx playwright show-report </p>

<p>Note: you should see 52 test cases </p>
