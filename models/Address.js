const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    receiverName: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    province: String,

    district: String,

    ward: String,

    address: String,

    isDefault: {
        type: Boolean,
        default: false,
    },
});

module.exports = addressSchema;