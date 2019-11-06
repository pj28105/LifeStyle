const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = Schema({
    user: {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: Schema.Types.String,
            required: true
        },
        email: {
            type: Schema.Types.String,
            required: true
        },
        phone_num: {
            type: Schema.Types.String,
            required: true
        },
        address: {
            type: Schema.Types.String,
            required:true,
        }
    },
    order: [{
        productId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        title: {
            type: Schema.Types.String,
            required: true,
        },
        imageUrl: {
            type: Schema.Types.String,
            required: true,
        },
        price: {
            type: Schema.Types.Number,
            required: true,
        },
        description: {
            type: Schema.Types.String,
            required: true,
        },
        quantity: {
            type: Schema.Types.Number,
            required: true,
        }
    }],
    orderDate: {
        type: Schema.Types.String,
        required: true
    }
});

module.exports = mongoose.model('Order',ordersSchema);