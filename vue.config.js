const path = require('path')
const resolve = function (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: true, // 是否开启eslint保存检测
    productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@views', resolve('src/views'))
            .set('@assets', resolve('src/assets'))
        // config.optimization.runtimeChunk('single')
    },
    devServer: {
        host: '0.0.0.0',
        port: '8080',
        hot: true,
        open: true,
        overlay: {
            warning: false,
            error: true,
        },
        proxy: {
            [process.env.VUE_APP_BASE_RUL]: {
                target: process.env.VUE_APP_BASE_RUL,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_RUL]: '',
                },
            },
        },
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "./src/assets/styles/base";`,
            },
        },
    },
}
