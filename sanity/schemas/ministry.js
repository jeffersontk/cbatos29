import { defineField, defineType } from "sanity"

export default defineType({
  name: "ministry",
  title: "Ministério",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titulo",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      title: "Imagem principal",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "team",
      title: "equipe",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Nome",
              type: "string",
            },
            {
              name: "Desciption",
              title: "Descrição",
              type: "text",
            },
            {
              name: "contact",
              title: "Contato",
              type: "string",
            },
            {
              name: "mainImage",
              title: "Image principal",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),
  ],
})
