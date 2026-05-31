# Проверка performance budget

Пороговые значения взяты из `budgets.json`. Значения рассчитаны как медиана по Lighthouse CI JSON-отчетам.

| Маршрут | Показатель | Значение | Порог | Статус |
| --- | --- | ---: | ---: | --- |
| /dashboard | LCP | 377 мс | <= 2500 мс | выполнен |
| /dashboard | TBT | 0 мс | <= 200 мс | выполнен |
| /dashboard | CLS | 0.000 | <= 0.1 | выполнен |
| /dashboard | Script transfer | 66 КБ | <= 300 КБ | выполнен |
| /dashboard | Image transfer | 0 КБ | <= 200 КБ | выполнен |
| /dashboard | Total transfer | 71 КБ | <= 700 КБ | выполнен |
| /dashboard | Total requests | 8 | <= 50 | выполнен |
| /details/line-a | LCP | 410 мс | <= 2500 мс | выполнен |
| /details/line-a | TBT | 0 мс | <= 200 мс | выполнен |
| /details/line-a | CLS | 0.000 | <= 0.1 | выполнен |
| /details/line-a | Script transfer | 67 КБ | <= 300 КБ | выполнен |
| /details/line-a | Image transfer | 0 КБ | <= 200 КБ | выполнен |
| /details/line-a | Total transfer | 72 КБ | <= 700 КБ | выполнен |
| /details/line-a | Total requests | 9 | <= 50 | выполнен |
| /events | LCP | 370 мс | <= 2500 мс | выполнен |
| /events | TBT | 0 мс | <= 200 мс | выполнен |
| /events | CLS | 0.037 | <= 0.1 | выполнен |
| /events | Script transfer | 64 КБ | <= 300 КБ | выполнен |
| /events | Image transfer | 0 КБ | <= 200 КБ | выполнен |
| /events | Total transfer | 69 КБ | <= 700 КБ | выполнен |
| /events | Total requests | 7 | <= 50 | выполнен |
| /reports | LCP | 430 мс | <= 2500 мс | выполнен |
| /reports | TBT | 0 мс | <= 200 мс | выполнен |
| /reports | CLS | 0.000 | <= 0.1 | выполнен |
| /reports | Script transfer | 66 КБ | <= 300 КБ | выполнен |
| /reports | Image transfer | 0 КБ | <= 200 КБ | выполнен |
| /reports | Total transfer | 71 КБ | <= 700 КБ | выполнен |
| /reports | Total requests | 8 | <= 50 | выполнен |
| /settings | LCP | 365 мс | <= 2500 мс | выполнен |
| /settings | TBT | 0 мс | <= 200 мс | выполнен |
| /settings | CLS | 0.000 | <= 0.1 | выполнен |
| /settings | Script transfer | 63 КБ | <= 300 КБ | выполнен |
| /settings | Image transfer | 0 КБ | <= 200 КБ | выполнен |
| /settings | Total transfer | 67 КБ | <= 700 КБ | выполнен |
| /settings | Total requests | 5 | <= 50 | выполнен |
