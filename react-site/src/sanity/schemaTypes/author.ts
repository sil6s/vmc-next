import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "title",
      title: "Role or title",
      type: "string",
      initialValue: "Veterinary Medical Center Team"
    }),
    defineField({
      name: "slug",
      title: "Author slug",
      type: "slug",
      options: { source: "name", maxLength: 80 }
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "string",
      description: "Example: DVM, Veterinary Medical Center medical team, or client education team."
    }),
    defineField({
      name: "bio",
      title: "Short bio",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "image",
      title: "Author photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "image"
    }
  }
});
