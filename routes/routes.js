const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://serverside:troubleInDystopia@dataexpress.opvjx.mongodb.net/DataExpress?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {

});

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number,
    answer1: Number,
    answer2: Number,
    answer3: Number
});

let Users = mongoose.model('User_Collection', userSchema);

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
    let user = new Users({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3
    });
    user.save((err, user) => {
        if(err) return console.error(err);
        console.log(req.body.username + ' added');
    });
    res.redirect('/');
};

exports.account = (req, res) => { //When working on the front end, I had to disable most of this method, so things might not work perfectly -Matthew
    Users.findById(req.params.id, (err, user) => {//changed from Users.find(), wasn't working properly
        if (err) return console.error(err);
        res.cookie('date', Date.now(), {maxAge: 86400000});
        res.render('account', {
            title: 'My Account',
            user
            // date: req.cookies.date // this code always crashes the page
        });
    });
}

exports.editAccount = (req, res) => {
    Users.findById(req.body.id, (err, user) => {//changed from Users.find(), wasn't working properly
        if (err) return console.error(err);
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.age = req.body.age;
        user.answer1 = req.body.answer1;
        user.answer2 = req.body.answer2;
        user.answer3 = req.body.answer3;
        user.save((err, user) => {
            if (err) return console.error(err);
            console.log(req.body.username + ' account info updated');
        });
    });
    res.redirect('/');
};