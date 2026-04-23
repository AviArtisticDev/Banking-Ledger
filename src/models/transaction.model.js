const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [ true, "Transaction must be associated with a FROM account"],
        index: true
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Transaction must be associated with a TO account"],
        index: true
    },
    status: {
        type: String,
        enum: {
            values: [ "PENDING", "COMPLETED", "FAILED", "REVERSED" ],
            message: "Status can be either PENDING, COMPLETED, FAILED or REVERSED",
        },
        default: "PENDING"
    },
    amount: {
        type: Number,
        required: [true, "Amount is required for creating a transction" ],
        min: [ 0, "Transction amount cannot be negative" ]
    },
    idempotencyKey: {
        type: String,
        required: [ true, "Idempotency Key is required for creating a transction" ],
        index: true,
        unique: true
    }
}, {
    timestamps: true
})


const transactionModel = mongoose.model( "transaction", transactionSchema )

module.exports = transactionModel