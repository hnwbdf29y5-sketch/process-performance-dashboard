# Process Performance Dashboard

Experimental frontend application for the master's thesis topic:

> Web application performance optimization: research of modern methods and tools.

The project represents a process-monitoring dashboard and includes an automated Lighthouse CI pipeline, a performance budget, and report generation scripts.

## Stack

- React
- TypeScript
- Vite
- Lighthouse CI
- GitHub Actions

## Routes

- `/dashboard`
- `/events`
- `/reports`
- `/settings`
- `/details/line-a`

## Commands

```bash
npm install
npm run dev
npm run build
npm run lhci
npm run perf:report
npm run perf:compare
npm run perf:experiment
```

Use `npm run perf:ci` to build the app, run Lighthouse CI, and generate `reports/performance-summary.md`.

Use `npm run perf:experiment` to measure the controlled baseline variant and the optimized variant.
