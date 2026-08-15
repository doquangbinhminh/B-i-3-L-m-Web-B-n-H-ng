const mongoose = require("mongoose");

const productImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },

    alt: {
        type: String,
    },

    sortOrder: {
        type: Number,
        default: 0,
    },

    isPrimary: {
        type: Boolean,
        default: false,
    },
});

module.exports = productImageSchema;