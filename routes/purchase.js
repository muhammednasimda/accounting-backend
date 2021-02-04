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

//get all purchases of a user
router.get("/:customer_id", async (req, res) => {
  const response = await models.purchase.findAll({
    where: { customer_id: req.params.customer_id },
  });
  res.json(response);
});

module.exports = router;
