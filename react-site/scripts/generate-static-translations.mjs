import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";

const siteUrl = process.env.SITE_URL || "http://127.0.0.1:3000";
const translateUrl = process.env.LIBRETRANSLATE_URL || "http://127.0.0.1:5001/translate";
const outputPath = new URL("../src/data/generated-static-page-translations.json", import.meta.url);
const routes = [
  "/",
  "/about/",
  "/services/",
  "/new-patients/",
  "/book-appointment/",
  "/contact/",
  "/locations/",
  "/locations/vet-in-fort-thomas-ky/",
  "/locations/vet-in-independence-ky/",
  "/locations/vet-near-cincinnati-oh/",
  "/resources/",
  "/team/",
  "/team/dr-kristi-baker/",
  "/team/dr-rebecca-golatzki/",
  "/team/dr-valeria-dib-vazquez/",
  "/patient-portal-online-booking/",
  "/online-help/fort-thomas/direct-booking/",
  "/online-help/independence/direct-booking/",
  "/online-help/fort-thomas/general/",
  "/online-help/independence/general/",
  "/online-help/fort-thomas/records/",
  "/online-help/independence/records/",
  "/online-help/fort-thomas/refill/",
  "/online-help/independence/refill/",
  "/online-help/fort-thomas/virtual-consult/",
  "/online-help/independence/virtual-consult/",
  "/vet-near-me/"
];
const targets = { es: "es", fr: "fr", hi: "hi", zh: "zh-Hans" };

function isTranslatable(text) {
  const value = text.trim();
  return value.length > 1 && value.length <= 1000 && /[A-Za-z]/.test(value) && !/^(?:https?:|tel:|mailto:|\d+[\d\s().-]*)$/i.test(value);
}

async function collectSourceText() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const collected = new Set();
  for (const route of routes) {
    await page.goto(`${siteUrl}${route}`, { waitUntil: "networkidle" });
    const values = await page.locator("#main").evaluate((main) => {
      const text = [];
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        const parent = node.parentElement;
        if (parent && !parent.closest("script, style, [data-no-translate]")) text.push(node.textContent || "");
        node = walker.nextNode();
      }
      main.querySelectorAll("[aria-label], [placeholder], [title]").forEach((element) => {
        ["aria-label", "placeholder", "title"].forEach((attribute) => {
          const value = element.getAttribute(attribute);
          if (value) text.push(value);
        });
      });
      return text;
    });
    values.forEach((value) => {
      const normalized = value.trim();
      if (isTranslatable(normalized)) collected.add(normalized);
    });
    console.log(`Collected ${collected.size} strings after ${route}`);
  }
  await browser.close();
  return [...collected];
}

async function translateBatch(strings, target) {
  const response = await fetch(translateUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: strings, source: "en", target, format: "text" })
  });
  if (!response.ok) throw new Error(`LibreTranslate failed: ${response.status} ${await response.text()}`);
  const body = await response.json();
  return body.translatedText;
}

const sourceStrings = await collectSourceText();
const output = Object.fromEntries(Object.keys(targets).map((locale) => [locale, {}]));
for (const [locale, target] of Object.entries(targets)) {
  for (let index = 0; index < sourceStrings.length; index += 24) {
    const batch = sourceStrings.slice(index, index + 24);
    const translations = await translateBatch(batch, target);
    batch.forEach((source, offset) => {
      const translated = translations[offset];
      if (translated && translated !== source) output[locale][source] = translated;
    });
    console.log(`${locale}: ${Math.min(index + batch.length, sourceStrings.length)}/${sourceStrings.length}`);
  }
}
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${sourceStrings.length} source strings to ${outputPath.pathname}`);
