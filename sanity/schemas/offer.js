import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'offer',
  title: 'Offer',
  type: 'document',
  groups: [
    {
      name: 'home',
      title: 'HOME',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'verse',
      title: 'Verse',
      type: 'string',
    }),
    defineField({
      name: 'bankInfo',
      title: 'BankInfo',
      type: 'string',
    }),
    defineField({
      name: 'pix',
      title: 'Pix',
      type: 'string',
    }),
  ],
})
