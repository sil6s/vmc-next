import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Resource Article",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Images" },
    { name: "links", title: "Links" },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Publishing" }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "resourceType",
      title: "Resource type",
      type: "string",
      group: "content",
      options: {
        layout: "radio",
        list: [
          { title: "Blog article", value: "blog" },
          { title: "Education guide", value: "education" },
          { title: "Clinic news", value: "clinic-news" },
          { title: "FAQ resource", value: "faq" }
        ]
      },
      initialValue: "education",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
      rows: 3,
      validation: (rule) => rule.max(220)
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "content",
      to: [{ type: "author" }]
    }),
    defineField({
      name: "reviewedBy",
      title: "Reviewed by",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
      description: "Optional medical reviewer for education articles."
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: ["Pet Care", "Wellness", "Dental Care", "Puppy & Kitten Care", "Senior Pet Care", "Clinic News"]
      },
      initialValue: "Pet Care"
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: { layout: "tags" }
    }),
    defineField({
      name: "secondaryKeywords",
      title: "Secondary keywords",
      type: "array",
      group: "seo",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Related local SEO terms or supporting phrases generated for this article."
    }),
    defineField({
      name: "readingTime",
      title: "Reading time",
      type: "string",
      group: "content",
      description: "Example: 4 min read"
    }),
    defineField({
      name: "contentMode",
      title: "Content editing mode",
      type: "string",
      group: "content",
      description: "Standard rich text is best for most articles. Advanced Markdown is available for imported or technical Markdown workflows.",
      options: {
        layout: "radio",
        list: [
          { title: "Standard rich text", value: "standard" },
          { title: "Advanced Markdown", value: "advanced" }
        ]
      },
      initialValue: "standard",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "image",
      title: "Featured image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string"
        }),
        defineField({
          name: "credit",
          title: "Credit",
          type: "string"
        })
      ]
    }),
    defineField({
      name: "featuredImagePrompt",
      title: "Featured image prompt",
      type: "text",
      group: "media",
      rows: 3,
      description: "Editorial image direction for choosing, generating, or uploading the article's featured image."
    }),
    defineField({
      name: "featuredImageAltText",
      title: "Planned featured image alt text",
      type: "string",
      group: "media",
      description: "Accessibility draft for the featured image if an image has not been uploaded yet."
    }),
    defineField({
      name: "featuredImageCaptionText",
      title: "Planned featured image caption",
      type: "string",
      group: "media",
      description: "Optional caption draft for the future featured image."
    }),
    defineField({
      name: "bodyMarkdown",
      title: "Advanced article body markdown",
      type: "markdown",
      group: "content",
      description:
        "Optional advanced mode field for imported Markdown. Use H2/H3 headings, short paragraphs, bullet lists, and Markdown links. Standard articles should use Body rich text instead.",
      hidden: ({ document }) => ((document as { contentMode?: string } | undefined)?.contentMode || "standard") !== "advanced",
      options: {
        imageUrl: (imageAsset) => `${imageAsset.url}?w=1100`
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          const document = context.document as { bodyMarkdownFile?: unknown; contentMode?: string } | undefined;
          if ((document?.contentMode || "standard") === "advanced" && !value && !document?.bodyMarkdownFile) {
            return "Add Markdown body content, upload a Markdown file, or switch to Standard rich text mode.";
          }
          return true;
        })
    }),
    defineField({
      name: "bodyMarkdownFile",
      title: "Advanced Markdown file upload",
      type: "file",
      group: "content",
      description:
        "Optional .md upload for Advanced Mode. If both this file and the pasted Markdown field are filled, the pasted Markdown field takes priority.",
      hidden: ({ document }) => ((document as { contentMode?: string } | undefined)?.contentMode || "standard") !== "advanced",
      options: {
        accept: ".md,.markdown,text/markdown,text/plain"
      },
      fields: [
        defineField({
          name: "description",
          title: "File note",
          type: "string",
          description: "Optional internal note about this Markdown upload."
        })
      ],
      validation: (rule) =>
        rule.custom((value, context) => {
          const document = context.document as { bodyMarkdown?: string; contentMode?: string } | undefined;
          if ((document?.contentMode || "standard") === "advanced" && !value && !document?.bodyMarkdown) {
            return "Upload a Markdown file, paste Markdown body content, or switch to Standard rich text mode.";
          }
          return true;
        })
    }),
    defineField({
      name: "body",
      title: "Body rich text",
      type: "array",
      group: "content",
      description: "Default editing experience for most resource articles. Supports headings, paragraphs, lists, links, images, callouts, FAQs, and simple CTAs.",
      hidden: ({ document }) => (document as { contentMode?: string } | undefined)?.contentMode === "advanced",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" }
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" }
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" }
            ],
            annotations: [
              {
                name: "externalLink",
                title: "External link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url"
                  }),
                  defineField({
                    name: "openInNewTab",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: true
                  })
                ]
              },
              {
                name: "internalLink",
                title: "Internal site link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "Internal path",
                    type: "string",
                    description: "Example: /services/ or /locations/vet-in-fort-thomas-ky/"
                  })
                ]
              }
            ]
          }
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string"
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string"
            })
          ]
        },
        {
          name: "faq",
          title: "FAQ section",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Section title",
              type: "string",
              initialValue: "Common Questions"
            }),
            defineField({
              name: "questions",
              title: "Questions",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "question", title: "Question", type: "string", validation: (rule) => rule.required() }),
                    defineField({ name: "answer", title: "Answer", type: "text", rows: 3, validation: (rule) => rule.required() })
                  ],
                  preview: { select: { title: "question", subtitle: "answer" } }
                }
              ]
            })
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return {
                title: title || "FAQ section",
                subtitle: "Standard rich text content block"
              };
            }
          }
        },
        {
          name: "cta",
          title: "Simple CTA section",
          type: "object",
          fields: [
            defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "Next step" }),
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
            defineField({ name: "primaryLabel", title: "Primary button label", type: "string", initialValue: "Book Appointment" }),
            defineField({ name: "primaryHref", title: "Primary button path", type: "string", initialValue: "/book-appointment/" }),
            defineField({ name: "secondaryLabel", title: "Secondary button label", type: "string", initialValue: "Contact Our Team" }),
            defineField({ name: "secondaryHref", title: "Secondary button path", type: "string", initialValue: "/contact/" })
          ],
          preview: {
            select: { title: "title", subtitle: "eyebrow" },
            prepare({ title, subtitle }) {
              return {
                title: title || "Simple CTA section",
                subtitle: subtitle || "Standard rich text content block"
              };
            }
          }
        },
        {
          name: "callout",
          title: "Article callout",
          type: "object",
          fields: [
            defineField({
              name: "tone",
              title: "Callout type",
              type: "string",
              options: {
                layout: "radio",
                list: [
                  { title: "Tip", value: "tip" },
                  { title: "Warning", value: "warning" },
                  { title: "Next step", value: "next-step" },
                  { title: "Vet note", value: "vet-note" }
                ]
              },
              initialValue: "vet-note"
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string"
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              rows: 3
            })
          ],
          preview: {
            select: { title: "title", subtitle: "tone" },
            prepare({ title, subtitle }) {
              return {
                title: title || "Article callout",
                subtitle: subtitle || "vet-note"
              };
            }
          }
        }
      ],
      validation: (rule) =>
        rule.custom((value, context) => {
          const document = context.document as { contentMode?: string } | undefined;
          if ((document?.contentMode || "standard") === "standard" && (!Array.isArray(value) || value.length === 0)) {
            return "Add rich text body content or switch to Advanced Markdown mode.";
          }
          return true;
        })
    }),
    defineField({
      name: "internalLinks",
      title: "Recommended internal links",
      type: "array",
      group: "links",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "href", title: "Path", type: "string", validation: (rule) => rule.required() })
          ],
          preview: { select: { title: "label", subtitle: "href" } }
        }
      ]
    }),
    defineField({
      name: "externalLinks",
      title: "Trusted external links",
      type: "array",
      group: "links",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "href", title: "URL", type: "url", validation: (rule) => rule.required() }),
            defineField({ name: "source", title: "Source", type: "string" })
          ],
          preview: { select: { title: "label", subtitle: "source" } }
        }
      ]
    }),
    defineField({
      name: "sourcesMarkdown",
      title: "Sources markdown",
      type: "markdown",
      group: "links",
      description:
        "Advanced Markdown mode source notes, citations, URLs, or editorial references. In Standard mode, use Trusted external links for sources.",
      hidden: ({ document }) => ((document as { contentMode?: string } | undefined)?.contentMode || "standard") !== "advanced",
      options: {
        imageUrl: (imageAsset) => `${imageAsset.url}?w=900`
      }
    }),
    defineField({
      name: "faqMarkdown",
      title: "FAQ markdown",
      type: "markdown",
      group: "content",
      description: "Advanced Markdown mode FAQ content. Standard mode should use the FAQ section block in Body rich text.",
      hidden: ({ document }) => ((document as { contentMode?: string } | undefined)?.contentMode || "standard") !== "advanced",
      options: {
        imageUrl: (imageAsset) => `${imageAsset.url}?w=900`
      }
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      validation: (rule) => rule.max(70).warning("Aim for 50-60 characters when possible.")
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      group: "seo",
      rows: 3,
      validation: (rule) => rule.max(160).warning("Aim for 150-160 characters when possible.")
    }),
    defineField({
      name: "openGraphImage",
      title: "Open Graph image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    }),
    defineField({
      name: "ogImageAlt",
      title: "Open Graph image alt text",
      type: "string",
      group: "seo",
      description: "Used by the Markdown packet importer when an Open Graph image is chosen later."
    }),
    defineField({
      name: "focusKeyword",
      title: "Focus keyword",
      type: "string",
      group: "seo"
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL override",
      type: "url",
      group: "seo"
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "settings",
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: "updatedAt",
      title: "Updated at",
      type: "datetime",
      group: "settings"
    }),
    defineField({
      name: "lastReviewedAt",
      title: "Last reviewed at",
      type: "date",
      group: "settings",
      description: "Useful for education guides with medical context."
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "resourceType",
      media: "image"
    }
  }
});
