const express = require("express");
const cookieParser = require("cookie-parser")


const app = express();

app.use(express.json())
app.use(cookieParser())

/**
 * - Routes required
 */
const authRouter = require("./routes/auth.routes")
const accountRouter = require("./routes/account.routes")
const transactionRouters = require("./routes/transaction.routes")



app.get("/", (req, res) => {
    res.send("Welcome to the Ledger API")
})

/**
 * - Use Routes
 */
app.use("/api/auth", authRouter)
app.use("/api/transactions", transactionRouters)
app.use("/api/accounts", accountRouter)


module.exports = app