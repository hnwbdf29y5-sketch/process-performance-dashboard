# Панель контроля производительности веб-приложения

Экспериментальное frontend-приложение для магистерской диссертации по теме:

> Оптимизация производительности веб-приложений: исследование современных методов и инструментов.

Проект представляет собой русскоязычный веб-интерфейс мониторинга параметров технологического процесса и демонстрирует автоматизированный контур контроля производительности клиентской части.

## Назначение

Приложение используется как инженерный артефакт для экспериментальной проверки методики:

1. сборка frontend-приложения;
2. запуск тестового preview-сервера;
3. автоматический аудит маршрутов через Lighthouse CI;
4. сравнение метрик с performance budget;
5. формирование сводных Markdown/JSON-отчетов;
6. сравнение исходной и оптимизированной версий.

## Стек

- React
- TypeScript
- Vite
- Lighthouse CI
- GitHub Actions

## Маршруты

- `/dashboard` — панель мониторинга;
- `/events` — журнал событий;
- `/reports` — отчеты по производительности;
- `/settings` — пороговые значения performance budget;
- `/details/line-a` — карточка контролируемого объекта.

## Команды

```bash
npm install
npm run dev
npm run build
npm run lint
npm run lhci
npm run perf:report
npm run perf:compare
npm run perf:experiment
```

`npm run perf:ci` собирает приложение, запускает Lighthouse CI и формирует `reports/performance-summary.md`.

`npm run perf:experiment` измеряет контролируемую исходную версию (`?variant=baseline`), оптимизированную версию и формирует сравнение в `reports/performance-comparison.md`.

## Артефакты для диссертации

- `budgets.json` — performance budget;
- `lighthouserc.cjs` — конфигурация Lighthouse CI для оптимизированной версии;
- `lighthouserc.baseline.cjs` — конфигурация Lighthouse CI для исходной версии;
- `reports/baseline-summary.md` — исходные показатели;
- `reports/performance-summary.md` — показатели после оптимизации;
- `reports/performance-comparison.md` — таблица сравнения до/после;
- `docs/experiment-plan.md` — методика эксперимента;
- `docs/chapter-3-materials.md` — готовые материалы для главы 3;
- `docs/screenshots/` — скриншоты русскоязычного интерфейса для приложений.
