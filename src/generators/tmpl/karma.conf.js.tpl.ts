// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html


export const karmaConfJs = "module.exports = function (config) {              \
  config.set({                                                                \
    basePath: '',                                                             \
    frameworks: ['mocha','chai', '@angular/cli'],                             \
    plugins: [                                                                \
      require('karma-mocha'),                                                 \
      require('karma-chai'),                                                  \
      require('karma-chai-as-promised'),                                      \
      require('karma-chrome-launcher'),                                       \
      require('karma-mocha-reporter'),                                        \
      require('karma-coverage-istanbul-reporter'),                            \
      require('@angular/cli/plugins/karma')                                   \
    ],                                                                        \
    client:{                                                                  \
      clearContext: false                                                     \
    },                                                                        \
    coverageIstanbulReporter: {                                               \
      reports: [ 'html', 'lcovonly' ],                                        \
      fixWebpackSourcePaths: true                                             \
    },                                                                        \
    angularCli: {                                                             \
      environment: 'dev'                                                      \
    },                                                                        \
    reporters: ['progress', 'mocha'],                                         \
    port: 9876,                                                               \
    colors: true,                                                             \
    logLevel: config.LOG_INFO,                                                \
    autoWatch: true,                                                          \
    browsers: ['Chrome'],                                                     \
    singleRun: false                                                          \
  });                                                                         \
};                                                                            \
";
