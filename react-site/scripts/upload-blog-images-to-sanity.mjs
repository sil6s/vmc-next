import fs from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";

const env = Object.fromEntries(
  (fs.existsSync(".env.local") ? fs.readFileSync(".env.local", "utf8") : "")
    .split(/\r?\n/)
    .filter((line) => line.includes("="))
    .map((line) => {
      const [key, ...value] = line.split("=");
      return [key, value.join("=").replace(/^["']|["']$/g, "")];
    })
);

const token = process.env.SANITY_API_WRITE_TOKEN || env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN.");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID || "zk507aly",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-06-01",
  useCdn: false,
  token
});

const imageDir = path.resolve("public/images/blog");

const assignments = {
  "why-is-my-dog-panting-so-much-in-northern-kentucky": "dog-panting.webp",
  "when-a-pet-is-drinking-more-water-than-usual": "pet-drinking.webp",
  "why-is-my-dog-scooting-across-the-floor": "dog-scooting.webp",
  "what-to-do-if-your-dog-breaks-a-nail-or-tears-a-dewclaw": "dog-breaks-nail.webp",
  "red-cloudy-or-squinting-eyes-in-dogs-and-cats": "cat-eyes.webp",
  "houseplants-that-can-be-dangerous-for-dogs-and-cats": "cat-houseplants.webp",
  "human-medications-that-are-unsafe-for-pets": "pet-human-meds.webp",
  "dog-park-safety-for-northern-kentucky-pets": "washington-dog-park.webp",
  "heat-and-humidity-safety-for-dogs-in-cincinnati-and-northern-kentucky": "dog-hot-weather.webp",
  "cold-weather-paw-care-for-dogs-and-cats": "dog-cold-weather.webp",
  "fireworks-and-thunderstorm-anxiety-in-dogs-and-cats": "dog-fireworks.webp",
  "what-to-do-if-your-pet-goes-missing-in-northern-kentucky": "lost-pet-poster.webp",
  "helping-cats-feel-less-stressed-in-the-carrier": "pet-carrier.webp",
  "nail-trim-anxiety-helping-pets-handle-paw-care": "cat-nail-trimming.webp",
  "burrs-grass-seeds-and-paw-irritation-after-outdoor-walks": "burrs0image.webp",
  "multi-pet-household-tension-when-dogs-or-cats-stop-getting-along": "multi-pet-household.webp",
  "separation-anxiety-signs-in-dogs-returning-to-busy-schedules": "seperation-anxiety dogs.webp",
  "safe-car-rides-for-dogs-and-cats-around-northern-kentucky": "safe car ride.webp",
  "skunk-spray-and-pets-what-northern-kentucky-owners-should-know": "skunk.webp",
  "raccoons-opossums-and-backyard-wildlife-encounters": "raccoons-and-pets.webp",
  "bee-stings-and-insect-bites-in-dogs-and-cats": "bee-sting-pets.webp",
  "dog-urinary-accidents-when-house-trained-dogs-start-peeing-inside": "dog-urine-accidents.webp",
  "constipation-and-straining-in-dogs-and-cats": "dog-constipation.webp",
  "when-appetite-changes-in-dogs-and-cats-need-a-vet-visit": "dog-appetite-change.webp",
  "excessive-drooling-in-dogs-and-cats-what-it-can-mean": "dog-drool.webp",
  "seizures-in-dogs-and-cats-what-to-do-in-the-moment": "dog-sezuire.webp",
  "possible-poison-exposure-steps-for-pet-owners-before-the-vet-visit": "dog-poison.webp",
  "post-surgery-home-care-for-dogs-and-cats": "post-surgery-cat.webp",
  "small-cuts-scrapes-and-bite-wounds-when-pets-need-care": "pet-scrape.webp",
  "when-a-pet-seems-painful-but-you-cannot-find-the-cause": "pet-in-pain-cannot-find-cause.webp"
};

function contentType(filename) {
  if (/\.webp$/i.test(filename)) return "image/webp";
  if (/\.png$/i.test(filename)) return "image/png";
  return "image/jpeg";
}

function titleFromSlug(slug) {
  return slug.replace(/-/g, " ");
}

const assetByFile = new Map();

for (const [slug, filename] of Object.entries(assignments)) {
  const filePath = path.join(imageDir, filename);
  if (!fs.existsSync(filePath)) throw new Error(`Missing image: ${filePath}`);

  let asset = assetByFile.get(filename);
  if (!asset) {
    asset = await client.assets.upload("image", fs.createReadStream(filePath), {
      filename,
      contentType: contentType(filename),
      label: `Resource article image: ${filename}`,
      title: titleFromSlug(slug)
    });
    assetByFile.set(filename, asset);
    console.log(`Uploaded ${filename} -> ${asset._id}`);
  }

  const post = await client.fetch('*[_type == "post" && slug.current == $slug][0]{_id,title}', { slug });
  if (!post?._id) throw new Error(`Missing post for slug: ${slug}`);

  await client
    .patch(post._id)
    .set({
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: post.title,
        caption: "Veterinary Medical Centers resource article image."
      },
      openGraphImage: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: post.title
      },
      featuredImageAltText: post.title,
      featuredImageCaptionText: "Veterinary Medical Centers resource article image.",
      updatedAt: new Date().toISOString()
    })
    .commit();

  console.log(`Updated ${slug}`);
}

console.log(`Updated ${Object.keys(assignments).length} article images with ${assetByFile.size} uploaded assets.`);
