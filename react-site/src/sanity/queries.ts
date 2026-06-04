export const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(coalesce(publishedAt, _updatedAt, _createdAt) desc)[0...$limit]{
  _id,
  title,
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, _updatedAt, _createdAt),
  "updatedAt": coalesce(updatedAt, _updatedAt),
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
  "imageAlt": coalesce(image.alt, featuredImageAltText, title),
  "imageCaption": coalesce(image.caption, featuredImageCaptionText),
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
  "publishedAt": coalesce(publishedAt, _updatedAt, _createdAt),
  "updatedAt": coalesce(updatedAt, _updatedAt),
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
  "imageAlt": coalesce(image.alt, featuredImageAltText, title),
  "imageCaption": coalesce(image.caption, featuredImageCaptionText),
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
]|order(coalesce(publishedAt, _updatedAt, _createdAt) desc)[0...$limit]{
  _id,
  title,
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, _updatedAt, _createdAt),
  "updatedAt": coalesce(updatedAt, _updatedAt),
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
  "imageAlt": coalesce(image.alt, featuredImageAltText, title),
  "imageCaption": coalesce(image.caption, featuredImageCaptionText),
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
  "title": coalesce(translations[locale == $locale][0].title, title),
  "slug": slug.current,
  serviceCategory,
  "shortDescription": coalesce(translations[locale == $locale][0].shortDescription, shortDescription),
  "bestFor": coalesce(translations[locale == $locale][0].bestFor, bestFor),
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
  "title": coalesce(translations[locale == $locale][0].title, title),
  "slug": slug.current,
  serviceCategory,
  "shortDescription": coalesce(translations[locale == $locale][0].shortDescription, shortDescription),
  "metaTitle": coalesce(translations[locale == $locale][0].seoTitle, seoTitle, metaTitle),
  "metaDescription": coalesce(translations[locale == $locale][0].seoDescription, seoDescription, metaDescription),
  canonicalUrl,
  focusKeyword,
  secondaryKeywords,
  noindex,
  "heroEyebrow": coalesce(translations[locale == $locale][0].eyebrow, eyebrow, heroEyebrow),
  "heroTitle": coalesce(translations[locale == $locale][0].heroTitle, heroTitle),
  "heroDescription": coalesce(translations[locale == $locale][0].heroSubtitle, heroSubtitle, heroDescription),
  heroImage,
  "heroImageAlt": coalesce(translations[locale == $locale][0].heroImageAlt, heroImageAlt),
  openGraphImage,
  "primaryCTA": {
    "label": coalesce(translations[locale == $locale][0].primaryCtaLabel, primaryCtaLabel, primaryCTA.label),
    "href": coalesce(primaryCtaUrl, primaryCTA.href)
  },
  "secondaryCTA": {
    "label": coalesce(translations[locale == $locale][0].secondaryCtaLabel, secondaryCtaLabel, secondaryCTA.label),
    "href": coalesce(secondaryCtaUrl, secondaryCTA.href)
  },
  "bestFor": coalesce(translations[locale == $locale][0].bestFor, bestFor),
  "fullDescription": coalesce(translations[locale == $locale][0].fullDescription, fullDescription),
  "overview": coalesce(translations[locale == $locale][0].overviewContent, overviewContent, overview),
  "symptomsOrReasons": coalesce(translations[locale == $locale][0].symptomsOrReasonsToSchedule, symptomsOrReasonsToSchedule, symptomsOrReasons),
  "whatToExpect": coalesce(translations[locale == $locale][0].whatToExpectSteps, whatToExpectSteps, whatToExpect),
  "includedCare": coalesce(translations[locale == $locale][0].careApproachCards, careApproachCards, includedCare),
  "keyBenefits": coalesce(translations[locale == $locale][0].keyBenefits, keyBenefits),
  "careApproachCards": coalesce(translations[locale == $locale][0].careApproachCards, careApproachCards),
  timelineBlocks,
  comparisonTable,
  contentTable,
  calloutBlocks,
  "approachSection": coalesce(translations[locale == $locale][0].approachSection, approachSection),
  "whatToBring": coalesce(translations[locale == $locale][0].whatToBring, whatToBring),
  "helpfulQuestions": coalesce(translations[locale == $locale][0].helpfulQuestions, helpfulQuestions),
  urgentCallout,
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
  "faqs": coalesce(translations[locale == $locale][0].faqItems, faqItems, faqs),
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
  "finalCtaTitle": coalesce(translations[locale == $locale][0].finalCtaTitle, finalCtaTitle),
  "finalCtaText": coalesce(translations[locale == $locale][0].finalCtaText, finalCtaText),
  finalCtaButtons,
  "disclaimer": coalesce(translations[locale == $locale][0].disclaimer, disclaimer),
  schemaType
}`;
