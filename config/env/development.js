module.exports = {
    APP_NAME: 'Tracker',
    mongoDb: {
        db: 'gh-lite-dev',
        connectionString: 'ds157735.mlab.com:57735',
        user: 'gh',
        password: 's3cret'
    },
    client: 'http://localhost:3000/',
    sessionTokenExpiry: 604800 // 7 days * 24 hours * 60 mins * 60 secs.,
};

