// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

// const { SpecReporter } = require('mocha-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: "<%= testFramework %>",
  mochaOpts: {
    reporter: "spec",
    slow: 3000,
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  }
};
