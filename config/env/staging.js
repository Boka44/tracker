module.exports = {
    APP_NAME: 'agghog',
    mongoDb: {
        db: '',
        connectionString: '',
        user: '',
        password: ''
    },
    client: 'http://localhost:3000/',
    sessionTokenExpiry: 604800 // 7 days * 24 hours * 60 mins * 60 secs.,
};
