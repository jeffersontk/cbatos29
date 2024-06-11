import { defineField, defineType } from "sanity"

export default defineType({
  name: "pastoralTeam",
  title: "Equipe Pastoral",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "titulo",
      type: "string",
    }),
    defineField({
      name: "Desciption",
      title: "Descrição",
      type: "text",
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
              name: "nome",
              title: "Nome",
              type: "string",
            },
            {
              name: "Desciption",
              title: "Descrição",
              type: "text",
            },
            {
              name: "favoriteVerse",
              title: "versículo favorito",
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
