const mongoose = require("mongoose");

const productAttributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    value: {
        type: String,
        required: true,
    },
});

module.exports = productAttributeSchema;