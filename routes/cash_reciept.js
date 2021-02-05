const express = require("express");
const router = express.Router();
const sequelize = require("../dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

router.post("/", async (req, res) => {
  const response = await models.cash_receipt.create({ ...req.body });
  res.json(response);
});

//get all cash receipt of a user
router.get("/:customer_id", async (req, res) => {
  const sum_of_cash_reciepts = await models.cash_receipt.sum("currency_total", {
    where: { customer_id: req.params.customer_id },
  });

  const cash_receipts = await models.cash_receipt.findAll({
    where: { customer_id: req.params.customer_id },
  });
  res.json({ sum_of_cash_reciepts, cash_receipts });
});

module.exports = router;
