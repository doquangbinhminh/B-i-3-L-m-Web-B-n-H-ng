const mongoose = require("mongoose");

// ==================== REVIEW IMAGE ====================

const reviewImageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        _id: false,
    }
);


// ==================== REVIEW ====================

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        title: {
            type: String,
        },

        content: {
            type: String,
        },

        images: [reviewImageSchema],

        verifiedPurchase: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Review", reviewSchema);