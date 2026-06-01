export const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...$limit]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  updatedAt,
  lastReviewedAt,
  "resourceType": coalesce(resourceType, "blog"),
  "contentMode": coalesce(contentMode, select((defined(bodyMarkdown) || defined(bodyMarkdownFile)) && !defined(body) => "advanced", "standard")),
  category,
  tags,
  secondaryKeywords,
  readingTime,
  seoTitle,
  seoDescription,
  focusKeyword,
  canonicalUrl,
  image,
  "imageAlt": coalesce(image.alt, title),
  "imageCaption": image.caption,
  openGraphImage,
  ogImageAlt,
  "openGraphImageAlt": coalesce(openGraphImage.alt, ogImageAlt, image.alt, title),
  author->{name, title, credentials, bio, "slug": slug.current, "image": image.asset->url, "imageAlt": coalesce(image.alt, name)},
  reviewedBy->{name, title, credentials, bio, "slug": slug.current, "image": image.asset->url, "imageAlt": coalesce(image.alt, name)},
  internalLinks,
  externalLinks,
  bodyMarkdown,
  "bodyMarkdownFileUrl": bodyMarkdownFile.asset->url,
  "bodyMarkdownFileName": bodyMarkdownFile.asset->originalFilename,
  faqMarkdown,
  sourcesMarkdown,
  body,
  "excerpt": coalesce(excerpt, pt::text(body)[0...180], bodyMarkdown[0...180])
}`;

export const POST_QUERY = `*[
  _type == "post"
  && slug.current == $slug
][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  updatedAt,
  lastReviewedAt,
  "resourceType": coalesce(resourceType, "blog"),
  "contentMode": coalesce(contentMode, select((defined(bodyMarkdown) || defined(bodyMarkdownFile)) && !defined(body) => "advanced", "standard")),
  category,
  tags,
  secondaryKeywords,
  readingTime,
  seoTitle,
  seoDescription,
  focusKeyword,
  canonicalUrl,
  image,
  "imageAlt": coalesce(image.alt, title),
  "imageCaption": image.caption,
  openGraphImage,
  ogImageAlt,
  "openGraphImageAlt": coalesce(openGraphImage.alt, ogImageAlt, image.alt, title),
  author->{name, title, credentials, bio, "slug": slug.current, "image": image.asset->url, "imageAlt": coalesce(image.alt, name)},
  reviewedBy->{name, title, credentials, bio, "slug": slug.current, "image": image.asset->url, "imageAlt": coalesce(image.alt, name)},
  internalLinks,
  externalLinks,
  bodyMarkdown,
  "bodyMarkdownFileUrl": bodyMarkdownFile.asset->url,
  "bodyMarkdownFileName": bodyMarkdownFile.asset->originalFilename,
  faqMarkdown,
  sourcesMarkdown,
  body,
  "excerpt": coalesce(excerpt, pt::text(body)[0...180], bodyMarkdown[0...180])
}`;

export const RELATED_POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && slug.current != $slug
  && (
    category == $category
    || count(tags[@ in $tags]) > 0
  )
]|order(publishedAt desc)[0...$limit]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  updatedAt,
  lastReviewedAt,
  "resourceType": coalesce(resourceType, "blog"),
  "contentMode": coalesce(contentMode, select((defined(bodyMarkdown) || defined(bodyMarkdownFile)) && !defined(body) => "advanced", "standard")),
  category,
  tags,
  secondaryKeywords,
  readingTime,
  seoTitle,
  seoDescription,
  focusKeyword,
  canonicalUrl,
  image,
  "imageAlt": coalesce(image.alt, title),
  "imageCaption": image.caption,
  openGraphImage,
  ogImageAlt,
  "openGraphImageAlt": coalesce(openGraphImage.alt, ogImageAlt, image.alt, title),
  author->{name, title, credentials, bio, "slug": slug.current, "image": image.asset->url, "imageAlt": coalesce(image.alt, name)},
  reviewedBy->{name, title, credentials, bio, "slug": slug.current, "image": image.asset->url, "imageAlt": coalesce(image.alt, name)},
  internalLinks,
  externalLinks,
  bodyMarkdown,
  "bodyMarkdownFileUrl": bodyMarkdownFile.asset->url,
  "bodyMarkdownFileName": bodyMarkdownFile.asset->originalFilename,
  faqMarkdown,
  sourcesMarkdown,
  body,
  "excerpt": coalesce(excerpt, pt::text(body)[0...180], bodyMarkdown[0...180])
}`;

