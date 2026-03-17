const express = require("express");
const cors = require("cors");
require("dotenv").config()
const connectDB = require('./config/db.js')
const authRoutes = require("./routes/authRoutes.js")
const jobRoutes = require("./routes/jobRoutes.js")
const applicationRoutes = require("./routes/applicationRoute.js")
const app = express();

connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/applications', applicationRoutes)

app.get('/', (req,res)=>{
    res.send("Hello Anujna! your API is live")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server started at Port ${PORT}`)
})