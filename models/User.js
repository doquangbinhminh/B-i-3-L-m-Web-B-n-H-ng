const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        username: {
            type: String,
            required: true,
            unique: true,
        },

        passwordHash: {
            type: String,
            required: true,
        },

        firstName: String,

        lastName: String,

        phone: String,

        avatar: String,

        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
        },

        status: {
            type: String,
            enum: ["active", "inactive", "blocked"],
            default: "active",
        },

        emailVerified: {
            type: Boolean,
            default: false,
        },


        // Thêm refresh token
        refreshToken: {
            type: String,
            default: null,
        },
        
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);