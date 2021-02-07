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
  const purchases = await models.purchase.findAll();
  const sum_of_purchases = await models.purchase.sum("currency_total");
  res.json({ purchases, sum_of_purchases });
});

//get all purchases of a user
router.get("/:customer_id", async (req, res) => {
  const sum_of_purchases = await models.purchase.sum("currency_total", {
    where: { customer_id: req.params.customer_id },
  });

  const purchases = await models.purchase.findAll({
    where: { customer_id: req.params.customer_id },
  });
  res.json({ sum_of_purchases, purchases });
});

module.exports = router;
