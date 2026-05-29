module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview -- --port 4175',
      startServerReadyPattern: 'Local:',
      url: [
        'http://localhost:4175/dashboard',
        'http://localhost:4175/events',
        'http://localhost:4175/reports',
        'http://localhost:4175/settings',
        'http://localhost:4175/details/line-a',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        budgets: require('./budgets.json'),
        chromeFlags: '--headless=new --no-sandbox',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './reports/strict-lighthouse',
      reportFilenamePattern: '%%PATHNAME%%-strict-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
}
