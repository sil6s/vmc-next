import { defineField, defineType } from "sanity";

const serviceCategories = [
  { title: "Preventive Care", value: "preventiveCare" },
  { title: "Medical Care", value: "medicalCare" },
  { title: "Dental & Surgery", value: "dentalSurgery" },
  { title: "Life Stage Care", value: "lifeStageCare" }
];

const linkFields = [
  defineField({ name: "label", title: "Button label", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "href", title: "URL", type: "string", validation: (rule) => rule.required() })
];

const simplePortableText = [
  { type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "H2", value: "h2" }, { title: "H3", value: "h3" }, { title: "Quote", value: "blockquote" }], lists: [{ title: "Bullet", value: "bullet" }, { title: "Number", value: "number" }], marks: { decorators: [{ title: "Strong", value: "strong" }, { title: "Emphasis", value: "em" }], annotations: [{ name: "link", title: "Link", type: "object", fields: [{ name: "href", title: "URL", type: "string" }] }] } }
];

const translatedServiceFields = [
  defineField({ name: "title", title: "Service title", type: "string" }),
  defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3 }),
  defineField({ name: "fullDescription", title: "Plain-language summary", type: "text", rows: 5 }),
  defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
  defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 3 }),
  defineField({ name: "eyebrow", title: "Hero eyebrow", type: "string" }),
  defineField({ name: "heroTitle", title: "Hero title", type: "string" }),
  defineField({ name: "heroSubtitle", title: "Hero subtitle", type: "text", rows: 3 }),
  defineField({ name: "heroImageAlt", title: "Hero image alt text", type: "string" }),
  defineField({ name: "primaryCtaLabel", title: "Primary CTA label", type: "string" }),
  defineField({ name: "secondaryCtaLabel", title: "Secondary CTA label", type: "string" }),
  defineField({ name: "bestFor", title: "Best for", type: "array", of: [{ type: "string" }] }),
  defineField({ name: "keyBenefits", title: "Key benefits", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", title: "Title", type: "string" }), defineField({ name: "description", title: "Description", type: "text", rows: 2 })] }] }),
  defineField({ name: "symptomsOrReasonsToSchedule", title: "Symptoms or reasons to schedule", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", title: "Reason", type: "string" }), defineField({ name: "description", title: "Description", type: "text", rows: 2 })] }] }),
  defineField({ name: "overviewContent", title: "Main educational content", type: "array", of: simplePortableText }),
  defineField({ name: "whatToExpectSteps", title: "What to expect steps", type: "array", of: [{ type: "object", fields: [defineField({ name: "stepTitle", title: "Step title", type: "string" }), defineField({ name: "stepDescription", title: "Step description", type: "text", rows: 2 })] }] }),
  defineField({ name: "careApproachCards", title: "Care approach cards", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", title: "Title", type: "string" }), defineField({ name: "description", title: "Description", type: "text", rows: 3 })] }] }),
  defineField({ name: "approachSection", title: "Approach section", type: "text", rows: 4 }),
  defineField({ name: "whatToBring", title: "What to bring", type: "array", of: [{ type: "string" }] }),
  defineField({ name: "helpfulQuestions", title: "Helpful questions", type: "array", of: [{ type: "string" }] }),
  defineField({ name: "faqItems", title: "FAQ items", type: "array", of: [{ type: "object", fields: [defineField({ name: "question", title: "Question", type: "string" }), defineField({ name: "answer", title: "Answer", type: "text", rows: 3 })] }] }),
  defineField({ name: "finalCtaTitle", title: "Final CTA title", type: "string" }),
  defineField({ name: "finalCtaText", title: "Final CTA text", type: "text", rows: 3 }),
  defineField({ name: "disclaimer", title: "Medical disclaimer", type: "text", rows: 3 })
];

export const serviceType = defineType({
  name: "service",
  title: "Service Page",
  type: "document",
  groups: [
    { name: "identity", title: "Page Identity", default: true },
    { name: "seo", title: "SEO" },
    { name: "hero", title: "Hero" },
    { name: "content", title: "Main Content" },
    { name: "tables", title: "Tables & Charts" },
    { name: "faqs", title: "FAQs" },
    { name: "links", title: "Links & CTAs" },
    { name: "images", title: "Images" },
    { name: "schema", title: "Schema & Review Info" }
    ,{ name: "translations", title: "Translations" }
  ],
  fields: [
    defineField({ name: "title", title: "Service title", type: "string", group: "identity", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "identity", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "serviceCategory", title: "Category", type: "string", group: "identity", options: { list: serviceCategories, layout: "radio" }, validation: (rule) => rule.required() }),
    defineField({ name: "serviceIcon", title: "Service icon", type: "string", group: "identity", description: "Short icon key for cards, for example stethoscope, syringe, heartPulse, microscope." }),
    defineField({ name: "cardIcon", title: "Card icon", type: "string", group: "identity", description: "Optional legacy card icon key. Defaults to Service icon." }),
    defineField({ name: "featured", title: "Featured on service hub", type: "boolean", group: "identity", initialValue: false }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", group: "identity" }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3, group: "identity", validation: (rule) => rule.required().max(260) }),
    defineField({ name: "fullDescription", title: "Plain-language summary", type: "text", rows: 5, group: "content", description: "Used for the quick summary card and schema description." }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo", validation: (rule) => rule.required().max(70) }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 3, group: "seo", validation: (rule) => rule.required().max(160) }),
    defineField({ name: "focusKeyword", title: "Focus keyword", type: "string", group: "seo" }),
    defineField({ name: "secondaryKeywords", title: "Secondary keywords", type: "array", group: "seo", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "canonicalUrl", title: "Canonical URL", type: "url", group: "seo", description: "Leave blank to use the live /services/ URL." }),
    defineField({ name: "noindex", title: "Noindex this page", type: "boolean", group: "seo", initialValue: false }),
    defineField({ name: "heroTitle", title: "Hero title", type: "string", group: "hero", validation: (rule) => rule.required() }),
    defineField({ name: "heroSubtitle", title: "Hero subtitle", type: "text", rows: 3, group: "hero", validation: (rule) => rule.required() }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", group: "images", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt text", type: "string" }), defineField({ name: "caption", title: "Caption", type: "string" })] }),
    defineField({ name: "heroImageAlt", title: "Hero image alt text", type: "string", group: "images" }),
    defineField({ name: "openGraphImage", title: "Open Graph image", type: "image", group: "images", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt text", type: "string" })] }),
    defineField({ name: "primaryCtaLabel", title: "Primary CTA label", type: "string", group: "links", initialValue: "Request an Appointment" }),
    defineField({ name: "primaryCtaUrl", title: "Primary CTA URL", type: "string", group: "links", initialValue: "/book-appointment/" }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA label", type: "string", group: "links", initialValue: "New Patients" }),
    defineField({ name: "secondaryCtaUrl", title: "Secondary CTA URL", type: "string", group: "links", initialValue: "/new-patients/" }),
    defineField({ name: "bestFor", title: "Best for", type: "array", group: "content", of: [{ type: "string" }], validation: (rule) => rule.min(3).max(5) }),
    defineField({ name: "keyBenefits", title: "Key benefits", type: "array", group: "content", of: [{ type: "object", fields: [defineField({ name: "title", title: "Title", type: "string" }), defineField({ name: "description", title: "Description", type: "text", rows: 2 })] }] }),
    defineField({ name: "symptomsOrReasonsToSchedule", title: "Symptoms or reasons to schedule", type: "array", group: "content", of: [{ type: "object", fields: [defineField({ name: "title", title: "Reason", type: "string" }), defineField({ name: "description", title: "Description", type: "text", rows: 2 })] }] }),
    defineField({ name: "overviewContent", title: "Main educational content", type: "array", group: "content", of: simplePortableText, validation: (rule) => rule.required() }),
    defineField({ name: "whatToExpectSteps", title: "What to expect steps", type: "array", group: "content", of: [{ type: "object", fields: [defineField({ name: "stepTitle", title: "Step title", type: "string" }), defineField({ name: "stepDescription", title: "Step description", type: "text", rows: 2 })] }] }),
    defineField({ name: "careApproachCards", title: "Care approach cards", type: "array", group: "content", of: [{ type: "object", fields: [defineField({ name: "title", title: "Title", type: "string" }), defineField({ name: "description", title: "Description", type: "text", rows: 3 })] }] }),
    defineField({ name: "timelineBlocks", title: "Timeline blocks", type: "array", group: "tables", of: [{ type: "object", fields: [defineField({ name: "label", title: "Label", type: "string" }), defineField({ name: "title", title: "Title", type: "string" }), defineField({ name: "description", title: "Description", type: "text", rows: 2 })] }] }),
    defineField({ name: "comparisonTable", title: "Comparison table", type: "object", group: "tables", fields: [defineField({ name: "title", title: "Table title", type: "string" }), defineField({ name: "columns", title: "Columns", type: "array", of: [{ type: "string" }] }), defineField({ name: "rows", title: "Rows", type: "array", of: [{ type: "object", fields: [defineField({ name: "cells", title: "Cells", type: "array", of: [{ type: "string" }] })] }] })] }),
    defineField({ name: "contentTable", title: "Content table", type: "object", group: "tables", fields: [defineField({ name: "title", title: "Table title", type: "string" }), defineField({ name: "columns", title: "Columns", type: "array", of: [{ type: "string" }] }), defineField({ name: "rows", title: "Rows", type: "array", of: [{ type: "object", fields: [defineField({ name: "cells", title: "Cells", type: "array", of: [{ type: "string" }] })] }] })] }),
    defineField({ name: "calloutBlocks", title: "Callout blocks", type: "array", group: "content", of: [{ type: "object", fields: [defineField({ name: "title", title: "Title", type: "string" }), defineField({ name: "text", title: "Text", type: "text", rows: 3 }), defineField({ name: "tone", title: "Tone", type: "string", options: { list: ["Helpful", "Important", "Local note"] } })] }] }),
    defineField({ name: "faqItems", title: "FAQ items", type: "array", group: "faqs", of: [{ type: "object", fields: [defineField({ name: "question", title: "Question", type: "string" }), defineField({ name: "answer", title: "Answer", type: "text", rows: 3 })] }], validation: (rule) => rule.min(5) }),
    defineField({ name: "relatedServices", title: "Related services", type: "array", group: "links", of: [{ type: "reference", to: [{ type: "service" }] }] }),
    defineField({ name: "relatedResources", title: "Related resources", type: "array", group: "links", of: [{ type: "reference", to: [{ type: "post" }] }] }),
    defineField({ name: "externalReferences", title: "External references", type: "array", group: "links", of: [{ type: "object", fields: [defineField({ name: "title", title: "Title", type: "string" }), defineField({ name: "url", title: "URL", type: "url" }), defineField({ name: "source", title: "Source", type: "string" })] }] }),
    defineField({ name: "locationMentions", title: "Location mentions", type: "array", group: "links", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "serviceAreas", title: "Service areas", type: "array", group: "links", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "finalCtaTitle", title: "Final CTA title", type: "string", group: "links" }),
    defineField({ name: "finalCtaText", title: "Final CTA text", type: "text", rows: 3, group: "links" }),
    defineField({ name: "finalCtaButtons", title: "Final CTA buttons", type: "array", group: "links", of: [{ type: "object", fields: linkFields }] }),
    defineField({ name: "disclaimer", title: "Medical disclaimer", type: "text", rows: 3, group: "schema" }),
    defineField({ name: "reviewedBy", title: "Reviewed by", type: "reference", group: "schema", to: [{ type: "author" }] }),
    defineField({ name: "lastReviewedDate", title: "Last reviewed date", type: "date", group: "schema" }),
    defineField({ name: "schemaType", title: "Schema type", type: "string", group: "schema", options: { list: ["Service", "VeterinaryCare"] }, initialValue: "Service" })
    ,
    defineField({
      name: "translations",
      title: "Translated service content",
      type: "array",
      group: "translations",
      description: "Add one entry per language. The website falls back to English only when a translated field is empty.",
      of: [{
        type: "object",
        fields: [
          defineField({
            name: "locale",
            title: "Language",
            type: "string",
            options: { list: [{ title: "Spanish", value: "es" }, { title: "French", value: "fr" }, { title: "Hindi", value: "hi" }, { title: "Simplified Chinese", value: "zh" }] },
            validation: (rule) => rule.required()
          }),
          ...translatedServiceFields
        ],
        preview: { select: { title: "locale", subtitle: "title" } }
      }],
      validation: (rule) => rule.unique()
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "serviceCategory",
      media: "heroImage"
    }
  }
});
