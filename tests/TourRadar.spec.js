import { test, expect, KeyboardEvent } from '@playwright/test';

test('Registeration', async ({ page }) => {
    await page.goto('https://www.tourradar.com/d/europe');

    await page.getByRole('listitem').filter({ hasText: 'My Account' }).locator('div').first().click();
    await page.getByRole('banner').getByText('Traveller').click();
    await page.getByRole('link', { name: 'Sign Up', exact: true }).click();
    await expect (page).toHaveURL("https://www.tourradar.com/registration")

    await page.getByText('Traveller', { exact: true }).click();
    await page.getByPlaceholder('Full name').fill('ABC');
    await page.getByPlaceholder('Enter your email').fill('xyz123457@gmail.com');
    await page.getByPlaceholder('Enter password').fill('1234567890');
    await page.getByPlaceholder('Repeat password').fill('1234567890');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.waitForTimeout(2000)

});

test('Valid Login', async ({ page }) => {
    await page.goto('https://www.tourradar.com/d/europe');
    await page.getByRole('listitem').filter({ hasText: 'My Account' }).locator('div').first().click();
    await page.getByRole('link', { name: 'Log In', exact: true }).click();
    await expect (page).toHaveURL("https://www.tourradar.com/login")

    await page.waitForSelector('form');
    await page.getByRole('textbox', { name: 'Username' }).fill('xyz123457@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('1234567890');
    await page.getByRole('link', { name: 'Log In' }).click();

    await page.waitForNavigation();

    await expect (page).toHaveURL("https://www.tourradar.com/d/europe")


    // Verify if login was successful
    // const loggedInUserName = await page.innerText('.user-dropdown__label');
    // console.log(`Logged in as: ${loggedInUserName}`);
});

test('Invalid Login', async ({ page }) => {
    await page.goto('https://www.tourradar.com/d/europe');
    await page.getByRole('listitem').filter({ hasText: 'My Account' }).locator('div').first().click();
    await page.getByRole('link', { name: 'Log In', exact: true }).click();
    await expect (page).toHaveURL("https://www.tourradar.com/login")

    await page.waitForSelector('form');
    await page.getByRole('textbox', { name: 'Username' }).fill('xyz123457@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456789');
    await page.getByRole('link', { name: 'Log In' }).click();
    
    await expect (page.locator('#message-sign-in')).toBeVisible();
});

test('ForgotPassword', async ({ page }) => {
    await page.goto('https://www.tourradar.com/d/europe');
    await page.getByRole('listitem').filter({ hasText: 'My Account' }).locator('div').first().click();
    await page.getByRole('link', { name: 'Log In', exact: true }).click();
    await expect (page).toHaveURL("https://www.tourradar.com/login")

    await page.waitForSelector('form');
    await page.getByRole('link', { name: 'Forgot your password?'}).click();
    await expect (page).toHaveURL("https://www.tourradar.com/reset-password")
    await page.getByPlaceholder("Enter your email").fill('xyz123457@gmail.com');
    await page.getByRole('link', { name: 'Submit' }).click();
    
    await expect (page.getByRole('heading', { name: 'Please, check your email' })).toBeVisible();
});

test('Update User Profile', async ({ page }) => {
    await page.goto('https://www.tourradar.com/d/europe');
    await page.getByRole('listitem').filter({ hasText: 'My Account' }).locator('div').first().click();
    await page.getByRole('link', { name: 'Log In', exact: true }).click();
    await expect (page).toHaveURL("https://www.tourradar.com/login")

    await page.waitForSelector('form');
    await page.getByRole('textbox', { name: 'Username' }).fill('xyz123457@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('1234567890');
    await page.getByRole('link', { name: 'Log In' }).click();

    await page.waitForNavigation();

    await expect (page).toHaveURL("https://www.tourradar.com/d/europe")

    const phoneNumber='9876543210'

    await page.getByRole('listitem').locator(`a[href="/account"] span[class='initials']`).hover();
    await page.getByRole('link', { name: 'Account Settings', exact: true }).click();
    await page.getByLabel('Phone Number').fill(phoneNumber);
    await page.locator('section').filter({ hasText: 'Personal details'}).getByRole('button', { name: 'Save changes' }).click();

    await expect (await page.getByText('Settings saved successfully')).toBeVisible();
  
});

test('Test Search Filter and Sort', async ({ page }) => {
    await page.goto('https://www.tourradar.com/d/europe');
    const city='Paris'
    
    await page.getByRole('textbox', { name: 'Where do you want to go?' }).type(city, {delay: 100});
    await page.waitForTimeout(2000);
    await page.getByRole('textbox', { name: 'Where do you want to go?' }).press('Enter');
    await expect (page).toHaveURL('https://www.tourradar.com/d/'+city.toLowerCase());

    
    const sortOption= 'prasc'

    await page.waitForTimeout(1000);

    const sortBy = page.getByRole('combobox', { name: 'Sort by filter' })
    await sortBy.click();
    await sortBy.selectOption(sortOption);

    await page.locator("label[for='checkbox-dep-date-june-2023']").click();


    await page.waitForTimeout(3000);
    await expect (page.url()).toContain("june-2023");
    await expect (page.url()).toContain("sort=" + sortOption);

});



