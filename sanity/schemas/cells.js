import { defineField, defineType } from "sanity"

export default defineType({
  name: "cells",
  title: "Células",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome da célula",
      type: "string",
    }),
    defineField({
      name: "dayOfWeek",
      title: "Dia da semana",
      type: "string",
      options: {
        list: [
          { title: "Segunda-feira", value: "Segunda-feira" },
          { title: "Terça-feira", value: "Terça-feira" },
          { title: "Quarta-feira", value: "Quarta-feira" },
          { title: "Quinta-feira", value: "Quinta-feira" },
          { title: "Sexta-feira", value: "Sexta-feira" },
        ],
      },
    }),
    defineField({
      name: "time",
      title: "horario",
      type: "object",
      fields: [
        {
          name: "hour",
          title: "Hora",
          type: "number",
          validation: (Rule) => Rule.min(0).max(23),
        },
        {
          name: "minute",
          title: "Minuto",
          type: "number",
          validation: (Rule) => Rule.min(0).max(59),
        },
      ],
    }),
    defineField({
      name: "district",
      title: "Bairro",
      type: "string",
    }),
    defineField({
      name: "leader1",
      title: "lider 1 da celula",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Nome do líder",
          type: "string",
        },
        {
          name: "whatsapp",
          title: "Whatsapp do líder",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "leader2",
      title: "lider 2 da celula",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Nome do líder",
          type: "string",
        },
        {
          name: "whatsapp",
          title: "Whatsapp do líder",
          type: "string",
        },
      ],
    }),
  ],
})
