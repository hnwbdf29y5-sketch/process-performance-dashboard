# Доказательства запусков GitHub Actions

## Регулярный контроль Performance CI

- Workflow: `Performance CI`
- Назначение: строгая проверка оптимизированной версии приложения.
- Команда: `npm run perf:ci`
- Статус: `success`
- Run ID: `26639355758`
- Ссылка: https://github.com/hnwbdf29y5-sketch/process-performance-dashboard/actions/runs/26639355758
- Скриншот: `docs/screenshots/github-actions-performance-ci-strict.jpg`
- Результат: сборка, строгий Lighthouse CI, сводный отчет и проверка performance budget выполнены успешно.

## Полный эксперимент Performance Experiment

- Workflow: `Performance Experiment`
- Назначение: полный прогон baseline/optimized/comparison.
- Команда: `npm run perf:experiment`
- Статус: `success`
- Run ID: `26639799800`
- Ссылка: https://github.com/hnwbdf29y5-sketch/process-performance-dashboard/actions/runs/26639799800
- Скриншот: `docs/screenshots/github-actions-performance-experiment.jpg`
- Длительность: 10 минут 21 секунда.
- Artifact: `performance-experiment-reports`
- Результат: baseline-отчеты, optimized-отчеты, budget-check и сравнение до/после сформированы и загружены как artifact.
- Состав скачанного artifact: 112 файлов, включая 50 HTML-отчетов Lighthouse и 55 JSON-файлов.

## Локальная копия artifact

Artifact полного эксперимента скачан локально:

```text
artifacts/github-actions/26639799800/performance-experiment-reports/
artifacts/zips/performance-experiment-reports-26639799800.zip
```

SHA-256 ZIP-архива:

```text
8a2a466308935b7b3d29be2a182d47b07537960042bd2d59de861177f7ad49d5
```

Папка `artifacts/` не коммитится в репозиторий, чтобы не хранить тяжелые HTML/JSON Lighthouse-отчеты в git. Для диссертации эти файлы можно использовать как приложение или передать ZIP-архивом.
