module.exports = {
    publicPath:
        process.env.NODE_ENV === 'production' ? '/fragment-shader/' : '/',
    css: {
        extract: false
    }
}
