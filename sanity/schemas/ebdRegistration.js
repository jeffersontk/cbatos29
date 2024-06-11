import { defineField, defineType } from "sanity"

export default defineType({
  name: "ebdRegistration",
  title: "Inscrição EBD",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Telefone/whatsApp",
      type: "string",
    }),
    defineField({
      name: "enrollmentIntention",
      title: "Curso interessado",
      type: "string",
    }),
    defineField({
      name: "coursesParticipated",
      title: "Cursos realizados",
      type: "array",
      of: [{ type: "string", options: { hotspot: true } }],
    }),
  ],
})
