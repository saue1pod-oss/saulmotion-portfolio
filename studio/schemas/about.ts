import {defineField, defineType} from 'sanity'

const paragraphBlock = {
  type: 'block',
  styles: [{title: 'Normal', value: 'normal'}],
  lists: [],
  marks: {
    decorators: [
      {title: 'Highlight', value: 'highlight'},
    ],
    annotations: [],
  },
} as const

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paragraph1',
      title: 'Paragraph 1',
      type: 'array',
      of: [paragraphBlock],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paragraph2',
      title: 'Paragraph 2',
      type: 'array',
      of: [paragraphBlock],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About Page'}
    },
  },
})
