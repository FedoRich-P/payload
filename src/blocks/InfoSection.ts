import { Block } from 'payload'

export const InfoSection: Block = {
  slug: 'info-section',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'showMoreLink',
      type: 'text',
      defaultValue: 'Подробнее',
    },
  ],
}
