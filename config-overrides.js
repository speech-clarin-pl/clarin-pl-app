

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
    if (!config.plugins) {
        config.plugins = [];
    }

    config.plugins.push(
        (process.env.NODE_ENV === 'production') ?
            new CopyWebpackPlugin([{from: 'src/utils/wavesurfer.js'}]) :
            new CopyWebpackPlugin([{from: 'src/utils/wavesurfer.js', to: 'dist'}])
    );

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
