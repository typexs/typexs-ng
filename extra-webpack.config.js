const _ = require('lodash');
module.exports = (config, options) => {

  if (config.optimization) {
    const plugins = config.optimization.minimizer;
    const terserPlugins = _.filter(plugins, x => x && x.options && x.options.terserOptions)
    for(const terserPlugin of terserPlugins){
      const tO = terserPlugin.options.terserOptions;
      _.assign(tO, {
        keep_classnames: true,
        keep_fnames: true,
        mangle: false,
        compress: false
      });
    }
  }

  return config;
}
