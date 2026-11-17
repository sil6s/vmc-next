import { expect, test } from "@playwright/test";

const shimUrl = "https://connect.televet.com/shim.js";

// Model Otto's public API and asynchronous iframe load without relying on its network.
const shim = `window.otto = { widget: {
  initialize(id) {
    this.destroy();
    const frame = document.createElement('iframe');
    frame.id = 'televet-widget-iframe';
    frame.className = 'inline';
    frame.dataset.clinicId = id;
    frame.srcdoc = '<h1>Choose a request</h1><script>parent.postMessage({event: "OTTO_WIDGET_INITIALIZED"}, "*")</script>';
    document.querySelector('#otto-widget-iframe-container').appendChild(frame);
  },
  selectRequestType(requestType) {
    const frame = document.querySelector('#televet-widget-iframe');
    frame.dataset.requestType = requestType;
    frame.contentDocument.body.innerHTML = '<h1>Book with Otto</h1>';
  },
  destroy() { document.querySelector('#televet-widget-iframe')?.remove(); }
}};`;

for (const clinic of ["Fort Thomas", "Independence"]) {
  test(`opens Otto after selecting ${clinic} and returning to booking`, async ({ page }) => {
    await page.route(shimUrl, (route) => route.fulfill({ contentType: "application/javascript", body: shim }));
    await page.goto("/book-appointment/");
    for (let visit = 0; visit < 2; visit++) {
      await page.getByRole("link", { name: `Book in ${clinic}`, exact: true }).click();
      const container = page.locator("#otto-widget-iframe-container");
      await expect(container.locator("iframe")).toHaveAttribute("data-request-type", "DirectBooking");
      await expect(page.getByText("Connecting to help center…")).toBeHidden();
      await expect(page.frameLocator("#televet-widget-iframe").getByRole("heading", { name: "Book with Otto" })).toBeVisible();
      await expect(page.locator("#televet-widget-iframe")).toHaveCount(1);
      await page.goBack();
    }
  });
}

test("loads Otto on a direct booking URL", async ({ page }) => {
  await page.route(shimUrl, (route) => route.fulfill({ contentType: "application/javascript", body: shim }));
  await page.goto("/online-help/independence/direct-booking/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator("#otto-widget-iframe-container iframe")).toBeVisible();
  await expect(page.getByText("Connecting to help center…")).toBeHidden();
});

test("shows recovery options when Otto fails to load", async ({ page }) => {
  await page.route(shimUrl, (route) => route.abort());
  await page.goto("/online-help/independence/direct-booking/");
  await expect(page.getByRole("alert").filter({ hasText: "We couldn’t connect" })).toBeVisible();
  await expect(page.getByText("Connecting to help center…")).toBeHidden();
  await expect(page.getByRole("button", { name: "Try again" })).toBeVisible();
});

test("stops the spinner when Otto never responds", async ({ page }) => {
  await page.clock.install();
  await page.route(shimUrl, (route) => route.fulfill({ contentType: "application/javascript", body: "window.otto = { widget: { initialize() { document.querySelector('#otto-widget-iframe-container').dataset.initialized = 'true'; }, destroy() {} } };" }));
  await page.goto("/online-help/independence/direct-booking/");
  await expect(page.locator("#otto-widget-iframe-container")).toHaveAttribute("data-initialized", "true");
  await page.clock.fastForward(26_000);
  await expect(page.getByRole("alert").filter({ hasText: "We couldn’t connect" })).toBeVisible();
  await expect(page.getByText("Connecting to help center…")).toBeHidden();
});
