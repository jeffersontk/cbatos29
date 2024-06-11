import { defineField, defineType } from "sanity"

export default defineType({
  name: "homeCelula",
  title: "HomeCelula",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "celulaImage",
      title: "Celula image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "celulaImage",
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
