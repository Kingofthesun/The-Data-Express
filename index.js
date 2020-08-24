const express = require('express');
const routes = require('./routes/routes');
const pug = require('pug');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

const checkAuth = (req, res, next) => {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};

app.use(expressSession({
    secret: 'Istilldontknowwhatthisdoes',
    saveUninitialized: true,
    resave: true
}));

app.get('/', routes.index);
app.get('/create', routes.create);
app.post('/create', urlencodedParser, routes.createUser);
app.post('/', urlencodedParser, routes.login);
app.get('/account', checkAuth, routes.account);
app.post('/account', checkAuth, urlencodedParser, routes.editAccount);//This method was disabled while working on the account.pug -Matthew
app.get('/logout', routes.logout);

app.listen(3000);