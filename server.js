const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require("./routes/user.router")
const questionRouter = require("./routes/question.router")
const submissionRouter = require("./routes/submission.router")
require("dotenv").config()

const PORT = process.env.PORT || 5001
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use("/api/v1/users", userRouter)
app.use("/api/v1/questions", questionRouter)
app.use("/api/v1/submissions", submissionRouter)

app.use((req, res, next) => {
    res.status(404).send(
        "<h1>Page not found on the server</h1>")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
