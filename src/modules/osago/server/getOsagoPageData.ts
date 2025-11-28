import type { OsagoPage } from '@/payload-types'
import { getPayloadApp } from '@/shared/server/getPayloadApp'

/**
 * Дефолтный контент, который используем для автоматического заполнения базы,
 * чтобы страницу ОСАГО можно было посмотреть сразу после запуска проекта.
 */
const DEFAULT_OSAGO_PAGE: Pick<OsagoPage, 'title' | 'slug' | 'breadcrumbs'> & {
  layout: NonNullable<OsagoPage['layout']>
} = {
  title: 'ОСАГО',
  slug: 'osago',
  breadcrumbs: [
    { label: 'СОГАЗ', href: '/' },
    { label: 'Страхование', href: '/insurance' },
    { label: 'Автомобили', href: '/insurance/auto' },
  ],
  layout: [
    {
      blockType: 'hero-section',
      title: 'ОСАГО',
      ctaButton: {
        text: 'Оформить полис',
        url: '#application-form',
      },
    },
    {
      blockType: 'faq-cards',
      cards: [
        { title: 'Как сделать полис ОСАГО онлайн?', id: 'faq-1' },
        { title: 'Как правильно сфотографировать машину после аварии?', id: 'faq-2' },
        { title: 'Что делать, если попал в ДТП?', id: 'faq-3' },
        { title: 'Как найти электронный полис ОСАГО?', id: 'faq-4' },
        { title: 'Как заявить о страховом событии?', id: 'faq-5' },
        { title: 'От чего зависит стоимость ОСАГО?', id: 'faq-6' },
      ],
    },
    {
      blockType: 'info-section',
      title: 'Условия ОСАГО',
      links: [
        { text: 'Зачем нужен полис ОСАГО', href: '/osago/why' },
        { text: 'Стоимость и срок действия ОСАГО', href: '/osago/cost' },
        { text: 'Параметры ОСАГО', href: '/osago/params' },
        { text: 'Коэффициент бонус-малус', href: '/osago/bonus-malus' },
      ],
      showMoreLink: 'Подробнее',
    },
    {
      blockType: 'info-section',
      title: 'Оформить ОСАГО',
      links: [
        { text: 'Как оформить ОСАГО', href: '/osago/how-to-buy' },
        { text: 'Как оплатить полис ОСАГО', href: '/osago/payment' },
        { text: 'Как получить полис ОСАГО', href: '/osago/delivery' },
        { text: 'Как изменить данные в полисе ОСАГО', href: '/osago/update-policy' },
        { text: 'Как продлить полис ОСАГО', href: '/osago/renew' },
      ],
      showMoreLink: 'Подробнее',
    },
    {
      blockType: 'application-form',
      title: 'Оформите полис ОСАГО в Согаз',
      steps: [
        { number: 1, label: 'Автомобиль' },
        { number: 2, label: 'Документы' },
        { number: 3, label: 'Стоимость' },
        { number: 4, label: 'Оплата' },
      ],
      carSection: {
        title: 'Заполните информацию о легковом автомобиле',
        subtitle: 'Выберите способ заполнения данных',
        progressText: 'Заполнено до показа стоимости:',
        progressPercent: 5,
        progressNote: '+40% за 1-й шаг',
        inputHint: 'Начните вводить марку и модель авто, чтобы выбрать их из списка',
        carPlaceholder: 'Модель автомобиля*',
        bonusText: '+15%',
        helpLink: 'Не могу найти авто в списке',
      },
      insurerSection: {
        title: 'Заполните данные страхователя',
        namePlaceholder: 'Фамилия, имя и отчество*',
        phonePlaceholder: 'Номер телефона*',
        consentText:
          'Нажимая далее, я даю согласие на обработку персональных данных и условия страхования, а также получение рекламы',
        submitButton: 'Далее',
      },
    },
  ],
}

/**
 * Возвращает документ из коллекции `osago-pages`.
 * Если база ещё пуста — создаёт стартовый документ и возвращает его.
 */
export async function getOsagoPageData(): Promise<OsagoPage | null> {
  try {
    const payload = await getPayloadApp()

    const osagoPage = await payload.find({
      collection: 'osago-pages',
      where: {
        slug: {
          equals: 'osago',
        },
      },
      limit: 1,
    })

    if (osagoPage.docs.length > 0) {
      return osagoPage.docs[0] as OsagoPage
    }

    const seededPage = await payload.create({
      collection: 'osago-pages',
      data: DEFAULT_OSAGO_PAGE,
      overrideAccess: true,
    })

    return seededPage as OsagoPage
  } catch (error) {
    console.error('Error fetching OSAGO page data:', error)
    return null
  }
}
