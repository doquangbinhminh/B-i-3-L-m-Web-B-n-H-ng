const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    variantId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },

    quantity: {
        type: Number,
        required: true,
        min: 1,
    },

    addedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = cartItemSchema;