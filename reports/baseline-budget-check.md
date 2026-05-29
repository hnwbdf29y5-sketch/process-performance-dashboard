# Проверка performance budget

Пороговые значения взяты из `budgets.json`. Значения рассчитаны как медиана по Lighthouse CI JSON-отчетам.

| Маршрут | Показатель | Значение | Порог | Статус |
| --- | --- | ---: | ---: | --- |
| /dashboard | LCP | 395 мс | <= 2500 мс | выполнен |
| /dashboard | TBT | 270 мс | <= 200 мс | превышен |
| /dashboard | CLS | 0.000 | <= 0.1 | выполнен |
| /dashboard | Script transfer | 148 KB | <= 300 KB | выполнен |
| /dashboard | Image transfer | 19 KB | <= 200 KB | выполнен |
| /dashboard | Total transfer | 172 KB | <= 700 KB | выполнен |
| /dashboard | Total requests | 9 | <= 50 | выполнен |
| /details/line-a | LCP | 393 мс | <= 2500 мс | выполнен |
| /details/line-a | TBT | 270 мс | <= 200 мс | превышен |
| /details/line-a | CLS | 0.000 | <= 0.1 | выполнен |
| /details/line-a | Script transfer | 148 KB | <= 300 KB | выполнен |
| /details/line-a | Image transfer | 19 KB | <= 200 KB | выполнен |
| /details/line-a | Total transfer | 172 KB | <= 700 KB | выполнен |
| /details/line-a | Total requests | 9 | <= 50 | выполнен |
| /events | LCP | 373 мс | <= 2500 мс | выполнен |
| /events | TBT | 290 мс | <= 200 мс | превышен |
| /events | CLS | 0.000 | <= 0.1 | выполнен |
| /events | Script transfer | 147 KB | <= 300 KB | выполнен |
| /events | Image transfer | 19 KB | <= 200 KB | выполнен |
| /events | Total transfer | 171 KB | <= 700 KB | выполнен |
| /events | Total requests | 8 | <= 50 | выполнен |
| /reports | LCP | 373 мс | <= 2500 мс | выполнен |
| /reports | TBT | 290 мс | <= 200 мс | превышен |
| /reports | CLS | 0.000 | <= 0.1 | выполнен |
| /reports | Script transfer | 147 KB | <= 300 KB | выполнен |
| /reports | Image transfer | 19 KB | <= 200 KB | выполнен |
| /reports | Total transfer | 171 KB | <= 700 KB | выполнен |
| /reports | Total requests | 8 | <= 50 | выполнен |
| /settings | LCP | 372 мс | <= 2500 мс | выполнен |
| /settings | TBT | 290 мс | <= 200 мс | превышен |
| /settings | CLS | 0.000 | <= 0.1 | выполнен |
| /settings | Script transfer | 147 KB | <= 300 KB | выполнен |
| /settings | Image transfer | 19 KB | <= 200 KB | выполнен |
| /settings | Total transfer | 171 KB | <= 700 KB | выполнен |
| /settings | Total requests | 8 | <= 50 | выполнен |
