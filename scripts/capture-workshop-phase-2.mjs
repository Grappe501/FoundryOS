import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'docs/talent-foundry/software-company/review/phase-2');
const URL = process.env.WORKSHOP_URL ?? 'https://deploy-preview-5--foundry-os.netlify.app/workshop';

mkdirSync(OUT, { recursive: true });

async function hide(page) {
  await page.evaluate(() => {
    document.querySelectorAll('[data-netlify-deploy-id], iframe[title="Netlify Drawer"]').forEach((el) => el.remove());
  });
}

async function shot(page, name) {
  await hide(page);
  const path = join(OUT, `${name}.png`);
  await page.screenshot({ path, fullPage: false });
  console.log(path);
}

async function toLinger(page) {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('.ws-room');
  await hide(page);
  await page.waitForSelector('.ws-threshold', { timeout: 16000 });
  await page.locator('.ws-threshold').click({ force: true });
  await page.waitForSelector('.ws-fragment[data-presence="focus"]');
  await page.locator('.ws-region[data-region="primary"]').click({ force: true });
  await page.waitForSelector('#ws-notice', { timeout: 10000 });
  await page.fill('#ws-notice', 'Delete is the thing you would press.');
  await page.fill('#ws-change', 'Make start the primary.');
  await page.locator('.ws-threshold').click({ force: true });
  await page.waitForSelector('.ws-echo');
  await page.locator('.ws-threshold').click({ force: true });
  await page.waitForSelector('.ws-choice');
  await page.getByRole('button', { name: 'Save a copy, then continue' }).click({ force: true });
  await page.waitForSelector('.ws-consequence');
  await page.locator('.ws-threshold').click({ force: true });
  await page.waitForTimeout(6500);
  await page.locator('.ws-threshold').click({ force: true });
  await page.waitForFunction(() => document.body.innerText.includes('The bench will still be here.'));
}

async function walk(page, prefix) {
  await toLinger(page);
  await page.waitForTimeout(600);
  await shot(page, `${prefix}-01-linger`);

  await page.waitForSelector('.ws-reach', { timeout: 8000 });
  await page.waitForTimeout(400);
  await shot(page, `${prefix}-02-bench-reachable`);

  await page.locator('.ws-reach').first().click({ force: true });
  await page.waitForSelector('.ws-scrap', { timeout: 8000 });
  await page.waitForTimeout(700);
  await shot(page, `${prefix}-03-make-opening`);
  await shot(page, `${prefix}-04-work-notes`);

  await page.locator('.ws-scrap').first().click({ force: true });
  await page.waitForSelector('.ws-primary-edit, .ws-object[data-object-state="opened"]');
  await page.waitForTimeout(500);
  await shot(page, `${prefix}-05-active-artifact`);

  const label = page.locator('.ws-primary-edit');
  if (await label.count()) {
    await label.fill('Start');
    await page.locator('textarea[aria-label="What happens when someone presses it"]').fill('It opens an empty bench.');
  } else {
    await page.locator('textarea[aria-label="The work"]').fill('Start. It opens an empty bench.');
  }
  await page.locator('.ws-threshold').click({ force: true });
  await page.waitForFunction(() => document.body.innerText.includes('You made something.'));
  await page.waitForTimeout(400);
  await shot(page, `${prefix}-06-completed-artifact`);
  await page.waitForTimeout(3000);
  await shot(page, `${prefix}-07-method-turn`);
  await page.waitForSelector('.ws-room[data-machine="equipped"]');
  await page.waitForTimeout(600);
  await shot(page, `${prefix}-08-equipped`);
}

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'msedge', headless: true });
try {
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 }, colorScheme: 'dark' });
  await walk(desktop, 'desktop');
  await desktop.close();
  const phone = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    colorScheme: 'dark',
  });
  await walk(phone, 'mobile');
  await phone.close();
} finally {
  await browser.close();
}
