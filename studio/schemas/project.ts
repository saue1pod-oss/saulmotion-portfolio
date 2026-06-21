import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
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
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Showreel', value: 'Showreel'},
          {title: 'Logo animation', value: 'Logo animation'},
          {title: 'Brand identity', value: 'Brand identity'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainVideo',
      title: 'Main Video URL',
      type: 'url',
      description: 'Primary Vimeo video shown in the project hero',
    }),
    defineField({
      name: 'additionalVideos',
      title: 'Additional Videos',
      type: 'array',
      description: 'Extra videos shown below the case study (optional)',
      of: [
        {
          type: 'object',
          name: 'videoItem',
          title: 'Video',
          fields: [
            defineField({
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'videoUrl', subtitle: 'caption'},
          },
        },
      ],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Max 200 characters — shown in the project grid',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study',
      type: 'array',
      description: 'Rich text content for the individual project page',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'collaborators',
      title: 'Studio / Team',
      type: 'string',
      description: 'e.g. "Studio Somewhere" or "with Motion Team X"',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this project prominently on the home page',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Manual order in the grid — lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
