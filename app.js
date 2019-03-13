const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
// const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
// const session = require("express-session");
const moment = require('moment');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static('public/dist/tracker'));

require('./config/database');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

//logger initialization
app.use(require('logger').init({ requsetKey: "user" }));
app.use(require('logger').logApis);

if (!fs.existsSync("./reports")) {
    fs.mkdirSync("./reports");
}

require('./api/routes/index')(app);

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    // error message
    const response = req.app.get('env') === 'dev' ? {
        success: false,
        message: err.message,
        stack: err.stack
    } : {
        success: false,
        message: err.message,
        status: err.status || 500
    };

    // send error message
    res.status(err.status || 500);
    res.send(response);
});

// app.use(session({ 
// 	secret: "itsASecretToEveryone",
// 	resave: false,
// 	saveUninitialized: false
//  }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
})