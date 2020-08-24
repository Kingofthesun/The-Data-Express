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

/*
Note: using findOne with a query to look upt the username
instead of findById. Putting the user's id as a query doesn't
make sense for forms and sessions, which rely on the username.
*/
exports.createUser = (req, res) => {
    let query = { username: req.body.username };
    Users.findOne(query, (err, founduser) => {
        if (err) return console.error(err);
        if(founduser){
            res.redirect('/');
        } else {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(req.body.password, salt);
            let newuser = new Users({
                username: req.body.username,
                password: hash,
                email: req.body.email,
                age: req.body.age,
                answer1: req.body.answer1,
                answer2: req.body.answer2,
                answer3: req.body.answer3
            });
            newuser.save((err, user) => {
                if(err) return console.error(err);
                console.log(req.body.username + ' added');
            });
            res.redirect('/');
        }
    });
    
};

exports.login = (req, res) => {
    console.log(`Trying to log in as ${req.body.username}.`);
    let query = { username: req.body.username };
    Users.findOne(query, (err, founduser) => {
        if (err) return console.error(err);
        if (founduser){
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(req.body.password, salt);
            if(bcrypt.compareSync(hash, founduser.password)){
                req.session.user = {
                    isAuthenticated: true,
                    username: req.body.username
                }
                res.redirect('/account');
            } else {
                console.log(`Found username, but the password ${hash} didn't match.`);
                res.redirect('/');
            }
        } else {
            console.log(`Couldn't find a user with username ${req.body.username}.`);
            res.redirect('/');
        }
    });
}

exports.account = (req, res) => { 
    let query = { username: req.session.user.username };
    Users.findOne(query, (err, founduser) => {
        if (err) return console.error(err);
        //res.cookie('date', Date.now(), {maxAge: 86400000});
        res.render('account', {
            title: 'My Account',
            user: founduser
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

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
};