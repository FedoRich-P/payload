# Payload + Next.js Production Starter (RU)

Проект собирает в одном репозитории полностью рабочий Payload CMS (админка + API) и фронтенд на Next.js 15 с App Router. Решение основано на официальном payload-стартере, но очищено от демо-артефактов и дополнено реальными компонентами (страница ОСАГО, конструктор блоков, собственный UI).

## Что входит

- Payload 3.64 с SQLite-адаптером для локалки (можно заменить на Postgres/MySQL).
- Next.js 15 + React 19, TailwindCSS, shadcn/ui.
- Готовая коллекция `osago-pages` с блоками `hero-section`, `faq-cards`, `info-section`, `application-form`.
- Конструктор `PageBuilder`, который мапит блоки Payload на React-компоненты.
- Модульная структура `src/modules/*` (например, `modules/osago` и `modules/pages`) с чётким разделением UI и серверной логики.
- Утилиты `getPayloadApp`, `getOsagoPageData`, `getPageBySlug` для типобезопасной работы с Payload из RSC.
- Глобальные Header/Footer из Payload, кастомный маркетинговый хедер и набор client-компонентов.
- Тестовые и продакшн-скрипты, ESLint/Prettier, готовый импорт-карта для админки.

## Требования

- Node.js ≥ 20.9 (или 18.20.2 LTS).
- pnpm ≥ 9.
- SQLite (по умолчанию база `payload.db` создаётся рядом с проектом).

## Быстрый старт

```bash
pnpm install
cp .env.example .env
pnpm dev
```

1. После первого запуска перейдите на `http://localhost:3000/admin`.
2. Создайте пользователя админки.
3. Откроется маркетинговая страница `/osago` с данными из Payload. Если коллекция ещё пустая, `getOsagoPageData` автоматически создаст стартовый документ.

## Переменные окружения

Минимально достаточно значений из `.env.example`:

| Переменная        | Назначение                                   |
|-------------------|----------------------------------------------|
| `PAYLOAD_SECRET`  | секрет для JWT Payload                       |
| `DATABASE_URI`    | строка подключения (по умолчанию SQLite)     |
| `NEXT_PUBLIC_SERVER_URL` | URL фронта, нужен для SEO/OG           |
| `NODE_ENV`        | `development` или `production`               |

Для продакшена пропишите реальные значения и вынесите базу из SQLite (например, на Postgres + миграции Payload).

## Скрипты

| Команда             | Описание |
|---------------------|----------|
| `pnpm dev`          | dev-сервер Next + Payload |
| `pnpm build`        | сборка Next, генерация админки |
| `pnpm start`        | запуск production-сборки |
| `pnpm payload`      | standalone CLI Payload (миграции, seed и т.д.) |
| `pnpm lint`         | ESLint (Next) |
| `pnpm test`         | unit + e2e (Vitest + Playwright) |

## Структура контента Payload

- **Collections**
  - `pages` – универсальные лендинги, обслуживаются маршрутом `[slug]`.
  - `media`, `users` – стандартные сущности Payload (загрузки и админы).
  - `osago-pages` – ваш кастомный лендинг. Документ содержит:
    - `breadcrumbs` – массив ссылок для `Breadcrumbs`.
    - `layout` – массив блоков.
- **Blocks**
  - `hero-section` → `HeroSection`.
  - `faq-cards` → `FaqCards`.
  - `info-section` → `InfoSection`.
  - `application-form` → `ApplicationForm` (с полностью управляемым copy).
- **Globals**
  - `Header`, `Footer` – управляются из Payload, используются в шаблоне.

## Как работает фронтенд

- Глобальный layout: `src/app/(frontend)/layout.tsx`.
  - Подключает шрифты Geist, глобальные стили, админ-бар и маркетинговый Header.
  - Любая страница из группы `(frontend)` оборачивается в общий контур + Footer.
- Маркетинговая страница ОСАГО: `src/app/(frontend)/osago/page.tsx`.
  - Серверный компонент, который вызывает `getOsagoPageData`.
  - Строит список тегов для фильтра, рендерит breadcrumbs, поиск и `PageBuilder`.
  - `generateMetadata` подтягивает title/description из Payload.
