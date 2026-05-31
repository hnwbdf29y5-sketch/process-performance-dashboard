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
| Baseline-сборка для исходных измерений | выполнено | `npm run build:baseline`, `lighthouserc.baseline.cjs` |
| Performance budget | выполнено | `budgets.json` |
| Проверка `budgets.json` в pipeline | выполнено | `scripts/budget-check.js`, `reports/*budget-check.md` |
| Строгий режим блокировки сборки | выполнено | `lighthouserc.strict.cjs`, `.github/workflows/performance.yml`, `npm run perf:ci` |
| Ручной workflow полного эксперимента | выполнено | `.github/workflows/performance-experiment.yml`, `npm run perf:experiment` |
| Автоматическая обработка отчетов | выполнено | `scripts/performance-report.js` |
| CSV и min/median/max по всем прогонам | выполнено | `scripts/performance-stats.js`, `reports/*-runs.csv`, `reports/*-stats.md` |
| Сравнение до/после | выполнено | `scripts/compare-performance.js` |
| GitHub Actions workflow | выполнено | `.github/workflows/performance.yml` |
| Исходные метрики | выполнено | `reports/baseline-summary.md` |
| Метрики после оптимизации | выполнено | `reports/performance-summary.md` |
| Сравнительная таблица | выполнено | `reports/performance-comparison.md` |
| Скриншоты приложения | выполнено | `docs/print-screenshots/` |
| Скриншот успешного GitHub Actions | выполнено | `docs/print-screenshots/screen_07_performance_ci_success.png` |
| Скриншот строгого Performance CI | выполнено | `docs/print-screenshots/screen_07_performance_ci_success.png` |
| Скриншот полного Performance Experiment | выполнено | `docs/print-screenshots/screen_09_performance_experiment_success.png` |
| Ссылки на успешные GitHub Actions runs | выполнено | `docs/actions-evidence.md` |
| HTML-отчеты Lighthouse для приложений | выполнено | `docs/lighthouse-html/` |
| Таблица “проблема → метрика → оптимизация → результат” | выполнено | `docs/optimization-map.md` |
| Отдельные ветки baseline/optimized | выполнено | `baseline-version`, `optimized-version` |
| Материалы для главы 3 | выполнено | `docs/chapter-3-materials.md` |

## Что использовать в диссертации

Для главы 3 можно брать:

- описание приложения из `docs/chapter-3-materials.md`;
- план эксперимента из `docs/experiment-plan.md`;
- безопасные формулировки из `docs/dissertation-wording.md`;
- ссылки на GitHub Actions из `docs/actions-evidence.md`;
- таблицы измерений из `reports/*.md`;
- скриншоты из `docs/print-screenshots/`;
- конфигурации из `lighthouserc.cjs`, `lighthouserc.baseline.cjs`, `budgets.json`;
- workflow из `.github/workflows/performance.yml` и `.github/workflows/performance-experiment.yml`.

## Что остается за текстовой частью диссертации

Инженерная часть готова. Дальше нужно оформить текст глав, список литературы, графический материал, приложения и презентацию по требованиям кафедры.
