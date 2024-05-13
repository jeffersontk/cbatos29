import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'events',
  title: 'Eventos',
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
      name: 'datinha',
      title: 'datinha',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
        calendarTodayLabel: 'Today'
      }
    }),
    defineField({
      name: 'time',
      title: 'horario',
      type: 'object',
      fields: [
        {
          name: 'hour',
          title: 'Hora',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(23),
        },
        {
          name: 'minute',
          title: 'Minuto',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(59),
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'address',
      title: 'Endereço',
      type: 'string',
    }),
    defineField({
      name: 'mapsIframe',
      title: 'Maps Iframe',
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
  ],
})
