module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview -- --port 4174',
      startServerReadyPattern: 'Local:',
      url: [
        'http://localhost:4174/dashboard',
        'http://localhost:4174/events',
        'http://localhost:4174/reports',
        'http://localhost:4174/settings',
        'http://localhost:4174/details/line-a',
      ],
      numberOfRuns: 9,
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
