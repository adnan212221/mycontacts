const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnectiom");
const dotenv = require('dotenv').config();


connectDb();
const app = express();

const port = process.env.PORT;

app.use(express.json())

app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
