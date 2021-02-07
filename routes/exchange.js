const express = require("express");
const router = express.Router();
const sequelize = require("../dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

router.get("/:customer_id", async (req, res) => {
  const response = await models.exchange.findAll({
    where: { customer_id: req.params.customer_id },
  });
  return res.json(response);
});

router.post("/", async (req, res) => {
  const response = await models.exchange.create({ ...req.body });
  return res.json(response);
});

module.exports = router;
