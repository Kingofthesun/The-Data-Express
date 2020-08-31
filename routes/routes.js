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
    let day = 0, month = 0, year = 0, visited = false;
    if (req.cookies.day && req.cookies.month && req.cookies.year){
        visited = true;
        day = req.cookies.day;
        month = req.cookies.month;
        year = req.cookies.year;
    }
    date = new Date();
    res.cookie('day', date.getDate(), {maxAge: 86400000});
    res.cookie('month', date.getMonth(), {maxAge: 86400000});
    res.cookie('year', date.getFullYear(), {maxAge: 86400000});
    month++;
    if (req.session.user && req.session.user.isAuthenticated){
        res.render('index', {
            title: "Home",
            name: req.session.user.username,
            visited: visited,
            day: day,
            month: month,
            year: year
        });
    } else {
        res.render('index', {
            title: "Home",
            name: "",
            visited: visited,
            day: day,
            month: month,
            year: year
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
        } else if (!req.body.password){
            res.redirect('/');
            return console.log(`No blank passwords allowed.`);
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
                console.log(`Found username, but the password didn't match.`);
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
        res.render('account', {
            title: 'My Account',
            user: founduser
        });
    });
}

exports.editAccount = (req, res) => {
    let safeToEdit = true;
    if (req.body.username != req.body.oldusername){
        Users.findOne({ username: req.body.username }, (err, founduser) => {
            if (err){ 
                safeToEdit = false;
                return console.error(err);
            }
            if(founduser){
                safeToEdit = false;
                return console.log(`${req.body.username} already exists.`);
            }
        });
    }
    if (!req.body.password){
        safeToEdit = false;
        return console.log(`No blank passwords allowed.`);
    }
    if (safeToEdit){
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
                res.redirect('/account');
                return console.error(err);
            }
            console.log(req.body.username + ' account info updated');
            if (req.body.oldusername != req.body.username){
                req.session.destroy(err => {
                    if (err) {
                        console.log(err);
                        res.redirect('/account');
                        return console.error(err);
                    } else {
                        res.redirect('/');
                        return console.log(`Username changed. Session had to be destroyed.`);
                    }
                });
            } else {
                res.redirect('/account');
                return console.log(`Username not changed. Refreshing the page.`);
            }
        });
    } else {
        res.redirect('/');
    }
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
            result[1][founduser.answer2 - 5]++;
            result[2][founduser.answer3 - 9]++;
        });
        res.json(result);
    });
};