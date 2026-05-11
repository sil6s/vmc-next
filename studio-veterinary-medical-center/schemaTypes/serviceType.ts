import {defineField, defineType} from 'sanity'

const serviceCategories = [
  {title: 'Preventive Care', value: 'preventiveCare'},
  {title: 'Medical Care', value: 'medicalCare'},
  {title: 'Dental & Surgery', value: 'dentalSurgery'},
  {title: 'Life Stage Care', value: 'lifeStageCare'},
]

export const serviceType = defineType({
  name: 'service',
  title: 'Veterinary Service',
  type: 'document',
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'hero', title: 'Hero'},
    {name: 'content', title: 'Content'},
    {name: 'relationships', title: 'Relationships'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'serviceCategory',
      title: 'Service category',
      type: 'string',
      options: {
        list: serviceCategories,
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      group: 'seo',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => rule.max(170),
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus keyword',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      rows: 4,
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
      group: 'hero',
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero image alt text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'primaryCTA',
      title: 'Primary CTA',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'URL', type: 'string'}),
      ],
    }),
    defineField({
      name: 'secondaryCTA',
      title: 'Secondary CTA',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'URL', type: 'string'}),
      ],
    }),
    defineField({
      name: 'bestFor',
      title: 'Best for',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.min(1).max(6),
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
    defineField({
      name: 'symptomsOrReasons',
      title: 'Symptoms or reasons',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
          ],
        },
      ],
    }),
    defineField({
      name: 'whatToExpect',
      title: 'What to expect',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'stepTitle', title: 'Step title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'stepDescription', title: 'Step description', type: 'text', rows: 3}),
          ],
        },
      ],
    }),
    defineField({
      name: 'includedCare',
      title: 'Included care',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
          ],
        },
      ],
    }),
    defineField({
      name: 'whenToSchedule',
      title: 'When to schedule',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
      group: 'relationships',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (rule) => rule.required()}),
          ],
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      group: 'relationships',
    }),
    defineField({
      name: 'reviewedBy',
      title: 'Reviewed by',
      type: 'reference',
      to: [{type: 'author'}],
      description: 'Optional. Only use verified doctor/team member information.',
      group: 'relationships',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Featured service',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'cardIcon',
      title: 'Card icon',
      type: 'string',
      options: {
        list: [
          {title: 'Stethoscope', value: 'stethoscope'},
          {title: 'Syringe', value: 'syringe'},
          {title: 'Baby', value: 'baby'},
          {title: 'Smile Plus', value: 'smilePlus'},
          {title: 'Shield Check', value: 'shieldCheck'},
          {title: 'Scissors', value: 'scissors'},
          {title: 'Heart Pulse', value: 'heartPulse'},
          {title: 'Microscope', value: 'microscope'},
          {title: 'Activity', value: 'activity'},
          {title: 'Clipboard List', value: 'clipboardList'},
          {title: 'Apple', value: 'apple'},
        ],
      },
    }),
    defineField({
      name: 'cardImage',
      title: 'Card image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'cardImageAlt',
      title: 'Card image alt text',
      type: 'string',
    }),
    defineField({
      name: 'locationRelevance',
      title: 'Location relevance',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Fort Thomas', value: 'Fort Thomas'},
          {title: 'Independence', value: 'Independence'},
          {title: 'Northern Kentucky', value: 'Northern Kentucky'},
          {title: 'Cincinnati area', value: 'Cincinnati area'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'serviceCategory',
      media: 'heroImage',
    },
    prepare({title, subtitle, media}) {
      const category = serviceCategories.find((item) => item.value === subtitle)?.title || subtitle
      return {title, subtitle: category, media}
    },
  },
})
