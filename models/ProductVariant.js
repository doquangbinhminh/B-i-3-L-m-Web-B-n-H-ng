const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    sku: {
        type: String,
    },

    price: {
        type: Number,
        required: true,
    },

    image: {
        type: String,
    },

    inventory: {
        quantity: {
            type: Number,
            default: 0,
        },

        reserved: {
            type: Number,
            default: 0,
        },
    },

    isActive: {
        type: Boolean,
        default: true,
    },
});

module.exports = productVariantSchema;