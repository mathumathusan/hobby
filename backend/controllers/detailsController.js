const express = require("express");
const db = require("../db");
const detailsRouter = express.Router();

detailsRouter.get("/", (req, res) => {
  const sql = "select * from details";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

detailsRouter.get("/:id", (req, res) => {
  const sql = "select * from details where `ID`=?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

detailsRouter.post("/createUser", async (req, res) => {
  try {
    const sql =
      "INSERT INTO details (`NAME`,`EMAIL`,`PERSONAL`,`HOME`,`HOBBY`) VALUES (?)";
    const values = [
      req.body.name,
      req.body.email,
      req.body.personal,
      req.body.home,
      req.body.hobby,
    ];
    db.query(sql, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  } catch (error) {
    res.json(error);
  }
});

detailsRouter.put("/updateUser/:id", async (req, res) => {
  try {
    const sql =
      "update details set `NAME`=? , `EMAIL`=?  , `PERSONAL`=?  , `HOME`=? ,  `HOBBY`=? where `ID`=?";
    const values = [
      req.body.name,
      req.body.email,
      req.body.personal,
      req.body.home,
      req.body.hobby,
    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  } catch (error) {
    res.json(error);
  }
});

detailsRouter.delete("/deleteUser/:id", async (req, res) => {
  try {
    const sql = "delete from  details where `ID`=?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = detailsRouter;
