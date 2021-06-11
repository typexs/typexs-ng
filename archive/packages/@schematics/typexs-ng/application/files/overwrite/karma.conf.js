// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

<% if(testFramework === 'mocha'){ %>

module.exports = function (config) {
  config.set({
    basePath: 'src',
    exclude: ['test/**'],
    frameworks: ['mocha', 'chai', 'sinon-chai', '@angular/cli'],
    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-sinon'),
      require('karma-sinon-chai'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-mocha-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    /*
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    */
    angularCli: {
      config:'./.angular-cli.json',
      environment: 'dev'
    },
    port: 9876,
    proxies: {
      "/api":"http://localhost:4500/api"
    },
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    preprocessors: {
      './src/app/test.ts': ['@angular/cli']
    },
    reporters:  [ 'mocha'],
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
  });
};

<% } else if(testFramework === 'jasmine'){ %>


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};

<% } %>
