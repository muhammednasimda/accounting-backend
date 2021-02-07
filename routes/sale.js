const express = require("express");
const router = express.Router();
const sequelize = require("../dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

router.post("/", async (req, res) => {
  const response = await models.sale.create({ ...req.body });
  res.json(response);
});

//get all sales of a user
router.get("/:customer_id", async (req, res) => {
  const sum_of_sales = await models.sale.sum("currency_total", {
    where: { customer_id: req.params.customer_id },
  });

  const sales = await models.sale.findAll({
    where: { customer_id: req.params.customer_id },
  });
  res.json({ sum_of_sales, sales });
});

//get all sales
router.get("/", async (req, res) => {
  const response = await models.sale.findAll();
  res.json(response);
});

module.exports = router;
