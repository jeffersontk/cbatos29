import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ebdPage',
  title: 'EBD Pagina',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
