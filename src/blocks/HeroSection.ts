import { Block } from 'payload'

export const HeroSection: Block = {
  slug: 'hero-section',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'ctaButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'Оформить полис',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          defaultValue: '#application-form',
        },
      ],
    },
  ],
}
