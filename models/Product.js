const mongoose = require("mongoose");

const productImageSchema = require("./ProductImage");
const productVariantSchema = require("./ProductVariant");
const productAttributeSchema = require("./ProductAttributes");
const productInventorySchema = require("./ProductInventory");
const productDimensionSchema = require("./ProductDimensions");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
        },

        sku: {
            type: String,
            unique: true,
        },

        description: {
            type: String,
        },

        price: {
            type: Number,
            required: true,
        },

        comparePrice: {
            type: Number,
        },

        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },

        brandId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
        },

        images: [productImageSchema],

        variants: [productVariantSchema],

        attributes: [productAttributeSchema],

        inventory: productInventorySchema,

        weight: {
            type: Number,
            default: 0,
        },

        dimensions: productDimensionSchema,

        releaseDate: {
            type: Date,
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },

        rating: {
            type: Number,
            default: 0,
        },

        reviewCount: {
            type: Number,
            default: 0,
        },

        soldCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);