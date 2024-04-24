import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'cells',
  title: 'Células',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome da célula',
      type: 'string',
    }),
    defineField({
      name: 'district',
      title: 'Bairro',
      type: 'string',
    }),
    {
      name: 'leaders',
      title: 'Líderes da célula',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Nome do líder',
            type: 'string',
          },
          {
            name: 'whatsapp',
            title: 'Whatsapp do líder',
            type: 'string',
            //validation: (Rule: any) => Rule.regex(/^\d{10}$/).error('O número de telefone deve conter 10 dígitos.'),
          },
        ],
      }],
    },
  ],
});
