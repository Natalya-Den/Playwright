import { test, expect } from '@playwright/test';
import { email, password} from '../user.js';
import { describe } from 'node:test';

test.describe ('Autorization on the site netologu.ru', () => {

  test.beforeEach (async ({ page }) => {
    await page.goto ('https://netology.ru/');
    await page.click ('.styles_loginLink__gCSBh.styles_login__X_ArT');
  });

  test('Successful authorization', async ({ page }) => {
    await page.fill ("input[placeholder='Email']", email);
    await page.fill ("input[placeholder='Пароль']", password);
    await page.locator("[data-testid='login-submit-btn']").click();

    await expect(page.locator (".src-components-pages-Profile-Programs--title--Kw5NH")).toContainText("Моё обучение");
  });

  test('Unsuccessful authorization', async ({ page }) => {
    await page.fill ("input[placeholder='Email']", 'sidorov@mail.ru');
    await page.fill ("input[placeholder='Пароль']", 'password');
    await page.locator ("[data-testid='login-submit-btn']").click();

    await expect (page.locator("[data-testid='login-error-hint']")).toContainText("Вы ввели неправильно логин или пароль.");
  });

});