# План экспериментального исследования

Прототип используется для проверки автоматизированной методики оценки и оптимизации производительности клиентской части веб-приложения. Эксперимент сравнивает две сборки одного приложения: исходную неоптимизированную и оптимизированную.

## Измеряемые маршруты

- `/dashboard` — панель мониторинга технологического процесса;
- `/events` — журнал событий с фильтрацией и сортировкой;
- `/reports` — сводные отчеты и агрегаты по измерениям;
- `/settings` — пороговые значения контроля;
- `/details/line-a` — карточка контролируемого объекта.

## Экспериментальные версии

- baseline-сборка: `VITE_EXPERIMENT_MODE=baseline npm run build`;
- optimized-сборка: `VITE_EXPERIMENT_MODE=optimized npm run build`.

Baseline не включается query-параметром. Это отдельное состояние сборки, в котором обработка локальной телеметрии выполняется синхронно в основном потоке браузера. Optimized-сборка выполняет тот же расчет через Web Worker и сохраняет ленивую загрузку разделов через `React.lazy`.

## Последовательность эксперимента

1. Очистить предыдущие экспериментальные отчеты.
2. Собрать baseline-версию приложения.
3. Запустить Lighthouse CI для пяти маршрутов baseline-версии.
4. Выполнить 9 прогонов для каждого маршрута.
5. Сохранить HTML/JSON Lighthouse-отчеты.
6. Сформировать summary, CSV всех прогонов и min/median/max-статистику.
7. Проверить baseline-версию по `budgets.json`.
8. Собрать optimized-версию приложения.
9. Повторить измерения и обработку отчетов.
10. Сформировать таблицу сравнения до/после.

Полная команда:

```bash
npm run perf:experiment
```

## Измеряемые метрики

- Lighthouse Performance Score;
- FCP;
- LCP;
- TBT;
- CLS;
- Speed Index;
- объем JavaScript-передачи;
- общий объем переданных ресурсов;
- количество сетевых запросов.

## Виды исходной нагрузки

| Исходная проблема | Метрика | Оптимизация |
| --- | --- | --- |
| Синхронная обработка телеметрии в UI-thread | TBT | перенос расчета в Web Worker |
| Повторный расчет агрегатов для нескольких разделов | TBT, Performance Score | единая фоновая обработка результата |
| Загрузка разделов приложения | JS transfer | route-level code splitting через `React.lazy` |
| Ручная проверка метрик | все метрики | Lighthouse CI, `budgets.json`, CSV и Markdown-отчеты |

## Артефакты

- `reports/baseline-summary.md`;
- `reports/performance-summary.md`;
- `reports/baseline-stats.md`;
- `reports/optimized-stats.md`;
- `reports/baseline-runs.csv`;
- `reports/optimized-runs.csv`;
- `reports/performance-comparison.md`;
- `reports/*-budget-check.md`;
- `reports/baseline-lighthouse/`;
- `reports/lighthouse/`.

## Режимы контроля

- `lighthouserc.baseline.cjs` — исследовательский baseline, 9 прогонов;
- `lighthouserc.cjs` — optimized-измерения, 9 прогонов;
- `lighthouserc.strict.cjs` — строгий CI-контроль optimized-сборки, 3 прогона и `error` при нарушении ключевых порогов.
