const mongoose = require("mongoose");

const productDimensionSchema = new mongoose.Schema({
    height: {
        type: Number,
        default: 0,
    },

    width: {
        type: Number,
        default: 0,
    },

    length: {
        type: Number,
        default: 0,
    },
});

module.exports = productDimensionSchema;