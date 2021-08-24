const path = require('path')

module.exports = {
    devServer: {
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