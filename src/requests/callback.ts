module.exports = (url, cb) => {
    if (url !== 'http://localhost:3020/test') {
        cb(Error('url is wrong'))
    } else {
        cb(null, 'test')
    }
}