const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://serverside:troubleInDystopia@dataexpress.opvjx.mongodb.net/DataExpress?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {

});

let user = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number,
    answer1: Number,
    answer2: Number,
    answer3: Number
});

let Users = mongoose.model('User_Collection', user);

exports.index = (req, res) => {
    res.render('index', {
        "title": "Home"
    });
};

exports.create = (req, res) => {
    res.render('create', {
        title: 'Create an Account'
    });
};

exports.createPerson = (req, res) => {
    let newuser = new Users({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3
    });
    newuser.save((err, newuser) => {
        if(err) return console.error(err);
        console.log(req.body.username + ' added');
    });
    res.redirect('/');
};