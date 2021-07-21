const connectDB = require("./startup/db");
const express = require("express");
const app = express();
const cors = require("cors");

connectDB();

app.use(express.json());
app.use(cors());


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})