- Динамические материалы ОСАГО: `src/app/(frontend)/osago/[slug]/page.tsx`.
  - Статические параметры и метаданные формируются по ссылкам внутри блоков Payload.
  - При переходе по ссылке из блока `info-section` пользователь попадает на страницу с поиском, описанием темы, самим блоком и формой оформления.
- Конструктор: `src/myComponents/PageBuilder/PageBuilder.tsx`.
  - Строго типизирован (использует `OsagoPage['layout']`).
  - Для каждого блока подключает UI-компонент и передаёт данные, полученные из Payload.
  - В конце добавляет `FeedbackSection`, который хранится вне CMS.
- Клиентские компоненты (`SearchBar`, `FilterBar`, `ApplicationForm` и т.д.) собраны в `src/modules/osago/ui`. Каждый модуль инкапсулирует и UI, и серверные функции, поэтому переиспользовать их в новых проектах заметно проще.
- Динамический `[slug]` использует `modules/pages/server/getPageBySlug.ts`. Хелпер скрывает работу с Payload SDK, поэтому страницу можно свободно расширять (поддержка черновиков, кастомного fallback и т.д.) без дублирования запросов.

## Добавление новых блоков

1. Создайте описание блока в `src/blocks`.
2. Добавьте блок в коллекцию `OsagoPage` (поле `layout.blocks`).
3. Напишите React-компонент в `src/myComponents`.
4. Обновите `PageBuilder`, добавив ещё один `case`.
5. Сгенерируйте types, если нужно: `pnpm generate:types`.

## Работа с Payload

- **Вход в админку** – `/admin`.
- **Live Preview** – из коробки включён (`LivePreviewListener`, `AdminBar`).
- **Автосоздание данных** – дефолтный документ для `osago-pages` создаётся при первом запросе (см. `getOsagoPageData`). Поведение можно отключить, если в продакшене данные всегда мигрируются заранее.
- **Импорт компонентов в админке** – собран в `src/app/(payload)/admin/importMap.js`, не редактируйте вручную, генерируйте `pnpm generate:importmap` после изменений.

## Производственный режим

1. **Сборка** – `pnpm build`.
2. **Миграции** (если используете SQL) – `pnpm payload migrate`.
3. **Запуск** – `pnpm start`.
4. **Процесс-менеджер** – pm2/Systemd/Docker, на ваш выбор.
5. **ENV** – обязательно переопределите `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `DATABASE_URI`.
6. **Медиа** – по умолчанию файлы складываются в `public/media`. Для облака подключайте storage-адаптер Payload.

## Тестирование и проверка качества

- `pnpm lint` – проверка кода.
- `pnpm test:int` – unit/интеграционные тесты (Vitest).
- `pnpm test:e2e` – Playwright.
- Перед деплоем прогоните минимум `pnpm lint && pnpm build`.

## Частые вопросы

| Проблема | Решение |
|----------|---------|
| Payload не стартует из-за базы | Убедитесь, что `DATABASE_URI` указывает на существующий файл/подключение. Для SQLite можно оставить `file:payload.db`. |
| Нет данных на `/osago` | Проверьте, что документ `osago` существует в админке. Если его нет, удалите `payload.db` и перезапустите dev-сервер – seed создаст запись заново. |
| Нужны другие языки | Добавьте новые локали в Payload и подмените `lang` в `layout.tsx`. |
| Хотите перенести на Postgres | Замените адаптер в `payload.config.ts` и настройте миграции (`pnpm payload migrate`). |

## Дальнейшее развитие

- Подключите формы отправки (интеграция ApplicationForm с backend).
- Расширьте `FilterBar`, чтобы он реально фильтровал блоки (сейчас хранит только состояние и нотифицирует родителя).
- Добавьте новые коллекции и блоки по аналогии – шаблон задуман как база для дальнейших проектов на Payload.

Если остались вопросы или нужна помощь с кастомизацией — открывайте issue или пишите в Discord Payload. Удачной разработки!
