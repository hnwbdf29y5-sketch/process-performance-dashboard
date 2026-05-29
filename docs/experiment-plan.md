# Experiment Plan

The prototype verifies an automated performance-control method for a React/Vite frontend application.

Measured routes:

- `/dashboard`
- `/events`
- `/reports`
- `/settings`
- `/details/line-a`

Pipeline:

1. Build the frontend artifact.
2. Start the Vite preview server.
3. Run Lighthouse CI five times for every route.
4. Export HTML and JSON Lighthouse reports.
5. Calculate median values for the selected metrics.
6. Compare the measured values with the performance budget.
7. Generate a Markdown and JSON summary for the thesis tables.

Measured metrics:

- Lighthouse Performance Score
- FCP
- LCP
- TBT
- CLS
- Speed Index
- total transfer size
- request count

Experimental variants:

- baseline: URLs include `?variant=baseline`, which activates controlled main-thread load and extra DOM work to represent an unoptimized initial version;
- optimized: regular route URLs without the query parameter.
