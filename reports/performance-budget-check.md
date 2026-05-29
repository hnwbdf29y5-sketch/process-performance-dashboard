# Проверка performance budget

Пороговые значения взяты из `budgets.json`. Значения рассчитаны как медиана по Lighthouse CI JSON-отчетам.

| Маршрут | Показатель | Значение | Порог | Статус |
| --- | --- | ---: | ---: | --- |
| /dashboard | LCP | 373 мс | <= 2500 мс | выполнен |
| /dashboard | TBT | 0 мс | <= 200 мс | выполнен |
| /dashboard | CLS | 0.000 | <= 0.1 | выполнен |
| /dashboard | Script transfer | 66 KB | <= 300 KB | выполнен |
| /dashboard | Image transfer | 0 KB | <= 200 KB | выполнен |
| /dashboard | Total transfer | 71 KB | <= 700 KB | выполнен |
| /dashboard | Total requests | 7 | <= 50 | выполнен |
| /details/line-a | LCP | 372 мс | <= 2500 мс | выполнен |
| /details/line-a | TBT | 0 мс | <= 200 мс | выполнен |
| /details/line-a | CLS | 0.000 | <= 0.1 | выполнен |
| /details/line-a | Script transfer | 66 KB | <= 300 KB | выполнен |
| /details/line-a | Image transfer | 0 KB | <= 200 KB | выполнен |
| /details/line-a | Total transfer | 71 KB | <= 700 KB | выполнен |
| /details/line-a | Total requests | 7 | <= 50 | выполнен |
| /events | LCP | 372 мс | <= 2500 мс | выполнен |
| /events | TBT | 0 мс | <= 200 мс | выполнен |
| /events | CLS | 0.000 | <= 0.1 | выполнен |
| /events | Script transfer | 65 KB | <= 300 KB | выполнен |
| /events | Image transfer | 0 KB | <= 200 KB | выполнен |
| /events | Total transfer | 70 KB | <= 700 KB | выполнен |
| /events | Total requests | 6 | <= 50 | выполнен |
| /reports | LCP | 370 мс | <= 2500 мс | выполнен |
| /reports | TBT | 0 мс | <= 200 мс | выполнен |
| /reports | CLS | 0.000 | <= 0.1 | выполнен |
| /reports | Script transfer | 65 KB | <= 300 KB | выполнен |
| /reports | Image transfer | 0 KB | <= 200 KB | выполнен |
| /reports | Total transfer | 70 KB | <= 700 KB | выполнен |
| /reports | Total requests | 6 | <= 50 | выполнен |
| /settings | LCP | 373 мс | <= 2500 мс | выполнен |
| /settings | TBT | 0 мс | <= 200 мс | выполнен |
| /settings | CLS | 0.000 | <= 0.1 | выполнен |
| /settings | Script transfer | 65 KB | <= 300 KB | выполнен |
| /settings | Image transfer | 0 KB | <= 200 KB | выполнен |
| /settings | Total transfer | 70 KB | <= 700 KB | выполнен |
| /settings | Total requests | 6 | <= 50 | выполнен |
