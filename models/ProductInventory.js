const mongoose = require("mongoose");

const productInventorySchema = new mongoose.Schema({
    quantity: {
        type: Number,
        default: 0,
    },

    reserved: {
        type: Number,
        default: 0,
    },
});

module.exports = productInventorySchema;