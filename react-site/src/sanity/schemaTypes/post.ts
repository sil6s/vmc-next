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
      name: "readingTime",
      title: "Reading time",
      type: "string",
      group: "content",
      description: "Example: 4 min read"
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
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
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
        }
      ]
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
