/**
 * Environment dependent configuration properties
 */
module.exports = {
    local: {
        root: require('path').normalize(__dirname + '/..'),
        app: {
            name: 'Brain'
        },
        db_url: 'mongodb://localhost:27017/brain',
        version: '0.1.0'
    }
}