const connectDB = require("./startup/db");
const express = require("express");
const app = express();
const cors = require("cors");
const collections = require("./routes/collections");

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/collections", collections);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
