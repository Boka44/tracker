const mongoose = require('mongoose');
const config = require(`./env/staging`);
console.log(process.env.NODE_ENV);


const options = {
    user: config.mongoDb.user,
    pass: config.mongoDb.password,
    useNewUrlParser: true
}

// mongoose.connect(`mongodb://${config.mongoDb.user}:${config.mongoDb.password}@${config.mongoDb.connectionString}/${config.mongoDb.db}`, options)
mongoose.connect(`mongodb://@${config.mongoDb.connectionString}/${config.mongoDb.db}`, options)
    .then((res) => {
        console.log("Connected to database.")
    }, err => {
        console.log(err);
        throw err;
    })
    
mongoose.Promise = global.Promise;