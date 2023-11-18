const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const dotenv = require("dotenv");
const userController = require("./controllers/userController");
const detailsController = require("./controllers/detailsController");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// console.log(`hi kisho`);

app.use("/", userController);
app.use("/", detailsController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
