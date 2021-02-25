const express = require("express");
const router = express.Router();
const sequelize = require("../dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

router.post("/", async (req, res) => {
  console.log(req.body);
  const response = await models.cash_receipt.create({ ...req.body });
  res.json(response);
});

//get all cash receipt of a user
router.get("/:customer_id", async (req, res) => {
  const sum_of_cash_receipts = await models.cash_receipt.sum(
    "currency_quantity",
    {
      where: { customer_id: req.params.customer_id },
    }
  );

  const cash_receipts = await models.cash_receipt.findAll({
    where: { customer_id: req.params.customer_id },
  });
  res.json({ sum_of_cash_receipts, cash_receipts });
});

//get all cash receipts
router.get("/", async (req, res) => {
  const cash_receipts = await models.cash_receipt.findAll({
    include: [
      {
        model: models.customers,
        as: "customer",
      },
    ],
  });
  const sum_of_cash_receipts = await models.cash_receipt.sum(
    "currency_quantity"
  );
  res.json({ sum_of_cash_receipts, cash_receipts });
});

module.exports = router;
