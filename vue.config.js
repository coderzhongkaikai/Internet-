module.exports = {
    publicPath: './',
    outputDir: 'dist',
    devServer: {
        proxy: {
          '/api': {
            target: 'http://39.106.205.203:8084',
            pathRewrite: {'^/api' : ''}
          }
        }
    }
};