export const AUTHOR_SLUGS_QUERY = `*[
  _type == "author"
  && defined(slug.current)
]{
  "slug": slug.current
}`;

export const AUTHOR_OPTIONS_QUERY = `*[
  _type == "author"
  && defined(slug.current)
]|order(name asc){
  _id,
  name,
  title,
  credentials,
  "slug": slug.current
}`;

export const AUTHOR_QUERY = `*[
  _type == "author"
  && slug.current == $slug
][0]{
  name,
  title,
  credentials,
  bio,
  "slug": slug.current,
  "image": image.asset->url,
  "imageAlt": coalesce(image.alt, name),
  "posts": *[
    _type == "post"
    && defined(slug.current)
    && author._ref == ^._id
  ]|order(publishedAt desc)[0...6]{
    title,
    "slug": slug.current,
    publishedAt,
    category,
    "resourceType": coalesce(resourceType, "blog"),
    "excerpt": coalesce(excerpt, pt::text(body)[0...180], bodyMarkdown[0...180])
  }
}`;

const SERVICE_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  serviceCategory,
  shortDescription,
  bestFor,
  featured,
  "cardIcon": coalesce(cardIcon, serviceIcon),
  "cardImageAlt": cardImageAlt,
  "cta": coalesce(primaryCTA.label, "Learn more")
`;

export const SERVICES_QUERY = `*[
  _type == "service"
  && defined(slug.current)
  && coalesce(noindex, false) != true
]|order(featured desc, title asc){
  ${SERVICE_CARD_FIELDS}
}`;

export const FEATURED_SERVICES_QUERY = `*[
  _type == "service"
  && defined(slug.current)
  && featured == true
  && coalesce(noindex, false) != true
]|order(title asc)[0...$limit]{
  ${SERVICE_CARD_FIELDS}
}`;

export const SERVICES_BY_CATEGORY_QUERY = `*[
  _type == "service"
  && defined(slug.current)
  && serviceCategory == $category
  && coalesce(noindex, false) != true
]|order(title asc){
  ${SERVICE_CARD_FIELDS}
}`;

export const SERVICE_SLUGS_QUERY = `*[
  _type == "service"
  && defined(slug.current)
  && coalesce(noindex, false) != true
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
  "metaTitle": coalesce(seoTitle, metaTitle),
  "metaDescription": coalesce(seoDescription, metaDescription),
  canonicalUrl,
  focusKeyword,
  secondaryKeywords,
  noindex,
  "heroEyebrow": coalesce(eyebrow, heroEyebrow),
  heroTitle,
  "heroDescription": coalesce(heroSubtitle, heroDescription),
  heroImage,
  heroImageAlt,
  openGraphImage,
  "primaryCTA": {
    "label": coalesce(primaryCtaLabel, primaryCTA.label),
    "href": coalesce(primaryCtaUrl, primaryCTA.href)
  },
  "secondaryCTA": {
    "label": coalesce(secondaryCtaLabel, secondaryCTA.label),
    "href": coalesce(secondaryCtaUrl, secondaryCTA.href)
  },
  bestFor,
  fullDescription,
  "overview": coalesce(overviewContent, overview),
  "symptomsOrReasons": coalesce(symptomsOrReasonsToSchedule, symptomsOrReasons),
  "whatToExpect": coalesce(whatToExpectSteps, whatToExpect),
  "includedCare": coalesce(careApproachCards, includedCare),
  keyBenefits,
  careApproachCards,
  timelineBlocks,
  comparisonTable,
  contentTable,
  calloutBlocks,
  whenToSchedule,
  relatedServices[]->{
    ${SERVICE_CARD_FIELDS}
  },
  relatedResources[]->{
    title,
    "slug": slug.current,
    category,
    image,
    "imageAlt": coalesce(image.alt, title),
    "excerpt": coalesce(excerpt, pt::text(body)[0...170], bodyMarkdown[0...170])
  },
  externalReferences,
  "faqs": coalesce(faqItems, faqs),
  author->{name, title, image, bio, credentials, "slug": slug.current},
  reviewedBy->{name, title, image, bio, credentials, "slug": slug.current},
  publishedAt,
  updatedAt,
  lastReviewedDate,
  featured,
  "cardIcon": coalesce(cardIcon, serviceIcon),
  cardImage,
  cardImageAlt,
  "locationRelevance": coalesce(locationMentions, locationRelevance),
  serviceAreas,
  finalCtaTitle,
  finalCtaText,
  finalCtaButtons,
  disclaimer,
  schemaType
}`;
