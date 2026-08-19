const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

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
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Address", addressSchema);