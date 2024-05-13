import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'cellsPage',
  title: 'Pagina Celula',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Image Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
