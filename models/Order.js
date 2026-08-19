const mongoose = require("mongoose");


// ==================== ORDER ITEM ====================

const orderItemSchema = new mongoose.Schema(
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

        productName: {
            type: String,
            required: true,
        },

        sku: {
            type: String,
        },

        image: {
            type: String,
        },

        price: {
            type: Number,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        total: {
            type: Number,
            required: true,
        },
    }
);


// ==================== SHIPPING ADDRESS ====================

const shippingAddressSchema = new mongoose.Schema(
    {
        receiverName: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        province: {
            type: String,
        },

        district: {
            type: String,
        },

        ward: {
            type: String,
        },

        address: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    }
);


// ==================== STATUS HISTORY ====================

const statusHistorySchema = new mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
        },

        note: {
            type: String,
        },

        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);


// ==================== ORDER ====================

const orderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: String,
            required: true,
            unique: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "processing",
                "shipping",
                "delivered",
                "cancelled",
            ],
            default: "pending",
        },

        items: [orderItemSchema],

        shippingAddress: shippingAddressSchema,

        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },

        shippingFee: {
            type: Number,
            default: 0,
            min: 0,
        },

        discountAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        note: {
            type: String,
        },

        statusHistory: [statusHistorySchema],
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Order", orderSchema);