const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://pj28105:helloapp@shopping-app-prjeu.mongodb.net/test?retryWrites=true&w=majority',{ useUnifiedTopology: true })
        .then(client => {
            console.log("Database Connected!");
            _db = client.db('Shop');
            callback();
        })
        .catch(err => console.log(err));
}

// A Mongodb connection manager
const getDb = () => {
    if(_db){
        return _db;
    }else{
        throw 'Database Connection Error';
    }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;