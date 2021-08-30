const path = require('path')

module.exports = {
    devServer: {
        port: 8090,
        proxy: {
            '/api': {
                target: 'http://www.sowellchina.com/website-api',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
}