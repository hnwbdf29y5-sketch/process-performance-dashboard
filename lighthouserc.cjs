module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview -- --port 4173',
      startServerReadyPattern: 'Local:',
      url: [
        'http://localhost:4173/dashboard',
        'http://localhost:4173/events',
        'http://localhost:4173/reports',
        'http://localhost:4173/settings',
        'http://localhost:4173/details/line-a',
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
      outputDir: './reports/lighthouse',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
}
