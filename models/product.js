const getDb = require('../utils/database').getDb;
const mongoDb = require('mongodb');

module.exports = class Product{
    constructor(title,imageUrl,price,description,_id){
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this._id = _id; // Optional
    }
    save(){
        // If already present in database
        const db = getDb(); 
        if(this._id){  
            // editing the details of exisiting product
            return db.collection('products').updateOne({ _id :  new mongoDb.ObjectID(this._id) },{$set : {
                title : this.title,
                imageUrl : this.imageUrl,
                price : this.price,
                description : this.description
            }});
        }
        // adding product
        return db.collection('products').insertOne(this);
    }
    static fetchAll(){
        const db = getDb();
        return db.collection('products').find().toArray();
    }
    static findById(id){
        const db = getDb();
        // Converting id to Bson
        return db.collection('products').findOne({ _id : new mongoDb.ObjectID(id) });
    }
    static deleteById(id){
        const db = getDb();
        return db.collection('products').deleteOne({_id : new mongoDb.ObjectID(id) });
    }
}