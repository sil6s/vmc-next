import { defineField, defineType } from "sanity";

export const personProfileType = defineType({
  name: "personProfile",
  title: "Person Profile",
  type: "document",
  groups: [
    { name: "content", title: "Profile", default: true },
    { name: "media", title: "Image" },
    { name: "display", title: "Display" },
    { name: "seo", title: "SEO" }
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "name", maxLength: 80 }, validation: (rule) => rule.required() }),
    defineField({
      name: "profileType",
      title: "Profile type",
      type: "string",
      group: "content",
      options: {
        layout: "radio",
        list: [
          { title: "Doctor", value: "doctor" },
          { title: "Team member", value: "team" }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "role", title: "Role", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "credentials", title: "Credentials", type: "string", group: "content" }),
    defineField({
      name: "image",
      title: "Profile image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" })
      ]
    }),
    defineField({ name: "imageUrl", title: "Legacy image URL", type: "url", group: "media", description: "Fallback for migrated profiles until a Sanity image asset is uploaded." }),
    defineField({ name: "imageAlt", title: "Legacy image alt text", type: "string", group: "media" }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 5, group: "content" }),
    defineField({ name: "briefDescription", title: "Brief description", type: "text", rows: 3, group: "content" }),
    defineField({ name: "education", title: "Education", type: "text", rows: 4, group: "content" }),
    defineField({ name: "specialties", title: "Specialties", type: "array", group: "content", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "carePhilosophy", title: "Care philosophy", type: "text", rows: 4, group: "content" }),
    defineField({ name: "professionalInterests", title: "Professional interests", type: "text", rows: 4, group: "content" }),
    defineField({ name: "locationsServed", title: "Locations served", type: "array", group: "content", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "yearsExperience", title: "Years of experience", type: "string", group: "content" }),
    defineField({ name: "ctaLabel", title: "CTA label", type: "string", group: "content" }),
    defineField({ name: "ctaLink", title: "CTA link", type: "string", group: "content" }),
    defineField({ name: "visible", title: "Visible on public site", type: "boolean", group: "display", initialValue: true }),
    defineField({ name: "displayOnHomepage", title: "Display on homepage", type: "boolean", group: "display", initialValue: true }),
    defineField({ name: "displayOnAboutPage", title: "Display on About page", type: "boolean", group: "display", initialValue: true }),
    defineField({ name: "featured", title: "Featured", type: "boolean", group: "display", initialValue: false }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", group: "display", initialValue: 100 }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, group: "seo" })
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" }
  }
});
