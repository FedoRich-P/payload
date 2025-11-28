import { Block } from 'payload'

export const ApplicationForm: Block = {
  slug: 'application-form',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Оформите полис ОСАГО в Согаз',
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'number',
          type: 'number',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { number: 1, label: 'Автомобиль' },
        { number: 2, label: 'Документы' },
        { number: 3, label: 'Стоимость' },
        { number: 4, label: 'Оплата' }
      ],
    },
    {
      name: 'carSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Заполните информацию о легковом автомобиле',
        },
        {
          name: 'subtitle',
          type: 'text',
          defaultValue: 'Выберите способ заполнения данных',
        },
        {
          name: 'progressText',
          type: 'text',
          defaultValue: 'Заполнено до показа стоимости:',
        },
        {
          name: 'progressPercent',
          type: 'number',
          defaultValue: 5,
        },
        {
          name: 'progressNote',
          type: 'text',
          defaultValue: '+40% за 1-й шаг',
        },
        {
          name: 'inputHint',
          type: 'text',
          defaultValue: 'Начните вводить марку и модель авто, чтобы выбрать их из списка',
        },
        {
          name: 'carPlaceholder',
          type: 'text',
          defaultValue: 'Модель автомобиля*',
        },
        {
          name: 'bonusText',
          type: 'text',
          defaultValue: '+15%',
        },
        {
          name: 'helpLink',
          type: 'text',
          defaultValue: 'Не могу найти авто в списке',
        },
      ],
    },
    {
      name: 'insurerSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Заполните данные страхователя',
        },
        {
          name: 'namePlaceholder',
          type: 'text',
          defaultValue: 'Фамилия, имя и отчество*',
        },
        {
          name: 'phonePlaceholder',
          type: 'text',
          defaultValue: 'Номер телефона*',
        },
        {
          name: 'consentText',
          type: 'textarea',
          defaultValue: 'Нажимая далее, я даю согласие на обработку персональных данных и условия страхования, а также получение рекламы',
        },
        {
          name: 'submitButton',
          type: 'text',
          defaultValue: 'Далее',
        },
      ],
    },
  ],
}
