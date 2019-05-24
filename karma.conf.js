// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html



module.exports = function (config) {
  config.set({
    basePath: 'src',
    exclude: ['test/**'],
    frameworks: ['es6-shim','mocha', 'chai', 'sinon-chai', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-es6-shim'),
      require('karma-sinon'),
      require('karma-sinon-chai'),
      require('karma-chrome-launcher'),
      require('karma-mocha-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    /*
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'), reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    */
    
    port: 9876,
    proxies: {
      "/api":"http://localhost:4500/api"
    },
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    //preprocessors: {
    //  './src/app/test.ts': ['@angular-devkit/build-angular']
    //},
    reporters:  [ 'mocha'],
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
  });
};


