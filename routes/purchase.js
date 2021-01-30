const express = require("express");
const router = express.Router();
const sequelize = require("../dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

//create new purchase
router.post("/", async (req, res) => {
  const response = await models.purchase.create({ ...req.body });
  res.json(response);
});

//get all purchases
router.get("/", async (req, res) => {
  const response = await models.purchase.findAll();
  res.json(response);
});

module.exports = router;
