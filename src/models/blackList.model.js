const { Schema, model } = require("mongoose");


const tokenBlacklistSchema = new Schema({
    token: {
        type: String,
        required: [true, "Token is required"],
        unique: [true, "Token already  blacklisted"]
    },
    blacklistedAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, {
    timestamps: true
})

tokenBlacklistSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 3}) // Expire tokens after 3 days


const TokenBlacklist = model("TokenBlacklist", tokenBlacklistSchema);

module.exports = TokenBlacklist;