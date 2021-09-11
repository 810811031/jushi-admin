const path = require('path')

module.exports = {
    devServer: {
        port: 8090,
        proxy: {
            '/api': {
                target: 'http://test-web.sowellchina.com/api',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
}