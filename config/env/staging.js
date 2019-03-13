module.exports = {
    APP_NAME: 'agghog',
    mongoDb: {
        db: 'agghog-uat',
        connectionString: 'ds115071.mlab.com:15071',
        user: 'agghog',
        password: 's3cret'
    },
    client: 'http://localhost:3000/',
    sessionTokenExpiry: 604800 // 7 days * 24 hours * 60 mins * 60 secs.,
};