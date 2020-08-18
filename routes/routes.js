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