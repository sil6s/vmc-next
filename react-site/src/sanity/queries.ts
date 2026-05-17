export const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...$limit]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  category,
  seoTitle,
  seoDescription,
  image,
  "imageAlt": coalesce(image.alt, title),
  author->{name, title, "image": image.asset->url, "imageAlt": coalesce(image.alt, name)},
  body,
  "excerpt": coalesce(excerpt, pt::text(body)[0...180])
}`;

export const POST_QUERY = `*[
  _type == "post"
  && slug.current == $slug
][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  category,
  seoTitle,
  seoDescription,
  image,
  "imageAlt": coalesce(image.alt, title),
  author->{name, title, "image": image.asset->url, "imageAlt": coalesce(image.alt, name)},
  body,
  "excerpt": coalesce(excerpt, pt::text(body)[0...180])
}`;

const SERVICE_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  serviceCategory,
  shortDescription,
  bestFor,
  featured,
  cardIcon,
  "cardImageAlt": cardImageAlt,
  "cta": coalesce(primaryCTA.label, "Learn more")
`;

export const SERVICES_QUERY = `*[
  _type == "service"
  && defined(slug.current)
]|order(featured desc, title asc){
  ${SERVICE_CARD_FIELDS}
}`;

export const FEATURED_SERVICES_QUERY = `*[
  _type == "service"
  && defined(slug.current)
  && featured == true
]|order(title asc)[0...$limit]{
  ${SERVICE_CARD_FIELDS}
}`;

export const SERVICES_BY_CATEGORY_QUERY = `*[
  _type == "service"
  && defined(slug.current)
  && serviceCategory == $category
]|order(title asc){
  ${SERVICE_CARD_FIELDS}
}`;

export const SERVICE_SLUGS_QUERY = `*[
  _type == "service"
  && defined(slug.current)
]{
  "slug": slug.current
}`;

export const SERVICE_QUERY = `*[
  _type == "service"
  && slug.current == $slug
][0]{
  _id,
  title,
  "slug": slug.current,
  serviceCategory,
  shortDescription,
  metaTitle,
  metaDescription,
  focusKeyword,
  heroEyebrow,
  heroTitle,
  heroDescription,
  heroImage,
  heroImageAlt,
  primaryCTA,
  secondaryCTA,
  bestFor,
  overview,
  symptomsOrReasons,
  whatToExpect,
  includedCare,
  whenToSchedule,
  relatedServices[]->{
    ${SERVICE_CARD_FIELDS}
  },
  faqs,
  author->{name, title, image, bio, credentials, "slug": slug.current},
  reviewedBy->{name, title, image, bio, credentials, "slug": slug.current},
  publishedAt,
  updatedAt,
  featured,
  cardIcon,
  cardImage,
  cardImageAlt,
  locationRelevance
}`;
