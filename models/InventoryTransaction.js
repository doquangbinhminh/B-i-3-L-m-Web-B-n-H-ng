const mongoose = require("mongoose");

const inventoryTransactionSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        variantId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        type: {
            type: String,
            enum: ["import", "export", "adjustment"],
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        referenceType: {
            type: String,
        },

        referenceId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        note: {
            type: String,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: false,
        },
    }
);

module.exports = mongoose.model(
    "InventoryTransaction",
    inventoryTransactionSchema
);