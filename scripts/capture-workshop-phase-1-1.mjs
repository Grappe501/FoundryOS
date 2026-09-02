import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'docs/talent-foundry/software-company/review/phase-1-1');
const URL = process.env.WORKSHOP_URL ?? 'https://deploy-preview-5--foundry-os.netlify.app/workshop';

mkdirSync(OUT, { recursive: true });

async function shot(page, name) {
  await hideNetlifyChrome(page);
  const path = join(OUT, `${name}.png`);
  await page.screenshot({ path, fullPage: true });
  console.log(path);
}

async function hideNetlifyChrome(page) {
  await page.evaluate(() => {
    document.querySelectorAll('[data-netlify-deploy-id], iframe[title="Netlify Drawer"]').forEach((el) => el.remove());
  });
}

async function walk(page, prefix) {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('.ws-room');
  await hideNetlifyChrome(page);
  await page.waitForTimeout(1200);
  await shot(page, `${prefix}-01-void-first-line`);

  await page.waitForSelector('.ws-threshold', { timeout: 12000 });
  await page.waitForTimeout(400);
  await shot(page, `${prefix}-02-void-threshold`);

  await hideNetlifyChrome(page);
  await page.locator('.ws-threshold').click({ force: true });
  await page.waitForSelector('.ws-fragment[data-presence="focus"]');
  await page.waitForTimeout(500);
  await shot(page, `${prefix}-03-object-pulse`);

  const primary = page.locator('.ws-region[data-region="primary"]');
  await primary.click({ force: true });
  await page.waitForSelector('#ws-notice', { timeout: 8000 });
  await page.waitForTimeout(400);
  await shot(page, `${prefix}-04-object-pulse-prompts`);

  await page.fill('#ws-notice', 'Delete is the thing you would press.');
  await page.fill('#ws-change', 'Make start the primary. Bury delete.');
  await page.locator('.ws-threshold').click({ force: true });
  await page.waitForSelector('.ws-echo');
  await page.locator('.ws-threshold').click({ force: true });

  await page.waitForSelector('.ws-choice');
  await page.waitForTimeout(400);
  await shot(page, `${prefix}-05-aftermath-mess`);

  await page.getByRole('button', { name: 'Save a copy, then continue' }).click({ force: true });
  await page.waitForSelector('.ws-consequence');
  await page.waitForTimeout(400);
  await shot(page, `${prefix}-06-aftermath-consequence`);

  await page.locator('.ws-threshold').click({ force: true });
  await page.waitForSelector('.ws-named');
  await page.waitForTimeout(6500);
  await shot(page, `${prefix}-07-named-reveal`);

  await page.locator('.ws-threshold').click({ force: true });
  await page.waitForFunction(() => document.body.innerText.includes('The bench will still be here.'));
  await page.waitForTimeout(600);
  await shot(page, `${prefix}-08-linger`);
}

const browser = await chromium.launch({
  channel: process.env.PW_CHANNEL || 'msedge',
  headless: true,
});

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
