import { CollectionConfig } from 'payload'
import {FaqCards} from "@/blocks/FaqCards";
import {HeroSection} from "@/blocks/HeroSection";
import {InfoSection} from "@/blocks/InfoSection";
import {ApplicationForm} from "@/blocks/ApplicationForm";

export const OsagoPage: CollectionConfig = {
  slug: 'osago-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'ОСАГО',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      defaultValue: 'osago',
    },
    {
      name: 'breadcrumbs',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { label: 'Т-Помощь', href: '/' },
        { label: 'Страхование', href: '/insurance' },
        { label: 'Автомобили', href: '/insurance/auto' }
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroSection,
        FaqCards,
        InfoSection,
        ApplicationForm,
      ],
      defaultValue: [
        {
          blockType: 'hero-section',
          title: 'ОСАГО',
          ctaText: 'Оформить полис'
        },
        {
          blockType: 'faq-cards',
          cards: [
            { title: 'Как сделать полис ОСАГО онлайн?', id: '1' },
            { title: 'Как правильно сфотографировать машину после аварии?', id: '2' },
            { title: 'Что делать, если попал в ДТП?', id: '3' },
            { title: 'Как найти электронный полис ОСАГО?', id: '4' },
            { title: 'Как заявить о страховом событии?', id: '5' },
            { title: 'От чего зависит стоимость ОСАГО?', id: '6' }
          ]
        },
        {
          blockType: 'info-section',
          title: 'Условия ОСАГО',
          links: [
            { text: 'Зачем нужен полис ОСАГО', href: '#' },
            { text: 'Стоимость и срок действия ОСАГО', href: '#' },
            { text: 'Параметры ОСАГО', href: '#' },
            { text: 'Коэффициент бонус-малус', href: '#' }
          ],
          showMoreLink: 'Подробнее'
        },
        {
          blockType: 'info-section',
          title: 'Оформить ОСАГО',
          links: [
            { text: 'Как оформить ОСАГО', href: '#' },
            { text: 'Как оплатить полис ОСАГО', href: '#' },
            { text: 'Как получить полис ОСАГО', href: '#' },
            { text: 'Как изменить данные в полисе ОСАГО', href: '#' },
            { text: 'Как продлить полис ОСАГО', href: '#' }
          ],
          showMoreLink: 'Подробнее'
        },
        {
          blockType: 'application-form',
          title: 'Оформите полис ОСАГО в Т-Страховании'
        }
      ]
    },
  ],
}
