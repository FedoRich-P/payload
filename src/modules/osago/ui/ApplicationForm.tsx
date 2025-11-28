'use client'

import React, { useState } from 'react'
import { Info } from 'lucide-react'
import type { OsagoPage } from '@/payload-types'

type ApplicationFormBlock = Extract<
  NonNullable<OsagoPage['layout']>[number],
  { blockType: 'application-form' }
>

const DEFAULT_STEPS: NonNullable<ApplicationFormBlock['steps']> = [
  { number: 1, label: 'Автомобиль' },
  { number: 2, label: 'Документы' },
  { number: 3, label: 'Стоимость' },
  { number: 4, label: 'Оплата' },
]

const DEFAULT_CAR_SECTION: NonNullable<ApplicationFormBlock['carSection']> = {
  title: 'Заполните информацию о легковом автомобиле',
  subtitle: 'Выберите способ заполнения данных',
  progressText: 'Заполнено до показа стоимости:',
  progressPercent: 5,
  progressNote: '+40% за 1-й шаг',
  inputHint: 'Начните вводить марку и модель авто, чтобы выбрать их из списка',
  carPlaceholder: 'Модель автомобиля*',
  bonusText: '+15%',
  helpLink: 'Не могу найти авто в списке',
}

const DEFAULT_INSURER_SECTION: NonNullable<ApplicationFormBlock['insurerSection']> = {
  title: 'Заполните данные страхователя',
  namePlaceholder: 'Фамилия, имя и отчество*',
  phonePlaceholder: 'Номер телефона*',
  consentText:
    'Нажимая далее, я даю согласие на обработку персональных данных и условия страхования, а также получение рекламы',
  submitButton: 'Далее',
}

export function ApplicationForm({
  title,
  steps = DEFAULT_STEPS,
  carSection,
  insurerSection,
}: ApplicationFormBlock) {
  const [activeStep] = useState(1)
  const [formData, setFormData] = useState({
    carModel: '',
    fullName: '',
    phone: '',
  })
  const [inputMethod, setInputMethod] = useState<'manual' | 'gosNumber'>('manual')

  const car = { ...DEFAULT_CAR_SECTION, ...carSection }
  const insurer = { ...DEFAULT_INSURER_SECTION, ...insurerSection }
  const progressPercent = Math.min(Math.max(car.progressPercent ?? 0, 0), 100)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // На проде здесь должна быть интеграция с API страхования
    console.log('OSAGO application form submitted:', formData)
  }

  return (
    <section className="mb-6 rounded-2xl border-2 border-gray-900 bg-white p-8 shadow-lg" id="application-form">
      <h2 className="mb-8 text-center text-3xl font-semibold text-gray-900">{title}</h2>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step.number === activeStep ? 'bg-[#000078] text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.number}
              </div>
              <span className={step.number === activeStep ? 'text-gray-900' : 'text-gray-600'}>{step.label}</span>
            </div>
            {index < steps.length - 1 && <div className="h-px w-12 bg-gray-300" />}
          </React.Fragment>
        ))}
      </div>

      <form className="mx-auto max-w-2xl" onSubmit={handleSubmit}>
        <div className="mb-8">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{car.title}</h3>
              <p className="text-sm text-gray-600">{car.subtitle}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{car.progressText}</p>
              <div className="mb-1 text-2xl font-bold text-gray-900">{progressPercent}%</div>
              <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full bg-[#24b33e]" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="mt-1 text-xs text-gray-600">{car.progressNote}</p>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <button
              className={`rounded-lg border-2 p-4 text-left transition-colors ${
                inputMethod === 'manual' ? 'border-gray-900 bg-[#fff9e6]' : 'border-gray-200 bg-white'
              }`}
              onClick={() => setInputMethod('manual')}
              type="button"
            >
              <div className="mb-1 flex items-center gap-2">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    inputMethod === 'manual' ? 'border-gray-900' : 'border-gray-300'
                  }`}
                >
                  {inputMethod === 'manual' && <span className="h-3 w-3 rounded-full bg-gray-900" />}
                </span>
                <span className="text-gray-900">Указать автомобиль</span>
              </div>
              <p className="ml-7 text-sm text-gray-600">Ввести данные вручную</p>
            </button>

            <button
              className={`rounded-lg border-2 p-4 text-left transition-colors ${
                inputMethod === 'gosNumber' ? 'border-gray-900 bg-[#fff9e6]' : 'border-gray-200 bg-white'
              }`}
              onClick={() => setInputMethod('gosNumber')}
              type="button"
            >
              <div className="mb-1 flex items-center gap-2">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    inputMethod === 'gosNumber' ? 'border-gray-900' : 'border-gray-300'
                  }`}
                >
                  {inputMethod === 'gosNumber' && <span className="h-3 w-3 rounded-full bg-gray-900" />}
                </span>
                <span className="text-gray-900">Указать госномер</span>
              </div>
              <p className="ml-7 text-sm text-gray-600">Автозаполнение данных</p>
            </button>
          </div>

          <p className="mb-4 text-sm text-gray-600">{car.inputHint}</p>

          <div className="relative mb-4">
            <input
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#ffdd2d]"
              onChange={(event) => setFormData({ ...formData, carModel: event.target.value })}
              placeholder={car.carPlaceholder ?? 'Модель автомобиля*'}
              type="text"
              value={formData.carModel}
            />
            {car.bonusText && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-[#24b33e] px-2 py-1 text-xs text-white">
                {car.bonusText}
              </span>
            )}
          </div>

          {car.helpLink && (
            <a className="text-sm text-[#0088cc] transition-colors hover:text-[#006ba3]" href="#">
              {car.helpLink}
            </a>
          )}
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <h3 className="text-xl font-semibold text-gray-900">{insurer.title}</h3>
            <Info className="h-5 w-5 text-gray-400" />
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#ffdd2d]"
              onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
              placeholder={insurer.namePlaceholder ?? 'Фамилия, имя и отчество*'}
              type="text"
              value={formData.fullName}
            />
            <input
              className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#ffdd2d]"
              onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
              placeholder={insurer.phonePlaceholder ?? 'Номер телефона*'}
              type="tel"
              value={formData.phone}
            />
          </div>

          {insurer.consentText && <p className="mb-6 text-sm text-gray-600">{insurer.consentText}</p>}

          <button className="rounded-lg bg-[#000078] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#010157]" type="submit">
            {insurer.submitButton ?? 'Далее'}
          </button>
        </div>
      </form>
    </section>
  )
}
