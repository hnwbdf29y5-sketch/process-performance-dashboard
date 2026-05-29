# Чеклист готовности инженерной части

## Выполнено

| Требование из плана | Статус | Где находится |
| --- | --- | --- |
| Экспериментальное frontend-приложение | выполнено | `src/` |
| Русскоязычный интерфейс для скриншотов и защиты | выполнено | `src/App.tsx`, `src/pages/`, `src/data/processData.ts` |
| Панель мониторинга технологического процесса | выполнено | `/dashboard` |
| Журнал событий | выполнено | `/events` |
| Отчеты по производительности | выполнено | `/reports` |
| Страница performance budget | выполнено | `/settings` |
| Карточка контролируемого объекта | выполнено | `/details/line-a` |
| Lighthouse CI | выполнено | `lighthouserc.cjs` |
| Baseline-режим для исходных измерений | выполнено | `lighthouserc.baseline.cjs`, `?variant=baseline` |
| Performance budget | выполнено | `budgets.json` |
| Автоматическая обработка отчетов | выполнено | `scripts/performance-report.js` |
| Сравнение до/после | выполнено | `scripts/compare-performance.js` |
| GitHub Actions workflow | выполнено | `.github/workflows/performance.yml` |
| Исходные метрики | выполнено | `reports/baseline-summary.md` |
| Метрики после оптимизации | выполнено | `reports/performance-summary.md` |
| Сравнительная таблица | выполнено | `reports/performance-comparison.md` |
| Скриншоты приложения | выполнено | `docs/screenshots/` |
| Материалы для главы 3 | выполнено | `docs/chapter-3-materials.md` |

## Что использовать в диссертации

Для главы 3 можно брать:

- описание приложения из `docs/chapter-3-materials.md`;
- план эксперимента из `docs/experiment-plan.md`;
- таблицы измерений из `reports/*.md`;
- скриншоты из `docs/screenshots/`;
- конфигурации из `lighthouserc.cjs`, `lighthouserc.baseline.cjs`, `budgets.json`;
- workflow из `.github/workflows/performance.yml`.

## Что остается за текстовой частью диссертации

Инженерная часть готова. Дальше нужно оформить текст глав, список литературы, графический материал, приложения и презентацию по требованиям кафедры.
