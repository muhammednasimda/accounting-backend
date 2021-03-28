const express = require("express");
const router = express.Router();
const sequelize = require("../dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

router.get("/", async (req, res) => {
  const sum_of_opening_balance = await models.customers.sum("opening_balance");
  const sum_of_payment = await models.payment.sum("currency_quantity_aed");
  const sum_of_cashreciept = await models.cash_receipt.sum(
    "currency_quantity_aed"
  );
  const sum_of_sale = await models.sale.sum("currency_total");
  const sum_of_purchase = await models.purchase.sum("currency_to_give");

  res.json({
    balance:
      parseFloat(sum_of_opening_balance) +
      sum_of_payment +
      sum_of_sale -
      sum_of_cashreciept -
      sum_of_purchase,
  });
});

router.get("/customer/:customer_id", async (req, res) => {
  const { opening_balance } = await models.customers.findOne({
    where: { id: req.params.customer_id },
  });

  const sum_of_payment = await models.payment.sum("currency_quantity_aed", {
    where: { customer_id: req.params.customer_id },
  });
  const sum_of_exchange = await models.exchange.sum("currency_total", {
    where: { customer_id: req.params.customer_id },
  });
  const sum_of_cashreciept = await models.cash_receipt.sum(
    "currency_quantity_aed",
    {
      where: { customer_id: req.params.customer_id },
    }
  );
  const sum_of_sale = await models.sale.sum("currency_total", {
    where: { customer_id: req.params.customer_id },
  });

  const sum_of_purchase = await models.purchase.sum("currency_to_give", {
    where: { customer_id: req.params.customer_id },
  });

  res.json({
    payment: sum_of_payment,
    exchange: sum_of_exchange,
    cash_receipt: sum_of_cashreciept,
    opening_balance:
      parseFloat(opening_balance) +
      sum_of_payment +
      sum_of_sale -
      sum_of_cashreciept -
      sum_of_purchase,
  });
});

module.exports = router;
