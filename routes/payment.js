const express = require("express");
const router = express.Router();
const sequelize = require("../dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

router.post("/", async (req, res) => {
  console.log(req.body);
  const response = await models.payment.create({ ...req.body });
  res.json(response);
});

//get all payment of a user
router.get("/:customer_id", async (req, res) => {
  const sum_of_payments = await models.payment.sum("currency_quantity", {
    where: { customer_id: req.params.customer_id },
  });

  const payments = await models.payment.findAll({
    where: { customer_id: req.params.customer_id },
  });
  res.json({ sum_of_payments, payments });
});

//get all payments
router.get("/", async (req, res) => {
  const response = await models.payment.findAll();
  res.json(response);
});

module.exports = router;
