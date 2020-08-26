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
    if (req.session.user && req.session.user.isAuthenticated){
        res.render('index', {
            title: "Home",
            name: req.session.user.username
        });
    } else {
        res.render('index', {
            title: "Home",
            name: ""
        });
    }
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
            return console.log(`${req.body.username} already exists.`);
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
            if(bcrypt.compareSync(req.body.password, founduser.password)){
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
    Users.findOne({ username: req.body.username }, (err, founduser) => {
        if (err) return console.error(err);
        if(founduser){
            res.redirect('/');
            return console.log(`${req.body.username} already exists.`);
        }
    });
    let query = { username: req.body.oldusername };
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    let update = { $set: {
        username: req.body.username,
        password: hash,
        email: req.body.email,
        age: req.body.age,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3
    }};
    Users.updateOne(query, update, (err, user) => {
        if (err){
            res.redirect('/');
            return console.error(err);
        }
        req.session.user = {
            isAuthenticated: true,
            username: req.body.username
        }
        console.log(req.body.username + ' account info updated');
        res.redirect('/account');
    });
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

exports.api = (req, res) => {
    Users.find((err, foundusers) => {
        if (err){
            return console.error(err);
        }
        let result = [ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ];
        foundusers.forEach(founduser => {
            result[0][founduser.answer1 - 1]++;
            result[1][founduser.answer1 - 5]++;
            result[0][founduser.answer1 - 9]++;
        });
        res.json(result);
    });
};