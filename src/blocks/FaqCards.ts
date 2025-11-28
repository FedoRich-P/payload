import { Block } from 'payload'

export const FaqCards: Block = {
  slug: 'faq-cards',
  fields: [
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'id',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
