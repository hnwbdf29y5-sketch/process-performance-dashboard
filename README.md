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

В репозитории используется два GitHub Actions workflow:

- `Performance CI` — регулярный строгий контроль оптимизированной версии при push/PR;
- `Performance Experiment` — ручной запуск полного эксперимента baseline/optimized/comparison через `workflow_dispatch`.

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
npm run build:baseline
npm run build:optimized
npm run lint
npm run clean:strict
npm run clean:experiment
npm run lhci
npm run lhci:strict
npm run perf:report
npm run perf:report:strict
npm run perf:stats
npm run budget:check
npm run budget:check:strict
npm run perf:compare
npm run perf:experiment
```

`npm run perf:ci` собирает optimized-версию, запускает строгую конфигурацию Lighthouse CI и формирует `reports/strict-summary.md` и `reports/strict-budget-check.md`. В этом режиме превышение ключевых порогов завершает проверку ошибкой.

`npm run perf:experiment` выполняет полный цикл: baseline-сборка, 9 прогонов Lighthouse CI, отчеты baseline, optimized-сборка, 9 прогонов Lighthouse CI, отчеты optimized, CSV всех прогонов и сравнение в `reports/performance-comparison.md`.

## Артефакты для диссертации

- `budgets.json` — performance budget;
- `lighthouserc.cjs` — конфигурация Lighthouse CI для оптимизированной версии;
- `lighthouserc.baseline.cjs` — конфигурация Lighthouse CI для исходной версии;
- `lighthouserc.strict.cjs` — строгая конфигурация, где превышение порогов завершает проверку ошибкой;
- `reports/baseline-summary.md` — исходные показатели;
- `reports/performance-summary.md` — показатели после оптимизации;
- `reports/baseline-stats.md` — min/median/max по исходным прогонам;
- `reports/optimized-stats.md` — min/median/max по optimized-прогонам;
- `reports/baseline-runs.csv` — все baseline-прогоны;
- `reports/optimized-runs.csv` — все optimized-прогоны;
- `reports/performance-comparison.md` — таблица сравнения до/после;
- `reports/baseline-budget-check.md` — проверка исходной версии по `budgets.json`;
- `reports/performance-budget-check.md` — проверка оптимизированной версии по `budgets.json`;
- `reports/strict-summary.md` — сводка строгого CI-запуска;
- `reports/strict-budget-check.md` — проверка budget по строгому CI-запуску;
- `docs/experiment-plan.md` — методика эксперимента;
- `docs/chapter-3-materials.md` — готовые материалы для главы 3;
- `docs/optimization-map.md` — таблица “проблема → метрика → оптимизация → результат”;
- `docs/dissertation-wording.md` — безопасные формулировки для текста диссертации и защиты;
- `docs/actions-evidence.md` — ссылки на успешные GitHub Actions runs и локальный ZIP artifact;
- `docs/print-screenshots/` — печатные PNG-скриншоты интерфейса, отчетов и конфигураций;
- `docs/lighthouse-html/` — HTML-отчеты Lighthouse для приложений.

## GitHub Actions

`Performance CI` запускается автоматически при push в `main` и pull request. Он проверяет текущую оптимизированную версию через `npm run perf:ci`; нарушение ключевых порогов завершает job ошибкой.

`Performance Experiment` запускается вручную из вкладки Actions. Он выполняет полный цикл `npm run perf:experiment`: baseline-измерения, optimized-измерения, budget-check и формирование сравнения до/после. Этот workflow нужен как доказательный артефакт для диссертации, но не запускается на каждый коммит, чтобы не расходовать CI-минуты без необходимости.

## Как интерпретировать результаты

Исходная версия является baseline-сборкой с воспроизводимой неоптимизированной обработкой локальной телеметрии в основном потоке браузера. Ее задача — проверить, выявляет ли автоматизированный контур превышение порогов и фиксирует ли эффект после оптимизации.

Основной доказанный эффект оптимизации относится к блокировке основного потока. В финальном эксперименте baseline TBT составил 272 мс для `/dashboard`, 288 мс для `/events`, 305 мс для `/reports` и 296 мс для `/details/line-a`; после переноса обработки телеметрии в Web Worker optimized-сборка показала TBT 0 мс на всех маршрутах. Ресурсные метрики находятся в пределах performance budget.

## Ветки эксперимента

- `main` и `optimized-version` — оптимизированная версия приложения;
- `baseline-version` — историческая ветка раннего эксперимента.

Актуальный baseline формируется сборочной командой `npm run build:baseline`, а не query-параметром.
