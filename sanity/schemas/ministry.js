import { defineField, defineType } from "sanity"

export default defineType({
  name: "ministry",
  title: "Ministério",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      title: "logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "contact",
      title: "contato",
      type: "string",
    }),
  ]
})
