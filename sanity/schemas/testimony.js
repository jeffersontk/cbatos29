import { defineField, defineType } from "sanity"

export default defineType({
  name: "testimony",
  title: "Testemunho",
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
  ],
})
