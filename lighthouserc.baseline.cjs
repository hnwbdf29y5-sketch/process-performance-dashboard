module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview -- --port 4174',
      startServerReadyPattern: 'Local:',
      url: [
        'http://localhost:4174/dashboard?variant=baseline',
        'http://localhost:4174/events?variant=baseline',
        'http://localhost:4174/reports?variant=baseline',
        'http://localhost:4174/settings?variant=baseline',
        'http://localhost:4174/details/line-a?variant=baseline',
      ],
      numberOfRuns: 5,
      settings: {
        preset: 'desktop',
        budgets: require('./budgets.json'),
        chromeFlags: '--headless=new --no-sandbox',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'total-blocking-time': ['warn', { maxNumericValue: 200 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './reports/baseline-lighthouse',
      reportFilenamePattern: '%%PATHNAME%%-baseline-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
}
