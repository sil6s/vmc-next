/**
 * IndexNow submission script for nky.vet
 * Run: npx tsx scripts/indexnow.ts
 *
 * Key file must be live at: https://nky.vet/288124c529817df2a7ca15ed0969f5ac.txt
 * before search engines will accept submissions.
 */

const HOST = "nky.vet";
const KEY = "a576050a2dea48e8a44acc53996fe7c1";
const BASE = `https://${HOST}`;

// ── Static service slugs ─────────────────────────────────────────────────────
const serviceSlugsList = [
  "pet-wellness-exams",
  "dog-cat-vaccinations",
  "puppy-kitten-care",
  "pet-dental-care",
  "spay-neuter-surgery",
  "soft-tissue-surgery",
  "sick-pet-visits",
  "veterinary-diagnostics",
  "senior-pet-care",
  "parasite-prevention",
  "skin-ear-allergy-care",
  "nutrition-weight-guidance",
  "microchipping"
];

// ── Location page slugs ──────────────────────────────────────────────────────
const locationSlugs = [
  "vet-in-fort-thomas-ky",
  "vet-in-independence-ky"
];

// ── City SEO page slugs (from cityPages.ts) ──────────────────────────────────
const citySlugs = [
  "vet-fort-thomas-ky",
  "vet-independence-ky",
  "vet-near-newport-ky",
  "vet-near-bellevue-ky",
  "vet-near-dayton-ky",
  "vet-near-southgate-ky",
  "vet-near-highland-heights-ky",
  "vet-near-wilder-ky",
  "vet-near-cold-spring-ky",
  "vet-near-alexandria-ky",
  "vet-near-covington-ky",
  "vet-near-newport-east-ky",
  "vet-near-edgewood-ky",
  "vet-near-erlanger-ky",
  "vet-near-elsmere-ky",
  "vet-near-taylor-mill-ky",
  "vet-near-latonia-ky",
  "vet-near-fort-wright-ky",
  "vet-near-crescent-springs-ky",
  "vet-near-cincinnati-oh"
];

// ── All static public URLs ───────────────────────────────────────────────────
const urls: string[] = [
  // Core pages
  `${BASE}/`,
  `${BASE}/about/`,
  `${BASE}/services/`,
  `${BASE}/locations/`,
  `${BASE}/new-patients/`,
  `${BASE}/contact/`,
  `${BASE}/book-appointment/`,
  `${BASE}/resources/`,
  `${BASE}/vet-near-me/`,
  `${BASE}/patient-portal-online-booking/`,
  `${BASE}/online-vet-pharmacy-northern-kentucky-cincinnati/`,
  `${BASE}/new-patient-registration-form/`,
  `${BASE}/privacy-policy/`,
  `${BASE}/terms/`,

  // Service pages
  ...serviceSlugsList.map((slug) => `${BASE}/services/${slug}/`),

  // Location pages (full clinic pages)
  ...locationSlugs.map((slug) => `${BASE}/locations/${slug}/`),

  // City SEO pages
  ...citySlugs.map((slug) => `${BASE}/locations/${slug}/`)
];

async function submit() {
  console.log(`Submitting ${urls.length} URLs to IndexNow…\n`);
  urls.forEach((u) => console.log(`  ${u}`));
  console.log();

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `${BASE}/${KEY}.txt`,
    urlList: urls
  };

  // Submit to all IndexNow-participating engines
  const engines = [
    "https://www.bing.com/indexnow",
    "https://api.indexnow.org/indexnow",
    "https://yandex.com/indexnow"
  ];

  for (const endpoint of engines) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body)
    });

    const label = endpoint.includes("bing") ? "Bing" : "api.indexnow.org";
    console.log(`[${label}] ${res.status} ${res.statusText}`);

    if (res.status === 200) {
      console.log(`✓ [${label}] All URLs submitted successfully.`);
    } else if (res.status === 202) {
      console.log(`✓ [${label}] Accepted — key validation in progress.`);
    } else if (res.status === 403) {
      console.log(`✗ [${label}] Key validation failed.`);
      console.log(`  Key file must be live at: ${BASE}/${KEY}.txt`);
    } else {
      const text = await res.text().catch(() => "");
      if (text) console.log(`  Body: ${text}`);
    }
  }
}

submit().catch((err) => {
  console.error("Submission failed:", err);
  process.exit(1);
});
