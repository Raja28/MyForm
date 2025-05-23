const express = require("express")
const app = express()
app.use(express.json())
require("dotenv").config()
PORT = process.env.PORT || 2026
const cors = require("cors")
app.use(cors({
    origin: "https://my-form-server.vercel.app/",
    credentials: true
}))

const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const { connection } = require("./config/connection")

app.use("/auth", authRouter)
app.use("/user", userRouter)

app.get("/", (req, res) => {
    return res.json({
        success: "true",
        message: "MyForm server is running successfully."
    })
})
connection()
app.listen(PORT, () => {
    console.log("MyForm server is running on port:", PORT);
})