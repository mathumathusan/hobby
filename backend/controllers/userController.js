const express = require("express");
const db = require("../db");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const sql = "INSERT INTO register (`name`,`email`,`password`) VALUES (?)";
    const values = [req.body.name, req.body.email, req.body.password];
    db.query(sql, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  } catch (error) {
    res.json(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const sql = "SELECT * FROM register WHERE `email` = ? AND `password` = ?";
    const values = [email, password];

    db.query(sql, values, (err, data) => {
      if (err) {
        // Handle SQL error
        return res.status(500).json({ error: "Internal server error" });
      }

      // Check if the user was found
      if (data && data.length > 0) {
        // User found, login successful
        return res.json({ message: "Login successful", user: data[0] });
      } else {
        // User not found or invalid credentials
        return res.status(401).json({ error: "Invalid credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = userRouter;
