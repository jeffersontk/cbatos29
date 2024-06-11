import { defineField, defineType } from "sanity"

export default defineType({
  name: "eventsPage",
  title: "Pagina Eventos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      title: "Image Principal",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
})
