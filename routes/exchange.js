const express = require("express");
const router = express.Router();
const sequelize = require("../dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

router.post("/", async (req, res) => {
  const response = await models.exchange.create({ ...req.body });
  return res.json(response);
});

//get all exchanges of a user
router.get("/:customer_id", async (req, res) => {
  const sum_of_exchanges = await models.exchange.sum("currency_total", {
    where: { customer_id: req.params.customer_id },
  });

  const exchanges = await models.exchange.findAll({
    where: { customer_id: req.params.customer_id },
  });
  res.json({ sum_of_exchanges, exchanges });
});

//get all exchanges
router.get("/", async (req, res) => {
  const exchanges = await models.exchange.findAll({
    include: [
      {
        model: models.customers,
        as: "customer",
      },
    ],
  });
  const sum_of_exchanges = await models.exchange.sum("currency_total");
  res.json({ exchanges, sum_of_exchanges });
});

module.exports = router;
