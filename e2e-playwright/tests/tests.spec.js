const { test, expect } = require("@playwright/test");

//run tests with: docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf

test("Main page has expected title and headings.", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Practice of learned content!");
    await expect(page.locator("h1")).toHaveText("Application for repeated practice of learned content");
  });
  
  
test("Can open the registeration form from the main page", async ({ page }) => {
    await page.goto("/");
    await page.locator(`a >> text='registering'`).click();
    await expect(page.locator("h1")).toHaveText("Registration form");
  });
  
test("Can access the log in form", async ({ page }) => {
    await page.goto("/");
    await page.locator(`a >> text='log in'`).click();
    await expect(page.locator("h1")).toHaveText("Login form");
  });

test("Can log in to the app as an admin ", async ({ page }) => {
    const email = "admin@admin.com"
    const pw = "123456"
    await page.goto("/");
    await page.locator(`a >> text='log in'`).click();
    await page.locator("input[type=email]").type(email);
    await page.locator("input[type=password]").type(pw);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator("h1")).toHaveText("Topics!");
  });

//The database creates a topic called "Finnish language" when using the command.
test("Can delete an empty topic", async ({ page }) => {
    const email = "admin@admin.com"
    const pw = "123456"
    await page.goto("/");
    await page.locator(`a >> text='log in'`).click();
    await page.locator("input[type=email]").type(email);
    await page.locator("input[type=password]").type(pw);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', {name: "Delete"}).click();
    await expect(page.locator("p")).toHaveText("None available.");
  });


//If there already is a topic called: Test topic this test will fail. Make sure to delete it.
test("Can add a topic to the application and open it by clicking the link that was created", async ({ page }) => {
    const email = "admin@admin.com"
    const pw = "123456"
    await page.goto("/");
    await page.locator(`a >> text='log in'`).click();
    await page.locator("input[type=email]").type(email);
    await page.locator("input[type=password]").type(pw);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator("input[type=text]").type("Test topic");
    await page.getByRole('button', { name: 'Add' }).click();
    await page.locator(`ul li a >> text="Test topic"`).click();
    await expect(page.locator("h1")).toHaveText("Topic: Test topic!");
  });
  
test("Can open a topic and add a question, can open the question.", async ({ page }) => {
    const email = "admin@admin.com"
    const pw = "123456"
    await page.goto("/");
    await page.locator(`a >> text='log in'`).click();
    await page.locator("input[type=email]").type(email);
    await page.locator("input[type=password]").type(pw);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.locator(`ul li a >> text="Test topic"`).click();
    await page.locator("input[type=text]").type("Test question");
    await page.getByRole('button', { name: 'Add' }).click();
    await page.locator(`ul li a >> text="Test question"`).click();
    await expect(page.locator("h1")).toHaveText("Test question");
  });  

test("Can open a question, and create an answer options that is true", async ({ page }) => {
    const email = "admin@admin.com"
    const pw = "123456"
    await page.goto("/");
    await page.locator(`a >> text='log in'`).click();
    await page.locator("input[type=email]").type(email);
    await page.locator("input[type=password]").type(pw);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator(`ul li a >> text="Test topic"`).click();
    await page.locator(`ul li a >> text="Test question"`).click();
    await page.locator("input[type=text]").type("This is true");
    await page.getByRole('checkbox').click();
    await page.getByRole('button', { name: 'Add' }).click();

    const optionLi = await page.locator(`li:has-text("This is true (true)")`);

    await expect(optionLi).toContainText("This is true (true)");
  });    

test("Can delete a topic that has questions and question answer options in it.", async ({ page }) => {
    const email = "admin@admin.com"
    const pw = "123456"
    await page.goto("/");
    await page.locator(`a >> text='log in'`).click();
    await page.locator("input[type=email]").type(email);
    await page.locator("input[type=password]").type(pw);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', {name: "Delete"}).click();
    await expect(page.locator("p")).toHaveText("None available.");

  });    

test("Can not access path /quiz if not logged in", async ({ page }) => {
    const email = "admin@admin.com"
    const pw = "123456"
    await page.goto("/quiz");
    await expect(page.locator("h1")).toHaveText("Login form");
  });    