const express = require('express');
const routes = require('./routes/routes');
const pug = require('pug');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

let urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get('/', routes.index);
app.get('/create', routes.create);
app.post('/create', urlencodedParser, routes.createPerson);
app.get('/account', routes.account);
app.post('/account', urlencodedParser, routes.editAccount);

app.listen(3000); //I feel like this should be changed, but I don't know to what