import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'WeHistory',
  title: 'Nossa Historia',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitulo',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Image promocional',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'playlist',
      title: 'Playlist',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'titulo do video',
            type: 'string',
          },
          {
            name: 'iframe',
            title: 'iframe do video',
            type: 'string',
          },
        ],
      }],
    })
  ],
})
