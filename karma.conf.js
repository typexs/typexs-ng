// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/karma'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    restartOnFileChange: true
//
//     basePath: 'src',
//     exclude: ['test/**'],
//     frameworks: ['mocha', 'chai', 'sinon-chai', '@angular-devkit/build-angular'],
//     plugins: [
//       require('karma-chai'),
// //      require('karma-es6-shim'),
//       require('karma-sinon'),
//       require('karma-sinon-chai'),
//       require('karma-chrome-launcher'),
//       require('karma-mocha-reporter'),
//       require('karma-coverage-istanbul-reporter'),
//       require('@angular-devkit/build-angular/plugins/karma')
//     ],
//     client: {
//       clearContext: false // leave Jasmine Spec Runner output visible in browser
//     },
//
//     coverageIstanbulReporter: {
//       dir: require('path').join(__dirname, 'coverage/karma'),
//       reports: ['html', "json",'lcovonly'],
//       fixWebpackSourcePaths: true
//     },
//
//
//     port: 9876,
//     proxies: {
//       "/api": "http://localhost:4500/api"
//     },
//     colors: true,
//     logLevel: config.LOG_INFO,
//     autoWatch: true,
//     browsers: ['ChromeHeadless'],
//     singleRun: false,
//     // preprocessors: {
//     //  './src/app/test.ts': ['@angular-devkit/build-angular']
//     // },
//     reporters: ['mocha'],
//     mime: {
//       'text/x-typescript': ['ts', 'tsx']
//     },
  });
};


