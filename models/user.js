const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = require('./product');

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone_num: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
});

userSchema.methods.addToCart = function (productId) {
    return Product.findById(productId)
        .then(product => {
            let index = this.cart.items.findIndex(ele => {
                return String(ele.productId) === String(product._id);
            });
            // Not Present In Cart
            if (index == -1) {
                // Add New Product To Cart
                this.cart.items.push({ productId: product._id, quantity: 1 });
            } else {
                this.cart.items[index].quantity++;
            }
            return this.save();
        }).catch(err => {
            console.log(err);
        });
}

userSchema.methods.RemoveCart = function (productId) {
    return Product.findById(productId)
        .then(product => {
            const deleteIndex = this.cart.items.findIndex(ele => {
                return ele.productId == productId;
            });
            this.cart.items[deleteIndex].quantity--;
            if (this.cart.items[deleteIndex].quantity == 0) {
                this.cart.items.splice(deleteIndex, 1);
            }
            return this.save();
        }).catch(err => {
            console.log(err);
        });
}

module.exports = mongoose.model('User', userSchema);

// const getDb = require('../utils/database').getDb;
// const mongoDb = require('mongodb');
// const Product = require('../models/product');

// module.exports = class User {
//     constructor(username, email, phone_num, address, _id, cart) {
//         this._id = _id;
//         this.username = username;
//         this.email = email;
//         this.phone_num = phone_num;
//         this.address = address;
//         this.cart = cart;
//         /*
//             Cart Structure =>

//             cart
//                 {
//                     items : [
//                         {
//                              productId : Id,
//                              quantity : 1
//                         }
//                         {
//                              productId : Id,
//                              quantity : 2
//                         }
//                     ]
//                 }
//         */

//     }

//     save() {
//         const db = getDb();
//         if (this._id) {
//             // Existing
//             return db.collection('users').updateOne({ _id: new mongoDb.ObjectID(id) }, {
//                 $set: {
//                     username: this.username,
//                     email: this.email,
//                     phone_num: this.phone_num,
//                     address: this.address
//                 }
//             });
//         }
//         return db.collection('users').insertOne(this);
//     }

//     static findById(id) {
//         const db = getDb();
//         return db.collection('users').findOne({ _id: new mongoDb.ObjectID(id) });
//     }

//     getCart() {
//         const db = getDb();
//         const productIds = this.cart.items.map(ele => {
//             return new mongoDb.ObjectID(ele.productId);
//         });
//         const m = new Map();
//         this.cart.items.forEach(ele => {
//             m.set(String(ele.productId), ele.quantity);
//         });
//         return db.collection('products').find({ _id: { $in: productIds } }).toArray()
//             .then(products => {
//                 const cart = products.map(ele => {
//                     return {
//                         ...ele,
//                         quantity: m.get(String(ele._id))
//                     };
//                 });
//                 return cart;
//             }).catch(err => {
//                 console.log(err);
//                 res.redirect("/invalid");
//             });
//     }

//     // Adds Item to Cart
//     addToCart(productId) {
//         const db = getDb();
//         return db.collection('products').findOne({ _id: new mongoDb.ObjectID(productId) })
//             .then(product => {
//                 let index = this.cart.items.findIndex(ele => {
//                     return String(ele.productId) === String(product._id);
//                 });
//                 // Not Present In Cart
//                 if (index == -1) {
//                     // Add New Product To Cart
//                     this.cart.items.push({ productId: product._id, quantity: 1 });
//                 } else {
//                     this.cart.items[index].quantity++;
//                 }
//                 return db.collection('users').updateOne({ _id: new mongoDb.ObjectID(this._id) }, {
//                     $set:
//                     {
//                         cart: this.cart
//                     }
//                 });
//             }).catch(err => {
//                 console.log(err);
//             });
//     }

//     // Removes Item From Cart
//     RemoveCart(productId) {
//         const db = getDb();
//         const deleteIndex = this.cart.items.findIndex(ele => {
//             return ele.productId == productId;
//         });
//         return Product.findById(productId).then(product => {
//             this.cart.items[deleteIndex].quantity--;
//             if (this.cart.items[deleteIndex].quantity == 0) {
//                 this.cart.items.splice(deleteIndex, 1);
//             }
//             return db.collection('users').updateOne({ _id: new mongoDb.ObjectID(this._id) }, {
//                 $set: {
//                     cart: this.cart
//                 }
//             });
//         }).catch(err => {
//             console.log(err);
//         });
//     }
//     /*
//         Order Structure => 
//     */
//     addOrder() {
//         const db = getDb();
//         return this.getCart().then(cart => {
//             const snapshotCart = cart.map(ele => {
//                 return {
//                     productId: ele._id,
//                     title: ele.title,
//                     imageUrl: ele.imageUrl,
//                     price: ele.price,
//                     description: ele.description,
//                     quantity: ele.quantity
//                 }
//             });
//             let d = new Date();
//             let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"
//                 , "Aug", "Sept", "Oct", "Nov", "Dec"];
//             let day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
//             let date = d.getDate();
//             let short = date == 1 ? "st '" : date == 2 ? "nd '" : date == 3 ? "rd '" : "th '";
//             const orderDate = day[d.getDay()] + "," + months[d.getMonth()] + " " +
//                 date + short + d.getFullYear().toString().slice(2, 4);
//             const order = {
//                 user: {
//                     userId: this._id,
//                     username: this.username,
//                     email: this._id,
//                     phone_num: this.phone_num,
//                     address: this.address
//                 },
//                 order: snapshotCart,
//                 orderDate: orderDate
//             }
//             return db.collection('orders').insertOne(order).then(() => {
//                 // Empty the user cart
//                 this.cart.items = [];
//                 return db.collection('users').updateOne({ _id: new mongoDb.ObjectID(this._id) }, {
//                     $set: {
//                         cart: this.cart
//                     }
//                 });
//             });
//         }).catch(err => {
//             console.log(err);
//         });
//     }

//     getOrders() {
//         const db = getDb();
//         return db.collection('orders').find({ 'user.userId': new mongoDb.ObjectID(this._id) }).toArray();
//     }

// } 