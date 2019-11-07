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
    password: {
        type: String,
        required: true
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