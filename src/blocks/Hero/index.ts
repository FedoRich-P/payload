import type { CollectionConfig} from "payload";

export const Hero: CollectionConfig = {
  slug: 'hero',
  type: 'group',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'ctaText',
      type: 'text',
      required: true,
    },
  ],
}
