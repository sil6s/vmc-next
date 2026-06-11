import { expect, test } from "@playwright/test";

test.describe("online help pages", () => {
  test("renders the request page as noindex with an inline widget container", async ({ page }) => {
    await page.goto("/online-help/independence/appointment/");

    await expect(page).toHaveTitle(/Independence Online Help \| Book an appointment/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator("#otto-widget-iframe-container")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Book an appointment/i })).toBeVisible();
  });

  test("keeps the third-party widget iframe inside the inline container when it loads", async ({ page }) => {
    await page.goto("/online-help/independence/appointment/");

    const inlineContainer = page.locator("#otto-widget-iframe-container");
    await expect(inlineContainer).toBeVisible();

    const iframeState = await page.evaluate(() => {
      const container = document.querySelector("#otto-widget-iframe-container");
      const iframe = document.querySelector("#televet-widget-iframe");

      if (!iframe || !(iframe instanceof HTMLElement)) {
        return { loaded: false, inline: true, position: null };
      }

      return {
        loaded: true,
        inline: container?.contains(iframe) ?? false,
        className: iframe.className,
        position: getComputedStyle(iframe).position
      };
    });

    expect(iframeState.inline).toBe(true);
    if (iframeState.loaded) {
      expect(iframeState.className).toContain("inline");
      expect(iframeState.position).not.toBe("fixed");
    }
  });
});
