var path = require('path');
var fs = require('fs');
const webpack = require("webpack");

const {
    override,
    addDecoratorsLegacy,
    babelInclude,
    disableEsLint,
} = require("customize-cra");

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(config,env){
    return Object.assign(config, override(
        //disableEsLint(),
        //addDecoratorsLegacy(),
        babelInclude([
            path.resolve('src'),
            fs.realpathSync('node_modules/react-keyed-file-browser-clarin/src')
        ])
        )(config, env)
    )
}


module.exports = function override(config, env) {

    
    if (!config.plugins) {
        config.plugins = [];
    }

    const videojsPlugin = new webpack.ProvidePlugin({
        videojs: "video.js/dist/video.cjs.js"
      });

    const videojsAlias = {
        videojs: "video.js",
        WaveSurfer: "wavesurfer.js"
    };

    config.resolve.alias = { ...config.resolve.alias, ...videojsAlias };
    config.plugins.push(videojsPlugin);

   // config.plugins.push(
   //     (process.env.NODE_ENV === 'production') ?
   //         new CopyWebpackPlugin([{from: 'src/utils/wavesurfer.js'}]) :
   //         new CopyWebpackPlugin([{from: 'src/utils/wavesurfer.js', to: 'dist'}])
   // );

    // config.plugins.push(
    //     new webpack.ProvidePlugin({
    //         WaveSurfer: 'wavesurfer.js'
    //       }) 
    // );

    // config.resolve = {
    //     ...config.resolve,
    //     alias: {
    //         wavesurfer: require.resolve('wavesurfer.js')
    //       }
    // }

    return config;
}
